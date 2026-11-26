import { useMemo, useState } from 'react';
import { KnowledgeRadar } from './components/KnowledgeRadar';
import { LearnLibrary } from './components/LearnLibrary';
import { LessonView } from './components/LessonView';
import { QuizSession, type QuizSnapshot } from './components/QuizSession';
import { Results } from './components/Results';
import { SkillPath } from './components/SkillPath';
import { Academy } from './academy/Academy';
import { ANALYZE_TRACK, MEASURE_TRACK } from './academy/tracks';
import { VersionMark } from './components/VersionMark';
import { APP_BUILD_LABEL } from './version';
import { ACHIEVEMENTS } from './data/achievements';
import { getLessonForTopic } from './data/lessons';
import { getSkillNodeByLesson } from './data/skillPath';
import { ALL_QUESTIONS, questionCount, questionsForLesson } from './data/questions';
import { PHASES, PHASE_ORDER, TOPICS, phaseLabel } from './data/topics';
import { useProgress } from './hooks/useProgress';
import { pathSummary } from './lib/skillPathProgress';
import { balancedBaseline, pickQuestions, shuffle } from './lib/scoring';
import type { Phase, Question, SessionConfig } from './types';
import './App.css';

type ResultsScreen = {
  kind: 'results';
  config: SessionConfig;
  correct: number;
  total: number;
  percent: number;
  missed: Question[];
};

type PathScreen = { kind: 'path'; selectedId?: string | null };

type Screen =
  | { kind: 'hub' }
  | { kind: 'quiz'; config: SessionConfig; snapshot?: QuizSnapshot | null }
  | ResultsScreen
  | { kind: 'phase-pick' }
  | { kind: 'achievements' }
  | { kind: 'guide' }
  | { kind: 'learn'; highlightIds?: string[] }
  | PathScreen
  | { kind: 'academy'; track: 'analyze' | 'measure' }
  | {
      kind: 'lesson';
      lessonId: string;
      returnTo:
        | { kind: 'hub' }
        | { kind: 'learn'; highlightIds?: string[] }
        | PathScreen
        | { kind: 'quiz'; config: SessionConfig; snapshot?: QuizSnapshot | null }
        | ResultsScreen;
    };

