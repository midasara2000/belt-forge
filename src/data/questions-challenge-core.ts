import type { Question } from '../types';

export const challengeCoreQuestions: Question[] = [
  // ─── More capability & defect metrics (8) ──────────────────────────────────
  {
    id: 'chc-001',
    phase: 'measure',
    topic: 'capability',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'LSL = 98, USL = 102, μ = 100.4, σ = 0.5. Compute Cp and Cpk (2 decimals).',
    choices: [
      'Cp = 2.00, Cpk = 0.80',
      'Cp = 1.33, Cpk = 1.07',
      'Cp = 1.00, Cpk = 1.33',
      'Cp = 1.33, Cpk = 1.60'
    ],
    correctIndex: 1,
    explanation:
      'Cp = (102 − 98)/(6 × 0.5) = 4/3 ≈ 1.33.\nCpu = (102 − 100.4)/(1.5) = 1.6/1.5 ≈ 1.07.\nCpl = (100.4 − 98)/1.5 = 2.4/1.5 = 1.60.\nCpk ≈ 1.07.',
  },
  {
    id: 'chc-002',
    phase: 'measure',
    topic: 'capability',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'Cp = Cpk = 0.75. Specs are fixed. Which lever raises both indices most directly?',
    choices: [
      'Ignore special causes and average more points',
      'Replace USL with the UCL',
      'Reduce process σ (variation reduction)',
      'Only shift the mean farther from center'
    ],
    correctIndex: 2,
    explanation:
      'When Cp = Cpk the process is centered; both indices move only if σ shrinks (or tolerance widens). Mean shifts alone would split Cp from Cpk.',
  },
  {
    id: 'chc-003',
    phase: 'measure',
    topic: 'process-performance',
    type: 'calc',
    difficulty: 'belt',
    prompt: '8,000 units, 4 opportunities each, 96 defects. DPMO = ?',
    choices: [
      '12,000',
      '96,000',
      '3,200',
      '3,000'
    ],
    correctIndex: 3,
    explanation:
      'Opportunities = 8,000 × 4 = 32,000.\nDPMO = 96/32,000 × 10⁶ = 3,000.',
  },
  {
    id: 'chc-004',
    phase: 'measure',
    topic: 'process-performance',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'Four process steps have DPU 0.02, 0.03, 0.01, and 0.04. Approximate RTY with e^(−ΣDPU).',
    choices: [
      '≈90.5%',
      '≈90.0%',
      '≈97.5%',
      '≈10.0%'
    ],
    correctIndex: 0,
    explanation:
      'ΣDPU = 0.10. RTY ≈ e^(−0.10) ≈ 0.9048 ≈ 90.5%.\n\nProduct of (1 − DPU) ≈ 0.902 is close when DPUs are small.',
  },
  {
    id: 'chc-005',
    phase: 'measure',
    topic: 'process-performance',
    type: 'calc',
    difficulty: 'belt',
    prompt: 'From 50,000 units, 125 defectives. Defective ppm = ?',
    choices: [
      '125',
      '2,500',
      '4,000',
      '25,000'
    ],
    correctIndex: 1,
    explanation: 'ppm = 125/50,000 × 10⁶ = 2,500.',
  },
  {
    id: 'chc-006',
    phase: 'measure',
    topic: 'capability',
    type: 'mcq',
    difficulty: 'master',
    prompt:
      'Ppk uses overall long-term σ while Cpk often uses short-term within σ. If Ppk ≪ Cpk, prioritize…',
    choices: [
      'Widening control limits to match specs',
      'Deleting historical data older than one day',
      'Reducing between-subgroup shifts, drifts, and lot-to-lot changes',
      'Only tightening the gage resolution forever'
    ],
    correctIndex: 2,
    explanation:
      'A Cpk–Ppk gap flags instability over time. Attack sources of long-term mean/σ shifts, not just within-piece noise.',
  },
  {
    id: 'chc-007',
    phase: 'measure',
    topic: 'process-performance',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'A plant quotes “Six Sigma quality” using only final audit defectives, while in-process scrap is high. What is the integrity issue?',
    choices: [
      'Final audits are the only valid DPMO source by theory',
      'Scrap never counts as defects',
      'Six Sigma forbids measuring in-process quality',
      'Hidden factory defects are excluded — sigma/DPMO claims need a complete opportunity and defect definition'
    ],
    correctIndex: 3,
    explanation:
      'Honest performance metrics capture defects where they occur. Hiding rework/scrap inflates reported quality.',
  },
  {
    id: 'chc-008',
    phase: 'measure',
    topic: 'capability',
    type: 'calc',
    difficulty: 'belt',
    prompt: 'Tolerance = ±3 around target. Process σ = 0.75, mean on target. Cp = ?',
    choices: [
      '1.33',
      '2.00',
      '0.67',
      '1.00'
    ],
    correctIndex: 0,
    explanation:
      'Full tolerance width = 6. Cp = 6/(6 × 0.75) = 6/4.5 ≈ 1.33. Centered ⇒ Cpk = Cp.',
  },

  // ─── Chart interpretation & control-chart reaction (8) ─────────────────────
  {
    id: 'chc-009',
    phase: 'measure',
    topic: 'charts',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'Pareto by defect code looks flat across 12 codes (~8% each). Next best analytical move?',
    choices: [
      'Abandon graphical analysis',
      'Stratify differently (product, shift, machine) — current category cut may not reveal vital few',
      'Conclude no problems exist',
      'Force a false vital few by merging random codes'
    ],
    correctIndex: 1,
    explanation:
      'A flat Pareto often means the wrong slice. Re-stratify to find concentration; don’t invent fake priority.',
  },
  {
    id: 'chc-010',
    phase: 'control',
    topic: 'control-charts',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'I-MR chart: an individual point exceeds UCL. Operator immediately tweaks the setpoint. Correct coaching?',
    choices: [
      'Ignore all individual-chart signals',
      'Recalculate Cp using only the out-of-control point',
      'First find and remove the assignable cause; blind tweaking is tampering if the signal is misunderstood',
      'Always tweak after any out-of-control point without investigation'
    ],
    correctIndex: 2,
    explanation:
      'Reaction plans need investigation, containment, and cause removal. Adjusting without understanding often adds variation.',
  },
  {
    id: 'chc-011',
    phase: 'control',
    topic: 'control-charts',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'Eight consecutive points on one side of the centerline (Western Electric-style run). Specs are still met. Action?',
    choices: [
      'Do nothing because no point crossed 3σ and specs are green',
      'Widen control limits until the run disappears',
      'Declare capability improved automatically',
      'Treat as a special-cause signal — investigate the sustained shift even if still inside specs'
    ],
    correctIndex: 3,
    explanation:
      'Run rules detect non-random behavior before a hard 3σ breach. Spec compliance does not cancel process signals.',
  },
  {
    id: 'chc-012',
    phase: 'measure',
    topic: 'charts',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'A histogram of diameters is left-skewed with a hard wall near the LSL. Likely story?',
    choices: [
      'Inspection/scrap or physical limit truncating the lower tail — interpret capability carefully',
      'Perfect normality',
      'Proof that Cpk equals Cp',
      'That a scatter plot is required instead of any histogram'
    ],
    correctIndex: 0,
    explanation:
      'Truncation and sorting create skewed shapes. Classical normal Cpk can misstate risk; investigate the data-generating process.',
  },
  {
    id: 'chc-013',
    phase: 'control',
    topic: 'control-charts',
    type: 'mcq',
    difficulty: 'belt',
    prompt: 'When should you recalculate control limits after a process improvement?',
    choices: [
      'Only when a customer visits',
      'After the new process proves stable — then set limits from the improved common-cause variation',
      'Every hour regardless of stability',
      'Never — original limits are sacred forever'
    ],
    correctIndex: 1,
    explanation:
      'Limits should reflect the current stable process. Premature recalculation during transition muddies signals; frozen old limits after a real change also mislead.',
  },
  {
    id: 'chc-014',
    phase: 'analyze',
    topic: 'charts',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'Scatter of pressure vs leak rate shows two parallel clouds (two product families). Overall r looks weak. Issue?',
    choices: [
      'Parallel clouds prove zero association forever',
      'You must use only pie charts',
      'Mixing strata masks within-family relationships — stratify before correlating',
      'Correlation is illegal for leak data'
    ],
    correctIndex: 2,
    explanation:
      'Simpson-style mixing of groups can hide or reverse associations. Always check stratification.',
  },
  {
    id: 'chc-015',
    phase: 'control',
    topic: 'control-charts',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'p-chart for weekly defectives: subgroup sizes vary from 200 to 2,000. Analyst draws one fixed UCL from n = 200 for all weeks. Problem?',
    choices: [
      'p-charts never need sample size',
      'Fixed limits are always correct for attribute charts',
      'Only c-charts allow variable n',
      'Control limits for p-charts should vary with n — large samples get tighter limits'
    ],
    correctIndex: 3,
    explanation:
      'Var(ˆp) = p(1−p)/n. Larger n ⇒ narrower limits. Using the loosest limit for all weeks misses signals in large samples.',
  },
  {
    id: 'chc-016',
    phase: 'measure',
    topic: 'variation',
    type: 'mcq',
    difficulty: 'belt',
    prompt: 'On a stable process, points inside control limits represent…',
    choices: [
      'Common-cause variation — improve the system, do not chase each point',
      'Proof every unit meets customer specs',
      'Special causes that must each be debugged',
      'Evidence MSA is unnecessary'
    ],
    correctIndex: 0,
    explanation:
      'In-control ≠ on-target to customer. It means variation is predictable; reduce it through system redesign, not point-chasing.',
  },

  // ─── Takt / throughput / Little's Law / PCE (8) ────────────────────────────
  {
    id: 'chc-017',
    phase: 'analyze',
    topic: 'takt',
    type: 'calc',
    difficulty: 'belt',
    prompt:
      'Available production time = 27,000 s/shift. Demand = 450 units/shift. Takt time = ?',
    choices: [
      '40 s/unit',
      '60 s/unit',
      '450 s/unit',
      '27 s/unit'
    ],
    correctIndex: 1,
    explanation:
      'Takt = available time / demand = 27,000 / 450 = 60 s/unit.\n\nTakt is the customer drumbeat the line must match.',
  },
  {
    id: 'chc-018',
    phase: 'analyze',
    topic: 'takt',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'Takt = 55 s. Longest station cycle = 72 s; other stations ≤ 50 s. What is the primary flow problem?',
    choices: [
      'Takt must equal the slowest station by definition',
      'No problem if average cycle < takt',
      'The 72 s station exceeds takt — it is over-cycle and limits line pace',
      'All stations under 55 s are bottlenecks'
    ],
    correctIndex: 2,
    explanation:
      'Every station must be able to complete work within takt (or be rebalanced/paralleled). A 72 s station cannot sustain 55 s demand pace.',
  },
  {
    id: 'chc-019',
    phase: 'analyze',
    topic: 'throughput',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'Little’s Law: average WIP = 120 units, throughput = 15 units/hour. Average lead time = ?',
    choices: [
      '105 hours',
      '1,800 hours',
      '0.125 hours',
      '8 hours'
    ],
    correctIndex: 3,
    explanation:
      'Lead time = WIP / throughput = 120 / 15 = 8 hours.\n\nRaising WIP without raising throughput lengthens lead time.',
  },
  {
    id: 'chc-020',
    phase: 'analyze',
    topic: 'throughput',
    type: 'calc',
    difficulty: 'belt',
    prompt:
      'A cell outputs 480 good units in an 8-hour shift. Effective throughput = ?',
    choices: [
      '60 units/hour',
      '480 units/hour',
      '8 units/hour',
      '40 units/hour'
    ],
    correctIndex: 0,
    explanation: 'Throughput = 480 / 8 = 60 units/hour (good output rate).',
  },
  {
    id: 'chc-021',
    phase: 'analyze',
    topic: 'process-efficiency',
    type: 'calc',
    difficulty: 'belt',
    prompt:
      'Value-added time = 12 min; total lead time = 240 min. Process Cycle Efficiency (PCE) = ?',
    choices: [
      '95%',
      '5%',
      '20%',
      '50%'
    ],
    correctIndex: 1,
    explanation:
      'PCE = VA / lead time = 12/240 = 0.05 = 5%. Most of the lead time is waiting/waste.',
  },
  {
    id: 'chc-022',
    phase: 'analyze',
    topic: 'process-efficiency',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'PCE rises from 4% to 12% after WIP cuts, while total VA time is unchanged. What primarily improved?',
    choices: [
      'Takt automatically tripled',
      'Cp must have tripled',
      'Lead time fell (less waiting) — same value work in a shorter calendar span',
      'Operators work three times faster on value steps'
    ],
    correctIndex: 2,
    explanation:
      'PCE = VA/LT. With VA fixed, higher PCE means shorter lead time — typically from WIP and queue reduction.',
  },
  {
    id: 'chc-023',
    phase: 'analyze',
    topic: 'throughput',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'Desired lead time = 4 days. Throughput = 50 units/day. Target average WIP by Little’s Law = ?',
    choices: [
      '400 units',
      '12.5 units',
      '54 units',
      '200 units'
    ],
    correctIndex: 3,
    explanation: 'WIP = throughput × lead time = 50 × 4 = 200 units.',
  },
  {
    id: 'chc-024',
    phase: 'analyze',
    topic: 'takt',
    type: 'mcq',
    difficulty: 'belt',
    prompt: 'If demand doubles and available time stays constant, takt time…',
    choices: [
      'Halves — the line must produce twice as fast to match customers',
      'Doubles',
      'Is unchanged because takt ignores demand',
      'Becomes equal to cycle time automatically'
    ],
    correctIndex: 0,
    explanation: 'Takt = time / demand. Double demand ⇒ half the allowed seconds per unit.',
  },

  // ─── TOC / bottleneck / SMED / VSM / capacity (10) ─────────────────────────
  {
    id: 'chc-025',
    phase: 'improve',
    topic: 'toc',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'Rates: Cut 40/h, Weld 22/h, Paint 35/h. Marketing pushes Cut utilization to 95%. TOC response?',
    choices: [
      'Paint is the constraint because it is mid-rate',
      'Subordinate Cut to Weld — overproducing at Cut only grows WIP before the constraint',
      'Maximize every resource’s utilization equally',
      'Shut Weld until Cut is busy'
    ],
    correctIndex: 1,
    explanation:
      'Weld at 22/h is the constraint. Non-constraints must be paced to it; local efficiency at Cut creates inventory, not system throughput.',
  },
  {
    id: 'chc-026',
    phase: 'analyze',
    topic: 'bottleneck',
    type: 'calc',
    difficulty: 'belt',
    prompt:
      'Stations: 30, 18, 25, 40 jobs/day. Demand = 24/day. Max sustainable throughput and demand status?',
    choices: [
      '40/day; demand met',
      '30/day; demand met',
      '18/day; demand not met',
      '24/day; demand met at the average'
    ],
    correctIndex: 2,
    explanation:
      'System throughput ≤ min(capacity) = 18/day < demand 24. Elevate the 18/day bottleneck.',
  },
  {
    id: 'chc-027',
    phase: 'improve',
    topic: 'bottleneck',
    type: 'mcq',
    difficulty: 'belt',
    prompt: 'Best “exploit the constraint” action before buying another machine?',
    choices: [
      'Add a duplicate machine immediately',
      'Run non-constraints at 100% to “feed” the constraint endlessly',
      'Increase batch sizes with no setup analysis',
      'Remove quality losses, idle, and non-value work from bottleneck time first'
    ],
    correctIndex: 3,
    explanation:
      'Exploit squeezes more good output from existing constraint minutes. Elevation (CapEx) comes after subordination and exploitation.',
  },
  {
    id: 'chc-028',
    phase: 'improve',
    topic: 'smed',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'Internal setup = 40 min; external = 20 min. After converting 25 min of internal to external, new internal setup = ?',
    choices: [
      '15 min',
      '20 min',
      '35 min',
      '45 min'
    ],
    correctIndex: 0,
    explanation:
      'Convert 25 min internal → external: internal becomes 40 − 25 = 15 min. External becomes 20 + 25 = 45 min (done while running).',
  },
  {
    id: 'chc-029',
    phase: 'improve',
    topic: 'smed',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'Large batches are justified “because setups take 2 hours.” After SMED cuts internal setup to 12 min, what should happen to batch policy?',
    choices: [
      'Ignore inventory impact',
      'Revisit EOQ/batch size — cheaper changeovers support smaller batches and less inventory',
      'Keep huge batches forever out of habit',
      'Increase batches further to celebrate SMED'
    ],
    correctIndex: 1,
    explanation:
      'Setup cost drives batch size. SMED enables smaller lots, fresher flow, and lower WIP — if policy follows the new economics.',
  },
  {
    id: 'chc-030',
    phase: 'analyze',
    topic: 'vsm',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'VSM: process boxes total VA = 28 min. Inventory triangles imply 7.2 days of queue at 480 min/day. Lead time ≈ ? PCE ≈ ?',
    choices: [
      'LT ≈ 508 min; PCE ≈ 5.5%',
      'LT ≈ 7.2 min; PCE ≈ 28%',
      'LT ≈ 3,456 min; PCE ≈ 0.8%',
      'LT ≈ 28 min; PCE ≈ 100%'
    ],
    correctIndex: 2,
    explanation:
      'Queue time = 7.2 × 480 = 3,456 min (dominates LT).\nPCE ≈ 28/3,456 ≈ 0.8%.\n\nVSM inventory is usually the lead-time killer.',
  },
  {
    id: 'chc-031',
    phase: 'analyze',
    topic: 'vsm',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'Current-state VSM shows 5 days of FG inventory before shipping, while customer orders daily. Primary lean insight?',
    choices: [
      'FG inventory always improves PCE',
      'VSM should ignore inventory triangles',
      'Daily orders require 5 days of FG by definition',
      'Finished-goods overproduction/inventory inflates lead time and hides demand signal — target pull/leveling'
    ],
    correctIndex: 3,
    explanation:
      'Inventory triangles on a VSM are waiting waste. Excess FG lengthens LT and dulls true demand feedback.',
  },
  {
    id: 'chc-032',
    phase: 'analyze',
    topic: 'capacity',
    type: 'calc',
    difficulty: 'belt',
    prompt:
      'Machine available 400 min/day; cycle = 5 min/unit; OEE-like uptime factor 0.80. Effective capacity ≈ ?',
    choices: [
      '64 units/day',
      '80 units/day',
      '100 units/day',
      '400 units/day'
    ],
    correctIndex: 0,
    explanation:
      'Theoretical = 400/5 = 80 units.\nEffective ≈ 80 × 0.80 = 64 units/day.',
  },
  {
    id: 'chc-033',
    phase: 'analyze',
    topic: 'capacity',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'Two parallel cells each produce 30/h; downstream pack runs 45/h. Demand = 50/h. Where is the system pinch?',
    choices: [
      'Demand cannot create bottlenecks',
      'Combined cell output is 60/h so pack at 45/h is the bottleneck relative to demand',
      'Either cell alone is fine since 30 < 50',
      'No bottleneck because 60 > 50'
    ],
    correctIndex: 1,
    explanation:
      'Upstream can supply 60/h, but pack caps the system at 45/h < demand 50. Pack is the constraint to elevate.',
  },
  {
    id: 'chc-034',
    phase: 'improve',
    topic: 'toc',
    type: 'mcq',
    difficulty: 'belt',
    prompt: 'After elevating a bottleneck, TOC’s next focusing step is…',
    choices: [
      'Maximize utilization of every non-constraint',
      'Delete buffers permanently',
      'Identify the new constraint and repeat exploit → subordinate → elevate',
      'Freeze all further improvements'
    ],
    correctIndex: 2,
    explanation:
      'Constraints move. The five focusing steps loop: identify the new weak link and realign the system.',
  },

  // ─── MSA / hypothesis / mixed hard challenge (6) ───────────────────────────
  {
    id: 'chc-035',
    phase: 'measure',
    topic: 'msa',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'Capability study shows Cpk = 1.67, but %GRR = 45%. How should leadership read the Cpk?',
    choices: [
      'Trust Cpk fully; MSA is unrelated',
      'High %GRR always improves Cpk',
      'Cpk > 1.5 overrides any MSA result',
      'Distrust it — measurement noise is large enough to distort process capability claims'
    ],
    correctIndex: 3,
    explanation:
      'Capability on a noisy gage is not trustworthy. Fix MSA before celebrating Cpk.',
    dgqTip: 'MSA before capability — gate discipline.',
  },
  {
    id: 'chc-036',
    phase: 'analyze',
    topic: 'hypothesis',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'A/B comparison of scrap rates: n is tiny, p = 0.40. Team declares “no difference, stop the project.” Flaw?',
    choices: [
      'Low power — failure to reject H₀ is not proof of equality; may need larger n or a better design',
      'p = 0.40 always proves identical processes',
      'Hypothesis tests forbid scrap metrics',
      'Projects must stop whenever p > 0.05'
    ],
    correctIndex: 0,
    explanation:
      'Absence of evidence ≠ evidence of absence. Underpowered tests miss real effects.',
  },
  {
    id: 'chc-037',
    phase: 'control',
    topic: 'control-charts',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'Reaction plan says: “If out of control, adjust until the next point is green.” Why is this weak?',
    choices: [
      'Adjustments never affect charts',
      'It encourages tampering without root-cause removal and can inflate variation',
      'All reaction plans are forbidden',
      'Green points prove special causes are gone forever'
    ],
    correctIndex: 1,
    explanation:
      'Good reaction plans: contain, diagnose, correct the cause, verify, and document — not endless setpoint chasing.',
  },
  {
    id: 'chc-038',
    phase: 'measure',
    topic: 'msa',
    type: 'mcq',
    difficulty: 'belt',
    prompt: 'Before a hypothesis test on a continuous CTQ, the Measure checklist should include…',
    choices: [
      'DOE center-point recipe only',
      'Kanban card artwork',
      'Operational definition, sampling plan, and adequate continuous Gage R&R',
      'Only the final control-plan owner name'
    ],
    correctIndex: 2,
    explanation:
      'Inference quality starts with clear definitions and a trustworthy measurement system.',
  },
  {
    id: 'chc-039',
    phase: 'analyze',
    topic: 'process-efficiency',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'Little’s Law WIP = 90. Throughput rises from 10 to 15 units/h after bottleneck exploit. New average LT = ?',
    choices: [
      '9 hours',
      '75 hours',
      '1,350 hours',
      '6 hours'
    ],
    correctIndex: 3,
    explanation:
      'If WIP stays 90, LT = 90/15 = 6 h (was 90/10 = 9 h). Throughput up ⇒ lead time down at constant WIP.',
  },
  {
    id: 'chc-040',
    phase: 'improve',
    topic: 'smed',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'Batch size drops from 500 to 50 after SMED. Constraint utilization for changeovers rises but FG inventory and LT fall sharply. TOC/lean reading?',
    choices: [
      'Often a good trade — protect constraint capacity for changeovers that buy flow, inventory, and responsiveness',
      'Any extra changeover on the constraint is always forbidden',
      'Batch size must never change after SMED',
      'Lower inventory always reduces throughput to zero'
    ],
    correctIndex: 0,
    explanation:
      'Constraint minutes are precious, but they can be spent on changeovers that enable smaller lots and better system flow — especially when setups became cheap via SMED.',
  },
];
