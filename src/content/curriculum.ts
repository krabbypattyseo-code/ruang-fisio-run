import { fondasiSeo } from "@/content/modules/fondasi-seo";
import { kontenEeat } from "@/content/modules/konten-eeat";
import { offPageAnalitik } from "@/content/modules/off-page-analitik";
import { risetKataKunci } from "@/content/modules/riset-kata-kunci";
import { seoOnPage } from "@/content/modules/seo-on-page";
import { seoTeknis } from "@/content/modules/seo-teknis";
import type { Lesson, Module } from "@/content/types";

/** Urutan array menentukan urutan jalur belajar. */
export const modules: Module[] = [
  fondasiSeo,
  risetKataKunci,
  seoOnPage,
  seoTeknis,
  kontenEeat,
  offPageAnalitik,
];

export const lessonKey = (moduleSlug: string, lessonSlug: string) =>
  `${moduleSlug}/${lessonSlug}`;

export const getModule = (slug: string) =>
  modules.find((module) => module.slug === slug);

export const getLesson = (moduleSlug: string, lessonSlug: string) => {
  const mod = getModule(moduleSlug);
  const lesson = mod?.lessons.find((item) => item.slug === lessonSlug);
  return mod && lesson ? { module: mod, lesson } : undefined;
};

export const moduleIndex = (slug: string) =>
  modules.findIndex((module) => module.slug === slug);

export type FlatLesson = {
  module: Module;
  lesson: Lesson;
  key: string;
};

/** Semua pelajaran dalam urutan kurikulum, dipakai untuk navigasi berikut/sebelumnya. */
export const flatLessons: FlatLesson[] = modules.flatMap((module) =>
  module.lessons.map((lesson) => ({
    module,
    lesson,
    key: lessonKey(module.slug, lesson.slug),
  })),
);

export const totalLessons = flatLessons.length;

export const totalMinutes = flatLessons.reduce(
  (sum, item) => sum + item.lesson.minutes,
  0,
);

export const totalQuizQuestions = modules.reduce(
  (sum, module) => sum + module.quiz.length,
  0,
);

export const neighbourLessons = (key: string) => {
  const index = flatLessons.findIndex((item) => item.key === key);
  return {
    previous: index > 0 ? flatLessons[index - 1] : undefined,
    next: index >= 0 && index < flatLessons.length - 1 ? flatLessons[index + 1] : undefined,
  };
};
