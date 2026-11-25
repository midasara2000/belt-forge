import { getLessonForTopic } from '../data/lessons';
import type { Question } from '../types';

interface Props {
  title: string;
  correct: number;
  total: number;
  percent: number;
  passPercent: number | null;
  missed: Question[];
  onRetryMissed: () => void;
  onHome: () => void;
  onAgain: () => void;
  onStudyLesson: (lessonId: string) => void;
  onOpenLearnMisses: () => void;
}

export function Results({
  title,
  correct,
  total,
  percent,
  passPercent,
  missed,
  onRetryMissed,
  onHome,
  onAgain,
  onStudyLesson,
  onOpenLearnMisses,
}: Props) {
  const passed = passPercent != null ? percent >= passPercent : percent >= 70;

  const lessonLinks = Array.from(
    new Map(
      missed
        .map((q) => getLessonForTopic(q.topic, q.phase))
        .filter((l): l is NonNullable<typeof l> => !!l)
        .map((l) => [l.id, l]),
    ).values(),
  );

  return (
    <div className="results">
      <p className="eyebrow">{title}</p>
      <h2 className="results__score">{percent}%</h2>
      <p className="results__sub">
        {correct} of {total} correct
        {passPercent != null && (
          <>
            {' '}
            · DGQ-style pass mark {passPercent}% —{' '}
            <strong>{passed ? 'Pass territory' : 'Keep training'}</strong>
          </>
        )}
      </p>

      <div className="results__meter">
        <div
          className={`results__meter-fill ${passed ? 'is-pass' : 'is-fail'}`}
          style={{ width: `${Math.min(percent, 100)}%` }}
        />
        {passPercent != null && (
          <div className="results__passline" style={{ left: `${passPercent}%` }} />
        )}
      </div>

      {missed.length > 0 && (
        <div className="results__missed">
          <h3>Blind spots from this run</h3>
          <ul>
            {missed.slice(0, 8).map((q) => {
              const lesson = getLessonForTopic(q.topic, q.phase);
              return (
                <li key={q.id}>
                  <span className="tag">{q.phase}</span> {q.prompt.slice(0, 90)}
                  {q.prompt.length > 90 ? '…' : ''}
                  {lesson && (
                    <button
                      type="button"
                      className="linkish"
                      onClick={() => onStudyLesson(lesson.id)}
                    >
                      Study {lesson.title}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {lessonLinks.length > 0 && (
        <div className="results__lessons">
          <h3>Recap these lessons</h3>
          <div className="results__lesson-chips">
            {lessonLinks.map((l) => (
              <button key={l.id} type="button" className="chip chip--btn" onClick={() => onStudyLesson(l.id)}>
                {l.title}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="results__actions">
        {missed.length > 0 && (
          <>
            <button type="button" className="primary" onClick={onOpenLearnMisses}>
              Learn missed topics
            </button>
            <button type="button" className="secondary" onClick={onRetryMissed}>
              Drill missed questions
            </button>
          </>
        )}
        <button type="button" className="secondary" onClick={onAgain}>
          Play again
        </button>
        <button type="button" className="ghost" onClick={onHome}>
          Back to hub
        </button>
      </div>
    </div>
  );
}
