import type { Question } from '../types';

/** Core DMAIC / DGQ framing questions */
export const foundationQuestions: Question[] = [
  {
    id: 'fnd-001',
    phase: 'foundation',
    topic: 'dmaic',
    type: 'mcq',
    difficulty: 'foundation',
    prompt: 'What does DMAIC stand for?',
    choices: [
      'Define, Measure, Analyze, Improve, Control',
      'Design, Measure, Assess, Implement, Check',
      'Define, Map, Analyze, Innovate, Close',
      'Diagnose, Measure, Act, Improve, Confirm',
    ],
    correctIndex: 0,
    explanation:
      'DMAIC is the core Six Sigma project roadmap: Define the problem, Measure the current state, Analyze root causes, Improve with solutions, and Control to sustain gains.',
    dgqTip: 'DGQ Black Belt exams heavily test knowing which tools belong in which DMAIC phase.',
  },
  {
    id: 'fnd-002',
    phase: 'foundation',
    topic: 'dmaic',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'A sponsor asks you to jump straight into brainstorming solutions because “everyone already knows the causes.” What is the most appropriate Black Belt response?',
    choices: [
      'Insist on completing Define and Measure so the problem and baseline are factual before analyzing causes',
      'Agree and run a Kaizen workshop immediately to save time',
      'Skip Measure but run a quick FMEA in Analyze',
      'Start Control charts first to see if anything is out of control',
    ],
    correctIndex: 0,
    explanation:
      'DGQ / UMS training emphasizes a disciplined DMAIC flow. Without a clear problem statement, Y metric, and reliable baseline, solution brainstorming often optimizes the wrong thing.',
    dgqTip: 'Tool selection questions often hide a phase-order trap — pick the phase-appropriate next step.',
  },
  {
    id: 'fnd-003',
    phase: 'foundation',
    topic: 'dgq-exam',
    type: 'mcq',
    difficulty: 'foundation',
    prompt:
      'According to typical DGQ Lean Six Sigma Black Belt written-exam rules, which statement is correct?',
    choices: [
      'About 50 multiple-choice items in ~90 minutes; roughly 80% is needed to pass the written part',
      'Open-essay only; no multiple choice; unlimited time',
      'Oral viva only with no written component',
      'Unlimited open-book internet research is allowed',
    ],
    correctIndex: 0,
    explanation:
      'DGQ’s written Black Belt exam is typically ~50 selection tasks in 90 minutes, scored out of 100 with a high pass threshold (~80 points). A non-programmable calculator is usually allowed; phones/laptops with storage are not.',
    dgqTip: 'Train under timed pressure and practice with only a basic calculator.',
  },
  {
    id: 'fnd-004',
    phase: 'foundation',
    topic: 'dgq-exam',
    type: 'mcq',
    difficulty: 'belt',
    prompt: 'Besides the written exam, what else does DGQ typically require for Black Belt certification?',
    choices: [
      'Two completed DMAIC projects positively evaluated',
      'Only a verbal presentation of one idea',
      'Publishing a scientific paper',
      'Leading a company-wide transformation office for one year',
    ],
    correctIndex: 0,
    explanation:
      'DGQ Black Belt certification combines the written knowledge test with evidence of applied competence — usually two completed Six Sigma projects reviewed against DGQ criteria.',
  },
  {
    id: 'fnd-005',
    phase: 'foundation',
    topic: 'lean-six-sigma',
    type: 'mcq',
    difficulty: 'foundation',
    prompt: 'How do Lean and Six Sigma complement each other in a Black Belt project?',
    choices: [
      'Lean targets flow/waste; Six Sigma targets variation and defect reduction — together they improve both speed and quality',
      'Lean replaces statistics; Six Sigma replaces process mapping',
      'Lean is only for manufacturing; Six Sigma is only for services',
      'They are mutually exclusive methodologies',
    ],
    correctIndex: 0,
    explanation:
      'UMS/DGQ Lean Six Sigma integrates both: Lean tools (VSM, pull, SMED, 5S…) remove waste and improve flow; Six Sigma tools (MSA, hypothesis tests, DOE…) reduce variation and defects with data.',
  },
  {
    id: 'fnd-006',
    phase: 'foundation',
    topic: 'gate-review',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'You are at a Gate Review after Measure. Which package best demonstrates readiness to enter Analyze?',
    choices: [
      'Validated measurement system, operational definitions, baseline performance (e.g. DPMO/Cp), and a clear Y metric with data collection complete',
      'A long list of brainstormed solutions and a rollout plan',
      'Only a SIPOC with no data',
      'Control charts of the improved process after pilot',
    ],
    correctIndex: 0,
    explanation:
      'Gate Reviews check phase exit criteria. Leaving Measure requires trustworthy data and a quantified baseline — not solutions (Improve) or sustainment (Control).',
    dgqTip: 'Expect questions that test whether you know exit criteria for each gate.',
  },
  {
    id: 'fnd-007',
    phase: 'foundation',
    topic: 'y-x',
    type: 'mcq',
    difficulty: 'foundation',
    prompt: 'In Six Sigma notation, what is the primary focus of Y = f(X)?',
    choices: [
      'The output/problem metric Y is driven by input factors X that we must find and improve',
      'Y is the project budget and X is the schedule',
      'Y is always customer satisfaction and X is always cycle time',
      'Y and X are interchangeable labels for the same KPI',
    ],
    correctIndex: 0,
    explanation:
      'Black Belts hunt the vital X’s that drive the critical Y. Define/Measure clarify Y; Analyze identifies X’s; Improve changes X’s; Control locks them in.',
  },
  {
    id: 'fnd-008',
    phase: 'foundation',
    topic: 'roles',
    type: 'mcq',
    difficulty: 'foundation',
    prompt: 'Who typically owns project prioritization and removes organizational barriers for a Black Belt?',
    choices: [
      'Champion / Sponsor',
      'Yellow Belt only',
      'External auditor',
      'Process operator alone',
    ],
    correctIndex: 0,
    explanation:
      'The Champion/Sponsor provides mandate, resources, and escalation path. The Black Belt leads the method; the team provides process knowledge.',
  },
];
