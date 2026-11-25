import { useCallback, useEffect, useMemo, useState } from 'react';
import { ACHIEVEMENTS } from '../data/achievements';
import { ALL_QUESTIONS } from '../data/questions';
import { applyAnswer, beltRank, phaseAccuracy, weakTopics } from '../lib/scoring';
import { loadProgress, resetProgress, saveProgress } from '../lib/storage';
import type { Phase, ProgressState, Question } from '../types';
import { PHASE_ORDER } from '../data/topics';

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress());

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const recordAnswer = useCallback((question: Question, correct: boolean, mode: string) => {
    setProgress((prev) => applyAnswer(prev, question, correct, mode));
  }, []);

  const completeBaseline = useCallback((scores: Record<Phase, number>) => {
    setProgress((prev) => ({
      ...prev,
      baselineDone: true,
      baselineScores: { ...prev.baselineScores, ...scores },
    }));
  }, []);

  const recordMock = useCallback((percent: number) => {
    setProgress((prev) => ({
      ...prev,
      mockAttempts: prev.mockAttempts + 1,
      mockBest: prev.mockBest == null ? percent : Math.max(prev.mockBest, percent),
    }));
  }, []);

  const reset = useCallback(() => {
    setProgress(resetProgress());
  }, []);

  const rank = useMemo(() => beltRank(progress.xp), [progress.xp]);

  const weak = useMemo(() => weakTopics(progress, 8), [progress]);

  const phaseMastered = useMemo(() => {
    return PHASE_ORDER.filter((p) => {
      const s = progress.phaseStats[p];
      return s.total >= 8 && s.correct / s.total >= 0.75;
    }).length;
  }, [progress]);

  const calcCorrect = useMemo(
    () =>
      progress.history.filter((h) => {
        if (!h.correct) return false;
        const q = ALL_QUESTIONS.find((x) => x.id === h.questionId);
        return q?.type === 'calc';
      }).length,
    [progress.history],
  );

  const scenarioCorrect = useMemo(
    () =>
      progress.history.filter((h) => {
        if (!h.correct) return false;
        const q = ALL_QUESTIONS.find((x) => x.id === h.questionId);
        return q?.type === 'scenario';
      }).length,
    [progress.history],
  );

  const unlockedAchievements = useMemo(() => {
    const ctx = {
      xp: progress.xp,
      streak: progress.streak,
      baselineDone: progress.baselineDone,
      mockBest: progress.mockBest,
      mockAttempts: progress.mockAttempts,
      answeredCount: progress.history.length,
      dailyCorrect: progress.dailyCorrect,
      phaseMastered,
      calcCorrect,
      scenarioCorrect,
    };
    const newly = ACHIEVEMENTS.filter((a) => a.check(ctx)).map((a) => a.id);
    return newly;
  }, [progress, phaseMastered, calcCorrect, scenarioCorrect]);

  useEffect(() => {
    const missing = unlockedAchievements.filter((id) => !progress.achievements.includes(id));
    if (missing.length) {
      setProgress((prev) => ({
        ...prev,
        achievements: [...new Set([...prev.achievements, ...missing])],
      }));
    }
  }, [unlockedAchievements, progress.achievements]);

  const livePhaseScores = useMemo(() => {
    const scores = {} as Record<Phase, number>;
    for (const p of ['foundation', ...PHASE_ORDER] as Phase[]) {
      scores[p] = phaseAccuracy(progress, p);
    }
    return scores;
  }, [progress]);

  return {
    progress,
    rank,
    weak,
    livePhaseScores,
    recordAnswer,
    completeBaseline,
    recordMock,
    reset,
    unlockedAchievements,
  };
}
