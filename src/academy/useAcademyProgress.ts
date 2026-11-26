import { useCallback, useEffect, useState } from 'react';
import type { AcademyProgress } from './types';

/** Analyze Academy. Do not rename: existing progress is stored under this key. */
export const ANALYZE_STORAGE_KEY = 'belt-forge-academy-v1';

/** Measure / MSA Academy. Separate from Analyze so finishing one course does not mark the other done. */
export const MEASURE_STORAGE_KEY = 'belt-forge-measure-academy-v1';

function load(storageKey: string): AcademyProgress {
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      const parsed = JSON.parse(raw) as AcademyProgress;
      return { lessons: parsed.lessons ?? {}, xp: parsed.xp ?? 0 };
    }
  } catch {
    /* fall through to fresh state */
  }
  return { lessons: {}, xp: 0 };
}

export function useAcademyProgress(storageKey = ANALYZE_STORAGE_KEY) {
  const [progress, setProgress] = useState<AcademyProgress>(() => load(storageKey));

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  }, [progress, storageKey]);

  const completeLesson = useCallback((lessonId: string, score: number, maxScore: number) => {
    setProgress((prev) => {
      const before = prev.lessons[lessonId];
      const best = Math.max(before?.bestScore ?? 0, score);
      const gained = Math.max(0, best - (before?.bestScore ?? 0)) * 5 + (before ? 0 : 10);
      return {
        xp: prev.xp + gained,
        lessons: {
          ...prev.lessons,
          [lessonId]: { completed: true, bestScore: best, maxScore, completedAt: Date.now() },
        },
      };
    });
  }, []);

  const resetAcademy = useCallback(() => setProgress({ lessons: {}, xp: 0 }), []);

  return { progress, completeLesson, resetAcademy };
}
