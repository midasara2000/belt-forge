import { useCallback, useEffect, useState } from 'react';
import type { AcademyProgress } from './types';

const KEY = 'belt-forge-academy-v1';

function load(): AcademyProgress {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AcademyProgress;
      return { lessons: parsed.lessons ?? {}, xp: parsed.xp ?? 0 };
    }
  } catch {
    /* fall through to fresh state */
  }
  return { lessons: {}, xp: 0 };
}

export function useAcademyProgress() {
  const [progress, setProgress] = useState<AcademyProgress>(load);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(progress));
  }, [progress]);

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
