export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "callout"; variant: "tip" | "warning" | "info"; title: string; text: string }
  | { type: "code"; label: string; code: string }
  | { type: "table"; head: string[]; rows: string[][] };

export type Lesson = {
  slug: string;
  title: string;
  summary: string;
  minutes: number;
  blocks: ContentBlock[];
  takeaways: string[];
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

export type Level = "Pemula" | "Menengah" | "Lanjutan";

export type Module = {
  slug: string;
  title: string;
  tagline: string;
  level: Level;
  /** Nama ikon lucide-react yang dipakai di kartu modul. */
  icon: "Compass" | "Search" | "FileText" | "Wrench" | "PenLine" | "LineChart";
  outcomes: string[];
  lessons: Lesson[];
  quiz: QuizQuestion[];
};

export type LessonRef = {
  module: Module;
  lesson: Lesson;
};
