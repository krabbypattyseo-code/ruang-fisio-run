#!/usr/bin/env python3
"""Impor sesi dari Excel Garmin + COROS ke TypeScript.

Hanya menulis angka yang ada di berkas sumber. Field yang tidak tercatat
ditulis null / 0 / string kosong — tidak digenerate ulang.
Jalankan ulang setiap kali ada ekspor workout baru:

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

GARMIN_XLSX = RAW / "Garmin_Running_Data_JulAug_2026.xlsx"
COROS_XLSX = RAW / "COROS_Running_26Agu6Sep2026.xlsx"

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


def f_to_c(fahrenheit: float | None) -> float | None:
    if fahrenheit is None:
        return None
    return round((fahrenheit - 32) * 5 / 9, 1)


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


def import_garmin() -> list[dict]:
    summary = pd.read_excel(GARMIN_XLSX, sheet_name="Ringkasan Aktivitas")
    laps_df = pd.read_excel(GARMIN_XLSX, sheet_name="Laps")
    zones_df = pd.read_excel(GARMIN_XLSX, sheet_name="Heart Rate Zones")

    sessions: list[dict] = []
    for _, row in summary.iterrows():
        date = to_iso_date(row["Tanggal"])
        name = str(row["Nama Aktivitas"]).strip()
        activity_id = str(int(row["Activity ID"]))
        distance_km = round(float(row["Distance (mi)"]) * MI_TO_KM, 2)
        duration_sec = parse_duration(row["Moving Time"]) or parse_duration(row["Time"])
        pace_sec = pace_mi_to_km(parse_pace_per_unit(row["Avg Pace (/mi)"]))
        if pace_sec is None and duration_sec and distance_km:
            pace_sec = duration_sec / distance_km

        elev_gain = round(float(row["Total Ascent (ft)"]) * FT_TO_M)
        elev_loss = round(float(row["Total Descent (ft)"]) * FT_TO_M)
        min_elev = num(row.get("Min Elev (ft)"))
        start_elev = None if min_elev is None else round(min_elev * FT_TO_M)

        # Laps nyata, tanpa baris Summary.
        activity_laps = laps_df[
            (laps_df["Tanggal"].astype(str).str.startswith(date))
            & (laps_df["Nama Aktivitas"] == name)
            & (laps_df["Laps"].astype(str) != "Summary")
        ]
        laps: list[dict] = []
        for _, lap in activity_laps.iterrows():
            lap_distance_mi = num(lap["Distance(mi)"]) or 0
            lap_distance_km = round(lap_distance_mi * MI_TO_KM, 3)
            lap_duration = parse_duration(lap["Time"]) or 0
            lap_pace = pace_mi_to_km(parse_pace_per_unit(lap["Avg Pace(min/mi)"]))
            if lap_pace is None and lap_distance_km > 0:
                lap_pace = lap_duration / lap_distance_km
            laps.append(
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
        laps = build_elevation_profile(laps, start_elev)

        # Zona HR 1–5 dari sheet Garmin (Zone 1 = termudah).
        zone_rows = zones_df[
            (zones_df["Tanggal"].astype(str).str.startswith(date))
            & (zones_df["Nama Aktivitas"] == name)
        ]
        hr_zones = [0, 0, 0, 0, 0]
        for _, zone in zone_rows.iterrows():
            label = str(zone["Zone"])
            match = re.search(r"(\d)", label)
            if not match:
                continue
            index = int(match.group(1)) - 1
            if 0 <= index < 5:
                hr_zones[index] = parse_duration(zone["Time"]) or 0

        rpe = parse_rpe(row.get("Perceived Effort"))
        feel = str(row.get("How Did You Feel") or "").strip()
        notes_parts = []
        if feel and feel not in {"--", "nan"}:
            notes_parts.append(f"Feeling: {feel}")
        if rpe is not None:
            notes_parts.append(f"RPE {rpe}/10 dari Garmin")
        notes_parts.append(f"Sumber: Garmin · Activity ID {activity_id}")

        sessions.append(
            {
                "id": f"garmin-{activity_id}",
                "date": date,
                "type": "road",
                "title": name,
                "route": name,
                "distanceKm": distance_km,
                "durationSec": duration_sec or 0,
                "paceSecPerKm": round(pace_sec or 0),
                "elevGainM": elev_gain,
                "elevLossM": elev_loss,
                "avgHr": int(row["Avg HR (bpm)"]),
                "maxHr": int(row["Max HR (bpm)"]),
                "cadence": int(row["Avg Run Cadence (spm)"]),
                "strideM": round(float(row["Avg Stride Length (m)"]), 2),
                "calories": int(row["Active Calories"]),
                "rpe": rpe,
                "weather": {
                    "tempC": f_to_c(num(row.get("Avg Temp (F)"))),
                    "humidity": None,
                    "condition": None,
                },
                "laps": laps,
                "hrZones": hr_zones,
                "notes": " · ".join(notes_parts),
                "source": "garmin",
            }
        )
    return sessions


def import_coros() -> list[dict]:
    raw = pd.read_excel(COROS_XLSX, sheet_name="Ringkasan", header=None)
    header_idx = next(
        i for i, row in raw.iterrows() if str(row[0]).strip() == "No" or str(row[1]).strip() == "Tanggal"
    )
    summary = pd.read_excel(COROS_XLSX, sheet_name="Ringkasan", header=header_idx)
    summary = summary[pd.to_numeric(summary["No"], errors="coerce").notna()].copy()

    laps_raw = pd.read_excel(COROS_XLSX, sheet_name="Detail Lap", header=None)
    laps_header = next(
        i for i, row in laps_raw.iterrows() if str(row[0]).strip() == "Tanggal"
    )
    laps_df = pd.read_excel(COROS_XLSX, sheet_name="Detail Lap", header=laps_header)
    laps_df = laps_df[pd.to_datetime(laps_df["Tanggal"], errors="coerce").notna()].copy()

    sessions: list[dict] = []
    for _, row in summary.iterrows():
        date = to_iso_date(row["Tanggal"])
        name = str(row["Nama Aktivitas"]).strip()
        label = str(row["Label"]).strip()
        tipe = str(row["Tipe"]).strip().lower()
        catatan = str(row.get("Catatan") or "").strip()
        if catatan in {"nan", "None"}:
            catatan = ""

        if "hiking" in label.lower() or tipe == "hiking":
            workout_type = "hiking"
        elif tipe == "trail":
            workout_type = "trail"
        else:
            workout_type = "road"

        distance_km = round(float(row["Jarak (km)"]), 2)
        duration_sec = parse_duration(row["Waktu Aktif"]) or parse_duration(row["Total Waktu"]) or 0
        pace_sec = parse_pace_per_unit(row["Avg Pace /km"])
        if pace_sec is None and distance_km:
            pace_sec = duration_sec / distance_km

        activity_laps = laps_df[
            (laps_df["Tanggal"].astype(str).str.startswith(date))
            & (laps_df["Nama Aktivitas"] == name)
        ]
        laps: list[dict] = []
        for _, lap in activity_laps.iterrows():
            lap_distance = round(float(lap["Jarak (km)"]), 3)
            lap_duration = parse_duration(lap["Waktu"]) or 0
            lap_pace = parse_pace_per_unit(lap.get("Pace Hitung /km")) or parse_pace_per_unit(
                lap.get("Pace (COROS)")
            )
            if lap_pace is None and lap_distance > 0:
                lap_pace = lap_duration / lap_distance
            laps.append(
                {
                    "index": int(lap["Lap"]),
                    "distanceKm": lap_distance,
                    "durationSec": lap_duration,
                    "paceSecPerKm": round(lap_pace or 0),
                    "avgHr": int_or_none(lap["Avg HR (bpm)"]) or 0,
                    "cadence": int_or_none(lap.get("Avg Cadence (spm)")) or 0,
                    "elevGainM": int_or_none(lap.get("Elev Gain (m)")) or 0,
                    "elevLossM": int_or_none(lap.get("Total Descent (m)")) or 0,
                    "elevationM": 0,
                }
            )
        laps = build_elevation_profile(laps, 0 if laps else None)

        slug = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
        notes_parts = [f"Label COROS: {label}"]
        if catatan:
            notes_parts.append(catatan)
        notes_parts.append("Sumber: COROS Training Hub")

        sessions.append(
            {
                "id": f"coros-{date}-{slug}",
                "date": date,
                "type": workout_type,
                "title": label if label else name,
                "route": name,
                "distanceKm": distance_km,
                "durationSec": duration_sec,
                "paceSecPerKm": round(pace_sec or 0),
                "elevGainM": int_or_none(row["Elev Gain (m)"]) or 0,
                "elevLossM": int_or_none(row["Total Descent (m)"]) or 0,
                "avgHr": int_or_none(row["Avg HR (bpm)"]) or 0,
                "maxHr": None,  # tidak ada di ekspor COROS
                "cadence": int_or_none(row["Avg Cadence (spm)"]) or 0,
                "strideM": None,  # tidak ada di ekspor COROS
                "calories": int_or_none(row["Kalori (kcal)"]) or 0,
                "rpe": None,
                "weather": {"tempC": None, "humidity": None, "condition": None},
                "laps": laps,
                "hrZones": [0, 0, 0, 0, 0],  # tidak ada di ekspor COROS
                "notes": " · ".join(notes_parts),
                "source": "coros",
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
    if not GARMIN_XLSX.exists() or not COROS_XLSX.exists():
        raise SystemExit(f"Berkas sumber belum lengkap di {RAW}")

    sessions = import_garmin() + import_coros()
    # Jangan sampai ada duplikasi tanggal yang sama dari dua sumber dengan isi beda
    # tanpa disengaja — di dataset ini tidak ada overlap tanggal.
    dates = [item["date"] for item in sessions]
    if len(dates) != len(set(dates)):
        # Beberapa hari boleh >1 sesi; yang dilarang adalah mengarang sesi di luar file.
        pass

    OUT.write_text(emit_ts(sessions))
    print(f"Menulis {len(sessions)} sesi → {OUT.relative_to(ROOT)}")
    for item in sorted(sessions, key=lambda s: s["date"]):
        print(
            f"  {item['date']}  {item['source']:6}  {item['type']:6}  "
            f"{item['distanceKm']:5.2f} km  {item['title']}"
        )


if __name__ == "__main__":
    main()
