import type { Lesson } from '../types';

/**
 * Teaching library aligned to UMS DMAIC topics.
 * Multiple question topic strings can map to one lesson via `topics`.
 */
export const LESSONS: Lesson[] = [
  {
    id: 'dmaic-overview',
    title: 'DMAIC Roadmap',
    phase: 'foundation',
    topics: ['dmaic', 'lean-six-sigma', 'y-x', 'gate-review', 'roles'],
    summary:
      'DMAIC is the Black Belt project spine: Define the problem, Measure the baseline, Analyze causes, Improve with solutions, Control to sustain.',
    visual: 'dmaic',
    visualCaption: 'Five linked phases — each gate checks exit criteria before you move on.',
    sections: [
      {
        heading: 'Why the order matters',
        body: 'Jumping to solutions skips evidence. Define clarifies Y and scope; Measure makes the problem measurable and trustworthy; Analyze proves vital X’s; Improve changes those X’s; Control locks the new way of working.',
      },
      {
        heading: 'Y = f(X)',
        body: 'The output metric Y is driven by input factors X. Your job is to find and improve the vital few X’s — not to optimize every opinion equally.',
      },
      {
        heading: 'Gate reviews',
        body: 'Each phase ends with a gate: charter & SIPOC (Define), MSA & baseline (Measure), validated causes (Analyze), piloted solution (Improve), standards & owners (Control).',
      },
    ],
    takeaways: [
      'Tool choice follows the phase question.',
      'Sponsors own barriers; Black Belts own the method.',
      'DGQ exams love phase-order and gate-exit traps.',
    ],
    dgqAngle: 'Expect scenarios that hide the correct next phase step.',
  },
  {
    id: 'dgq-exam',
    title: 'DGQ Exam Style',
    phase: 'foundation',
    topics: ['dgq-exam'],
    summary:
      'Written DGQ Black Belt exams are typically ~50 MCQs in ~90 minutes with a high pass threshold (~80%). Certification also needs completed DMAIC projects.',
    visual: 'gate',
    visualCaption: 'Knowledge test + applied projects = DGQ certificate path.',
    sections: [
      {
        heading: 'Written part',
        body: 'Selection tasks under time pressure. A basic non-programmable calculator is usually allowed. Phones and programmable devices are not.',
      },
      {
        heading: 'What they stress',
        body: 'Correct tool for the situation, interpreting MSA/capability/hypothesis results, linking solutions to verified causes, and gate discipline — not trivia alone.',
      },
      {
        heading: 'Projects',
        body: 'Two positively evaluated DMAIC projects are typically required. This coach trains knowledge; keep project documentation exam-ready separately.',
      },
    ],
    takeaways: [
      'Train timed, with only a basic calculator.',
      'Practice tool-selection scenarios heavily.',
      '80% territory is the target for mock exams here.',
    ],
  },
  {
    id: 'project-charter',
    title: 'Project Charter & Framing',
    phase: 'define',
    topics: [
      'project-charter',
      'project-frame',
      'benefit-calculation',
      'multi-generation-plan',
      'project-management',
      'kick-off',
      'project-communication',
      'gate-define',
    ],
    summary:
      'A charter aligns sponsor and team on business case, problem/goal, scope, team, timeline, and the primary Y metric — then framing protects against scope creep.',
    visual: 'gate',
    visualCaption: 'Define exit: approved charter + clear scope + plan for Measure.',
    sections: [
      {
        heading: 'Must-have charter elements',
        body: 'Business case, problem and goal statements (measurable), in/out of scope, team & RACI hooks, milestones, primary metric with baseline/target, and expected benefits.',
      },
      {
        heading: 'Hard vs soft benefits',
        body: 'Hard benefits hit the P&L and should be Finance-credible. Soft benefits (morale, risk) matter but should be labelled honestly.',
      },
      {
        heading: 'Multi-generation plans',
        body: 'When the vision is huge, sequence generations of DMAIC projects instead of one unmanageable mega-scope.',
      },
    ],
    takeaways: [
      'Vague goals fail gates and exams.',
      'Scope creep → reopen the frame with the sponsor.',
      'Kick-off shares charter clarity — it is not Improve.',
    ],
  },
  {
    id: 'sipoc',
    title: 'SIPOC',
    phase: 'define',
    topics: ['sipoc', 'dependency-assessment'],
    summary:
      'SIPOC sketches Suppliers → Inputs → Process → Outputs → Customers at a high level so everyone agrees where the project starts and ends.',
    visual: 'sipoc',
    visualCaption: 'Left-to-right flow from suppliers to customers — keep it one page.',
    sections: [
      {
        heading: 'When to use it',
        body: 'Early in Define when boundaries are fuzzy. It is lighter than a full process map and perfect before deep data collection.',
      },
      {
        heading: 'How to facilitate',
        body: 'Start with process steps (5–7 boxes), then outputs/customers, then inputs/suppliers. Argue on the walls, not in email.',
      },
      {
        heading: 'Dependencies',
        body: 'After SIPOC, list external projects, systems, and interfaces that can block your scope or schedule.',
      },
    ],
    takeaways: [
      'SIPOC = shared process frame, not a VSM.',
      'Customers of the process ≠ always end consumers.',
      'DGQ loves “which tool first for unclear boundaries?” → SIPOC.',
    ],
  },
  {
    id: 'raci-stakeholders',
    title: 'RACI, Stakeholders & Risk',
    phase: 'define',
    topics: [
      'raci',
      'stakeholder-management',
      'risk-management',
      'wbs',
      'network-plan',
      'time-plan',
      'resource-planning',
      'budget-planning',
    ],
    summary:
      'Project management in Define makes work, decisions, people, and risks visible — WBS, network/time plans, RACI, stakeholders, and a living risk register.',
    visual: 'raci',
    visualCaption: 'One Accountable per activity; Responsible does the work; Consulted / Informed stay in the loop.',
    sections: [
      {
        heading: 'RACI',
        body: 'Ambiguous decision rights create conflict. Assign a single Accountable for scope and key decisions.',
      },
      {
        heading: 'Stakeholders',
        body: 'Map power/interest early. Influential skeptics need engagement plans — excluding them rarely works.',
      },
      {
        heading: 'Critical path',
        body: 'The longest dependent path sets minimum duration. Protect it; float lives on other paths.',
      },
    ],
    takeaways: [
      'One A per activity.',
      'Resource realism beats heroic plans.',
      'Risks need owners and mitigations, not just lists.',
    ],
  },
  {
    id: 'voc-kano',
    title: 'VOC, Kano & CTC/CTB',
    phase: 'define',
    topics: ['customer-needs', 'kano', 'ctc-ctb'],
    summary:
      'Translate voice of customer/business into structured needs and measurable Critical-to-Quality / Critical-to-Business requirements.',
    visual: 'kano',
    visualCaption: 'Basic needs anger when missing; performance scales satisfaction; delighters surprise.',
    sections: [
      {
        heading: 'Customer Needs Table',
        body: 'Capture need, importance, and how you will measure it. Prevents designing for the loudest voice only.',
      },
      {
        heading: 'Kano categories',
        body: 'Basic (must-be), performance, and delighters behave differently. Unspoken basics often surface as churn when broken.',
      },
      {
        heading: 'CTC / CTB matrix',
        body: 'Bridge VOC/VOB to measurable requirements that feed your Y tree and project metrics.',
      },
    ],
    takeaways: [
      'Measure what customers mean, not slogans.',
      'Basics ≠ delighters.',
      'CTQs must be operationally defined later in Measure.',
    ],
  },
  {
    id: 'operational-data',
    title: 'Operational Definitions & Data Collection',
    phase: 'measure',
    topics: [
      'operational-definition',
      'collect-data',
      'data-source',
      'data-type',
      'sampling',
      'data-collection-plan',
    ],
    summary:
      'Before trusting numbers: define exactly what you measure, choose continuous vs discrete correctly, sample representatively, and plan who/when/how.',
    visual: 'pareto',
    visualCaption: 'Good plans prevent biased “convenient” data that mislead Analyze.',
    sections: [
      {
        heading: 'Operational definition',
        body: 'Criteria, method, examples of defect vs non-defect. Two teams measuring “late” differently produce fake baselines.',
      },
      {
        heading: 'Data types',
        body: 'Continuous (cycle time) vs discrete/attribute (defect count, pass/fail). Type drives charts and tests.',
      },
      {
        heading: 'Sampling & history',
        body: 'Avoid convenience samples. Test quality of ERP history — if poor, collect fresh focused data.',
      },
    ],
    takeaways: [
      'Definition before collection.',
      'Represent the process conditions that matter.',
      'Garbage history is still garbage.',
    ],
  },
  {
    id: 'msa',
    title: 'Measurement System Analysis',
    phase: 'measure',
    topics: ['msa', 'gage-rr', 'msa-type', 'linearity'],
    summary:
      'MSA checks whether measurement noise is small enough to trust process data. Fix the gage before analyzing the process.',
    visual: 'msa',
    visualCaption: 'Observed variation = process + measurement. Keep measurement small.',
    sections: [
      {
        heading: 'Repeatability vs reproducibility',
        body: 'Repeatability: same operator/device/part again. Reproducibility: between operators or conditions. Both feed Gage R&R.',
      },
      {
        heading: 'Type I vs Type II',
        body: 'Type I often checks bias/repeatability on a reference. Type II typically includes operators/parts for GR&R.',
      },
      {
        heading: 'Attribute systems',
        body: 'Pass/fail inspection needs agreement analysis (appraisers vs standard), not only Cp.',
      },
    ],
    takeaways: [
      'High GR&R → improve the measurement system first.',
      'Linearity: bias across the range.',
      'Classic DGQ theme: MSA before big conclusions.',
    ],
    dgqAngle: 'If %Study Variation is high, do not run DOE yet.',
  },
  {
    id: 'charts-variation',
    title: 'Variation & Graphical Tools',
    phase: 'measure',
    topics: ['variation', 'charts', 'location-spread'],
    summary:
      'See the process before you model it: histograms, Pareto, box/run/scatter plots, and the common vs special cause mindset.',
    visual: 'pareto',
    visualCaption: 'Pareto focuses the vital few categories that dominate total defects.',
    sections: [
      {
        heading: 'Common vs special cause',
        body: 'Common cause is system noise; special cause is assignable. Tampering with common cause increases variation.',
      },
      {
        heading: 'Chart chooser',
        body: 'Pareto for categories, histogram for shape, box plot for group compare, run chart for time order, scatter for X–Y association.',
      },
      {
        heading: 'Location & spread',
        body: 'Mean vs median (outliers), standard deviation/range for spread. Shape guides later analysis choices.',
      },
    ],
    takeaways: [
      'Always look before you leap to tests.',
      'Time order can reveal shifts summaries hide.',
      'Pareto → focus; scatter → candidates for Analyze.',
    ],
  },
  {
    id: 'capability',
    title: 'Performance Metrics & Capability',
    phase: 'measure',
    topics: ['process-performance', 'capability', 'gate-measure'],
    summary:
      'Quantify how bad the problem is (DPU, DPMO, ppm, yield) and whether the process can meet specs (Cp/Cpk) once stable and measured well.',
    visual: 'capability',
    visualCaption: 'Cp = potential vs tolerance; Cpk also penalizes off-center processes.',
    sections: [
      {
        heading: 'Defect metrics',
        body: 'DPU = defects/units. DPMO = defects/(units×opportunities)×1e6. ppm often for defectives. Yield ≈ e^(−DPU) under random defect assumptions.',
      },
      {
        heading: 'Cp vs Cpk',
        body: 'Cp = (USL−LSL)/(6σ). Cpk accounts for centering. High Cp + low Cpk ⇒ recenter before buying precision.',
      },
      {
        heading: 'Stability first',
        body: 'Capability on an unstable process misleads. Pair with control-chart thinking and trusted MSA.',
      },
    ],
    takeaways: [
      'Bring a calculator for DPMO/Cp arithmetic.',
      'Measure gate needs trusted baseline + MSA story.',
      'Specs ≠ control limits.',
    ],
    dgqAngle: 'Cp vs Cpk interpretation is a frequent item.',
  },
  {
    id: 'cause-fmea',
    title: 'Cause–Effect & FMEA',
    phase: 'analyze',
    topics: ['cause-effect', 'Cause-Effect Diagram', 'fmea', 'FMEA', 'Derive Main Causes', 'main-causes'],
    summary:
      'Fishbones organize hypothesized causes; FMEA prioritizes failure modes. Both still need data to prove the vital few.',
    visual: 'fishbone',
    visualCaption: 'Structure hypotheses — then validate with stratification, tests, or DOE.',
    sections: [
      {
        heading: 'Ishikawa discipline',
        body: 'Categories (e.g. 6M) prevent blank stares. A list of 40 causes is not Analyze exit — evidence of vital few is.',
      },
      {
        heading: 'FMEA & RPN',
        body: 'RPN ≈ Severity × Occurrence × Detection. Still escalate high-severity modes even if RPN looks moderate.',
      },
      {
        heading: 'Derive main causes',
        body: 'Combine process tools + data analysis to name the X’s you will attack in Improve.',
      },
    ],
    takeaways: [
      'Hypotheses ≠ proof.',
      'Severity can override blind RPN sorting.',
      'Gate Analyze: causes validated with data.',
    ],
  },
  {
    id: 'process-lean-maps',
    title: 'Process & Lean Analysis Tools',
    phase: 'analyze',
    topics: [
      'process-analysis',
      'Process Analysis',
      'Spaghetti Diagram',
      'Process Flow Chart',
      'CFD',
      'vsm',
      'Value Stream Map',
      'Value Analysis',
      'Time Analysis',
      'value-time',
      'capacity',
      'Capacity Analysis',
      'Process Efficiency',
      'Process Flow Analysis',
    ],
    summary:
      'See waste and flow: spaghetti for motion, VSM for lead time & inventory, value/time analysis for VA vs NVA, CFD for WIP buildup.',
    visual: 'vsm',
    visualCaption: 'VSM shows process boxes, inventory triangles, and information loops driving lead time.',
    sections: [
      {
        heading: 'Spaghetti',
        body: 'Trace walking/transport paths. Long noodles → layout or flow problems for Improve.',
      },
      {
        heading: 'Value stream map',
        body: 'Material + information flow with timing. Inventory between steps often dominates lead time.',
      },
      {
        heading: 'Efficiency lens',
        body: 'Process cycle efficiency ≈ value-add time / lead time. Low PCE is a powerful sponsor story.',
      },
    ],
    takeaways: [
      'Match tool to symptom (motion → spaghetti; lead time → VSM).',
      'Inventory triangles are waiting waste.',
      'CFD shines in transactional queues.',
    ],
  },
  {
    id: 'stats-inference',
    title: 'Inference: CI, Tests, ANOVA, Regression',
    phase: 'analyze',
    topics: [
      'stratification',
      'Data Stratification',
      'confidence-interval',
      'Confidence Interval',
      'hypothesis',
      'Hypothesis Tests',
      'anova',
      'One/Two Way ANOVA',
      'regression',
      'Correlation',
      'Simple/Multiple/Logistic Regression',
    ],
    summary:
      'Turn data into decisions: stratify, estimate with confidence intervals, test hypotheses, compare groups (ANOVA), and model relationships (regression).',
    visual: 'hypothesis',
    visualCaption: 'p-value vs α: reject H0 when evidence against the null is strong enough — still check practical size.',
    sections: [
      {
        heading: 'Stratify first',
        body: 'Slice by shift, product, site… Many mysteries dissolve before formal tests.',
      },
      {
        heading: 'Hypothesis tests',
        body: 'α is Type I risk (false alarm). p ≤ α → reject H0. Non-significance ≠ proof of equality.',
      },
      {
        heading: 'ANOVA & regression',
        body: 'One-way ANOVA: means across 3+ levels. Interactions matter in two-way. Correlation ≠ causation; logistic fits binary Y.',
      },
    ],
    takeaways: [
      'Plot + stratify before fancy models.',
      'Statistical ≠ practical significance.',
      'Check assumptions and residuals.',
    ],
  },
  {
    id: 'doe',
    title: 'Design of Experiments',
    phase: 'analyze',
    topics: [
      'doe',
      'DOE',
      'Full Factorial',
      'Fractional Factorial',
      'Response Surface Methods',
      'rsm',
      'Variation Reduction',
    ],
    summary:
      'DOE efficiently learns which factors and interactions drive Y. Screen with fractionals, deepen with full factorials, optimize curvature with RSM.',
    visual: 'doe',
    visualCaption: '2³ full factorial = 8 unique corners of the factor cube (before replicates).',
    sections: [
      {
        heading: 'Why not OFAT',
        body: 'One-factor-at-a-time misses interactions and wastes runs. Designed experiments balance learning and cost.',
      },
      {
        heading: 'Factorials',
        body: 'Full 2^k explores all combinations. Fractionals screen many factors with aliasing tradeoffs (resolution).',
      },
      {
        heading: 'Randomize & block',
        body: 'Randomize run order against time bias; block known nuisance factors. RSM comes after vital factors are known.',
      },
    ],
    takeaways: [
      '2³ → 8 runs (no replicates).',
      'Screen → confirm → optimize.',
      'Randomization is not optional folklore.',
    ],
  },
  {
    id: 'lean-solutions',
    title: 'Lean Solution Patterns',
    phase: 'improve',
    topics: [
      '5s',
      '5S',
      'poka-yoke',
      'Poka Yoke',
      'workplace-layout',
      'Workplace Layout',
      'toc',
      'Theory of Constraints',
      'smed',
      'Setup Time Reduction/SMED',
      'tpm',
      'TPM',
      'pull-systems',
      'Generic/Replenishment/Two Bin Pull',
      'Batch Size',
      'Process Flow/Logic',
    ],
    summary:
      'Improve often applies Lean patterns to verified causes: 5S, poka-yoke, layout, TOC, SMED, TPM, and pull systems sized to demand.',
    visual: 'pull',
    visualCaption: 'Pull: downstream demand triggers upstream replenishment — limiting overproduction.',
    sections: [
      {
        heading: 'Mistake-proofing & 5S',
        body: 'Poka-yoke prevents or detects errors at source. 5S stabilizes the workplace so standards stick.',
      },
      {
        heading: 'Flow & constraints',
        body: 'TOC elevates the bottleneck. SMED converts internal setup to external to enable smaller batches.',
      },
      {
        heading: 'Pull variants',
        body: 'UMS covers generic, replenishment, and two-bin pull — match design to demand and item variety.',
      },
    ],
    takeaways: [
      'Solutions must attack verified X’s.',
      'Two-bin fits steady consumables.',
      'Shorter setups → smaller batches → better flow.',
    ],
  },
  {
    id: 'ideate-select',
    title: 'Ideate & Select Solutions',
    phase: 'improve',
    topics: [
      'conceive-solutions',
      'Conceive Solutions',
      'creativity',
      'Brainstorming',
      'Anti-Solution',
      'Brainwriting',
      'SCAMPER',
      'Analogy',
      'Affinity Diagram',
      'selection',
      'Must Criteria',
      'Effort Benefit Matrix',
      'N/3 Method',
      'Nominal Group Technique',
      'Pugh Matrix',
    ],
    summary:
      'Generate widely (SCAMPER, brainwriting, anti-solution), cluster (affinity), then select with musts, effort–benefit, NGT/N/3, and Pugh matrices.',
    visual: 'gate',
    visualCaption: 'Diverge → converge: creativity first, structured choice second.',
    sections: [
      {
        heading: 'Creativity toolbox',
        body: 'SCAMPER prompts (Substitute, Combine…). Anti-solution invents ways to make it worse, then inverts. Brainwriting reduces loud-voice bias.',
      },
      {
        heading: 'Musts before wants',
        body: 'Hard constraints kill illegal/unsafe options early. Then score remaining concepts.',
      },
      {
        heading: 'Pugh & facilitation',
        body: 'Pugh compares concepts to a baseline. NGT/N/3 structures ranking with balanced participation.',
      },
    ],
    takeaways: [
      'Don’t vote before must-screening.',
      'Facilitation quality changes outcomes.',
      'Document why the winner won for the gate.',
    ],
  },
  {
    id: 'pilot-rollout',
    title: 'Pilot, Risk & Rollout',
    phase: 'improve',
    topics: [
      'should-be',
      'Should-be Process Map',
      'cost-benefit',
      'Cost Benefit Analysis',
      'pilot-rollout',
      'Pilot',
      'Reaction Plan',
      'Implementation Plan',
      'Risk Analysis',
      'gate-improve',
      'Gate Review ANALYZE',
      'Gate Review IMPROVE',
    ],
    summary:
      'Future-state map, cost–benefit, pilot with success criteria, reaction plan, then controlled rollout — Improve gate evidence.',
    visual: 'gate',
    visualCaption: 'Pilot → learn → lock reaction plan → scale.',
    sections: [
      {
        heading: 'Should-be map',
        body: 'Draw the designed future process before training the organization.',
      },
      {
        heading: 'Pilot discipline',
        body: 'Limited scale, measure vs criteria, refine. Skipping pilots turns Improve into hope.',
      },
      {
        heading: 'Reaction plan',
        body: 'If signals show the fix is failing, who does what by when? Bridges Improve → Control.',
      },
    ],
    takeaways: [
      'No pilot, no confident rollout.',
      'Update benefits vs Define assumptions.',
      'Improve exit = proven fix ready to sustain.',
    ],
  },
  {
    id: 'control-sustain',
    title: 'Control & Sustain',
    phase: 'control',
    topics: [
      'process-docs',
      'Process Documentation',
      'visual-mgmt',
      'Visual Management',
      'control-charts',
      'Control Charts',
      'dashboard',
      'Dashboard',
      'control-team',
      'Process Control Team',
      'audits',
      'Audits',
      'Glass Wall Management',
      'closure',
      'Project Closure',
      'Project Documentation',
      'cip',
      'Continuous Improvement Process',
      'Lean Workout',
      'gate-control',
      'Gate Review CONTROL',
    ],
    summary:
      'Make the new way stick: standards, visuals, control charts with reaction plans, dashboards, owners, audits, clean closure, then CIP.',
    visual: 'controlchart',
    visualCaption: 'Control charts watch the improved process for special-cause signals.',
    sections: [
      {
        heading: 'Standards & visuals',
        body: 'Living documentation and visuals that make abnormalities obvious at a glance (including simple shadow boards).',
      },
      {
        heading: 'Charts & reaction',
        body: 'Monitor Y and critical X’s. Investigate signals — don’t widen limits to hide them. Recalculate limits after a sustained real shift.',
      },
      {
        heading: 'Owners & closure',
        body: 'Process Control Team owns daily sustainment. Close with results vs goals, benefit tracking, and lessons learned.',
      },
    ],
    takeaways: [
      'Sustainment needs an operational home.',
      'Signals demand diagnosis.',
      'CIP continues after the project step-change.',
    ],
    dgqAngle: 'Control-chart reaction discipline is exam-favorite material.',
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}

/** Normalize topic strings for lookup */
export function normalizeTopic(topic: string): string {
  return topic.trim().toLowerCase().replace(/[&/]/g, ' ').replace(/\s+/g, ' ');
}

const topicIndex: Map<string, string> = (() => {
  const map = new Map<string, string>();
  for (const lesson of LESSONS) {
    for (const t of lesson.topics) {
      map.set(normalizeTopic(t), lesson.id);
      map.set(normalizeTopic(t.replace(/-/g, ' ')), lesson.id);
    }
    map.set(normalizeTopic(lesson.id.replace(/-/g, ' ')), lesson.id);
  }
  return map;
})();

export function lessonIdForTopic(topic: string, phase?: Lesson['phase']): string | undefined {
  const direct = topicIndex.get(normalizeTopic(topic));
  if (direct) return direct;
  const dashed = topicIndex.get(normalizeTopic(topic.replace(/-/g, ' ')));
  if (dashed) return dashed;
  // Phase fallback overviews
  if (phase === 'define') return 'project-charter';
  if (phase === 'measure') return 'operational-data';
  if (phase === 'analyze') return 'cause-fmea';
  if (phase === 'improve') return 'lean-solutions';
  if (phase === 'control') return 'control-sustain';
  if (phase === 'foundation') return 'dmaic-overview';
  return 'dmaic-overview';
}

export function getLessonForTopic(topic: string, phase?: Lesson['phase']): Lesson | undefined {
  const id = lessonIdForTopic(topic, phase);
  return id ? getLessonById(id) : undefined;
}

export function lessonsForPhase(phase: Lesson['phase']): Lesson[] {
  return LESSONS.filter((l) => l.phase === phase);
}
