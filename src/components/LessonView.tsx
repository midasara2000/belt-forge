import { ALL_QUESTIONS } from '../data/questions';
import { getLessonById } from '../data/lessons';
import { phaseLabel } from '../data/topics';
import { LessonVisual } from './LessonVisuals';

interface Props {
  lessonId: string;
  onBack: () => void;
  onPractice?: (lessonId: string) => void;
  resumeLabel?: string;
  onResume?: () => void;
}

export function LessonView({ lessonId, onBack, onPractice, resumeLabel, onResume }: Props) {
  const lesson = getLessonById(lessonId);
  if (!lesson) {
    return (
      <div className="lesson">
        <button type="button" className="ghost back" onClick={onBack}>
          ← Back
        </button>
        <p>Lesson not found.</p>
      </div>
    );
  }

  const relatedCount = ALL_QUESTIONS.filter((q) => q.lessonId === lesson.id).length;

  return (
    <div className="lesson">
      <div className="lesson__nav">
        <button type="button" className="ghost" onClick={onBack}>
          ← Back
        </button>
        {onResume && (
          <button type="button" className="secondary" onClick={onResume}>
            {resumeLabel ?? 'Back to drill'}
          </button>
        )}
      </div>

      <p className="eyebrow">
        {phaseLabel(lesson.phase)} · Teach & recap
      </p>
      <h2 className="lesson__title">{lesson.title}</h2>
      <p className="lesson__summary">{lesson.summary}</p>

      <figure className="lesson__visual">
        <LessonVisual kind={lesson.visual} />
        <figcaption>{lesson.visualCaption}</figcaption>
      </figure>

      {lesson.sections.map((s) => (
        <section key={s.heading} className="lesson__section">
          <h3>{s.heading}</h3>
          <p>{s.body}</p>
        </section>
      ))}

      <section className="lesson__takeaways">
        <h3>Key takeaways</h3>
        <ul>
          {lesson.takeaways.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      {lesson.dgqAngle && (
        <p className="lesson__dgq">
          <strong>DGQ angle:</strong> {lesson.dgqAngle}
        </p>
      )}

      <div className="lesson__actions">
        {onPractice && (
          <button type="button" className="primary" onClick={() => onPractice(lesson.id)}>
            Practice this topic ({relatedCount} Qs)
          </button>
        )}
        {onResume && (
          <button type="button" className="secondary" onClick={onResume}>
            {resumeLabel ?? 'Resume drill'}
          </button>
        )}
      </div>
    </div>
  );
}
