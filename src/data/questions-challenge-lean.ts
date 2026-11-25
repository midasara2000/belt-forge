import type { Question } from '../types';

export const challengeLeanQuestions: Question[] = [
  // ─── 1. Theory of Constraints / bottlenecks (11) ───────────────────────────
  {
    id: 'chl-001',
    phase: 'analyze',
    topic: 'toc',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'A three-step line has capacities of 40, 28, and 55 units/hour. WIP piles up before Step 2; Step 3 operators are often idle. Which statement is most accurate under Theory of Constraints?',
    choices: [
      'Step 2 is the system constraint; elevating Steps 1 or 3 alone will not raise throughput',
      'Step 3 is the constraint because idle labor wastes money',
      'The constraint is wherever WIP is highest, so Step 1 should be slowed first',
      'All three steps must be raised equally before any bottleneck can be named',
    ],
    correctIndex: 0,
    explanation:
      'System throughput is limited by the weakest link (28 u/h at Step 2). Extra capacity upstream only grows WIP; extra capacity downstream stays starved. Elevate the constraint (and subordinate non-constraints to it).',
    dgqTip: 'TOC: identify → exploit → subordinate → elevate → repeat. Local utilization of non-constraints is not the goal.',
  },
  {
    id: 'chl-002',
    phase: 'improve',
    topic: 'bottleneck',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'After identifying a bottleneck machine, which action best matches “exploit the constraint” before buying a new machine?',
    choices: [
      'Add overtime and a second machine in parallel immediately',
      'Protect bottleneck time: remove non-value work, quality losses, and unplanned idle from the constraint first',
      'Balance cycle times so every station runs at 100% utilization',
      'Push larger batches into the constraint to maximize setup amortization',
    ],
    correctIndex: 1,
    explanation:
      'Exploit means squeeze more throughput from existing constraint capacity (fewer interruptions, better yield, priority sequencing) before expensive elevation (extra equipment).',
    dgqTip: 'DGQ/Lean exams often separate exploit (no CapEx) from elevate (add capacity).',
  },
  {
    id: 'chl-003',
    phase: 'improve',
    topic: 'toc',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'Non-constraint Station A can produce 60/h; the constraint produces 30/h. A supervisor wants Station A at 95% utilization to “keep people busy.” What is the TOC-aligned response?',
    choices: [
      'Agree: high utilization everywhere maximizes system profit',
      'Run Station A at full rate and scrap excess to keep operators occupied',
      'Subordinate Station A to the constraint—pace it near 30/h so WIP does not explode',
      'Shut Station A until the constraint is duplicated',
    ],
    correctIndex: 2,
    explanation:
      'Subordination means non-constraints must not outrun the bottleneck. Local efficiency at A creates inventory and hides problems without raising system throughput.',
  },
  {
    id: 'chl-004',
    phase: 'analyze',
    topic: 'bottleneck',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'Five sequential stations have effective rates 22, 18, 25, 18, and 30 jobs/day. Demand is 20 jobs/day. What is the maximum sustainable system throughput, and is demand met?',
    choices: [
      '30 jobs/day; demand is met',
      '22 jobs/day; demand is met',
      '20 jobs/day; demand equals the average of all stations',
      '18 jobs/day; demand is not met',
    ],
    correctIndex: 3,
    explanation:
      'Throughput ≤ min(capacity) = 18 jobs/day. Demand of 20 exceeds the dual bottlenecks at 18, so the system cannot sustainably meet demand without elevating those constraints.',
  },
  {
    id: 'chl-005',
    phase: 'analyze',
    topic: 'toc',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'Which metric most directly indicates that a resource is a true system bottleneck rather than merely busy?',
    choices: [
      'Queues grow before it while downstream capacity remains idle, and system output tracks its rate',
      'Highest individual utilization among stations',
      'Longest setup time on the process sheet',
      'Lowest direct labor cost per piece',
    ],
    correctIndex: 0,
    explanation:
      'A bottleneck constrains system output. Persistent upstream queues plus starved downstream plus throughput matching that resource’s rate confirm it—not utilization or cost alone.',
  },
  {
    id: 'chl-006',
    phase: 'improve',
    topic: 'toc',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'Marketing wants to prioritize Product X (high margin) on a shared constraint that also makes Product Y (lower margin, but Y feeds a contractual customer). Under TOC thinking, what should guide sequencing?',
    choices: [
      'Always run the highest margin product first regardless of promises',
      'Protect system throughput and commitments: sequence the constraint for due-date and constraint-throughput contribution, not local margin myths alone',
      'Maximize constraint utilization with whichever SKU has shortest cycle time',
      'Split the constraint 50/50 by calendar week to be “fair”',
    ],
    correctIndex: 1,
    explanation:
      'Constraint scheduling should maximize throughput of the system (and keep market commitments). Blind margin ranking or fairness splits can destroy due-date performance and true throughput.',
    dgqTip: 'TOC drum–buffer–rope: the constraint sets the beat; buffers protect it; release is tied to the drum.',
  },
  {
    id: 'chl-007',
    phase: 'analyze',
    topic: 'bottleneck',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'Why can “optimizing” every department’s efficiency score reduce overall plant throughput?',
    choices: [
      'Efficiency scores always ignore quality',
      'Throughput can only increase if efficiency falls',
      'Local optima (keeping every resource busy) often overproduce relative to the constraint and inflate WIP/lead time',
      'Plant throughput is the sum of departmental efficiencies',
    ],
    correctIndex: 2,
    explanation:
      'Classic local vs system optimization conflict: non-constraint efficiency drives overproduction, queues, and delayed flow without raising the constrained output rate.',
  },
  {
    id: 'chl-008',
    phase: 'improve',
    topic: 'toc',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'You elevated a packing constraint; packing capacity is now 50/h while machining is 35/h. What should happen next in the TOC five-focusing steps?',
    choices: [
      'Stop improving; packing was the original project charter',
      'Keep subordinating everything to packing because it was once the constraint',
      'Increase batch sizes everywhere to absorb the extra packing capacity',
      'Identify the new constraint (machining), then exploit/subordinate/elevate again',
    ],
    correctIndex: 3,
    explanation:
      'After elevation, the constraint moves. Return to “identify” and realign buffers and release rules to the new weak link—here machining at 35/h.',
  },
  {
    id: 'chl-009',
    phase: 'analyze',
    topic: 'toc',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'In drum–buffer–rope (DBR), what does the “rope” primarily control?',
    choices: [
      'Material release into the system so release is synchronized to the constraint (drum)',
      'The statistical control limits on the finished-goods chart',
      'How many operators stand at the bottleneck',
      'Customer order entry cut-off times only',
    ],
    correctIndex: 0,
    explanation:
      'The rope ties release of work to the drum (constraint pace), preventing uncontrolled push that floods the shop ahead of the bottleneck.',
  },
  {
    id: 'chl-010',
    phase: 'improve',
    topic: 'bottleneck',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'A constraint loses 2 hours/shift to waiting for tools and 1 hour to rework caused upstream. Available shift is 8 hours; net processing rate when running is 40 units/h. What is the best first leverage to raise throughput?',
    choices: [
      'Buy a second identical machine before fixing losses',
      'Exploit: cut tool wait and prevent upstream defects that steal constraint time—recovering ~3 h × 40 = ~120 units/shift before CapEx',
      'Ignore rework; only tool wait matters',
      'Lengthen the shift by unpaid overtime only',
    ],
    correctIndex: 1,
    explanation:
      'Constraint time lost to waiting and rework is pure throughput loss. Recovering ~3 productive hours at 40 u/h yields ~120 extra units/shift—classic exploit before elevate.',
  },
  {
    id: 'chl-011',
    phase: 'analyze',
    topic: 'toc',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'Which statement correctly distinguishes a capacity-constrained resource (CCR) from a temporary blockage?',
    choices: [
      'Any station with a red andon is a CCR by definition',
      'Temporary blockages always have higher utilization than CCRs',
      'A CCR chronically limits system output; a temporary blockage is an incident that does not set the long-run throughput ceiling',
      'CCRs only exist in continuous-flow chemical plants',
    ],
    correctIndex: 2,
    explanation:
      'TOC focuses on resources that set sustainable throughput. Transient jams need containment; chronic CCRs need exploit/elevate and subordination rules.',
  },

  // ─── 2. Takt time vs cycle time (8) ────────────────────────────────────────
  {
    id: 'chl-012',
    phase: 'analyze',
    topic: 'takt',
    type: 'calc',
    difficulty: 'belt',
    prompt:
      'Available production time is 450 minutes per day. Customer demand is 150 units/day. What is takt time?',
    choices: [
      '0.33 min/unit',
      '150 min/unit',
      '450 units/min',
      '3.0 min/unit',
    ],
    correctIndex: 3,
    explanation:
      'Takt = available time / demand = 450 / 150 = 3.0 minutes per unit. It is the customer’s required pace, not the process’s actual cycle time.',
    dgqTip: 'Memorize: takt = available time ÷ demand. Cycle time is how long the process actually takes.',
  },
  {
    id: 'chl-013',
    phase: 'analyze',
    topic: 'takt',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'Two shifts provide 2 × 7.5 h = 15 h available after breaks. Demand is 900 pieces/day. Takt is?',
    choices: [
      '1.0 min/piece',
      '1.5 min/piece',
      '0.017 min/piece',
      '15 min/piece',
    ],
    correctIndex: 0,
    explanation:
      'Available time = 15 h × 60 = 900 minutes. Takt = 900 min / 900 pieces = 1.0 min/piece.',
  },
  {
    id: 'chl-014',
    phase: 'analyze',
    topic: 'takt',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'Takt is 2.0 min/unit. Observed cycle times: A=1.6, B=2.4, C=1.9 min/unit (single piece flow). What is the correct interpretation?',
    choices: [
      'The line is fine because the average cycle time is under takt',
      'Station B cannot meet demand; it is over takt and will constrain flow unless improved or parallelized',
      'Only Station A matters because it is fastest',
      'Takt should be raised to 2.4 to match the slowest station',
    ],
    correctIndex: 1,
    explanation:
      'Every station’s effective cycle time must be ≤ takt (with planned buffers/flexibility). B at 2.4 > 2.0 cannot sustain demand; raising takt to match B abandons the customer pace.',
  },
  {
    id: 'chl-015',
    phase: 'improve',
    topic: 'takt',
    type: 'calc',
    difficulty: 'belt',
    prompt:
      'Net available time is 27,000 seconds/shift. Demand is 180 units/shift. Operators plan 10% planned downtime buffer inside available time already netted. What takt should line design use?',
    choices: [
      '135 s/unit',
      '180 s/unit',
      '150 s/unit',
      '270 s/unit',
    ],
    correctIndex: 2,
    explanation:
      'If 27,000 s is already net available, takt = 27,000 / 180 = 150 s/unit. Do not divide again by the 10% that was already removed from gross time.',
  },
  {
    id: 'chl-016',
    phase: 'analyze',
    topic: 'takt',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'Which statement correctly contrasts takt time and cycle time?',
    choices: [
      'Takt is measured with a stopwatch at the bottleneck; cycle time is set by sales',
      'Cycle time is the customer beat; takt is actual process time per unit',
      'They are synonyms used interchangeably in VSM',
      'Takt is the demand-driven available-time-per-unit; cycle time is the actual process time per unit',
    ],
    correctIndex: 3,
    explanation:
      'Takt = available time / demand (target pace). Cycle time is observed process time per piece. Design aims for cycle ≤ takt.',
  },
  {
    id: 'chl-017',
    phase: 'analyze',
    topic: 'takt',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'Customer demand is 2,400 units/week. Plant runs 5 days, 2 shifts × 400 available minutes/shift. What is daily takt?',
    choices: [
      '1.67 min/unit',
      '1.0 min/unit',
      '2.0 min/unit',
      '0.5 min/unit',
    ],
    correctIndex: 0,
    explanation:
      'Daily demand = 2,400 / 5 = 480 units. Daily available = 2 × 400 = 800 min. Takt = 800 / 480 ≈ 1.67 min/unit.',
  },
  {
    id: 'chl-018',
    phase: 'improve',
    topic: 'takt',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'Demand spikes 25% for four weeks. Current cycle time equals the old takt. Which response is most consistent with takt-based design?',
    choices: [
      'Ignore the spike; takt is historical and must never change',
      'Recalculate takt with the new demand and available time; then rebalance, add flex capacity, or level load',
      'Double all batch sizes to absorb the spike',
      'Move the entire schedule to push MRP without revising takt',
    ],
    correctIndex: 1,
    explanation:
      'Takt follows demand and available time. A demand increase shortens takt; the line must be rebalanced or capacity elevated to keep cycle ≤ new takt.',
  },
  {
    id: 'chl-019',
    phase: 'analyze',
    topic: 'takt',
    type: 'calc',
    difficulty: 'belt',
    prompt:
      'Available time = 22,500 s. Demand = 125 units. Manual cycle time = 200 s. How many parallel operators (or stations) are minimally required to meet takt, assuming perfect balance?',
    choices: [
      '1',
      '3',
      '2',
      '4',
    ],
    correctIndex: 2,
    explanation:
      'Takt = 22,500 / 125 = 180 s. Required staffing ≈ cycle/takt = 200/180 ≈ 1.11 → at least 2 parallel resources after practical rounding and imbalance.',
  },

  // ─── 3. Throughput, lead time, WIP, PCE (10) ───────────────────────────────
  {
    id: 'chl-020',
    phase: 'analyze',
    topic: 'wip',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'Average WIP is 240 units. Throughput is 30 units/day. Using Little’s Law, what is average lead time (flow time)?',
    choices: [
      '0.125 days',
      '270 days',
      '30 days',
      '8 days',
    ],
    correctIndex: 3,
    explanation:
      'Little’s Law: Lead time = WIP / Throughput = 240 / 30 = 8 days.',
    dgqTip: 'LT = WIP / TH (consistent units). Cutting WIP at constant throughput shortens lead time.',
  },
  {
    id: 'chl-021',
    phase: 'analyze',
    topic: 'throughput',
    type: 'calc',
    difficulty: 'belt',
    prompt:
      'WIP averages 90 orders; average lead time is 6 days. What throughput does Little’s Law imply?',
    choices: [
      '15 orders/day',
      '540 orders/day',
      '6 orders/day',
      '84 orders/day',
    ],
    correctIndex: 0,
    explanation:
      'Throughput = WIP / Lead time = 90 / 6 = 15 orders/day.',
  },
  {
    id: 'chl-022',
    phase: 'analyze',
    topic: 'process-efficiency',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'Value-adding time totals 48 minutes. Door-to-door lead time is 16 hours. What is process cycle efficiency (PCE)?',
    choices: [
      '48%',
      '5%',
      '33%',
      '300%',
    ],
    correctIndex: 1,
    explanation:
      'PCE = VA / Lead time. Lead time = 16 × 60 = 960 min. PCE = 48 / 960 = 0.05 = 5%.',
    dgqTip: 'Keep units consistent. Necessary non-value-add is not in the VA numerator for standard PCE.',
  },
  {
    id: 'chl-023',
    phase: 'analyze',
    topic: 'value-time',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'A VSM shows 12 min machining (VA), 4 min inspection (often NVA), 3 days queue, and 20 min move. Which change most improves PCE?',
    choices: [
      'Make inspection more thorough to raise VA minutes',
      'Add more move steps to “balance” the map',
      'Reduce queue/wait so lead time falls while VA stays similar',
      'Increase batch size so machining runs longer per setup',
    ],
    correctIndex: 2,
    explanation:
      'PCE rises when lead time drops relative to VA. Queues dominate lead time; shrinking wait improves PCE far more than polishing already-short touch time.',
  },
  {
    id: 'chl-024',
    phase: 'analyze',
    topic: 'lead-time',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'If throughput is held constant and average WIP is cut in half, Little’s Law predicts average lead time will:',
    choices: [
      'Double',
      'Stay the same',
      'Become zero',
      'Halve',
    ],
    correctIndex: 3,
    explanation:
      'LT = WIP / TH. With TH fixed, halving WIP halves lead time—core rationale for WIP caps and pull.',
  },
  {
    id: 'chl-025',
    phase: 'analyze',
    topic: 'vsm',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'Current-state VSM: process times 5 + 8 + 7 = 20 min VA. Inventory delays total 2.5 days (use 8 h/day). Approximate PCE?',
    choices: [
      '~1.7%',
      '~8%',
      '~20%',
      '~40%',
    ],
    correctIndex: 0,
    explanation:
      'Lead time ≈ 2.5 × 8 × 60 = 1,200 min (+20 min processing if included ≈ 1,220). PCE ≈ 20 / 1,220 ≈ 1.6–1.7%. Delay dwarfs touch time.',
  },
  {
    id: 'chl-026',
    phase: 'improve',
    topic: 'throughput',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'A plant raises local efficiencies and fills every buffer; WIP doubles while shipping rate stays flat. What happened?',
    choices: [
      'Throughput rose because utilization rose',
      'Lead time roughly doubled with flat throughput—flow worsened despite “efficiency”',
      'Little’s Law no longer applies when efficiency rises',
      'PCE automatically improved',
    ],
    correctIndex: 1,
    explanation:
      'Constant TH + higher WIP ⇒ longer LT. Local utilization without a throughput gain is inventory, not improvement.',
  },
  {
    id: 'chl-027',
    phase: 'analyze',
    topic: 'wip',
    type: 'calc',
    difficulty: 'belt',
    prompt:
      'Target lead time is 4 days; expected throughput is 25 units/day. What average WIP should a kanban/WIP cap roughly allow?',
    choices: [
      '6.25 units',
      '29 units',
      '100 units',
      '4 units',
    ],
    correctIndex: 2,
    explanation:
      'WIP ≈ TH × LT = 25 × 4 = 100 units. Caps near this level support the lead-time target.',
  },
  {
    id: 'chl-028',
    phase: 'analyze',
    topic: 'process-efficiency',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'Which action can reduce PCE even if operators work faster on value-adding steps?',
    choices: [
      'Cutting waiting between steps',
      'Removing unnecessary inspections that were pure delay',
      'Single-piece flow that collapses queues',
      'Increasing lot size so parts wait longer in batches, stretching lead time more than VA shrinks',
    ],
    correctIndex: 3,
    explanation:
      'Larger batches inflate wait/lead time. Even if touch time drops slightly, PCE = VA/LT often falls when LT balloons.',
  },
  {
    id: 'chl-029',
    phase: 'analyze',
    topic: 'lead-time',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'Two value streams ship at 40 units/day. Stream A averages 80 WIP; Stream B averages 200 WIP. Which has the shorter average lead time?',
    choices: [
      'Stream A: LT ≈ 2 days vs B ≈ 5 days',
      'Stream B (higher WIP means faster)',
      'They are equal because throughput matches',
      'Cannot tell without takt',
    ],
    correctIndex: 0,
    explanation:
      'LT_A = 80/40 = 2 days; LT_B = 200/40 = 5 days. Same throughput, lower WIP → shorter lead time.',
  },

  // ─── 4. Capacity, balancing, SMED / batch / flow (9) ───────────────────────
  {
    id: 'chl-030',
    phase: 'analyze',
    topic: 'capacity',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'A cell has 3 stations in series. Each has 480 available min/day. Cycle times: 4, 6, and 5 min/unit. Ignoring scrap, what is daily capacity of the cell?',
    choices: [
      '120 units (limited by 4 min station)',
      '80 units (limited by 6 min station)',
      '96 units (limited by 5 min station)',
      '480 units',
    ],
    correctIndex: 1,
    explanation:
      'Capacity at each station = 480 / CT → 120, 80, 96. Cell capacity = min = 80 units/day (6 min station).',
  },
  {
    id: 'chl-031',
    phase: 'improve',
    topic: 'capacity',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'Line balance: takt = 60 s. Work content elements total 220 s. What is the theoretical minimum number of stations?',
    choices: [
      '2',
      '3',
      '4',
      '60',
    ],
    correctIndex: 2,
    explanation:
      'Minimum stations = total work content / takt = 220 / 60 ≈ 3.67 → 4 stations (ceil). Actual may need more due to indivisibility.',
  },
  {
    id: 'chl-032',
    phase: 'improve',
    topic: 'smed',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'In SMED, converting internal setup to external primarily enables which flow benefit?',
    choices: [
      'Longer runs so OEE looks better',
      'Elimination of all quality checks',
      'Pushing larger MRP time fences',
      'Shorter changeovers → economical smaller batches → less WIP and smoother flow',
    ],
    correctIndex: 3,
    explanation:
      'SMED cuts setup so lot sizes can shrink without crushing capacity, enabling flow, lower WIP, and faster response.',
    dgqTip: 'Internal = machine stopped; external = while running. Move internal → external, then streamline remaining internal.',
  },
  {
    id: 'chl-033',
    phase: 'analyze',
    topic: 'smed',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'Changeover is 40 min. Processing is 1 min/unit. If EOQ-style “economic” batch must keep setup ≤ 10% of run time, what minimum batch size meets that rule of thumb?',
    choices: [
      '400 units',
      '40 units',
      '100 units',
      '4 units',
    ],
    correctIndex: 0,
    explanation:
      'Setup ≤ 0.10 × batch × 1 min ⇒ 40 ≤ 0.10 × batch ⇒ batch ≥ 400. (Illustrates why long setups force large batches.)',
  },
  {
    id: 'chl-034',
    phase: 'improve',
    topic: 'smed',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'After SMED, changeover falls from 40 min to 8 min. Using the same 10%-of-run-time rule and 1 min/unit processing, the new minimum batch is 80. What is the main system effect?',
    choices: [
      'Throughput must fall because setups occur more often',
      'WIP and lead time tend to fall as smaller lots flow more often',
      'Takt time automatically doubles',
      'Little’s Law ceases to apply',
    ],
    correctIndex: 1,
    explanation:
      'Shorter setups justify smaller lots → less queueing inventory → shorter lead times, often with equal or better service if capacity is planned for more frequent changeovers.',
  },
  {
    id: 'chl-035',
    phase: 'analyze',
    topic: 'capacity',
    type: 'calc',
    difficulty: 'belt',
    prompt:
      'A machine has 420 min available. Each unit needs 3 min process time. Setup is 30 min per 60-unit batch. Running repeated 60-unit batches, what is effective capacity?',
    choices: [
      '140 units/day (ignoring setup)',
      '420 units/day',
      '120 units/day',
      '60 units/day',
    ],
    correctIndex: 2,
    explanation:
      'Time per batch = 30 + 60×3 = 210 min. Batches/day = 420/210 = 2 → 120 units/day. Ignoring setup would falsely suggest 420/3 = 140.',
  },
  {
    id: 'chl-036',
    phase: 'improve',
    topic: 'capacity',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'Yamazumi shows Station 3 at 95% of takt while Stations 1–2 sit at 55%. Best balancing move?',
    choices: [
      'Speed up Stations 1–2 to 95% to equalize utilization',
      'Add WIP before Station 3 so it never starves',
      'Ignore balance; only OEE of Station 3 matters',
      'Move selected elements from Station 3 to under-loaded stations until loads approach takt without exceeding it',
    ],
    correctIndex: 3,
    explanation:
      'Line balance redistributes work content so no station exceeds takt and idle imbalance shrinks—enabling flow at customer pace.',
  },
  {
    id: 'chl-037',
    phase: 'analyze',
    topic: 'capacity',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'Effective capacity is lower than rated capacity mainly because of:',
    choices: [
      'Availability losses, performance losses, quality losses, and required setups/changeovers',
      'Takt being longer than cycle time',
      'Kanban card counts being even',
      'PCE exceeding 50%',
    ],
    correctIndex: 0,
    explanation:
      'Rated/ideal capacity assumes perfect uptime. Effective capacity nets out downtime, speed loss, scrap/rework, and setup time.',
  },
  {
    id: 'chl-038',
    phase: 'improve',
    topic: 'smed',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'A team still does die cleaning while the press is stopped, though cleaning could be done on a spare die offline. What SMED classification error is this?',
    choices: [
      'Treating an internal task as external correctly',
      'Treating an external task as internal, inflating downtime',
      'A two-bin pull mistake',
      'A PCE numerator error',
    ],
    correctIndex: 1,
    explanation:
      'Work that can occur while the machine runs (external) but is done during stoppage wastes constraint/internal time. Move it external.',
  },

  // ─── 5. Pull vs push, two-bin, supermarket (7) ─────────────────────────────
  {
    id: 'chl-039',
    phase: 'improve',
    topic: 'pull-systems',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'What is the defining difference between pull and push production?',
    choices: [
      'Pull uses machines; push uses people',
      'Pull always means zero inventory',
      'Push releases work from upstream schedules/forecasts; pull authorizes upstream replenishment based on downstream consumption',
      'Push is Lean; pull is MRP-only',
    ],
    correctIndex: 2,
    explanation:
      'Pull ties upstream production to actual downstream use (kanban/supermarket signals). Push launches orders by plan regardless of current downstream need.',
  },
  {
    id: 'chl-040',
    phase: 'analyze',
    topic: 'pull-systems',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'A supermarket between machining and assembly empties repeatedly while machining shows high utilization on non-needed SKUs. Root issue?',
    choices: [
      'Supermarkets are incompatible with assembly',
      'Takt is undefined in assembly only',
      'Little’s Law forbids supermarkets',
      'Machining is pushing preferred SKUs instead of replenishing what assembly actually pulled',
    ],
    correctIndex: 3,
    explanation:
      'Classic mixed-model failure: upstream optimizes local schedule/utilization rather than filling emptied kanban/supermarket slots—starving assembly of the right parts.',
  },
  {
    id: 'chl-041',
    phase: 'improve',
    topic: 'pull-systems',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'Two-bin kanban for a consumable fastener is most appropriate when:',
    choices: [
      'Usage is relatively steady, lead time to refill is known, and bins can cover replenishment time',
      'Demand is extremely sporadic and each order is engineered-to-order',
      'You want infinite WIP at every station',
      'Cycle time exceeds takt by design',
    ],
    correctIndex: 0,
    explanation:
      'Two-bin suits repetitive consumables: empty bin triggers refill; remaining bin covers lead time. Poor fit for highly erratic ETO demand.',
  },
  {
    id: 'chl-042',
    phase: 'analyze',
    topic: 'pull-systems',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'Average demand 20 boxes/day; replenishment lead time 2 days; safety stock 1 day demand. Rough two-bin quantity per bin (covering LT + safety)?',
    choices: [
      '20 boxes',
      '60 boxes',
      '40 boxes',
      '3 boxes',
    ],
    correctIndex: 1,
    explanation:
      'Coverage ≈ demand × (LT + safety days) = 20 × (2 + 1) = 60 boxes for the loop; often each bin is sized to that replenishment quantity (policy variants exist).',
  },
  {
    id: 'chl-043',
    phase: 'improve',
    topic: 'pull-systems',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'Finished-goods supermarket is oversized “just in case,” and lead time through the plant is long despite pull cards. Best diagnosis?',
    choices: [
      'Pull always increases lead time',
      'Eliminate all buffers including constraint buffers',
      'Excess supermarket WIP still lengthens system lead time (Little’s Law); right-size cards/slots to demand and replenishment time',
      'Replace pull with unlimited push to empty the market',
    ],
    correctIndex: 2,
    explanation:
      'Pull caps WIP but oversized kanban equals authorized excess inventory. Right-sizing restores the lead-time benefit.',
  },
  {
    id: 'chl-044',
    phase: 'analyze',
    topic: 'pull-systems',
    type: 'mcq',
    difficulty: 'master',
    prompt:
      'Upstream process is a true bottleneck shared by many SKUs. Which pull design caution is most important?',
    choices: [
      'Never use any buffer before a bottleneck',
      'Push maximum variety every hour to be fair',
      'Disable kanban because TOC and pull cannot coexist',
      'Protect the constraint with an adequate buffer; still pull/release carefully so non-constraint SKUs do not steal constraint time from hot needs',
    ],
    correctIndex: 3,
    explanation:
      'DBR/pull hybrids keep a buffer at the drum and use signals so release serves the constraint’s schedule—not chaotic SKU chasing.',
  },
  {
    id: 'chl-045',
    phase: 'improve',
    topic: 'pull-systems',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'A team switches from weekly MRP push launches to kanban replenishment. Scrap and rework spikes briefly then falls; WIP drops 40%. What outcome aligns with flow theory?',
    choices: [
      'Average lead time should fall roughly with WIP if throughput holds—visibility of problems may spike then improve',
      'Lead time should rise because kanban adds cards',
      'Throughput must fall 40%',
      'PCE cannot change when pull is introduced',
    ],
    correctIndex: 0,
    explanation:
      'Lower WIP at stable throughput shortens LT (Little’s Law). Pull exposes issues faster; after containment, flow and PCE typically improve.',
    dgqTip: 'Pull is a WIP-control mechanism tied to demand—not a promise of zero inventory.',
  },

];
