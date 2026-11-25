import type { Question } from '../types';
import { lessonIdForTopic } from './lessons';
import { foundationQuestions } from './questions-foundation';
import { defineMeasureQuestions } from './questions-define-measure';
import { aicQuestions } from './questions-analyze-improve-control';

/** Deterministic hash so the same question always shuffles the same way. */
function hashId(id: string): number {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Many authored items put the right answer in slot A.
 * Re-order choices with a seeded shuffle and retarget correctIndex.
 */
function balanceChoices(q: Question): Question {
  const order = [0, 1, 2, 3];
  let seed = hashId(q.id) || 1;
  for (let i = order.length - 1; i > 0; i--) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const j = seed % (i + 1);
    [order[i], order[j]] = [order[j], order[i]];
  }
  return {
    ...q,
    choices: order.map((i) => q.choices[i]),
    correctIndex: order.indexOf(q.correctIndex),
    lessonId: q.lessonId ?? lessonIdForTopic(q.topic, q.phase),
  };
}

export const ALL_QUESTIONS: Question[] = [
  ...foundationQuestions,
  ...defineMeasureQuestions,
  ...aicQuestions,
].map(balanceChoices);

export function questionsByPhase(phase: Question['phase']): Question[] {
  return ALL_QUESTIONS.filter((q) => q.phase === phase);
}

export function questionsForLesson(lessonId: string): Question[] {
  return ALL_QUESTIONS.filter((q) => q.lessonId === lessonId);
}

export function questionCount(): number {
  return ALL_QUESTIONS.length;
}
