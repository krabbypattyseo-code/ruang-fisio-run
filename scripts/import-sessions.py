#!/usr/bin/env python3
"""Impor sesi dari Excel analisis + ekspor Garmin/COROS ke TypeScript.

Sumber utama ringkasan: `5-analisis-lari-gtr.xlsx` (sheet Komparatif).
Lap & zona HR dilengkapi dari ekspor Garmin/COROS bila ada — field kosong
tetap null / 0, tidak digenerate.

  python3 scripts/import-sessions.py
"""

from __future__ import annotations

import json
import math
import re
from datetime import datetime, timedelta
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "data" / "raw"
OUT = ROOT / "src" / "data" / "sessions.generated.ts"

ANALYSIS_XLSX = RAW / "5-analisis-lari-gtr.xlsx"
GARMIN_XLSX = RAW / "Garmin_Running_Data_JulAug_2026.xlsx"
COROS_OLD_XLSX = RAW / "COROS_Running_26Agu6Sep2026.xlsx"
COROS_NEW_XLSX = RAW / "COROS_Running_10-14Sep2026.xlsx"

MI_TO_KM = 1.609344
FT_TO_M = 0.3048


def parse_duration(value) -> int | None:
    """Ubah string waktu menjadi detik. Mengembalikan None jika kosong."""
    if value is None or (isinstance(value, float) and math.isnan(value)):
        return None
    if isinstance(value, timedelta):
        return int(round(value.total_seconds()))
    text = str(value).strip()
    if not text or text in {"--", "nan", "NaT"}:
        return None
    if text.startswith("0 days "):
        text = text[len("0 days ") :]
    # "9:53.5" → menit:detik.pecahan
    if re.fullmatch(r"\d+:\d{2}(?:\.\d+)?", text):
        minutes, seconds = text.split(":")
        return int(round(int(minutes) * 60 + float(seconds)))
    # "1:04:43" atau "00:08:30"
    if re.fullmatch(r"\d+:\d{2}:\d{2}(?:\.\d+)?", text):
        hours, minutes, seconds = text.split(":")
        return int(round(int(hours) * 3600 + int(minutes) * 60 + float(seconds)))
    raise ValueError(f"Format waktu tidak dikenal: {value!r}")


def parse_pace_per_unit(value) -> float | None:
    """Pace sebagai detik per unit jarak (mil atau km)."""
    sec = parse_duration(value)
    return float(sec) if sec is not None else None


def to_iso_date(value) -> str:
    if isinstance(value, datetime):
        return value.date().isoformat()
    text = str(value).strip()
    if not text or text in {"nan", "NaT", "None"}:
        return ""
    # DD/MM/YYYY
    if re.fullmatch(r"\d{2}/\d{2}/\d{4}", text):
        day, month, year = text.split("/")
        return f"{year}-{month}-{day}"
    if " " in text:
        text = text.split(" ")[0]
    return text[:10]


def num(value) -> float | None:
    if value is None or (isinstance(value, float) and math.isnan(value)):
        return None
    if isinstance(value, str):
        text = value.strip()
        if not text or text in {"--", "nan"}:
            return None
        value = text
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def int_or_none(value) -> int | None:
    parsed = num(value)
    return None if parsed is None else int(round(parsed))


def parse_rpe(value) -> int | None:
    text = str(value or "").strip()
    match = re.match(r"(\d+)\s*/\s*10", text)
    return int(match.group(1)) if match else None


def pace_mi_to_km(sec_per_mi: float | None) -> float | None:
    if sec_per_mi is None:
        return None
    return sec_per_mi / MI_TO_KM


def js(value):
    return json.dumps(value, ensure_ascii=False)


def build_elevation_profile(laps: list[dict], start_elev_m: float | None) -> list[dict]:
    elevation = 0.0 if start_elev_m is None else float(start_elev_m)
    for lap in laps:
        gain = lap.get("elevGainM") or 0
        loss = lap.get("elevLossM") or 0
        elevation = elevation + gain - loss
        lap["elevationM"] = round(elevation)
    return laps


def map_workout_type(tipe: str) -> str:
    text = (tipe or "").strip().lower()
    if "hik" in text or "walk" in text:
        return "hiking"
    if "trail" in text:
        return "trail"
    # Road, treadmill, dll. masuk kategori road di UI.
    return "road"