export default function App() {
  const {
    progress,
    rank,
    weak,
    livePhaseScores,
    recordAnswer,
    completeBaseline,
    recordMock,
    reset,
    markLessonStudied,
  } = useProgress();

  const [screen, setScreen] = useState<Screen>({ kind: 'hub' });
  const pathMeta = useMemo(() => pathSummary(progress), [progress]);

  const dailyPct = Math.min(100, Math.round((progress.dailyCorrect / progress.dailyGoal) * 100));

  function startSession(config: SessionConfig) {
    if (config.questions.length === 0) return;
    setScreen({ kind: 'quiz', config, snapshot: null });
  }

  function startBaseline() {
    startSession({
      mode: 'baseline',
      title: 'Knowledge Baseline',
      questions: balancedBaseline(ALL_QUESTIONS, 5),
      timed: false,
      seconds: null,
      passPercent: null,
      showImmediateFeedback: true,
    });
  }

  function startMock() {
    startSession({
      mode: 'mock',
      title: 'DGQ Mock Exam',
      questions: pickQuestions(ALL_QUESTIONS, Math.min(50, ALL_QUESTIONS.length)),
      timed: true,
      seconds: 90 * 60,
      passPercent: 80,
      showImmediateFeedback: false,
    });
  }

  function startDrill() {
    startSession({
      mode: 'drill',
      title: 'Rapid Drill',
      questions: pickQuestions(ALL_QUESTIONS, 12),
      timed: true,
      seconds: 8 * 60,
      passPercent: null,
      showImmediateFeedback: true,
    });
  }

  function startBlindspot() {
    startSession({
      mode: 'blindspot',
      title: 'Blind Spot Trainer',
      questions: pickQuestions(ALL_QUESTIONS, 12, { preferWeak: progress }),
      timed: false,
      seconds: null,
      passPercent: null,
      showImmediateFeedback: true,
    });
  }

  function startToolMatch() {
    startSession({
      mode: 'toolmatch',
      title: 'Tool Match Arena',
      questions: pickQuestions(ALL_QUESTIONS, 10, { types: ['scenario'] }),
      timed: false,
      seconds: null,
      passPercent: null,
      showImmediateFeedback: true,
    });
  }

  function startCalc() {
    startSession({
      mode: 'calc',
      title: 'Calc Challenge',
      questions: pickQuestions(ALL_QUESTIONS, 8, { types: ['calc'] }),
      timed: true,
      seconds: 10 * 60,
      passPercent: null,
      showImmediateFeedback: true,
    });
  }

  function startPhase(phase: Phase) {
    startSession({
      mode: 'phase',
      title: `${phaseLabel(phase)} Focus`,
      questions: pickQuestions(ALL_QUESTIONS, 10, { phases: [phase] }),
      timed: false,
      seconds: null,
      passPercent: null,
      showImmediateFeedback: true,
    });
  }

  function practiceLesson(lessonId: string) {
    const pool = questionsForLesson(lessonId);
    const skill = getSkillNodeByLesson(lessonId);
    startSession({
      mode: skill ? 'path' : 'blindspot',
      title: skill ? `Checkpoint · ${skill.title}` : 'Lesson practice',
      questions: shuffle(pool).slice(0, Math.min(10, pool.length)),
      timed: false,
      seconds: null,
      passPercent: null,
      showImmediateFeedback: true,
    });
  }

  function openPathLesson(lessonId: string, selectedId?: string | null) {
    markLessonStudied(lessonId);
    setScreen({
      kind: 'lesson',
      lessonId,
      returnTo: { kind: 'path', selectedId: selectedId ?? getSkillNodeByLesson(lessonId)?.id },
    });
  }

  function startPathCheckpoint(lessonId: string) {
    markLessonStudied(lessonId);
    const pool = questionsForLesson(lessonId);
    const skill = getSkillNodeByLesson(lessonId);
    startSession({
      mode: 'path',
      title: skill ? `Checkpoint · ${skill.title}` : 'Path checkpoint',
      questions: shuffle(pool).slice(0, Math.min(8, pool.length)),
      timed: false,
      seconds: null,
      passPercent: 70,
      showImmediateFeedback: true,
    });
  }

  const weakLabels = useMemo(() => {
    return weak.map((w) => {
      const meta = TOPICS.find((t) => t.key === w.topic);
      return { ...w, label: meta?.label ?? w.topic };
    });
  }, [weak]);

  if (screen.kind === 'lesson') {
    const returnTo = screen.returnTo;
    return (
      <div className="app-shell">
        <VersionMark />
        <LessonView
          lessonId={screen.lessonId}
          onBack={() => setScreen(returnTo)}
          onPractice={practiceLesson}
          resumeLabel={returnTo.kind === 'quiz' ? 'Resume drill' : undefined}
          onResume={returnTo.kind === 'quiz' ? () => setScreen(returnTo) : undefined}
        />
      </div>
    );
  }

  if (screen.kind === 'learn') {
    return (
      <div className="app-shell">
        <VersionMark />
        <LearnLibrary
          highlightIds={screen.highlightIds}
          onBack={() => setScreen({ kind: 'hub' })}
          onOpenLesson={(id) => {
            markLessonStudied(id);
            setScreen({
              kind: 'lesson',
              lessonId: id,
              returnTo: { kind: 'learn', highlightIds: screen.highlightIds },
            });
          }}
        />
      </div>
    );
  }

  if (screen.kind === 'academy') {
    const track = screen.track === 'measure' ? MEASURE_TRACK : ANALYZE_TRACK;
    return (
      <div className="app-shell">
        <VersionMark />
        <Academy key={track.storageKey} track={track} onExit={() => setScreen({ kind: 'hub' })} />
      </div>
    );
  }

  if (screen.kind === 'path') {
    return (
      <div className="app-shell">
        <VersionMark />
        <SkillPath
          progress={progress}
          selectedId={screen.selectedId}
          onBack={() => setScreen({ kind: 'hub' })}
          onOpenNode={(node) => setScreen({ kind: 'path', selectedId: node.id })}
          onCloseDetail={() => setScreen({ kind: 'path', selectedId: null })}
          onStudy={(lessonId) => openPathLesson(lessonId, screen.selectedId)}
          onCheckpoint={startPathCheckpoint}
        />
      </div>
    );
  }

  if (screen.kind === 'quiz') {
    return (
      <div className="app-shell">
        <VersionMark />
        <QuizSession
          key={`${screen.config.title}-${screen.snapshot?.index ?? 'start'}-${screen.config.questions[0]?.id}`}
          config={screen.config}
          initial={screen.snapshot}
          onAnswer={(q, ok) => recordAnswer(q, ok, screen.config.mode)}
          onExit={() => setScreen({ kind: 'hub' })}
          onStudyLesson={(lessonId, snapshot) => {
            setScreen({
              kind: 'lesson',
              lessonId,
              returnTo: { kind: 'quiz', config: screen.config, snapshot },
            });
          }}
          onComplete={({ correct, total, percent, missed }) => {
            if (screen.config.mode === 'baseline') {
              const scores = { ...progress.baselineScores };
              for (const p of PHASE_ORDER) {
                const qs = screen.config.questions.filter((q) => q.phase === p);
                const hits = qs.filter((q) => !missed.find((m) => m.id === q.id)).length;
                scores[p] = qs.length ? Math.round((hits / qs.length) * 100) : 0;
              }
              completeBaseline(scores);
            }
            if (screen.config.mode === 'mock') {
              recordMock(percent);
            }
            setScreen({
              kind: 'results',
              config: screen.config,
              correct,
              total,
              percent,
              missed,
            });
          }}
        />
      </div>
    );
  }

  if (screen.kind === 'results') {
    const missLessonIds = Array.from(
      new Set(
        screen.missed
          .map((q) => getLessonForTopic(q.topic, q.phase)?.id)
          .filter((id): id is string => !!id),
      ),
    );

    return (
      <div className="app-shell">
        <VersionMark />
        <Results
          title={screen.config.title}
          correct={screen.correct}
          total={screen.total}
          percent={screen.percent}
          passPercent={screen.config.passPercent}
          missed={screen.missed}
          onHome={() =>
            setScreen(
              screen.config.mode === 'path'
                ? { kind: 'path', selectedId: getSkillNodeByLesson(
                    screen.config.questions[0]?.lessonId ?? '',
                  )?.id }
                : { kind: 'hub' },
            )
          }
          onStudyLesson={(lessonId) => {
            markLessonStudied(lessonId);
            setScreen({
              kind: 'lesson',
              lessonId,
              returnTo: screen,
            });
          }}
          onOpenLearnMisses={() =>
            setScreen({ kind: 'learn', highlightIds: missLessonIds })
          }
          onAgain={() => {
            const mode = screen.config.mode;
            if (mode === 'baseline') startBaseline();
            else if (mode === 'mock') startMock();
            else if (mode === 'drill') startDrill();
            else if (mode === 'blindspot') startBlindspot();
            else if (mode === 'toolmatch') startToolMatch();
            else if (mode === 'calc') startCalc();
            else if (mode === 'path') {
              const title = screen.config.title;
              const skillTitle = title.startsWith('Checkpoint · ')
                ? title.slice('Checkpoint · '.length)
                : null;
              const node = skillTitle
                ? pathMeta.nodes.find((n) => n.node.title === skillTitle)?.node
                : undefined;
              if (node) startPathCheckpoint(node.lessonId);
              else setScreen({ kind: 'path' });
            } else setScreen({ kind: 'hub' });
          }}
          onRetryMissed={() =>
            startSession({
              mode: 'blindspot',
              title: 'Missed Question Drill',
              questions: screen.missed,
              timed: false,
              seconds: null,
              passPercent: null,
              showImmediateFeedback: true,
            })
          }
        />
      </div>
    );
  }

  if (screen.kind === 'phase-pick') {
    return (
      <div className="app-shell">
        <VersionMark />
        <button type="button" className="ghost back" onClick={() => setScreen({ kind: 'hub' })}>
          ← Hub
        </button>
        <h2 className="section-title">Train by DMAIC phase</h2>
        <p className="lede">Aligned to your UMS book structure — pick a phase to strengthen.</p>
        <div className="phase-grid">
          {PHASES.filter((p) => p.id !== 'foundation').map((p) => {
            const s = progress.phaseStats[p.id];
            const acc = s.total ? Math.round((s.correct / s.total) * 100) : null;
            return (
              <button
                key={p.id}
                type="button"
                className="phase-card"
                style={{ ['--phase' as string]: p.color }}
                onClick={() => startPhase(p.id)}
              >
                <span className="phase-card__name">{p.label}</span>
                <span className="phase-card__q">{p.question}</span>
                <span className="phase-card__stat">
                  {acc == null ? 'Not started' : `${acc}% · ${s.total} answered`}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (screen.kind === 'achievements') {
    return (
      <div className="app-shell">
        <VersionMark />
        <button type="button" className="ghost back" onClick={() => setScreen({ kind: 'hub' })}>
          ← Hub
        </button>
        <h2 className="section-title">Achievements</h2>
        <div className="achieve-grid">
          {ACHIEVEMENTS.map((a) => {
            const unlocked = progress.achievements.includes(a.id);
            return (
              <div key={a.id} className={`achieve ${unlocked ? 'is-on' : 'is-off'}`}>
                <span className="achieve__icon">{a.icon}</span>
                <div>
                  <strong>{a.title}</strong>
                  <p>{a.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (screen.kind === 'guide') {
    return (
      <div className="app-shell guide">
        <VersionMark />
        <button type="button" className="ghost back" onClick={() => setScreen({ kind: 'hub' })}>
          ← Hub
        </button>
        <h2 className="section-title">DGQ exam playbook</h2>
        <div className="guide-blocks">
          <section>
            <h3>Written exam shape</h3>
            <p>
              DGQ Lean Six Sigma Black Belt written exams are typically ~50 multiple-choice items in
              about 90 minutes. Historical pass threshold is high (~80/100 points). A basic
              non-programmable calculator is usually allowed — phones and programmable devices are
              not.
            </p>
          </section>
          <section>
            <h3>What they really test</h3>
            <p>
              Beyond definitions: choosing the right tool for a situation, interpreting MSA /
              capability / hypothesis results, linking solutions to verified causes, and knowing
              gate exit criteria across DMAIC. UMS is a recognized DGQ training path — this coach
              follows your UMS contents map.
            </p>
          </section>
          <section>
            <h3>Certification beyond the test</h3>
            <p>
              DGQ certification also requires successfully completed DMAIC projects (commonly two)
              with positive expert evaluation. Use this tool for the knowledge side; keep your
              project documentation tight for the application side.
            </p>
          </section>
          <section>
            <h3>How to use this coach</h3>
            <ol>
              <li>
                Prefer Skill Path for a Duolingo-style tree: read → checkpoint → crowns unlock the
                next DMAIC skill.
              </li>
              <li>Or browse Learn & recap freely when you want a library view.</li>
              <li>Run the Baseline once to map phase strengths.</li>
              <li>On misses, tap Study to open the linked lesson, then practice that topic.</li>
              <li>Sit a full Mock Exam under the 90-minute timer before the real day.</li>
            </ol>
          </section>
        </div>
      </div>
    );
  }

  // HUB
  return (
    <div className="app-shell hub">
      <VersionMark />
      <header className="hero">
        <div className="hero__brand">
          <p className="eyebrow">UMS curriculum · DGQ exam prep</p>
          <h1>Belt Forge</h1>
          <p className="hero__tag">
            Learn with visuals, drill with questions, and jump to lessons whenever you miss.
          </p>
        </div>
        <div className="hero__stats">
          <div className="stat">
            <span className="stat__label">Rank</span>
            <span className="stat__value">{rank.name}</span>
            <div className="stat__bar">
              <div style={{ width: `${rank.progress * 100}%` }} />
            </div>
          </div>
          <div className="stat-row">
            <div className="stat mini">
              <span className="stat__label">XP</span>
              <span className="stat__value">{progress.xp}</span>
            </div>
            <div className="stat mini">
              <span className="stat__label">Streak</span>
              <span className="stat__value">{progress.streak}d</span>
            </div>
            <div className="stat mini">
              <span className="stat__label">Bank</span>
              <span className="stat__value">{questionCount()}</span>
            </div>
          </div>
          <div className="stat">
            <span className="stat__label">Daily goal</span>
            <span className="stat__value">
              {progress.dailyCorrect}/{progress.dailyGoal} correct
            </span>
            <div className="stat__bar">
              <div style={{ width: `${dailyPct}%` }} />
            </div>
          </div>
        </div>
      </header>

      <section className="panel radar-panel">
        <div className="panel__head">
          <h2>Knowledge baseline</h2>
          <p>
            {progress.baselineDone
              ? 'Live accuracy by DMAIC phase (updates as you train).'
              : 'Take the baseline assessment to unlock your radar.'}
          </p>
        </div>
        {progress.baselineDone || progress.history.length >= 10 ? (
          <KnowledgeRadar scores={livePhaseScores} />
        ) : (
          <div className="radar-empty">
            <p>Complete the 25-question baseline to see your phase radar.</p>
            <button type="button" className="primary" onClick={startBaseline}>
              Start baseline
            </button>
          </div>
        )}
        {weakLabels.length > 0 && (
          <div className="weak-list">
            <h3>Current blind spots</h3>
            <div className="weak-chips">
              {weakLabels.map((w) => (
                <span key={w.topic} className="chip">
                  {w.label} · {w.accuracy}%
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="modes">
        <h2 className="section-title">Play modes</h2>
        <div className="mode-grid">
          <ModeCard
            title="Analyze Academy"
            blurb="Interactive building blocks: label data, pick the tool, read Minitab output, drag sliders. Bite-sized cards with instant checks."
            action="Start learning"
            accent="#3d4a6b"
            onClick={() => setScreen({ kind: 'academy', track: 'analyze' })}
          />
          <ModeCard
            title="Measure Academy"
            blurb="MSA Type 1, 2 and 3. See why a continuous reading and a pass/fail call need different studies, then use the formulas."
            action="Start MSA"
            accent="#1f6f5b"
            onClick={() => setScreen({ kind: 'academy', track: 'measure' })}
          />
          <ModeCard
            title="Skill Path"
            blurb="Duolingo-style DMAIC tree: read each skill in depth, checkpoint-test it, earn crowns to unlock the next."
            action={
              pathMeta.next
                ? `Continue · ${pathMeta.next.node.badge} (${pathMeta.crowned}/${pathMeta.total})`
                : 'Open path'
            }
            accent="#0f3d33"
            onClick={() =>
              setScreen({
                kind: 'path',
                selectedId: pathMeta.next?.node.id ?? null,
              })
            }
          />
          <ModeCard
            title="Learn & Recap"
            blurb="Free library of teaching cards with diagrams — browse any topic without unlock order."
            action="Open library"
            accent="#134e41"
            onClick={() => setScreen({ kind: 'learn' })}
          />
          <ModeCard
            title="Knowledge Baseline"
            blurb="25 balanced questions across Define→Control. Map where you stand."
            action={progress.baselineDone ? 'Retake' : 'Start'}
            accent="#1F6F5B"
            onClick={startBaseline}
          />
          <ModeCard
            title="DGQ Mock Exam"
            blurb="50 questions · 90 minutes · 80% pass line. No instant feedback — exam conditions."
            action={
              progress.mockBest != null ? `Best ${progress.mockBest}% · Sit again` : 'Sit exam'
            }
            accent="#8B3A3A"
            onClick={startMock}
          />
          <ModeCard
            title="Blind Spot Trainer"
            blurb="Adaptive set weighted toward your weakest topics — with study links on misses."
            action="Train weak areas"
            accent="#B86B2B"
            onClick={startBlindspot}
          />
          <ModeCard
            title="Tool Match Arena"
            blurb="Scenario cards: pick the right LSS tool — classic DGQ skill."
            action="Match tools"
            accent="#2A6F8F"
            onClick={startToolMatch}
          />
          <ModeCard
            title="Calc Challenge"
            blurb="DPMO, yield, Cp/Cpk and friends. Use a basic calculator only."
            action="Crunch numbers"
            accent="#3D4A6B"
            onClick={startCalc}
          />
        </div>
      </section>

      <section className="secondary-nav">
        <button type="button" className="secondary" onClick={() => setScreen({ kind: 'phase-pick' })}>
          Train by phase
        </button>
        <button type="button" className="secondary" onClick={startDrill}>
          Rapid drill
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => setScreen({ kind: 'achievements' })}
        >
          Achievements ({progress.achievements.length}/{ACHIEVEMENTS.length})
        </button>
        <button type="button" className="secondary" onClick={() => setScreen({ kind: 'guide' })}>
          DGQ guide
        </button>
        <button
          type="button"
          className="ghost"
          onClick={() => {
            if (confirm('Reset all progress on this device?')) reset();
          }}
        >
          Reset progress
        </button>
      </section>

      <footer className="foot">
        <p>
          Practice content inspired by UMS DMAIC tool map for DGQ Black Belt prep. Not affiliated
          with DGQ or UMS; not a substitute for official training materials or your project work.
        </p>
        <p className="foot__build">
          Build {APP_BUILD_LABEL} — if this doesn’t match the chat, hard-refresh (or clear cache).
        </p>
      </footer>
    </div>
  );
}

function ModeCard({
  title,
  blurb,
  action,
  accent,
  onClick,
}: {
  title: string;
  blurb: string;
  action: string;
  accent: string;
  onClick: () => void;
}) {
  return (
    <button type="button" className="mode-card" style={{ ['--accent' as string]: accent }} onClick={onClick}>
      <h3>{title}</h3>
      <p>{blurb}</p>
      <span className="mode-card__cta">{action}</span>
    </button>
  );
}
