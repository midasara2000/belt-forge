import { useState } from 'react';
import type { AcademyLesson, AcademyModule } from '../types';
import {
  ChoiceCardView,
  ClassifyCardView,
  ConceptCardView,
  NumericCardView,
  OrderCardView,
  SliderCardView,
} from './Cards';

interface Props {
  module: AcademyModule;
  lesson: AcademyLesson;
  onExit: () => void;
  onComplete: (score: number, maxScore: number) => void;
  onNext?: () => void;
  nextLabel?: string;
}

function isGraded(lesson: AcademyLesson, i: number): boolean {
  const c = lesson.cards[i];
  return c.kind !== 'concept' && !(c.kind === 'slider' && !c.check);
}

export function LessonPlayer({ module, lesson, onExit, onComplete, onNext, nextLabel }: Props) {
  const [index, setIndex] = useState(0);
  const [points, setPoints] = useState<Record<number, number>>({});
  const [doneCards, setDoneCards] = useState<Record<number, boolean>>({});
  const [finished, setFinished] = useState(false);

  const total = lesson.cards.length;
  const card = lesson.cards[index];
  const graded = isGraded(lesson, index);
  const canContinue = !graded || doneCards[index];
  const maxScore = lesson.cards.reduce((acc, _c, i) => acc + (isGraded(lesson, i) ? 2 : 0), 0);
  const score = Object.values(points).reduce((a, b) => a + b, 0);

  function handleDone(p: number | null) {
    setDoneCards((d) => ({ ...d, [index]: true }));
    if (p != null) setPoints((s) => ({ ...s, [index]: p }));
  }

  function advance() {
    if (index < total - 1) {
      setIndex(index + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setFinished(true);
      onComplete(score, maxScore);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  if (finished) {
    const pct = maxScore ? Math.round((score / maxScore) * 100) : 100;
    const firstTry = Object.values(points).filter((p) => p === 2).length;
    const gradedCount = lesson.cards.filter((_, i) => isGraded(lesson, i)).length;
    return (
      <div className="ac-player ac-player--done">
        <p className="eyebrow">Module {module.number} · {module.title}</p>
        <h2 className="ac-done__title">Lesson complete</h2>
        <p className="ac-done__lesson">{lesson.title}</p>
        <div className="ac-done__ring" style={{ ['--pct' as string]: `${pct}%` }}>
          <span>{pct}%</span>
        </div>
        <p className="ac-done__stats">
          {firstTry}/{gradedCount} right first time · {score}/{maxScore} points
        </p>
        <div className="ac-done__actions">
          {onNext && (
            <button type="button" className="primary" onClick={onNext}>
              {nextLabel ?? 'Next lesson'} →
            </button>
          )}
          <button type="button" className="secondary" onClick={onExit}>
            Course map
          </button>
        </div>
      </div>
    );
  }

  const renderCard = () => {
    const key = `${lesson.id}-${index}`;
    switch (card.kind) {
      case 'concept':
        return <ConceptCardView key={key} card={card} />;
      case 'choice':
        return <ChoiceCardView key={key} card={card} onDone={handleDone} />;
      case 'classify':
        return <ClassifyCardView key={key} card={card} onDone={handleDone} />;
      case 'numeric':
        return <NumericCardView key={key} card={card} onDone={handleDone} />;
      case 'order':
        return <OrderCardView key={key} card={card} onDone={handleDone} seed={index + lesson.id.length * 7} />;
      case 'slider':
        return <SliderCardView key={key} card={card} onDone={handleDone} />;
    }
  };

  return (
    <div className="ac-player">
      <div className="ac-player__top">
        <button type="button" className="ghost ac-player__exit" onClick={onExit} aria-label="Exit lesson">
          ✕
        </button>
        <div className="ac-progress" aria-label={`Card ${index + 1} of ${total}`}>
          <div className="ac-progress__fill" style={{ width: `${((index + (canContinue ? 1 : 0)) / total) * 100}%` }} />
        </div>
        <span className="ac-player__count">
          {index + 1}/{total}
        </span>
      </div>
      <p className="eyebrow ac-player__crumb">
        M{module.number} · {lesson.title}
        {lesson.checkpoint ? ' · Checkpoint' : ''}
      </p>
      {renderCard()}
      <div className="ac-player__footer">
        <button type="button" className="primary ac-continue" disabled={!canContinue} onClick={advance}>
          {index < total - 1 ? 'Continue' : 'Finish lesson'}
        </button>
      </div>
    </div>
  );
}
