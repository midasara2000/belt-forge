import { LESSONS } from '../data/lessons';
import { PHASES } from '../data/topics';
import type { Phase } from '../types';
import { LessonVisual } from './LessonVisuals';

interface Props {
  onOpenLesson: (lessonId: string) => void;
  onBack: () => void;
  highlightIds?: string[];
}

export function LearnLibrary({ onOpenLesson, onBack, highlightIds = [] }: Props) {
  const phases: Phase[] = ['foundation', 'define', 'measure', 'analyze', 'improve', 'control'];

  return (
    <div className="learn">
      <button type="button" className="ghost back" onClick={onBack}>
        ← Hub
      </button>
      <h2 className="section-title">Learn & recap</h2>
      <p className="lede">
        Short teaching cards with visuals. Miss a drill question? Jump here, then practice the same
        topic again.
      </p>

      {highlightIds.length > 0 && (
        <div className="learn__spotlight">
          <h3>Suggested from your misses</h3>
          <div className="learn__grid">
            {LESSONS.filter((l) => highlightIds.includes(l.id)).map((l) => (
              <button
                key={l.id}
                type="button"
                className="learn-card learn-card--hot"
                onClick={() => onOpenLesson(l.id)}
              >
                <div className="learn-card__viz">
                  <LessonVisual kind={l.visual} />
                </div>
                <strong>{l.title}</strong>
                <span>{l.summary}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {phases.map((phase) => {
        const items = LESSONS.filter((l) => l.phase === phase);
        if (!items.length) return null;
        const meta = PHASES.find((p) => p.id === phase);
        return (
          <section key={phase} className="learn__phase">
            <h3 style={{ color: meta?.color }}>{meta?.label ?? phase}</h3>
            <div className="learn__grid">
              {items.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  className={`learn-card ${highlightIds.includes(l.id) ? 'learn-card--hot' : ''}`}
                  onClick={() => onOpenLesson(l.id)}
                >
                  <div className="learn-card__viz">
                    <LessonVisual kind={l.visual} />
                  </div>
                  <strong>{l.title}</strong>
                  <span>{l.summary}</span>
                </button>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
