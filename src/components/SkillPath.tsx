import { questionsForLesson } from '../data/questions';
import { SKILL_UNITS, getSkillNode, type SkillNode } from '../data/skillPath';
import {
  getNodeProgress,
  pathSummary,
  type NodeProgress,
} from '../lib/skillPathProgress';
import type { ProgressState } from '../types';

interface Props {
  progress: ProgressState;
  onBack: () => void;
  onOpenNode: (node: SkillNode) => void;
  selectedId?: string | null;
  onCloseDetail?: () => void;
  onStudy: (lessonId: string) => void;
  onCheckpoint: (lessonId: string) => void;
}

function Crowns({ n }: { n: number }) {
  return (
    <span className="path-crowns" aria-label={`${n} of 3 crowns`}>
      {[0, 1, 2].map((i) => (
        <span key={i} className={`path-crown ${i < n ? 'is-on' : ''}`}>
          ◆
        </span>
      ))}
    </span>
  );
}

function NodeDetail({
  np,
  onClose,
  onStudy,
  onCheckpoint,
}: {
  np: NodeProgress;
  onClose: () => void;
  onStudy: () => void;
  onCheckpoint: () => void;
}) {
  const qCount = questionsForLesson(np.node.lessonId).length;
  return (
    <aside className="path-detail" role="dialog" aria-label={np.node.title}>
      <button type="button" className="ghost path-detail__close" onClick={onClose}>
        Close
      </button>
      <p className="eyebrow">{np.node.phase}</p>
      <h3>{np.node.title}</h3>
      <p className="path-detail__blurb">{np.node.blurb}</p>
      <div className="path-detail__meta">
        <Crowns n={np.crowns} />
        <span>
          {np.accuracy == null
            ? 'No practice yet'
            : `${np.accuracy}% · ${np.correct}/${np.attempts} answered`}
        </span>
        <span>{qCount} questions linked</span>
      </div>
      {!np.unlocked ? (
        <p className="path-detail__lock">
          Locked — earn at least 1 crown on the previous skill (study the lesson or get 3 correct)
          to open this node.
        </p>
      ) : (
        <div className="path-detail__actions">
          <button type="button" className="primary" onClick={onStudy}>
            {np.studied ? 'Re-read lesson' : 'Read & learn'}
          </button>
          <button
            type="button"
            className="secondary"
            onClick={onCheckpoint}
            disabled={qCount === 0}
          >
            Checkpoint drill ({Math.min(8, qCount)} Qs)
          </button>
        </div>
      )}
      <ol className="path-detail__howto">
        <li>Read the teaching card (visuals + takeaways).</li>
        <li>Run the checkpoint drill — misses jump back to the lesson.</li>
        <li>Crowns: study / practice → 70% → 85% mastery.</li>
      </ol>
    </aside>
  );
}

export function SkillPath({
  progress,
  onBack,
  onOpenNode,
  selectedId,
  onCloseDetail,
  onStudy,
  onCheckpoint,
}: Props) {
  const summary = pathSummary(progress);
  const selectedNode = selectedId ? getSkillNode(selectedId) : undefined;
  const selected = selectedNode ? getNodeProgress(progress, selectedNode) : null;

  let zig = 0;

  return (
    <div className="path">
      <button type="button" className="ghost back" onClick={onBack}>
        ← Hub
      </button>

      <header className="path__hero">
        <p className="eyebrow">Duolingo-style learning track</p>
        <h2 className="section-title">Skill Path</h2>
        <p className="lede">
          Walk the DMAIC tree top to bottom. Read each skill, then checkpoint-test it. Crowns unlock
          the next node — same depth as Learn & Recap, with a clear route.
        </p>
        <div className="path__stats">
          <span>
            <strong>{summary.crowned}</strong> / {summary.total} crowned
          </span>
          <span>
            <strong>{summary.mastered}</strong> mastered
          </span>
          {summary.next && (
            <span className="path__next">
              Up next: <strong>{summary.next.node.title}</strong>
            </span>
          )}
        </div>
      </header>

      <div className={`path__layout ${selected ? 'has-detail' : ''}`}>
        <div className="path__tree">
          {SKILL_UNITS.map((unit) => (
            <section key={unit.id} className="path-unit">
              <div className="path-unit__head" style={{ ['--unit' as string]: unit.color }}>
                <h3>{unit.title}</h3>
                <p>{unit.subtitle}</p>
              </div>
              <ol className="path-unit__nodes">
                {unit.nodes.map((node) => {
                  const np = getNodeProgress(progress, node);
                  zig = (zig + 1) % 2;
                  return (
                    <li
                      key={node.id}
                      className={`path-node path-node--${np.status} path-node--${zig ? 'left' : 'right'}`}
                    >
                      <button
                        type="button"
                        className="path-node__btn"
                        style={{ ['--unit' as string]: unit.color }}
                        onClick={() => onOpenNode(node)}
                        aria-pressed={selectedId === node.id}
                      >
                        <span className="path-node__ring">
                          <span className="path-node__badge">{node.badge}</span>
                        </span>
                        <span className="path-node__label">{node.title}</span>
                        <Crowns n={np.crowns} />
                        {!np.unlocked && <span className="path-node__lock">Locked</span>}
                        {np.status === 'mastered' && (
                          <span className="path-node__done">Mastered</span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>

        {selected && onCloseDetail && (
          <NodeDetail
            np={selected}
            onClose={onCloseDetail}
            onStudy={() => onStudy(selected.node.lessonId)}
            onCheckpoint={() => onCheckpoint(selected.node.lessonId)}
          />
        )}
      </div>
    </div>
  );
}
