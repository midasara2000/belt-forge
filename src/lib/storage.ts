import type { Phase, ProgressState } from '../types';
import { PHASE_ORDER } from '../data/topics';

const KEY = 'lss-bb-coach-v1';

function emptyPhaseStats(): Record<Phase, { correct: number; total: number }> {
  const base = {
    foundation: { correct: 0, total: 0 },
    define: { correct: 0, total: 0 },
    measure: { correct: 0, total: 0 },
    analyze: { correct: 0, total: 0 },
    improve: { correct: 0, total: 0 },
    control: { correct: 0, total: 0 },
  };
  return base;
}

export function defaultProgress(): ProgressState {
  const today = new Date().toISOString().slice(0, 10);
  return {
    xp: 0,
    streak: 0,
    lastPlayDate: null,
    baselineDone: false,
    baselineScores: {
      foundation: 0,
      define: 0,
      measure: 0,
      analyze: 0,
      improve: 0,
      control: 0,
    },
    topicStats: {},
    phaseStats: emptyPhaseStats(),
    answeredIds: [],
    history: [],
    mockBest: null,
    mockAttempts: 0,
    achievements: [],
    dailyGoal: 15,
    dailyCorrect: 0,
    dailyDate: today,
    pathStudied: [],
  };
}

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultProgress();
    const parsed = JSON.parse(raw) as ProgressState;
    const today = new Date().toISOString().slice(0, 10);
    if (parsed.dailyDate !== today) {
      parsed.dailyCorrect = 0;
      parsed.dailyDate = today;
    }
    if (!parsed.phaseStats) parsed.phaseStats = emptyPhaseStats();
    for (const p of PHASE_ORDER) {
      if (!parsed.phaseStats[p]) parsed.phaseStats[p] = { correct: 0, total: 0 };
    }
    if (!Array.isArray(parsed.pathStudied)) parsed.pathStudied = [];
    return parsed;
  } catch {
    return defaultProgress();
  }
}

export function saveProgress(state: ProgressState): void {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function resetProgress(): ProgressState {
  const fresh = defaultProgress();
  saveProgress(fresh);
  return fresh;
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function yesterdayISO(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}
