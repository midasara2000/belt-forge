import type { Question } from '../types';
import { foundationQuestions } from './questions-foundation';
import { defineMeasureQuestions } from './questions-define-measure';
import { aicQuestions } from './questions-analyze-improve-control';

export const ALL_QUESTIONS: Question[] = [
  ...foundationQuestions,
  ...defineMeasureQuestions,
  ...aicQuestions,
];

export function questionsByPhase(phase: Question['phase']): Question[] {
  return ALL_QUESTIONS.filter((q) => q.phase === phase);
}

export function questionCount(): number {
  return ALL_QUESTIONS.length;
}
