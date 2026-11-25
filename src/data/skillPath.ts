import type { Phase } from '../types';
import { LESSONS } from './lessons';

/** One skill on the learning path — maps 1:1 to a teaching lesson. */
export interface SkillNode {
  id: string;
  lessonId: string;
  title: string;
  blurb: string;
  phase: Phase;
  /** Short badge for the tree node */
  badge: string;
}

export interface SkillUnit {
  id: string;
  phase: Phase;
  title: string;
  subtitle: string;
  color: string;
  nodes: SkillNode[];
}

function nodeFromLesson(
  lessonId: string,
  badge: string,
  blurb?: string,
): SkillNode {
  const lesson = LESSONS.find((l) => l.id === lessonId);
  if (!lesson) {
    throw new Error(`Skill path references missing lesson: ${lessonId}`);
  }
  return {
    id: `skill-${lessonId}`,
    lessonId,
    title: lesson.title,
    blurb: blurb ?? lesson.summary,
    phase: lesson.phase,
    badge,
  };
}

/**
 * Duolingo-style path: walk top → bottom through DMAIC.
 * Unlock is sequential; crowns come from study + practice.
 */
export const SKILL_UNITS: SkillUnit[] = [
  {
    id: 'unit-foundation',
    phase: 'foundation',
    title: 'Foundation',
    subtitle: 'How Black Belts think and how DGQ examines you',
    color: '#134e41',
    nodes: [
      nodeFromLesson('dmaic-overview', 'DMAIC', 'Roadmap, gates, and Y = f(X).'),
      nodeFromLesson('dgq-exam', 'DGQ', 'Exam shape, pass bar, and study habits.'),
    ],
  },
  {
    id: 'unit-define',
    phase: 'define',
    title: 'Define',
    subtitle: 'Frame the problem so Improve isn’t guesswork',
    color: '#1f6f5b',
    nodes: [
      nodeFromLesson('project-charter', 'Charter', 'Problem, goal, scope, and Y.'),
      nodeFromLesson('sipoc', 'SIPOC', 'Suppliers → process → customers at altitude.'),
      nodeFromLesson('raci-stakeholders', 'RACI', 'Owners, influence, and early risk.'),
      nodeFromLesson('voc-kano', 'VOC', 'Voice of customer → CTQs and Kano.'),
    ],
  },
  {
    id: 'unit-measure',
    phase: 'measure',
    title: 'Measure',
    subtitle: 'Trust the data door before you model',
    color: '#2a6f8f',
    nodes: [
      nodeFromLesson('operational-data', 'Data', 'Operational definitions & collection.'),
      nodeFromLesson('msa', 'MSA', 'Is the gage good enough to decide?'),
      nodeFromLesson('charts-variation', 'Charts', 'Pareto, histograms, runs, control.'),
      nodeFromLesson('capability', 'Cp/Cpk', 'Capability, DPMO, yield, performance.'),
    ],
  },
  {
    id: 'unit-analyze',
    phase: 'analyze',
    title: 'Analyze',
    subtitle: 'Prove the vital few X’s — flow and stats',
    color: '#3d4a6b',
    nodes: [
      nodeFromLesson('cause-fmea', 'Cause', 'Fishbone, FMEA, prioritization.'),
      nodeFromLesson('process-lean-maps', 'Flow', 'VSM, takt, throughput, bottlenecks.'),
      nodeFromLesson('stats-inference', 'Stats', 'CI, tests, ANOVA, regression.'),
      nodeFromLesson('doe', 'DOE', 'Screen, confirm, and optimize factors.'),
    ],
  },
  {
    id: 'unit-improve',
    phase: 'improve',
    title: 'Improve',
    subtitle: 'Change verified X’s — Lean patterns & selection',
    color: '#b86b2b',
    nodes: [
      nodeFromLesson('lean-solutions', 'Lean', 'TOC, SMED, pull, poka-yoke, 5S.'),
      nodeFromLesson('ideate-select', 'Select', 'Ideate, Pugh, and decision quality.'),
      nodeFromLesson('pilot-rollout', 'Pilot', 'Pilot, risk, and scale the win.'),
    ],
  },
  {
    id: 'unit-control',
    phase: 'control',
    title: 'Control',
    subtitle: 'Lock the new process so gains stick',
    color: '#8b3a3a',
    nodes: [
      nodeFromLesson('control-sustain', 'Control', 'Charts, standards, reaction plans.'),
    ],
  },
];

export const SKILL_NODES: SkillNode[] = SKILL_UNITS.flatMap((u) => u.nodes);

export function getSkillNode(id: string): SkillNode | undefined {
  return SKILL_NODES.find((n) => n.id === id);
}

export function getSkillNodeByLesson(lessonId: string): SkillNode | undefined {
  return SKILL_NODES.find((n) => n.lessonId === lessonId);
}

export function skillNodeIndex(id: string): number {
  return SKILL_NODES.findIndex((n) => n.id === id);
}

export function previousSkillNode(id: string): SkillNode | undefined {
  const i = skillNodeIndex(id);
  return i > 0 ? SKILL_NODES[i - 1] : undefined;
}

export function nextSkillNode(id: string): SkillNode | undefined {
  const i = skillNodeIndex(id);
  return i >= 0 && i < SKILL_NODES.length - 1 ? SKILL_NODES[i + 1] : undefined;
}