def read_sheet_with_header(path: Path, sheet: str, marker: str) -> pd.DataFrame:
    raw = pd.read_excel(path, sheet_name=sheet, header=None)
    header_idx = next(
        i
        for i, row in raw.iterrows()
        if any(str(cell).strip() == marker for cell in row.tolist() if pd.notna(cell))
    )
    return pd.read_excel(path, sheet_name=sheet, header=header_idx)


def load_garmin_laps_by_date() -> dict[str, list[dict]]:
    if not GARMIN_XLSX.exists():
        return {}
    laps_df = pd.read_excel(GARMIN_XLSX, sheet_name="Laps")
    summary = pd.read_excel(GARMIN_XLSX, sheet_name="Ringkasan Aktivitas")
    start_elev_by_date: dict[str, float | None] = {}
    for _, row in summary.iterrows():
        date = to_iso_date(row["Tanggal"])
        min_elev = num(row.get("Min Elev (ft)"))
        start_elev_by_date[date] = None if min_elev is None else round(min_elev * FT_TO_M)

    by_date: dict[str, list[dict]] = {}
    for _, lap in laps_df.iterrows():
        if str(lap["Laps"]) == "Summary":
            continue
        date = to_iso_date(lap["Tanggal"])
        lap_distance_mi = num(lap["Distance(mi)"]) or 0
        lap_distance_km = round(lap_distance_mi * MI_TO_KM, 3)
        lap_duration = parse_duration(lap["Time"]) or 0
        lap_pace = pace_mi_to_km(parse_pace_per_unit(lap["Avg Pace(min/mi)"]))
        if lap_pace is None and lap_distance_km > 0:
            lap_pace = lap_duration / lap_distance_km
        by_date.setdefault(date, []).append(
            {
                "index": int(lap["Laps"]),
                "distanceKm": lap_distance_km,
                "durationSec": lap_duration,
                "paceSecPerKm": round(lap_pace or 0),
                "avgHr": int_or_none(lap["Avg HR(bpm)"]) or 0,
                "cadence": int_or_none(lap["Avg Run Cadence(spm)"]) or 0,
                "elevGainM": round((num(lap["Total Ascent(ft)"]) or 0) * FT_TO_M),
                "elevLossM": round((num(lap["Total Descent(ft)"]) or 0) * FT_TO_M),
                "elevationM": 0,
            }
        )

    for date, laps in by_date.items():
        by_date[date] = build_elevation_profile(laps, start_elev_by_date.get(date))
    return by_date


def load_garmin_hr_zones_by_date() -> dict[str, list[int]]:
    if not GARMIN_XLSX.exists():
        return {}
    zones_df = pd.read_excel(GARMIN_XLSX, sheet_name="Heart Rate Zones")
    by_date: dict[str, list[int]] = {}
    for _, zone in zones_df.iterrows():
        date = to_iso_date(zone["Tanggal"])
        hr_zones = by_date.setdefault(date, [0, 0, 0, 0, 0])
        match = re.search(r"(\d)", str(zone["Zone"]))
        if not match:
            continue
        index = int(match.group(1)) - 1
        if 0 <= index < 5:
            hr_zones[index] = parse_duration(zone["Time"]) or 0
    return by_date


def load_coros_laps_from(path: Path) -> dict[str, list[dict]]:
    if not path.exists():
        return {}
    laps_df = read_sheet_with_header(path, "Detail Lap", "Tanggal")
    laps_df = laps_df.copy()
    # Beberapa sheet COROS mengulang tanggal hanya di baris pertama sesi.
    if "Tanggal" in laps_df.columns:
        laps_df["Tanggal"] = laps_df["Tanggal"].ffill()
    if "Nama Aktivitas" in laps_df.columns:
        laps_df["Nama Aktivitas"] = laps_df["Nama Aktivitas"].ffill()
    laps_df = laps_df[pd.to_datetime(laps_df["Tanggal"], errors="coerce").notna()].copy()

    by_date: dict[str, list[dict]] = {}
    for _, lap in laps_df.iterrows():
        date = to_iso_date(lap["Tanggal"])
        lap_index = int_or_none(lap.get("Lap"))
        if not date or lap_index is None:
            continue
        lap_distance = round(float(lap["Jarak (km)"]), 3)
        lap_duration = parse_duration(lap["Waktu"]) or 0
        lap_pace = parse_pace_per_unit(lap.get("Pace Hitung /km")) or parse_pace_per_unit(
            lap.get("Pace (COROS)")
        )
        if lap_pace is None and lap_distance > 0:
            lap_pace = lap_duration / lap_distance
        by_date.setdefault(date, []).append(
            {
                "index": lap_index,
                "distanceKm": lap_distance,
                "durationSec": lap_duration,
                "paceSecPerKm": round(lap_pace or 0),
                "avgHr": int_or_none(lap.get("Avg HR (bpm)")) or 0,
                "cadence": int_or_none(lap.get("Avg Cadence (spm)")) or 0,
                "elevGainM": int_or_none(lap.get("Elev Gain (m)")) or 0,
                "elevLossM": int_or_none(lap.get("Total Descent (m)")) or 0,
                "elevationM": 0,
            }
        )

    for date, laps in by_date.items():
        by_date[date] = build_elevation_profile(laps, 0 if laps else None)
    return by_date


