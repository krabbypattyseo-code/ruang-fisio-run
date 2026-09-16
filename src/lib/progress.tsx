"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";

import { flatLessons, lessonKey, modules, totalLessons } from "@/content/curriculum";

const STORAGE_KEY = "seo-learner:progress:v1";

export type QuizResult = {
  score: number;
  total: number;
  finishedAt: string;
};

export type ProgressState = {
  /** key pelajaran (`modul/pelajaran`) → ISO timestamp saat diselesaikan */
  completedLessons: Record<string, string>;
  quizResults: Record<string, QuizResult>;
};

type Snapshot = ProgressState & {
  /** false saat render di server dan saat hidrasi, sebelum localStorage dibaca */
  isLoaded: boolean;
};

const serverSnapshot: Snapshot = {
  completedLessons: {},
  quizResults: {},
  isLoaded: false,
};

let cachedSnapshot: Snapshot | null = null;
const listeners = new Set<() => void>();

function readFromStorage(): ProgressState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { completedLessons: {}, quizResults: {} };
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      completedLessons: parsed.completedLessons ?? {},
      quizResults: parsed.quizResults ?? {},
    };
  } catch {
    return { completedLessons: {}, quizResults: {} };
  }
}

function getSnapshot(): Snapshot {
  if (!cachedSnapshot) {
    cachedSnapshot = { ...readFromStorage(), isLoaded: true };
  }
  return cachedSnapshot;
}

function notify() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  const onStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== STORAGE_KEY) return;
    cachedSnapshot = null;
    notify();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function update(updater: (current: ProgressState) => ProgressState) {
  const next = updater(getSnapshot());
  cachedSnapshot = { ...next, isLoaded: true };
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        completedLessons: next.completedLessons,
        quizResults: next.quizResults,
      }),
    );
  } catch {
    // Penyimpanan penuh atau diblokir: progres tetap berlaku untuk sesi ini.
  }
  notify();
}

type ProgressContextValue = {
  isLoaded: boolean;
  state: ProgressState;
  isLessonDone: (moduleSlug: string, lessonSlug: string) => boolean;
  setLessonDone: (moduleSlug: string, lessonSlug: string, done: boolean) => void;
  saveQuizResult: (moduleSlug: string, score: number, total: number) => void;
  moduleProgress: (moduleSlug: string) => { done: number; total: number; percent: number };
  overall: { done: number; total: number; percent: number };
  nextLesson: () => (typeof flatLessons)[number] | undefined;
  resetProgress: () => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot);
  const { completedLessons, quizResults, isLoaded } = snapshot;

  const isLessonDone = useCallback(
    (moduleSlug: string, lessonSlug: string) =>
      Boolean(completedLessons[lessonKey(moduleSlug, lessonSlug)]),
    [completedLessons],
  );

  const setLessonDone = useCallback(
    (moduleSlug: string, lessonSlug: string, done: boolean) => {
      const key = lessonKey(moduleSlug, lessonSlug);
      update((current) => {
        const nextLessons = { ...current.completedLessons };
        if (done) {
          nextLessons[key] = new Date().toISOString();
        } else {
          delete nextLessons[key];
        }
        return { ...current, completedLessons: nextLessons };
      });
    },
    [],
  );

  const saveQuizResult = useCallback(
    (moduleSlug: string, score: number, total: number) => {
      update((current) => ({
        ...current,
        quizResults: {
          ...current.quizResults,
          [moduleSlug]: { score, total, finishedAt: new Date().toISOString() },
        },
      }));
    },
    [],
  );

  const moduleProgress = useCallback(
    (moduleSlug: string) => {
      const found = modules.find((item) => item.slug === moduleSlug);
      const total = found?.lessons.length ?? 0;
      const done =
        found?.lessons.filter((lesson) =>
          Boolean(completedLessons[lessonKey(moduleSlug, lesson.slug)]),
        ).length ?? 0;
      return { done, total, percent: total ? Math.round((done / total) * 100) : 0 };
    },
    [completedLessons],
  );

  const overall = useMemo(() => {
    const done = flatLessons.filter((item) => Boolean(completedLessons[item.key])).length;
    return {
      done,
      total: totalLessons,
      percent: totalLessons ? Math.round((done / totalLessons) * 100) : 0,
    };
  }, [completedLessons]);

  const nextLesson = useCallback(
    () => flatLessons.find((item) => !completedLessons[item.key]),
    [completedLessons],
  );

  const resetProgress = useCallback(
    () => update(() => ({ completedLessons: {}, quizResults: {} })),
    [],
  );

  const value = useMemo(
    () => ({
      isLoaded,
      state: { completedLessons, quizResults },
      isLessonDone,
      setLessonDone,
      saveQuizResult,
      moduleProgress,
      overall,
      nextLesson,
      resetProgress,
    }),
    [
      isLoaded,
      completedLessons,
      quizResults,
      isLessonDone,
      setLessonDone,
      saveQuizResult,
      moduleProgress,
      overall,
      nextLesson,
      resetProgress,
    ],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress harus dipakai di dalam ProgressProvider");
  }
  return context;
}
