import { useEffect, useMemo, useState } from 'react';
import { getLessonForTopic } from '../data/lessons';
import { phaseLabel } from '../data/topics';
import { formatTime, shuffle } from '../lib/scoring';
import type { Question, SessionConfig } from '../types';

/** Per-presentation choice order — not stored on the canonical question. */
export interface ChoicePresentation {
  choices: string[];
  /** Index of the correct choice in `choices` for this shuffle */
  correctIndex: number;
}

export interface QuizSnapshot {
  index: number;
  correctCount: number;
  missed: Question[];
  secondsLeft: number | null;
  /** Keep the same shuffle when returning from a lesson mid-question */
  presentation: ChoicePresentation | null;
  showingFeedback: boolean;
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

function freshPresentation(q: Question): ChoicePresentation {
  const order = shuffle([0, 1, 2, 3]);
  return {
    choices: order.map((i) => q.choices[i]),
    correctIndex: order.indexOf(q.correctIndex),
  };
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
  const [restoredMiss, setRestoredMiss] = useState(false);
  const [presentation, setPresentation] = useState<ChoicePresentation | null>(
    initial?.presentation ?? null,
  );

  const q = config.questions[index];
  const total = config.questions.length;
  const progressPct = ((index + (locked || restoredMiss ? 1 : 0)) / total) * 100;

  // Lesson links use stable topic / lessonId — never the A/B/C/D letter
  const lesson = useMemo(
    () => (q ? getLessonForTopic(q.topic, q.phase) : undefined),
    [q],
  );

  // New question → new random shuffle (keep saved shuffle when resuming after Study)
  useEffect(() => {
    if (!q) return;
    if (initial?.presentation && initial.index === index) {
      setPresentation(initial.presentation);
      return;
    }
    setPresentation(freshPresentation(q));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q?.id, index]);

  useEffect(() => {
    if (initial?.showingFeedback) {
      setLocked(true);
      setRestoredMiss(true);
      setFlash('bad');
      setSelected(-1);
    }
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
      presentation,
      showingFeedback: locked && config.showImmediateFeedback,
    };
  }

  function choose(i: number) {
    if (!presentation || locked || finished || restoredMiss) return;
    setSelected(i);
    const ok = i === presentation.correctIndex;
    setLocked(true);
    setFlash(ok ? 'good' : 'bad');
    // Progress / lesson stats always key off the canonical question (topic, lessonId)
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

  if (!q || !presentation) return null;
  if (finished) return null;

  const showFeedback = locked && config.showImmediateFeedback;
  const wrong =
    showFeedback && (restoredMiss || (selected !== null && selected !== presentation.correctIndex));

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
          {presentation.choices.map((choice, i) => {
            let cls = 'choice';
            if (showFeedback) {
              if (i === presentation.correctIndex) cls += ' choice--correct';
              else if (i === selected && selected >= 0) cls += ' choice--wrong';
            } else if (selected === i) cls += ' choice--picked';
            return (
              <button
                key={`${q.id}-${i}-${choice.slice(0, 12)}`}
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
