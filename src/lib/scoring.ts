import type { AnswerRecord, Phase, ProgressState, Question } from '../types';
import { yesterdayISO, todayISO } from './storage';

export function xpForAnswer(correct: boolean, difficulty: Question['difficulty'], streak: number): number {
  if (!correct) return 2;
  const base = difficulty === 'master' ? 25 : difficulty === 'belt' ? 18 : 12;
  const streakBonus = Math.min(streak, 10) * 2;
  return base + streakBonus;
}

export function beltRank(xp: number): { name: string; nextAt: number; progress: number } {
  const ranks = [
    { name: 'White Belt Trainee', at: 0, next: 150 },
    { name: 'Yellow Contender', at: 150, next: 400 },
    { name: 'Green Contender', at: 400, next: 900 },
    { name: 'Black Belt Candidate', at: 900, next: 1600 },
    { name: 'DGQ Ready', at: 1600, next: 2500 },
    { name: 'Belt Master', at: 2500, next: 99999 },
  ];
  let current = ranks[0];
  for (const r of ranks) {
    if (xp >= r.at) current = r;
  }
  const span = current.next - current.at;
  const progress = Math.min(1, (xp - current.at) / span);
  return { name: current.name, nextAt: current.next, progress };
}

export function phaseAccuracy(state: ProgressState, phase: Phase): number {
  const s = state.phaseStats[phase];
  if (!s || s.total === 0) return 0;
  return Math.round((s.correct / s.total) * 100);
}

export function topicAccuracy(state: ProgressState, topic: string): number | null {
  const s = state.topicStats[topic];
  if (!s || s.total < 2) return null;
  return Math.round((s.correct / s.total) * 100);
}

export function weakTopics(state: ProgressState, limit = 6): { topic: string; accuracy: number; total: number }[] {
  return Object.entries(state.topicStats)
    .filter(([, v]) => v.total >= 2)
    .map(([topic, v]) => ({
      topic,
      accuracy: Math.round((v.correct / v.total) * 100),
      total: v.total,
    }))
    .sort((a, b) => a.accuracy - b.accuracy || b.total - a.total)
    .slice(0, limit);
}

export function applyAnswer(
  state: ProgressState,
  question: Question,
  correct: boolean,
  mode: string,
): ProgressState {
  const today = todayISO();
  let streak = state.streak;
  let lastPlayDate = state.lastPlayDate;

  if (lastPlayDate !== today) {
    if (lastPlayDate === yesterdayISO()) streak = streak + 1;
    else streak = 1;
    lastPlayDate = today;
  }

  const xp = state.xp + xpForAnswer(correct, question.difficulty, streak);
  const topicStats = { ...state.topicStats };
  const prev = topicStats[question.topic] ?? { correct: 0, total: 0 };
  topicStats[question.topic] = {
    correct: prev.correct + (correct ? 1 : 0),
    total: prev.total + 1,
  };

  const phaseStats = { ...state.phaseStats };
  const ps = phaseStats[question.phase] ?? { correct: 0, total: 0 };
  phaseStats[question.phase] = {
    correct: ps.correct + (correct ? 1 : 0),
    total: ps.total + 1,
  };

  const record: AnswerRecord = {
    questionId: question.id,
    correct,
    phase: question.phase,
    topic: question.topic,
    answeredAt: Date.now(),
    mode,
  };

  const dailyCorrect =
    state.dailyDate === today
      ? state.dailyCorrect + (correct ? 1 : 0)
      : correct
        ? 1
        : 0;

  return {
    ...state,
    xp,
    streak,
    lastPlayDate,
    topicStats,
    phaseStats,
    answeredIds: state.answeredIds.includes(question.id)
      ? state.answeredIds
      : [...state.answeredIds, question.id],
    history: [...state.history.slice(-400), record],
    dailyCorrect,
    dailyDate: today,
  };
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickQuestions(
  pool: Question[],
  count: number,
  opts?: { phases?: Phase[]; topics?: string[]; types?: Question['type'][]; preferWeak?: ProgressState },
): Question[] {
  let filtered = pool;
  if (opts?.phases?.length) filtered = filtered.filter((q) => opts.phases!.includes(q.phase));
  if (opts?.topics?.length) filtered = filtered.filter((q) => opts.topics!.includes(q.topic));
  if (opts?.types?.length) filtered = filtered.filter((q) => opts.types!.includes(q.type));

  if (opts?.preferWeak) {
    const weak = weakTopics(opts.preferWeak, 12).map((w) => w.topic);
    const weakQs = filtered.filter((q) => weak.includes(q.topic));
    const other = filtered.filter((q) => !weak.includes(q.topic));
    const mixed = [...shuffle(weakQs), ...shuffle(other)];
    const unique = new Map<string, Question>();
    for (const q of mixed) unique.set(q.id, q);
    return [...unique.values()].slice(0, count);
  }

  return shuffle(filtered).slice(0, count);
}

export function balancedBaseline(pool: Question[], perPhase = 5): Question[] {
  const phases: Phase[] = ['define', 'measure', 'analyze', 'improve', 'control'];
  const picked: Question[] = [];
  for (const phase of phases) {
    picked.push(...pickQuestions(pool, perPhase, { phases: [phase] }));
  }
  return shuffle(picked);
}

export function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
