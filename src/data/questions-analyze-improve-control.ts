import type { Question } from '../types';

export const aicQuestions: Question[] = [
  // ─── ANALYZE (28) ─────────────────────────────────────────────────────────
  {
    id: 'ana-001',
    phase: 'analyze',
    topic: 'Cause-Effect Diagram',
    type: 'mcq',
    difficulty: 'foundation',
    prompt:
      'What is the primary purpose of a Cause-Effect (Ishikawa/Fishbone) diagram in the Analyze phase?',
    choices: [
      'To prioritize improvement projects by ROI',
      'To structure brainstormed potential causes of a problem into categories',
      'To calculate process capability indices',
      'To schedule control chart sampling intervals',
    ],
    correctIndex: 1,
    explanation:
      'A Cause-Effect diagram organizes potential root causes into categories (often the 6Ms) so the team can systematically investigate which causes truly drive the Y.',
    dgqTip: 'DGQ expects you to know when Fishbone is used: generating and structuring hypotheses—not proving them.',
  },
  {
    id: 'ana-002',
    phase: 'analyze',
    topic: 'FMEA',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'A team rates Severity = 8, Occurrence = 6, and Detection = 5 for a failure mode. What is the Risk Priority Number (RPN), and what does a high RPN typically trigger?',
    choices: [
      'RPN = 19; immediately scrap the process',
      'RPN = 240; prioritize actions to reduce risk',
      'RPN = 40; only update the control plan',
      'RPN = 480; redesign the entire product line',
    ],
    correctIndex: 1,
    explanation:
      'RPN = S × O × D = 8 × 6 × 5 = 240. High RPNs (relative to other modes) guide prioritization of corrective actions such as poka-yoke, process changes, or better detection.',
    dgqTip: 'Remember: RPN is relative within one FMEA—not an absolute pass/fail score.',
  },
  {
    id: 'ana-003',
    phase: 'analyze',
    topic: 'Process Analysis',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'In process analysis, which finding most strongly indicates a non-value-adding delay rather than a processing defect?',
    choices: [
      'Parts fail a dimensional check after machining',
      'Work-in-process sits in a queue for hours between two capable steps',
      'Operators use different torque settings',
      'Measurement system Gage R&R is 35%',
    ],
    correctIndex: 1,
    explanation:
      'Queue time between capable steps is classic waiting waste (delay). Defects, method variation, and measurement error point to quality or MSA issues, not primarily flow delay.',
  },
  {
    id: 'ana-004',
    phase: 'analyze',
    topic: 'Spaghetti Diagram',
    type: 'scenario',
    difficulty: 'foundation',
    prompt:
      'A shop-floor team wants to visualize how far operators walk and how material crosses the floor during one order cycle. Which tool fits best?',
    choices: [
      'Control chart',
      'Spaghetti diagram',
      'Pareto chart of defect codes',
      'SIPOC',
    ],
    correctIndex: 1,
    explanation:
      'A spaghetti diagram traces physical movement paths of people or material to expose excessive travel, crossing flows, and poor layout.',
    dgqTip: 'Tool selection: movement/layout → spaghetti; process steps/logic → flowchart; value & lead time → VSM.',
  },
  {
    id: 'ana-005',
    phase: 'analyze',
    topic: 'Process Flow Chart',
    type: 'mcq',
    difficulty: 'foundation',
    prompt:
      'In a process flowchart, what does a diamond symbol conventionally represent?',
    choices: [
      'A start or end point',
      'A process step or activity',
      'A decision or branch point',
      'A document or data store',
    ],
    correctIndex: 2,
    explanation:
      'Diamonds mark decisions (yes/no or multi-way branches). Rectangles are activities; ovals/terminals mark start/end; document shapes mark paperwork.',
  },
  {
    id: 'ana-006',
    phase: 'analyze',
    topic: 'CFD',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'What does a Cumulative Flow Diagram (CFD) primarily help a team see over time?',
    choices: [
      'Correlation between two continuous Xs',
      'Work-in-process buildup, throughput, and bottlenecks by workflow stage',
      'Measurement bias of a gage',
      'Customer CTQ tree structure',
    ],
    correctIndex: 1,
    explanation:
      'A CFD stacks counts of work items by stage over time. Widening bands signal WIP growth and bottlenecks; band slopes relate to arrival and departure rates.',
  },
  {
    id: 'ana-007',
    phase: 'analyze',
    topic: 'Value Stream Map',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'A current-state VSM shows process time = 12 min and lead time = 5 days for one product. What is the most accurate interpretation?',
    choices: [
      'The process is already lean because process time is short',
      'Most of the lead time is non-value-adding waiting/inventory between steps',
      'Process capability Cpk must be below 1.0',
      'DOE is required before any mapping',
    ],
    correctIndex: 1,
    explanation:
      'When lead time greatly exceeds process (touch) time, the gap is mainly waiting, batching, and inventory—classic VSM insight driving flow improvements.',
    dgqTip: 'Exam favorite: distinguish process time vs. lead time and compute process cycle efficiency from VSM data.',
  },
  {
    id: 'ana-008',
    phase: 'analyze',
    topic: 'Value Analysis',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'In Lean value analysis, which activity is classified as Value-Adding (VA)?',
    choices: [
      'Moving parts between workstations',
      'Inspecting finished goods for defects',
      'Machining a feature the customer pays for',
      'Waiting for the next batch release',
    ],
    correctIndex: 2,
    explanation:
      'VA transforms the product/service in a way the customer values. Transport, inspection (unless customer-required), and waiting are typically NVA or necessary NVA.',
  },
  {
    id: 'ana-009',
    phase: 'analyze',
    topic: 'Time Analysis',
    type: 'calc',
    difficulty: 'belt',
    prompt:
      'A cycle has VA time = 8 min, necessary NVA = 4 min, and waiting = 28 min. What is Process Cycle Efficiency (PCE)?',
    choices: ['20%', '25%', '33%', '50%'],
    correctIndex: 0,
    explanation:
      'PCE = VA / Total Lead Time = 8 / (8 + 4 + 28) = 8/40 = 20%. Only pure value-adding time is in the numerator.',
    dgqTip: 'Do not put necessary NVA in the numerator for standard PCE.',
  },
  {
    id: 'ana-010',
    phase: 'analyze',
    topic: 'Process Efficiency',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'Which action most directly improves Process Cycle Efficiency without changing value-adding content?',
    choices: [
      'Adding more inspection stations',
      'Reducing queue and batch wait time between steps',
      'Increasing sample size for capability studies',
      'Widening specification limits',
    ],
    correctIndex: 1,
    explanation:
      'PCE rises when lead time falls for the same VA time. Cutting waits and excess inventory shrinks the denominator.',
  },
  {
    id: 'ana-011',
    phase: 'analyze',
    topic: 'Capacity Analysis',
    type: 'calc',
    difficulty: 'belt',
    prompt:
      'A bottleneck station has available time = 450 min/shift and cycle time = 1.5 min/unit. What is theoretical capacity per shift (ignoring downtime)?',
    choices: ['150 units', '225 units', '300 units', '675 units'],
    correctIndex: 2,
    explanation:
      'Capacity = Available time / Cycle time = 450 / 1.5 = 300 units per shift.',
  },
  {
    id: 'ana-012',
    phase: 'analyze',
    topic: 'Process Flow Analysis',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'Flow analysis shows Station B is idle 40% of the time while Station A has a permanent queue. What is the best first conclusion?',
    choices: [
      'Station B is the constraint and needs more staff',
      'Station A is likely the bottleneck constraining overall throughput',
      'The entire process must be replaced',
      'Hypothesis testing is invalid for flow problems',
    ],
    correctIndex: 1,
    explanation:
      'Persistent queues upstream and idle time downstream indicate the constrained resource is A. Improving B first would not raise throughput.',
  },
  {
    id: 'ana-013',
    phase: 'analyze',
    topic: 'Data Stratification',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'Overall defect rate looks stable, but the team suspects shifts and lines differ. What should they do next analytically?',
    choices: [
      'Ignore stratification to avoid bias',
      'Stratify data by shift, line, and product before concluding causes',
      'Only plot a single overall control chart forever',
      'Jump straight to Response Surface Methods',
    ],
    correctIndex: 1,
    explanation:
      'Stratification separates mixed populations so patterns (e.g., night shift, Line 2) become visible. Aggregation can hide root causes.',
    dgqTip: 'DGQ often tests: always stratify before claiming “no difference” or a single root cause.',
  },
  {
    id: 'ana-014',
    phase: 'analyze',
    topic: 'Confidence Interval',
    type: 'calc',
    difficulty: 'belt',
    prompt:
      'A 95% CI for the mean defect rate is [2.1%, 3.4%]. Which statement is correct?',
    choices: [
      'There is a 95% probability the next unit is defective',
      'We are 95% confident the true mean defect rate lies between 2.1% and 3.4%',
      'The process mean is exactly 2.75%',
      'p-value must be 0.05',
    ],
    correctIndex: 1,
    explanation:
      'A CI expresses confidence that the interval covers the unknown parameter. It is not a prediction for a single unit and does not fix the mean at the midpoint.',
  },
  {
    id: 'ana-015',
    phase: 'analyze',
    topic: 'Hypothesis Tests',
    type: 'calc',
    difficulty: 'belt',
    prompt:
      'A two-sample t-test of means yields p = 0.012 at α = 0.05. What is the correct decision?',
    choices: [
      'Fail to reject H0; no evidence of a difference',
      'Reject H0; evidence of a statistically significant difference in means',
      'Accept H0 as proven true',
      'The test is invalid because p < α',
    ],
    correctIndex: 1,
    explanation:
      'When p ≤ α, reject H0. Statistical significance does not by itself prove practical importance; check effect size and process impact.',
    dgqTip: 'Never say “accept H0”—say “fail to reject.” Always discuss practical significance.',
  },
  {
    id: 'ana-016',
    phase: 'analyze',
    topic: 'Hypothesis Tests',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'You compare proportions of scrap before vs. after a change with n large. Which test is typically most appropriate?',
    choices: [
      'Paired t-test on continuous diameter',
      'Two-proportion (or chi-square) test',
      'One-way ANOVA with five levels',
      'Mann–Kendall trend test only',
    ],
    correctIndex: 1,
    explanation:
      'Scrap rate is a proportion. Two-proportion z-test or chi-square contingency analysis is the standard choice for before/after categorical yield/scrap.',
  },
  {
    id: 'ana-017',
    phase: 'analyze',
    topic: 'One/Two Way ANOVA',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'When should you choose two-way ANOVA instead of one-way ANOVA?',
    choices: [
      'When there is only one factor with two levels',
      'When you want to study two factors and their interaction on a continuous Y',
      'When Y is binary and factors are continuous',
      'When sample size is less than 5 total',
    ],
    correctIndex: 1,
    explanation:
      'Two-way ANOVA partitions variation across Factor A, Factor B, and A×B interaction. One-way handles a single categorical factor.',
  },
  {
    id: 'ana-018',
    phase: 'analyze',
    topic: 'One/Two Way ANOVA',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'In a one-way ANOVA, MSBetween = 40, MSWithin = 10. What is the F-statistic?',
    choices: ['0.25', '4', '30', '50'],
    correctIndex: 1,
    explanation:
      'F = MSBetween / MSWithin = 40 / 10 = 4. Large F relative to the critical value (or small p) indicates differences among group means.',
  },
  {
    id: 'ana-019',
    phase: 'analyze',
    topic: 'Correlation',
    type: 'mcq',
    difficulty: 'foundation',
    prompt:
      'A Pearson correlation of r = −0.85 between moisture and tensile strength means:',
    choices: [
      'Moisture causes 85% of strength failures',
      'Strong negative linear association; higher moisture tends to go with lower strength',
      'No relationship exists',
      'A perfect inverse causal law has been proven',
    ],
    correctIndex: 1,
    explanation:
      'Correlation measures linear association strength/direction, not causation. |r| near 1 is strong; the negative sign shows an inverse trend.',
  },
  {
    id: 'ana-020',
    phase: 'analyze',
    topic: 'Simple/Multiple/Logistic Regression',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'Y is pass/fail (binary). Predictors include temperature and pressure. Which model family is most appropriate?',
    choices: [
      'Simple linear regression with OLS only',
      'Logistic regression',
      'One-way ANOVA without predictors',
      'X-bar and R chart',
    ],
    correctIndex: 1,
    explanation:
      'Logistic regression models binary (or categorical) outcomes via log-odds. Ordinary linear regression assumes continuous Y and can predict outside [0,1].',
  },
  {
    id: 'ana-021',
    phase: 'analyze',
    topic: 'Simple/Multiple/Logistic Regression',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'In multiple regression, what does a Variance Inflation Factor (VIF) much greater than 5–10 usually indicate?',
    choices: [
      'Excellent model fit',
      'Multicollinearity among predictors',
      'That Y is not continuous',
      'That α should be raised to 0.10',
    ],
    correctIndex: 1,
    explanation:
      'High VIF signals multicollinearity: predictors are highly correlated, inflating coefficient variance and making interpretation unstable.',
  },
  {
    id: 'ana-022',
    phase: 'analyze',
    topic: 'DOE',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'What is the main advantage of designed experiments (DOE) over one-factor-at-a-time (OFAT) trials?',
    choices: [
      'DOE always needs fewer total runs for any problem',
      'DOE can estimate interactions and cover the factor space more efficiently',
      'DOE eliminates the need for statistical software',
      'DOE replaces the need for a measurement system study',
    ],
    correctIndex: 1,
    explanation:
      'Factorial designs estimate main effects and interactions while exploring combinations systematically—OFAT misses interactions and is often less efficient.',
  },
  {
    id: 'ana-023',
    phase: 'analyze',
    topic: 'Full Factorial',
    type: 'calc',
    difficulty: 'belt',
    prompt:
      'How many runs does a full factorial 2^4 design require (one replicate, no center points)?',
    choices: ['4', '8', '16', '24'],
    correctIndex: 2,
    explanation:
      'A 2^k full factorial needs 2^k runs per replicate. For k = 4: 2^4 = 16 treatment combinations.',
    dgqTip: 'Memorize 2^k counts and resolution trade-offs for fractional designs.',
  },
  {
    id: 'ana-024',
    phase: 'analyze',
    topic: 'Fractional Factorial',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'You have 7 two-level factors but can afford only 16 runs for screening. Which design is the usual choice?',
    choices: [
      'Full factorial 2^7 (128 runs)',
      '2^(7−3) fractional factorial (16 runs)',
      'One-way ANOVA with 7 groups',
      'Simple linear regression on one factor',
    ],
    correctIndex: 1,
    explanation:
      'A 2^(7−3) design screens 7 factors in 16 runs (resolution typically IV). Full 2^7 is 128 runs—often impractical for early screening.',
  },
  {
    id: 'ana-025',
    phase: 'analyze',
    topic: 'Variation Reduction',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'After confirming a dominant special-cause X, which Analyze-phase next step best supports variation reduction?',
    choices: [
      'Widen specs to absorb variation',
      'Quantify the X–Y relationship and verify the cause before Improve',
      'Skip to Control charts only',
      'Average more data points to hide outliers',
    ],
    correctIndex: 1,
    explanation:
      'Sustainable variation reduction needs verified cause–effect linkage (data, DOE, or stratified analysis) before changing the process in Improve.',
  },
  {
    id: 'ana-026',
    phase: 'analyze',
    topic: 'Response Surface Methods',
    type: 'mcq',
    difficulty: 'master',
    prompt: 'When are Response Surface Methods (RSM) typically applied?',
    choices: [
      'At project kickoff before any data collection',
      'After screening, to model curvature and optimize continuous factor settings',
      'Only for attribute data pass/fail',
      'Instead of control plans in Control',
    ],
    correctIndex: 1,
    explanation:
      'RSM (CCD, Box–Behnken, etc.) fits quadratic models near the optimum after important factors are known from screening designs.',
  },
  {
    id: 'ana-027',
    phase: 'analyze',
    topic: 'Derive Main Causes',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'The team listed 40 potential causes on a Fishbone. How should they rigorously derive the vital few main causes?',
    choices: [
      'Vote once and implement all top 10 without data',
      'Use data stratification, hypothesis tests/DOE, and Pareto of verified contributors',
      'Pick causes alphabetically',
      'Assume the loudest stakeholder is correct',
    ],
    correctIndex: 1,
    explanation:
      'Brainstorming generates candidates; Analyze validates them with stratified data, statistical tests, and DOE so Improve targets true drivers.',
  },
  {
    id: 'ana-028',
    phase: 'analyze',
    topic: 'Gate Review ANALYZE',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'Which deliverable is most critical to pass an Analyze gate review?',
    choices: [
      'A finalized control plan with reaction plans only',
      'Verified root causes with data, and a clear link from X to Y',
      'A full financial audit of the company',
      'A completed 5S event with no data analysis',
    ],
    correctIndex: 1,
    explanation:
      'Analyze gate criteria center on data-backed root cause identification and quantified X–Y relationships—not yet full Control documentation or standalone Lean events.',
    dgqTip: 'Gate question: “Have we proven the vital Xs, or only listed hypotheses?”',
  },

  // ─── IMPROVE (26) ─────────────────────────────────────────────────────────
  {
    id: 'imp-001',
    phase: 'improve',
    topic: 'Conceive Solutions',
    type: 'mcq',
    difficulty: 'foundation',
    prompt:
      'What is the first focus when conceiving solutions in Improve?',
    choices: [
      'Immediately write the control plan',
      'Generate solution ideas that address the verified vital Xs from Analyze',
      'Restart Define with a new charter',
      'Run only RSM without team input',
    ],
    correctIndex: 1,
    explanation:
      'Improve starts from verified causes. Ideation should target those Xs, then select, pilot, and implement the best solutions.',
  },
  {
    id: 'imp-002',
    phase: 'improve',
    topic: '5S',
    type: 'mcq',
    difficulty: 'foundation',
    prompt: 'Which sequence correctly lists the classic 5S steps?',
    choices: [
      'Sort, Set in order, Shine, Standardize, Sustain',
      'Standardize, Sort, Shine, Speed, Sustain',
      'Sort, Schedule, Shine, Simplify, Store',
      'Shine, Sort, Set, Survey, Sign-off',
    ],
    correctIndex: 0,
    explanation:
      '5S: Sort (Seiri), Set in order (Seiton), Shine (Seiso), Standardize (Seiketsu), Sustain (Shitsuke).',
  },
  {
    id: 'imp-003',
    phase: 'improve',
    topic: 'Poka Yoke',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'Connectors can be plugged in backwards, causing failures. Which poka-yoke approach is strongest?',
    choices: [
      'Train operators harder and audit monthly only',
      'Redesign the connector so reverse insertion is physically impossible',
      'Add a warning label only',
      'Increase sample inspection to 100% forever',
    ],
    correctIndex: 1,
    explanation:
      'Error-proofing that makes the wrong action impossible (or immediately detectable) is more robust than training, labels, or inspection alone.',
  },
  {
    id: 'imp-004',
    phase: 'improve',
    topic: 'Workplace Layout',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'Spaghetti diagrams show long walks and crossed flows. Which Improve action best addresses this?',
    choices: [
      'Add more WIP buffers at every station',
      'Redesign layout for flow (e.g., cell) to shorten travel and straighten material paths',
      'Widen control limits on the X-bar chart',
      'Increase batch sizes to reduce setups',
    ],
    correctIndex: 1,
    explanation:
      'Layout redesign into product-oriented cells or U-shapes cuts transport waste and supports one-piece flow.',
  },
  {
    id: 'imp-005',
    phase: 'improve',
    topic: 'Theory of Constraints',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'According to Theory of Constraints (TOC), where should improvement effort focus first?',
    choices: [
      'Everywhere equally to be fair',
      'On the system constraint (bottleneck) that limits throughput',
      'Only on non-bottleneck idle resources',
      'On reducing inventory at the constraint only by starving it',
    ],
    correctIndex: 1,
    explanation:
      'TOC: identify the constraint, exploit it, subordinate other steps, elevate the constraint, then repeat. Local optimization elsewhere rarely raises system throughput.',
  },
  {
    id: 'imp-006',
    phase: 'improve',
    topic: 'Setup Time Reduction/SMED',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'In SMED, what is the key distinction between internal and external setup?',
    choices: [
      'Internal = done while the machine is running; external = machine stopped',
      'Internal = requires the machine stopped; external = can be done while running',
      'Internal = quality checks; external = finance approvals',
      'There is no difference in SMED',
    ],
    correctIndex: 1,
    explanation:
      'SMED converts internal setup (machine down) to external (machine running) and streamlines remaining internal steps to cut changeover time.',
  },
  {
    id: 'imp-007',
    phase: 'improve',
    topic: 'TPM',
    type: 'mcq',
    difficulty: 'belt',
    prompt: 'Total Productive Maintenance (TPM) primarily aims to:',
    choices: [
      'Maximize equipment effectiveness by engaging operators in prevention and care',
      'Outsource all maintenance immediately',
      'Replace SPC with maintenance checklists only',
      'Increase unplanned downtime for learning',
    ],
    correctIndex: 0,
    explanation:
      'TPM raises OEE through autonomous care, planned maintenance, and eliminating losses (breakdowns, setup, minor stops, speed, defects, yield).',
  },
  {
    id: 'imp-008',
    phase: 'improve',
    topic: 'Generic/Replenishment/Two Bin Pull',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'A workstation consumes fasteners at a steady rate. Empty bin triggers refill of a second full bin. What system is this?',
    choices: [
      'Push MRP with monthly forecasts only',
      'Two-bin pull (kanban-style replenishment)',
      'Full factorial DOE',
      'Glass wall management',
    ],
    correctIndex: 1,
    explanation:
      'Two-bin is a simple pull/replenishment system: consumption empties a bin and signals restock of a standard quantity.',
  },
  {
    id: 'imp-009',
    phase: 'improve',
    topic: 'Batch Size',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'Reducing batch size while keeping demand steady typically:',
    choices: [
      'Increases average WIP and lead time',
      'Decreases WIP and lead time but may raise changeover frequency',
      'Has no effect on flow',
      'Automatically improves Cpk without process change',
    ],
    correctIndex: 1,
    explanation:
      'Smaller batches improve flow and cut inventory/lead time, often requiring SMED so changeovers remain economical.',
  },
  {
    id: 'imp-010',
    phase: 'improve',
    topic: 'Process Flow/Logic',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'The should-be process still has three approval loops that add days but never change outcomes. Best Improve action?',
    choices: [
      'Keep all loops for “safety” without review',
      'Simplify logic: remove or parallelize non-value approvals after risk assessment',
      'Add a fourth approval for balance',
      'Only train people to fill forms faster',
    ],
    correctIndex: 1,
    explanation:
      'Process logic redesign removes redundant decisions and sequential waits that do not reduce risk or add customer value.',
  },
  {
    id: 'imp-011',
    phase: 'improve',
    topic: 'Brainstorming',
    type: 'mcq',
    difficulty: 'foundation',
    prompt: 'A core rule of classical brainstorming is:',
    choices: [
      'Critique every idea immediately',
      'Defer judgment; generate quantity first',
      'Allow only managers to speak',
      'Limit ideas to those already in the budget',
    ],
    correctIndex: 1,
    explanation:
      'Brainstorming separates divergent generation from later evaluation so creativity is not shut down early.',
  },
  {
    id: 'imp-012',
    phase: 'improve',
    topic: 'Anti-Solution',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'What is the Anti-Solution (worst idea) technique used for?',
    choices: [
      'To document the final control plan',
      'To provoke creative thinking by exploring how to make the problem worse, then reverse insights',
      'To calculate ANOVA F-statistics',
      'To set control chart limits',
    ],
    correctIndex: 1,
    explanation:
      'Anti-solution brainstorming surfaces failure modes and inverted ideas that can be flipped into useful countermeasures.',
  },
  {
    id: 'imp-013',
    phase: 'improve',
    topic: 'Brainwriting',
    type: 'mcq',
    difficulty: 'foundation',
    prompt: 'How does brainwriting differ from verbal brainstorming?',
    choices: [
      'Ideas are written silently and circulated, reducing dominance by loud voices',
      'Only one person may write ideas',
      'It forbids any later discussion',
      'It replaces all statistical analysis',
    ],
    correctIndex: 0,
    explanation:
      'Brainwriting equalizes participation: participants write ideas, pass sheets, and build on others before group discussion.',
  },
  {
    id: 'imp-014',
    phase: 'improve',
    topic: 'SCAMPER',
    type: 'mcq',
    difficulty: 'belt',
    prompt: 'In SCAMPER, the “P” typically stands for:',
    choices: ['Pareto', 'Put to another use', 'Poka-yoke', 'Process capability'],
    correctIndex: 1,
    explanation:
      'SCAMPER: Substitute, Combine, Adapt, Modify, Put to another use, Eliminate, Reverse/Rearrange—prompts for creative redesign.',
  },
  {
    id: 'imp-015',
    phase: 'improve',
    topic: 'Analogy',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'A hospital team studies Formula 1 pit-stop crews to redesign patient handoffs. Which creativity method is this?',
    choices: [
      'Analogy / biomimicry-style transfer from another domain',
      'Fractional factorial DOE',
      'Glass wall management',
      'Hypothesis test of means',
    ],
    correctIndex: 0,
    explanation:
      'Analogical thinking imports solution patterns from a different field (e.g., racing pit stops) to inspire process redesign.',
  },
  {
    id: 'imp-016',
    phase: 'improve',
    topic: 'Affinity Diagram',
    type: 'mcq',
    difficulty: 'foundation',
    prompt: 'An affinity diagram is used to:',
    choices: [
      'Group large numbers of ideas into natural themes',
      'Compute confidence intervals',
      'Plot time-ordered process data',
      'Assign RPN scores',
    ],
    correctIndex: 0,
    explanation:
      'Affinity (KJ) clustering organizes sticky-note ideas into related groups to structure messy ideation output.',
  },
  {
    id: 'imp-017',
    phase: 'improve',
    topic: 'Must Criteria',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'A solution violates a regulatory “must” safety requirement but scores high on benefit. What should the team do?',
    choices: [
      'Select it anyway because benefit is high',
      'Eliminate it; must criteria are go/no-go filters before scoring shoulds',
      'Average must and should scores',
      'Defer the decision to Control phase',
    ],
    correctIndex: 1,
    explanation:
      'Must criteria are mandatory screens. Options failing a must are out regardless of effort–benefit scores.',
  },
  {
    id: 'imp-018',
    phase: 'improve',
    topic: 'Effort Benefit Matrix',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'On an effort–benefit matrix, which quadrant is usually prioritized first for quick wins?',
    choices: [
      'High effort, low benefit',
      'Low effort, high benefit',
      'High effort, high benefit only',
      'Low effort, low benefit',
    ],
    correctIndex: 1,
    explanation:
      'Quick wins (low effort, high benefit) build momentum; high-effort/high-benefit items need planning; low-benefit items are deprioritized.',
  },
  {
    id: 'imp-019',
    phase: 'improve',
    topic: 'N/3 Method',
    type: 'calc',
    difficulty: 'belt',
    prompt:
      'A team of 12 uses N/3 multi-voting on 18 ideas. Approximately how many votes does each person get?',
    choices: ['3', '4', '6', '12'],
    correctIndex: 2,
    explanation:
      'N/3 gives each participant about one-third as many votes as there are ideas: 18/3 = 6 votes each (team size does not change votes per person in classic N/3).',
  },
  {
    id: 'imp-020',
    phase: 'improve',
    topic: 'Nominal Group Technique',
    type: 'mcq',
    difficulty: 'belt',
    prompt: 'Nominal Group Technique (NGT) is preferred when:',
    choices: [
      'You need silent individual ideation plus structured ranking to reduce groupthink',
      'You only need a control chart',
      'Factors must be optimized with RSM',
      'The process is already in statistical control forever',
    ],
    correctIndex: 0,
    explanation:
      'NGT: silent idea generation, round-robin sharing, clarification, then independent voting—useful with hierarchy or conflict.',
  },
  {
    id: 'imp-021',
    phase: 'improve',
    topic: 'Pugh Matrix',
    type: 'mcq',
    difficulty: 'belt',
    prompt: 'What does a Pugh matrix compare?',
    choices: [
      'Process capability vs. control limits only',
      'Solution concepts against a baseline using criteria scored as better/same/worse',
      'Supplier prices exclusively',
      'DOE run orders',
    ],
    correctIndex: 1,
    explanation:
      'Pugh (decision-matrix) scoring rates alternatives vs. a datum concept on weighted criteria to select or hybridize solutions.',
  },
  {
    id: 'imp-022',
    phase: 'improve',
    topic: 'Should-be Process Map',
    type: 'mcq',
    difficulty: 'belt',
    prompt: 'A should-be process map shows:',
    choices: [
      'Only the historical as-is mess without changes',
      'The redesigned future-state flow after removing waste and fixing logic',
      'Financial statements for the project',
      'Raw MSA data worksheets',
    ],
    correctIndex: 1,
    explanation:
      'Should-be (future-state) maps define the improved process design that Improve will pilot and implement.',
  },
  {
    id: 'imp-023',
    phase: 'improve',
    topic: 'Cost Benefit Analysis',
    type: 'calc',
    difficulty: 'belt',
    prompt:
      'A solution costs €40,000 one-time and saves €25,000 per year. Ignoring discounting, simple payback is:',
    choices: ['0.625 years', '1.6 years', '2.5 years', '4 years'],
    correctIndex: 1,
    explanation:
      'Payback = Investment / Annual benefit = 40,000 / 25,000 = 1.6 years.',
  },
  {
    id: 'imp-024',
    phase: 'improve',
    topic: 'Reaction Plan',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'During a pilot, the key CTQ goes out of the reaction limits. What should happen first?',
    choices: [
      'Ignore it until full rollout',
      'Follow the predefined reaction plan (contain, diagnose, correct, escalate)',
      'Immediately close the project as successful',
      'Change the CTQ definition to fit the data',
    ],
    correctIndex: 1,
    explanation:
      'Reaction plans define who does what when signals appear. Pilots validate both the process change and the response system.',
  },
  {
    id: 'imp-025',
    phase: 'improve',
    topic: 'Pilot',
    type: 'mcq',
    difficulty: 'belt',
    prompt: 'Why run a pilot before full rollout?',
    choices: [
      'To avoid collecting any data',
      'To validate effectiveness, risks, and practicality on a limited scale',
      'To skip stakeholder communication',
      'To replace the Analyze phase',
    ],
    correctIndex: 1,
    explanation:
      'Pilots confirm that solutions work in real conditions, expose unintended effects, refine reaction plans, and inform the implementation plan.',
  },
  {
    id: 'imp-026',
    phase: 'improve',
    topic: 'Implementation Plan',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'After a successful pilot and risk analysis (updated FMEA), what should the Improve package include for rollout and gate review?',
    choices: [
      'Copy-paste overnight to all sites with no training',
      'Implementation/rollout plan with owners, dates, training, mitigations, metrics, then Improve gate sign-off',
      'Different undocumented methods at every site',
      'Stop measuring during expansion',
    ],
    correctIndex: 1,
    explanation:
      'Implementation plans sequence rollout, assign owners, embed risk mitigations, and define success checks. Passing the Improve gate means the organization is ready for Control sustainment.',
    dgqTip: 'Improve gate: solutions selected with criteria, piloted with data, risks addressed, rollout ready.',
  },

  // ─── CONTROL (16) ─────────────────────────────────────────────────────────
  {
    id: 'ctl-001',
    phase: 'control',
    topic: 'Process Documentation',
    type: 'mcq',
    difficulty: 'foundation',
    prompt:
      'Why is standardized process documentation essential in Control?',
    choices: [
      'It replaces the need for any metrics',
      'It locks in the improved method so gains do not erode through informal variation',
      'It is only needed for failed projects',
      'It eliminates all special causes automatically',
    ],
    correctIndex: 1,
    explanation:
      'SOPs, work instructions, and standards make the new way the default way, enabling training, audits, and consistent performance.',
  },
  {
    id: 'ctl-002',
    phase: 'control',
    topic: 'Visual Management',
    type: 'scenario',
    difficulty: 'foundation',
    prompt:
      'A cell posts andon status, standard WIP limits, and color-coded tool shadows. This is primarily:',
    choices: [
      'Hypothesis testing',
      'Visual management',
      'Fractional factorial design',
      'Cost–benefit analysis',
    ],
    correctIndex: 1,
    explanation:
      'Visual management makes status, standards, and abnormalities obvious at a glance without hunting through reports.',
  },
  {
    id: 'ctl-003',
    phase: 'control',
    topic: 'Control Charts',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'What is the primary purpose of a Shewhart control chart in the Control phase?',
    choices: [
      'To prove customer satisfaction surveys are valid',
      'To distinguish common-cause from special-cause variation over time',
      'To replace FMEA entirely',
      'To calculate NPV of the project',
    ],
    correctIndex: 1,
    explanation:
      'Control charts monitor process stability. Points beyond limits or rule violations trigger investigation—not every fluctuation.',
  },
  {
    id: 'ctl-004',
    phase: 'control',
    topic: 'Control Charts',
    type: 'calc',
    difficulty: 'belt',
    prompt:
      'On an X-bar chart, nine consecutive points appear on one side of the centerline (Western Electric-style). What should you conclude?',
    choices: [
      'The process is definitely capable',
      'A non-random pattern suggests a possible special cause; investigate',
      'Ignore it; only points outside limits matter ever',
      'Widen the control limits immediately',
    ],
    correctIndex: 1,
    explanation:
      'Runs rules (e.g., 8 or 9 on one side) detect shifts even when points stay inside limits. Investigate before changing limits.',
    dgqTip: 'Know limit breaches and run rules; never “fix” charts by widening limits without cause.',
  },
  {
    id: 'ctl-005',
    phase: 'control',
    topic: 'Dashboard',
    type: 'mcq',
    difficulty: 'belt',
    prompt: 'A good process control dashboard should emphasize:',
    choices: [
      'As many KPIs as possible on one screen',
      'Few leading and lagging CTQ/process metrics with clear targets and owners',
      'Only financial EBITDA for the whole enterprise',
      'Raw data tables without visuals',
    ],
    correctIndex: 1,
    explanation:
      'Effective dashboards are focused: actionable metrics tied to the improved process, with ownership and thresholds for action.',
  },
  {
    id: 'ctl-006',
    phase: 'control',
    topic: 'Process Control Team',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'After project handoff, who typically owns day-to-day monitoring of the control plan?',
    choices: [
      'Only the Black Belt forever with no process owner',
      'The process owner and process control team on the floor',
      'External auditors exclusively',
      'Finance alone',
    ],
    correctIndex: 1,
    explanation:
      'Sustainment requires local ownership. Belts coach and escalate; process owners and control teams run the daily system.',
  },
  {
    id: 'ctl-007',
    phase: 'control',
    topic: 'Glass Wall Management',
    type: 'mcq',
    difficulty: 'belt',
    prompt: 'Glass wall management refers to:',
    choices: [
      'Hiding metrics from operators',
      'Transparent, visible posting of performance and actions for shared accountability',
      'Using only glass equipment in production',
      'A type of DOE blocking',
    ],
    correctIndex: 1,
    explanation:
      'Glass wall (or visual “war room”) practices make results and countermeasures publicly visible to drive accountability and rapid response.',
  },
  {
    id: 'ctl-008',
    phase: 'control',
    topic: 'Audits',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'Three months after rollout, layered process audits find operators skipping a poka-yoke check. Best response?',
    choices: [
      'Close the finding without action',
      'Correct the behavior, retrain, and strengthen the control plan/accountability',
      'Remove the poka-yoke as optional',
      'Start an unrelated Define project only',
    ],
    correctIndex: 1,
    explanation:
      'Audits detect drift. Findings must drive corrective action, refresher training, and control-plan updates so gains stick.',
  },
  {
    id: 'ctl-009',
    phase: 'control',
    topic: 'Project Documentation',
    type: 'mcq',
    difficulty: 'foundation',
    prompt: 'Project documentation in Control should include at least:',
    choices: [
      'Only the original problem statement',
      'Charter updates, analyses, solutions, results, control plan, and lessons learned',
      'Personal opinions without data',
      'Vendor marketing brochures only',
    ],
    correctIndex: 1,
    explanation:
      'Complete storyboards/tollgate packs preserve knowledge for replication, audits, and future projects.',
  },
  {
    id: 'ctl-010',
    phase: 'control',
    topic: 'Project Closure',
    type: 'mcq',
    difficulty: 'belt',
    prompt: 'A project is ready for closure when:',
    choices: [
      'Ideas were brainstormed but not implemented',
      'Hard/soft benefits are verified, control plan is live, and owners accept the process',
      'The Black Belt leaves the company',
      'One pilot shift looked promising without metrics',
    ],
    correctIndex: 1,
    explanation:
      'Closure requires demonstrated results, sustaining controls, and formal handoff—not just activity.',
  },
  {
    id: 'ctl-011',
    phase: 'control',
    topic: 'Gate Review CONTROL',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'Which question is most appropriate at a Control gate review?',
    choices: [
      'Have we listed every possible X without data?',
      'Is the process stable at the new level, documented, owned, and audited?',
      'Should we skip the control plan to save time?',
      'Can we widen specs instead of controlling Xs?',
    ],
    correctIndex: 1,
    explanation:
      'Control gate focuses on sustainment: documentation, SPC/visuals, reaction plans, ownership, and audit cadence.',
    dgqTip: 'If gains are not locked in, the project is not done—even if means improved temporarily.',
  },
  {
    id: 'ctl-012',
    phase: 'control',
    topic: 'Continuous Improvement Process',
    type: 'mcq',
    difficulty: 'belt',
    prompt: 'How does Control connect to continuous improvement?',
    choices: [
      'Control ends all further improvement forever',
      'Standards and metrics make the next Kaizen/DMAIC opportunities visible',
      'CI means ignoring the control plan',
      'Only executives may suggest further changes',
    ],
    correctIndex: 1,
    explanation:
      'A controlled process is the baseline for further PDCA/DMAIC cycles; without a standard, improvement cannot stick or compound.',
  },
  {
    id: 'ctl-013',
    phase: 'control',
    topic: 'Lean Workout',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'A short, focused Kaizen/Lean Workout is used during Control when:',
    choices: [
      'A small sustainment gap or local waste needs rapid cross-functional fixing',
      'You need a 128-run full factorial immediately',
      'The charter has not been written yet and scope is unknown',
      'You want to avoid documenting standards',
    ],
    correctIndex: 0,
    explanation:
      'Lean Workouts (Kaizen events) rapidly remove remaining waste or close control gaps with the people who do the work—then update standards.',
  },
  {
    id: 'ctl-014',
    phase: 'control',
    topic: 'Control Charts',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'After improvement, subgroup averages shifted down and the process is stable at the new level. What is the correct Control action?',
    choices: [
      'Keep old centerline forever to “remember” the past',
      'Recalculate chart centerline/limits from the new stable period and lock the control plan',
      'Delete the chart because improvement is done',
      'Switch to OFAT experiments daily',
    ],
    correctIndex: 1,
    explanation:
      'Once a new common-cause system is established, revise limits from post-improvement stable data so charts detect future special causes relative to the new baseline.',
  },
  {
    id: 'ctl-015',
    phase: 'control',
    topic: 'Process Documentation',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'The improved setup checklist lives only in the Black Belt’s notebook. What Control gap does this create?',
    choices: [
      'None—personal notes are enough for sustainment',
      'The standard is not institutionalized; training, audits, and consistent execution will fail',
      'DOE factors cannot be estimated',
      'Confidence intervals become invalid',
    ],
    correctIndex: 1,
    explanation:
      'Sustainment requires controlled documents (SOP/work instruction) in the process owner’s system, not tribal or project-only notes.',
  },
  {
    id: 'ctl-016',
    phase: 'control',
    topic: 'Dashboard',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'A control dashboard shows green KPIs, but the underlying control chart has been out of control for two weeks. What is wrong?',
    choices: [
      'Nothing—KPIs override SPC',
      'The dashboard is lagging or poorly linked; process signals must drive reaction, not vanity greens',
      'Control charts are never used after Improve',
      'Widen the chart limits to match the dashboard',
    ],
    correctIndex: 1,
    explanation:
      'Dashboards must connect to process signals and reaction plans. Stable-looking summary KPIs can hide special causes if SPC and ownership are ignored.',
  },
];
