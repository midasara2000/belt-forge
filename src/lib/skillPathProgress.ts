import { questionsForLesson } from '../data/questions';
import {
  SKILL_NODES,
  previousSkillNode,
  type SkillNode,
} from '../data/skillPath';
import type { ProgressState } from '../types';

export type PathStatus = 'locked' | 'available' | 'active' | 'mastered';

export interface NodeProgress {
  node: SkillNode;
  studied: boolean;
  attempts: number;
  correct: number;
  accuracy: number | null;
  /** 0–3 Duolingo-style crowns */
  crowns: number;
  status: PathStatus;
  unlocked: boolean;
}

function lessonHistory(progress: ProgressState, lessonId: string) {
  const ids = new Set(questionsForLesson(lessonId).map((q) => q.id));
  return progress.history.filter((h) => ids.has(h.questionId));
}

export function crownsForLesson(progress: ProgressState, lessonId: string): number {
  const studied = (progress.pathStudied ?? []).includes(lessonId);
  const hist = lessonHistory(progress, lessonId);
  const attempts = hist.length;
  const correct = hist.filter((h) => h.correct).length;
  const accuracy = attempts ? correct / attempts : 0;

  let crowns = 0;
  if (studied || correct >= 3) crowns = 1;
  if (attempts >= 5 && accuracy >= 0.7) crowns = Math.max(crowns, 2);
  if (attempts >= 8 && accuracy >= 0.85) crowns = 3;
  return crowns;
}

export function isNodeUnlocked(progress: ProgressState, node: SkillNode): boolean {
  const prev = previousSkillNode(node.id);
  if (!prev) return true;
  return crownsForLesson(progress, prev.lessonId) >= 1;
}

export function getNodeProgress(progress: ProgressState, node: SkillNode): NodeProgress {
  const studied = (progress.pathStudied ?? []).includes(node.lessonId);
  const hist = lessonHistory(progress, node.lessonId);
  const attempts = hist.length;
  const correct = hist.filter((h) => h.correct).length;
  const accuracy = attempts ? Math.round((correct / attempts) * 100) : null;
  const crowns = crownsForLesson(progress, node.lessonId);
  const unlocked = isNodeUnlocked(progress, node);

  let status: PathStatus = 'locked';
  if (unlocked) {
    if (crowns >= 3) status = 'mastered';
    else if (crowns >= 1 || studied || attempts > 0) status = 'active';
    else status = 'available';
  }

  return { node, studied, attempts, correct, accuracy, crowns, status, unlocked };
}

export function getPathProgress(progress: ProgressState): NodeProgress[] {
  return SKILL_NODES.map((n) => getNodeProgress(progress, n));
}

export function pathSummary(progress: ProgressState) {
  const nodes = getPathProgress(progress);
  const unlocked = nodes.filter((n) => n.unlocked).length;
  const crowned = nodes.filter((n) => n.crowns >= 1).length;
  const mastered = nodes.filter((n) => n.crowns >= 3).length;
  const next = nodes.find((n) => n.unlocked && n.crowns < 3) ?? nodes.find((n) => n.unlocked);
  return { total: nodes.length, unlocked, crowned, mastered, next, nodes };
}
