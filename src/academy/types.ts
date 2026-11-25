export interface Choice {
  id: string;
  label: string;
}

export interface DataTable {
  caption?: string;
  columns: string[];
  rows: (string | number)[][];
}

export interface MinitabBlock {
  heading?: string;
  /** Preformatted monospace lines (Minitab session-window style). */
  lines?: string[];
  table?: { columns: string[]; rows: (string | number)[][] };
}

export interface MinitabOutput {
  title: string;
  blocks: MinitabBlock[];
}

export type Visual =
  | { type: 'table'; data: DataTable }
  | { type: 'histogram'; values: number[]; bins?: number; xLabel: string; lsl?: number; usl?: number }
  | {
      type: 'scatter';
      points: [number, number][];
      xLabel: string;
      yLabel: string;
      fit?: boolean;
    }
  | { type: 'boxplot'; groups: { label: string; values: number[] }[]; yLabel: string }
  | { type: 'bars'; bars: { label: string; value: number }[]; yLabel: string; stacked?: never }
  | {
      type: 'stackedBars';
      groups: string[];
      series: { label: string; values: number[] }[];
      yLabel: string;
    }
  | { type: 'dotstrip'; values: number[]; xLabel: string }
  | { type: 'dataTypeTree' }
  | { type: 'toolMatrix'; highlight?: 'cc' | 'dc' | 'cd' | 'dd' }
  | { type: 'minitab'; output: MinitabOutput }
  | { type: 'tagCloud'; items: { label: string; tone: 'c' | 'd' }[] };

export interface ConceptCard {
  kind: 'concept';
  title: string;
  /** Short paragraphs; lines beginning "- " become bullets. Keep to ~3–4 sentences. */
  body: string;
  visual?: Visual;
  /** Optional one-line “remember this” callout. */
  keyIdea?: string;
}

export interface ChoiceCard {
  kind: 'choice';
  title: string;
  prompt: string;
  visual?: Visual;
  options: Choice[];
  answer: string;
  hint: string;
  explanation: string;
}

export interface ClassifyItem {
  id: string;
  label: string;
  /** Example values shown under the label. */
  sample?: string;
  answer: string;
  why: string;
}

export interface ClassifyCard {
  kind: 'classify';
  title: string;
  prompt: string;
  visual?: Visual;
  categories: Choice[];
  items: ClassifyItem[];
  hint: string;
}

export interface NumericCard {
  kind: 'numeric';
  title: string;
  prompt: string;
  visual?: Visual;
  answer: number;
  tolerance: number;
  unit?: string;
  hint: string;
  explanation: string;
}

export interface OrderCard {
  kind: 'order';
  title: string;
  prompt: string;
  /** Listed in the correct order; shuffled at runtime. */
  steps: Choice[];
  hint: string;
  explanation: string;
}

export type SimKind = 'resolution' | 'sampleSize' | 'correlation';

export interface SliderCard {
  kind: 'slider';
  title: string;
  prompt: string;
  sim: SimKind;
  /** Optional follow-up check after exploring. */
  check?: Omit<ChoiceCard, 'kind' | 'title' | 'visual'>;
}

export type AcademyCard = ConceptCard | ChoiceCard | ClassifyCard | NumericCard | OrderCard | SliderCard;

export interface AcademyLesson {
  id: string;
  title: string;
  /** One-line goal shown on the course map. */
  goal: string;
  cards: AcademyCard[];
  checkpoint?: boolean;
}

export interface AcademyModule {
  id: string;
  number: number;
  title: string;
  summary: string;
  /** Topic list from the UMS Analyze contents this module covers. */
  umsTopics: string[];
  lessons: AcademyLesson[];
  /** Planned but not yet authored. */
  comingSoon?: boolean;
}

export interface LessonResult {
  completed: boolean;
  bestScore: number;
  maxScore: number;
  completedAt: number;
}

export interface AcademyProgress {
  lessons: Record<string, LessonResult>;
  xp: number;
}
