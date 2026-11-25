import type { Question } from '../types';
import { lessonIdForTopic } from './lessons';
import { foundationQuestions } from './questions-foundation';
import { defineMeasureQuestions } from './questions-define-measure';
import { aicQuestions } from './questions-analyze-improve-control';
import { challengeCoreQuestions } from './questions-challenge-core';
import { challengeStatsQuestions } from './questions-challenge-stats';
import { challengeLeanQuestions } from './questions-challenge-lean';

/** Attach lesson links only — choice order is shuffled per presentation in the quiz UI. */
function withLesson(q: Question): Question {
  return {
    ...q,
    lessonId: q.lessonId ?? lessonIdForTopic(q.topic, q.phase),
  };
}

export const ALL_QUESTIONS: Question[] = [
  ...foundationQuestions,
  ...defineMeasureQuestions,
  ...aicQuestions,
  ...challengeCoreQuestions,
  ...challengeStatsQuestions,
  ...challengeLeanQuestions,
].map(withLesson);

export function questionsByPhase(phase: Question['phase']): Question[] {
  return ALL_QUESTIONS.filter((q) => q.phase === phase);
}

export function questionsForLesson(lessonId: string): Question[] {
  return ALL_QUESTIONS.filter((q) => q.lessonId === lessonId);
}

export function questionCount(): number {
  return ALL_QUESTIONS.length;
}