def load_analysis_laps_by_date() -> dict[str, list[dict]]:
    if not ANALYSIS_XLSX.exists():
        return {}
    laps_df = read_sheet_with_header(ANALYSIS_XLSX, "Detail Lap", "Tanggal")
    laps_df = laps_df.copy()
    laps_df["Tanggal"] = laps_df["Tanggal"].ffill()
    if "Sesi" in laps_df.columns:
        laps_df["Sesi"] = laps_df["Sesi"].ffill()
    laps_df = laps_df[pd.to_numeric(laps_df["Lap"], errors="coerce").notna()].copy()

    by_date: dict[str, list[dict]] = {}
    for _, lap in laps_df.iterrows():
        date = to_iso_date(lap["Tanggal"])
        if not date:
            continue
        lap_distance = round(float(lap["Jarak (km)"]), 3)
        lap_duration = parse_duration(lap["Waktu"]) or 0
        lap_pace = parse_pace_per_unit(lap.get("Pace /km"))
        if lap_pace is None and lap_distance > 0:
            lap_pace = lap_duration / lap_distance
        by_date.setdefault(date, []).append(
            {
                "index": int(lap["Lap"]),
                "distanceKm": lap_distance,
                "durationSec": lap_duration,
                "paceSecPerKm": round(lap_pace or 0),
                "avgHr": int_or_none(lap.get("HR")) or 0,
                "cadence": int_or_none(lap.get("Cadence")) or 0,
                "elevGainM": 0,
                "elevLossM": 0,
                "elevationM": 0,
            }
        )
    for date, laps in by_date.items():
        by_date[date] = build_elevation_profile(laps, 0 if laps else None)
    return by_date


def import_sessions() -> list[dict]:
    summary = read_sheet_with_header(ANALYSIS_XLSX, "Komparatif", "No")
    summary = summary[pd.to_numeric(summary["No"], errors="coerce").notna()].copy()

    garmin_laps = load_garmin_laps_by_date()
    garmin_zones = load_garmin_hr_zones_by_date()
    coros_laps: dict[str, list[dict]] = {}
    coros_laps.update(load_coros_laps_from(COROS_OLD_XLSX))
    coros_laps.update(load_coros_laps_from(COROS_NEW_XLSX))  # overwrite / tambah 10 & 14 Sep
    analysis_laps = load_analysis_laps_by_date()

    sessions: list[dict] = []
    for _, row in summary.iterrows():
        date = to_iso_date(row["Tanggal"])
        name = str(row["Nama Aktivitas"]).strip()
        tipe = str(row["Tipe"]).strip()
        alat = str(row["Alat"]).strip().lower()
        catatan = str(row.get("Catatan") or "").strip()
        if catatan in {"nan", "None"}:
            catatan = ""

        source = "coros" if alat == "coros" else "garmin"
        distance_km = round(float(row["Jarak (km)"]), 2)
        duration_sec = parse_duration(row["Waktu"]) or 0
        pace_sec = parse_pace_per_unit(row["Pace /km"])
        if pace_sec is None and distance_km:
            pace_sec = duration_sec / distance_km

        if source == "garmin" and date in garmin_laps:
            laps = garmin_laps[date]
        elif source == "coros" and date in coros_laps:
            laps = coros_laps[date]
        elif date in analysis_laps:
            laps = analysis_laps[date]
        else:
            laps = []

        hr_zones = garmin_zones.get(date, [0, 0, 0, 0, 0])
        rpe = parse_rpe(row.get("RPE"))
        slug = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
        notes_parts = [f"Sumber: {alat.upper()} · {tipe}"]
        if catatan:
            notes_parts.append(catatan)

        sessions.append(
            {
                "id": f"{source}-{date}-{slug}",
                "date": date,
                "type": map_workout_type(tipe),
                "title": name,
                "route": name,
                "distanceKm": distance_km,
                "durationSec": duration_sec,
                "paceSecPerKm": round(pace_sec or 0),
                "elevGainM": int_or_none(row["Elev + (m)"]) or 0,
                "elevLossM": int_or_none(row["Elev - (m)"]) or 0,
                "avgHr": int_or_none(row["HR"]) or 0,
                "maxHr": int_or_none(row.get("HR maks")),
                "cadence": int_or_none(row["Cadence"]) or 0,
                "strideM": (
                    None
                    if num(row.get("Stride lapor (m)")) is None
                    else round(float(row["Stride lapor (m)"]), 2)
                ),
                "calories": int_or_none(row["Kalori"]) or 0,
                "rpe": rpe,
                "weather": {
                    "tempC": (
                        None if num(row.get("Suhu (C)")) is None else round(float(row["Suhu (C)"]), 1)
                    ),
                    "humidity": None,
                    "condition": None,
                },
                "laps": laps,
                "hrZones": hr_zones,
                "notes": " · ".join(notes_parts),
                "source": source,
            }
        )
    return sessions


