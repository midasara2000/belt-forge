import { useState } from 'react';
import { LessonPlayer } from './components/LessonPlayer';
import { useAcademyProgress } from './useAcademyProgress';
import type { AcademyLesson, AcademyModule } from './types';
import './academy.css';

export interface AcademyTrack {
  course: AcademyModule[];
  storageKey: string;
  eyebrow: string;
  title: string;
  lede: string;
}

interface Props {
  onExit: () => void;
  track: AcademyTrack;
}

type View = { kind: 'map' } | { kind: 'lesson'; module: AcademyModule; lesson: AcademyLesson };

function lessonsOf(course: AcademyModule[]) {
  return course.flatMap((module) => module.lessons.map((lesson) => ({ module, lesson })));
}

export function Academy({ onExit, track }: Props) {
  const { progress, completeLesson } = useAcademyProgress(track.storageKey);
  const [view, setView] = useState<View>({ kind: 'map' });

  const lessons = lessonsOf(track.course);
  const doneCount = lessons.filter((x) => progress.lessons[x.lesson.id]?.completed).length;
  const recommended = lessons.find((x) => !progress.lessons[x.lesson.id]?.completed);

  if (view.kind === 'lesson') {
    const index = lessons.findIndex((x) => x.lesson.id === view.lesson.id);
    const next = index >= 0 && index < lessons.length - 1 ? lessons[index + 1] : undefined;
    return (
      <LessonPlayer
        key={view.lesson.id}
        module={view.module}
        lesson={view.lesson}
        onExit={() => setView({ kind: 'map' })}
        onComplete={(score, max) => completeLesson(view.lesson.id, score, max)}
        onNext={next ? () => setView({ kind: 'lesson', module: next.module, lesson: next.lesson }) : undefined}
        nextLabel={next && next.module.id !== view.module.id ? `Start Module ${next.module.number}` : undefined}
      />
    );
  }

  return (
    <div className="ac-map">
      <button type="button" className="ghost back" onClick={onExit}>
        ← Hub
      </button>
      <header className="ac-map__hero">
        <p className="eyebrow">{track.eyebrow}</p>
        <h2 className="section-title">{track.title}</h2>
        <p className="lede">{track.lede}</p>
        <div className="ac-map__stats">
          <span>
            <strong>{doneCount}</strong>/{lessons.length} lessons
          </span>
          <span>
            <strong>{progress.xp}</strong> XP
          </span>
          {recommended && (
            <button
              type="button"
              className="primary"
              onClick={() => setView({ kind: 'lesson', module: recommended.module, lesson: recommended.lesson })}
            >
              {doneCount === 0 ? 'Start' : 'Continue'}: {recommended.lesson.title}
            </button>
          )}
        </div>
      </header>

      <ol className="ac-modules">
        {track.course.map((m) => {
          const modDone = m.lessons.filter((l) => progress.lessons[l.id]?.completed).length;
          return (
            <li key={m.id} className={`ac-module ${m.comingSoon ? 'is-soon' : ''}`}>
              <div className="ac-module__head">
                <span className="ac-module__num">{m.number}</span>
                <div>
                  <h3>{m.title}</h3>
                  <p>{m.summary}</p>
                </div>
                {m.comingSoon ? (
                  <span className="ac-module__badge">Coming next</span>
                ) : (
                  <span className="ac-module__badge is-live">
                    {modDone}/{m.lessons.length}
                  </span>
                )}
              </div>
              {m.comingSoon ? (
                <p className="ac-module__topics">UMS topics: {m.umsTopics.join(' · ')}</p>
              ) : (
                <div className="ac-lessons">
                  {m.lessons.map((l) => {
                    const r = progress.lessons[l.id];
                    const isRec = recommended?.lesson.id === l.id;
                    const pct = r ? Math.round((r.bestScore / Math.max(1, r.maxScore)) * 100) : null;
                    return (
                      <button
                        key={l.id}
                        type="button"
                        className={`ac-lesson ${r?.completed ? 'is-done' : ''} ${isRec ? 'is-rec' : ''} ${l.checkpoint ? 'is-checkpoint' : ''}`}
                        onClick={() => setView({ kind: 'lesson', module: m, lesson: l })}
                      >
                        <span className="ac-lesson__dot">{r?.completed ? '✓' : l.checkpoint ? '★' : ''}</span>
                        <span className="ac-lesson__text">
                          <strong>{l.title}</strong>
                          <span>{l.goal}</span>
                        </span>
                        <span className="ac-lesson__meta">
                          {pct != null ? `${pct}%` : `${l.cards.length} cards`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
