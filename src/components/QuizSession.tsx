import { useEffect, useMemo, useState } from 'react';
import { getLessonForTopic } from '../data/lessons';
import { phaseLabel } from '../data/topics';
import { formatTime } from '../lib/scoring';
import type { Question, SessionConfig } from '../types';

export interface QuizSnapshot {
  index: number;
  correctCount: number;
  missed: Question[];
  secondsLeft: number | null;
}

interface Props {
  config: SessionConfig;
  initial?: QuizSnapshot | null;
  onAnswer: (q: Question, correct: boolean) => void;
  onExit: () => void;
  onComplete: (summary: {
    correct: number;
    total: number;
    percent: number;
    missed: Question[];
  }) => void;
  onStudyLesson: (lessonId: string, snapshot: QuizSnapshot) => void;
}

export function QuizSession({
  config,
  initial,
  onAnswer,
  onExit,
  onComplete,
  onStudyLesson,
}: Props) {
  const [index, setIndex] = useState(initial?.index ?? 0);
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [correctCount, setCorrectCount] = useState(initial?.correctCount ?? 0);
  const [missed, setMissed] = useState<Question[]>(initial?.missed ?? []);
  const [secondsLeft, setSecondsLeft] = useState(
    initial?.secondsLeft ?? config.seconds ?? 0,
  );
  const [combo, setCombo] = useState(0);
  const [flash, setFlash] = useState<'good' | 'bad' | null>(null);
  const [finished, setFinished] = useState(false);
  /** After returning from a lesson on a wrong answer, show feedback again */
  const [restoredMiss, setRestoredMiss] = useState(false);

  const q = config.questions[index];
  const total = config.questions.length;
  const progressPct = ((index + (locked || restoredMiss ? 1 : 0)) / total) * 100;

  const lesson = useMemo(() => {
    if (!q) return undefined;
    return getLessonForTopic(q.topic, q.phase);
  }, [q]);

  useEffect(() => {
    if (initial && missed.some((m) => m.id === config.questions[initial.index]?.id)) {
      setLocked(true);
      setRestoredMiss(true);
      setFlash('bad');
      setSelected(-1);
    }
    // only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!config.timed || config.seconds == null || finished) return;
    if (secondsLeft <= 0) {
      const unanswered = config.questions.slice(locked ? index + 1 : index);
      const finalMissed = [...missed, ...unanswered.filter((u) => !missed.find((m) => m.id === u.id))];
      finish(correctCount, finalMissed);
      return;
    }
    const t = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, config.timed, finished]);

  function finish(finalCorrect: number, finalMissed: Question[]) {
    if (finished) return;
    setFinished(true);
    const percent = Math.round((finalCorrect / total) * 100);
    onComplete({ correct: finalCorrect, total, percent, missed: finalMissed });
  }

  function snapshot(): QuizSnapshot {
    return {
      index,
      correctCount,
      missed,
      secondsLeft: config.timed ? secondsLeft : null,
    };
  }

  function choose(i: number) {
    if (locked || finished || restoredMiss) return;
    setSelected(i);
    const ok = i === q.correctIndex;
    setLocked(true);
    setFlash(ok ? 'good' : 'bad');
    onAnswer(q, ok);
    const nextCorrect = correctCount + (ok ? 1 : 0);
    const nextMissed = ok ? missed : [...missed, q];
    setCorrectCount(nextCorrect);
    setMissed(nextMissed);
    setCombo(ok ? combo + 1 : 0);

    if (!config.showImmediateFeedback) {
      window.setTimeout(() => advance(nextCorrect, nextMissed), 280);
    }
  }

  function advance(c = correctCount, m = missed) {
    setFlash(null);
    setSelected(null);
    setLocked(false);
    setRestoredMiss(false);
    if (index + 1 >= total) {
      finish(c, m);
    } else {
      setIndex((x) => x + 1);
    }
  }

  const typeBadge = useMemo(() => {
    if (!q) return '';
    if (q.type === 'calc') return 'Calculation';
    if (q.type === 'scenario') return 'Scenario';
    return 'Knowledge';
  }, [q]);

  if (!q) return null;
  if (finished) return null;

  const showFeedback = locked && config.showImmediateFeedback;
  const wrong = showFeedback && (restoredMiss || selected !== q.correctIndex);

  return (
    <div className={`quiz ${flash ? `quiz--${flash}` : ''}`}>
      <header className="quiz__top">
        <button type="button" className="ghost" onClick={onExit}>
          Exit
        </button>
        <div className="quiz__meta">
          <span className="pill">{config.title}</span>
          <span className="pill pill--muted">
            {index + 1}/{total}
          </span>
          {config.timed && (
            <span className={`pill ${secondsLeft < 120 ? 'pill--warn' : ''}`}>
              {formatTime(secondsLeft)}
            </span>
          )}
          {combo >= 3 && <span className="pill pill--combo">Combo ×{combo}</span>}
        </div>
      </header>

      <div className="quiz__bar">
        <div className="quiz__bar-fill" style={{ width: `${progressPct}%` }} />
      </div>

      <article className="quiz__card">
        <div className="quiz__tags">
          <span className="tag">{phaseLabel(q.phase)}</span>
          <span className="tag tag--soft">{typeBadge}</span>
          <span className="tag tag--soft">{q.difficulty}</span>
        </div>
        <h2 className="quiz__prompt">{q.prompt}</h2>
        <div className="quiz__choices">
          {q.choices.map((choice, i) => {
            let cls = 'choice';
            if (showFeedback) {
              if (i === q.correctIndex) cls += ' choice--correct';
              else if (i === selected && selected >= 0) cls += ' choice--wrong';
            } else if (selected === i) cls += ' choice--picked';
            return (
              <button
                key={i}
                type="button"
                className={cls}
                onClick={() => choose(i)}
                disabled={showFeedback}
              >
                <span className="choice__letter">{String.fromCharCode(65 + i)}</span>
                <span>{choice}</span>
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className={`feedback ${wrong ? 'feedback--no' : 'feedback--ok'}`}>
            <strong>{wrong ? 'Not quite' : 'Correct'}</strong>
            <p>{q.explanation}</p>
            {q.dgqTip && <p className="feedback__tip">DGQ tip: {q.dgqTip}</p>}
            <div className="feedback__actions">
              {wrong && lesson && (
                <button
                  type="button"
                  className="secondary"
                  onClick={() => onStudyLesson(lesson.id, snapshot())}
                >
                  Study: {lesson.title}
                </button>
              )}
              <button type="button" className="primary" onClick={() => advance()}>
                {index + 1 >= total ? 'See results' : 'Next'}
              </button>
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
