import { useEffect, useMemo, useState } from 'react';
import { formatTime } from '../lib/scoring';
import type { Question, SessionConfig } from '../types';
import { phaseLabel } from '../data/topics';

interface Props {
  config: SessionConfig;
  onAnswer: (q: Question, correct: boolean) => void;
  onExit: () => void;
  onComplete: (summary: {
    correct: number;
    total: number;
    percent: number;
    missed: Question[];
  }) => void;
}

export function QuizSession({ config, onAnswer, onExit, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [missed, setMissed] = useState<Question[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(config.seconds ?? 0);
  const [combo, setCombo] = useState(0);
  const [flash, setFlash] = useState<'good' | 'bad' | null>(null);
  const [finished, setFinished] = useState(false);

  const q = config.questions[index];
  const total = config.questions.length;
  const progressPct = ((index + (locked ? 1 : 0)) / total) * 100;

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

  function choose(i: number) {
    if (locked || finished) return;
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

  if (finished) {
    return null;
  }

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
            if (locked && config.showImmediateFeedback) {
              if (i === q.correctIndex) cls += ' choice--correct';
              else if (i === selected) cls += ' choice--wrong';
            } else if (selected === i) cls += ' choice--picked';
            return (
              <button
                key={i}
                type="button"
                className={cls}
                onClick={() => choose(i)}
                disabled={locked && config.showImmediateFeedback}
              >
                <span className="choice__letter">{String.fromCharCode(65 + i)}</span>
                <span>{choice}</span>
              </button>
            );
          })}
        </div>

        {locked && config.showImmediateFeedback && (
          <div className={`feedback ${selected === q.correctIndex ? 'feedback--ok' : 'feedback--no'}`}>
            <strong>{selected === q.correctIndex ? 'Correct' : 'Not quite'}</strong>
            <p>{q.explanation}</p>
            {q.dgqTip && <p className="feedback__tip">DGQ tip: {q.dgqTip}</p>}
            <button type="button" className="primary" onClick={() => advance()}>
              {index + 1 >= total ? 'See results' : 'Next'}
            </button>
          </div>
        )}
      </article>
    </div>
  );
}