def emit_ts(sessions: list[dict]) -> str:
    sessions = sorted(sessions, key=lambda item: (item["date"], item["id"]), reverse=True)
    lines = [
        "/** Generated by scripts/import-sessions.py — jangan diedit manual. */",
        'import type { Session } from "@/data/types";',
        "",
        "export const generatedSessions = [",
    ]
    for session in sessions:
        weather = session["weather"]
        lines.append("  {")
        lines.append(f'    id: {js(session["id"])},')
        lines.append(f'    date: {js(session["date"])},')
        lines.append(f'    type: {js(session["type"])},')
        lines.append(f'    title: {js(session["title"])},')
        lines.append(f'    route: {js(session["route"])},')
        lines.append(f'    distanceKm: {session["distanceKm"]},')
        lines.append(f'    durationSec: {session["durationSec"]},')
        lines.append(f'    paceSecPerKm: {session["paceSecPerKm"]},')
        lines.append(f'    elevGainM: {session["elevGainM"]},')
        lines.append(f'    elevLossM: {session["elevLossM"]},')
        lines.append(f'    avgHr: {session["avgHr"]},')
        lines.append(f'    maxHr: {js(session["maxHr"])},')
        lines.append(f'    cadence: {session["cadence"]},')
        lines.append(f'    strideM: {js(session["strideM"])},')
        lines.append(f'    calories: {session["calories"]},')
        lines.append(f'    rpe: {js(session["rpe"])},')
        lines.append("    weather: {")
        lines.append(f'      tempC: {js(weather["tempC"])},')
        lines.append(f'      humidity: {js(weather["humidity"])},')
        lines.append(f'      condition: {js(weather["condition"])},')
        lines.append("    },")
        lines.append(f'    hrZones: {js(session["hrZones"])},')
        lines.append(f'    notes: {js(session["notes"])},')
        lines.append(f'    source: {js(session["source"])},')
        lines.append("    laps: [")
        for lap in session["laps"]:
            lines.append(
                "      {"
                f' index: {lap["index"]},'
                f' distanceKm: {lap["distanceKm"]},'
                f' durationSec: {lap["durationSec"]},'
                f' paceSecPerKm: {lap["paceSecPerKm"]},'
                f' avgHr: {lap["avgHr"]},'
                f' cadence: {lap["cadence"]},'
                f' elevGainM: {lap["elevGainM"]},'
                f' elevLossM: {lap["elevLossM"]},'
                f' elevationM: {lap["elevationM"]},'
                " },"
            )
        lines.append("    ],")
        lines.append("  },")
    lines.append("] as const satisfies readonly Session[];")
    lines.append("")
    return "\n".join(lines)


def main() -> None:
    if not ANALYSIS_XLSX.exists():
        raise SystemExit(f"Berkas analisis belum ada: {ANALYSIS_XLSX}")

    sessions = import_sessions()
    OUT.write_text(emit_ts(sessions))
    print(f"Menulis {len(sessions)} sesi → {OUT.relative_to(ROOT)}")
    for item in sorted(sessions, key=lambda s: s["date"]):
        laps_n = len(item["laps"])
        print(
            f"  {item['date']}  {item['source']:6}  {item['type']:6}  "
            f"{item['distanceKm']:5.2f} km  laps={laps_n:2}  {item['title']}"
        )


if __name__ == "__main__":
    main()
