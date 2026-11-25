import type { Question } from '../types';
import { lessonIdForTopic } from './lessons';
import { foundationQuestions } from './questions-foundation';
import { defineMeasureQuestions } from './questions-define-measure';
import { aicQuestions } from './questions-analyze-improve-control';

function withLessons(questions: Question[]): Question[] {
  return questions.map((q) => ({
    ...q,
    lessonId: q.lessonId ?? lessonIdForTopic(q.topic, q.phase),
  }));
}

export const ALL_QUESTIONS: Question[] = withLessons([
  ...foundationQuestions,
  ...defineMeasureQuestions,
  ...aicQuestions,
]);

export function questionsByPhase(phase: Question['phase']): Question[] {
  return ALL_QUESTIONS.filter((q) => q.phase === phase);
}

export function questionsForLesson(lessonId: string): Question[] {
  return ALL_QUESTIONS.filter((q) => q.lessonId === lessonId);
}

export function questionCount(): number {
  return ALL_QUESTIONS.length;
}
