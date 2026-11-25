export type Phase =
  | 'define'
  | 'measure'
  | 'analyze'
  | 'improve'
  | 'control'
  | 'foundation';

export type Difficulty = 'foundation' | 'belt' | 'master';
export type QuestionType = 'mcq' | 'scenario' | 'calc';

export type GameMode =
  | 'home'
  | 'baseline'
  | 'mock'
  | 'drill'
  | 'blindspot'
  | 'toolmatch'
  | 'calc'
  | 'review'
  | 'achievements'
  | 'phase'
  | 'path';

export interface Question {
  id: string;
  phase: Phase;
  topic: string;
  type: QuestionType;
  difficulty: Difficulty;
  prompt: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
  dgqTip?: string;
  /** Links to a teaching lesson for study-after-miss */
  lessonId?: string;
}

export type VisualKind =
  | 'dmaic'
  | 'sipoc'
  | 'kano'
  | 'raci'
  | 'msa'
  | 'capability'
  | 'pareto'
  | 'controlchart'
  | 'fishbone'
  | 'fmea'
  | 'vsm'
  | 'doe'
  | 'pull'
  | 'smed'
  | 'hypothesis'
  | 'gate';

export interface LessonSection {
  heading: string;
  body: string;
}

export interface Lesson {
  id: string;
  title: string;
  phase: Phase;
  /** Topics (question topic keys/labels) that resolve to this lesson */
  topics: string[];
  summary: string;
  visual: VisualKind;
  visualCaption: string;
  sections: LessonSection[];
  takeaways: string[];
  dgqAngle?: string;
}

export interface TopicMeta {
  key: string;
  label: string;
  phase: Phase;
}

export interface AnswerRecord {
  questionId: string;
  correct: boolean;
  phase: Phase;
  topic: string;
  answeredAt: number;
  mode: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: number;
}

export interface ProgressState {
  xp: number;
  streak: number;
  lastPlayDate: string | null;
  baselineDone: boolean;
  baselineScores: Record<Phase, number>;
  topicStats: Record<string, { correct: number; total: number }>;
  phaseStats: Record<Phase, { correct: number; total: number }>;
  answeredIds: string[];
  history: AnswerRecord[];
  mockBest: number | null;
  mockAttempts: number;
  achievements: string[];
  dailyGoal: number;
  dailyCorrect: number;
  dailyDate: string | null;
  /** Lesson IDs opened/studied on the Skill Path (for crown unlocks). */
  pathStudied: string[];
}

export interface SessionConfig {
  mode: GameMode;
  title: string;
  questions: Question[];
  timed: boolean;
  seconds: number | null;
  passPercent: number | null;
  showImmediateFeedback: boolean;
}
