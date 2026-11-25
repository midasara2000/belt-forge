import type { Question } from '../types';

export const challengeStatsQuestions: Question[] = [
  // ─── Capability Cp / Cpk (12) ──────────────────────────────────────────────
  {
    id: 'chs-001',
    phase: 'measure',
    topic: 'capability',
    type: 'calc',
    difficulty: 'belt',
    prompt:
      'Stable normal process: LSL = 50, USL = 80, σ = 5. What is Cp?',
    choices: ['0.50', '1.00', '1.50', '2.00'],
    correctIndex: 1,
    explanation:
      'Cp = (USL − LSL) / (6σ) = (80 − 50) / (6 × 5) = 30 / 30 = 1.00.\n\nA common error is dividing by 3σ (gives 2.00) or using only one-sided distance from the mean.',
    dgqTip: 'Cp ignores centering — always pair with Cpk when the mean may be off-target.',
  },
  {
    id: 'chs-002',
    phase: 'measure',
    topic: 'capability',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'LSL = 0, USL = 12, mean = 5, σ = 2 (stable, normal). What is Cpk (nearest 0.01)?',
    choices: ['Cpk = 1.17', 'Cpk = 1.00', 'Cpk = 0.83', 'Cpk = 2.00'],
    correctIndex: 2,
    explanation:
      'Cpl = (μ − LSL) / (3σ) = (5 − 0) / 6 = 0.833.\nCpu = (USL − μ) / (3σ) = (12 − 5) / 6 = 1.167.\nCpk = min(Cpl, Cpu) = 0.83.\n\nCp = 12 / 12 = 1.00 — do not report Cp when asked for Cpk.',
    dgqTip: 'Always compute both sides; Cpk is the tighter side.',
  },
  {
    id: 'chs-003',
    phase: 'measure',
    topic: 'capability',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'A process shows Cp = 1.67 but Cpk = 0.72. What is the most appropriate first action?',
    choices: [
      'Recenter the process toward the specification midpoint before buying more precision',
      'Ignore Cpk because Cp is already excellent',
      'Widen the specification limits to match the current mean',
      'Replace the gage — capability indices measure the measurement system',
    ],
    correctIndex: 0,
    explanation:
      'High Cp with low Cpk means the process is narrow enough relative to the tolerance but sits too close to one spec. Recentering usually recovers Cpk without capital spend.\n\nWidening specs is a customer/engineering decision, not a substitute for centering.',
  },
  {
    id: 'chs-004',
    phase: 'measure',
    topic: 'capability',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'A sponsor asks to “use the USL and LSL as control limits on the X̄ chart.” Why is that wrong?',
    choices: [
      'Control limits must always be ±6σ from the mean',
      'Specification limits only apply to attribute data',
      'USL/LSL are used only in DOE, never in Measure',
      'Control limits come from process variation (voice of the process); specs are customer requirements (voice of the customer)',
    ],
    correctIndex: 3,
    explanation:
      'Shewhart limits describe expected common-cause behavior of the process. Specs describe acceptable product. Mixing them hides special causes and misstates capability.\n\nCapability (Cp/Cpk) compares process to specs — after stability is established with proper control limits.',
    dgqTip: 'Specs ≠ control limits — a classic Black Belt trap.',
  },
  {
    id: 'chs-005',
    phase: 'measure',
    topic: 'capability',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'LSL = 20.0, USL = 30.0, σ = 1.0 (stable, normal, centered). What is Cp?',
    choices: ['0.83', '1.67', '3.00', '10.00'],
    correctIndex: 1,
    explanation:
      'Cp = (30 − 20) / (6 × 1) = 10 / 6 ≈ 1.67.\n\nDividing by σ alone (10) or by 3σ (3.33→rounded wrong) are common arithmetic traps.',
  },
  {
    id: 'chs-006',
    phase: 'measure',
    topic: 'capability',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'When a stable normal process is perfectly centered between LSL and USL, which statement holds?',
    choices: [
      'Cpk is always twice Cp',
      'Cp is undefined and only Cpk may be reported',
      'Cpk equals Cp (both sides are equal)',
      'Cpk is always zero when centered',
    ],
    correctIndex: 2,
    explanation:
      'If μ is the midpoint, Cpl = Cpu = (USL − LSL) / (6σ) = Cp, so Cpk = Cp.\n\nOff-center processes make Cpk < Cp.',
  },
  {
    id: 'chs-007',
    phase: 'measure',
    topic: 'capability',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'An X̄–R chart shows several points beyond the control limits and a clear mean shift mid-study. The team still publishes Cpk = 1.45. What is the main flaw?',
    choices: [
      'Capability indices assume a stable (in-control) process; quoting Cpk on an unstable process is misleading',
      'Cpk can only be computed from attribute data',
      'Cpk must always be reported as an integer',
      'Any Cpk above 1.33 is automatically valid regardless of stability',
    ],
    correctIndex: 0,
    explanation:
      'Stability first, then capability. Special-cause instability inflates or deflates σ̂ and can make Cpk look better or worse than the steady-state process.\n\nInvestigate and remove assignable causes (or stratify regimes) before claiming capability.',
  },
  {
    id: 'chs-008',
    phase: 'measure',
    topic: 'capability',
    type: 'mcq',
    difficulty: 'master',
    prompt:
      'In many Six Sigma curricula, how do Pp/Ppk conceptually differ from Cp/Cpk?',
    choices: [
      'Pp/Ppk use only the specification width; Cp/Cpk ignore specs',
      'Pp/Ppk are for attribute data; Cp/Cpk are for continuous data only',
      'Pp/Ppk replace MSA and make Gage R&R unnecessary',
      'Pp/Ppk typically use overall (long-term) variation; Cp/Cpk use within-subgroup (short-term) variation',
    ],
    correctIndex: 3,
    explanation:
      'Cp/Cpk often use short-term σ (e.g. from R̄/d2 within subgroups). Pp/Ppk use the overall sample standard deviation, reflecting long-term performance including shifts.\n\nBoth still require a meaningful distributional basis and trustworthy measurement.',
  },
  {
    id: 'chs-009',
    phase: 'measure',
    topic: 'capability',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'LSL = 100, USL = 160, μ = 140, σ = 8. Which side drives Cpk, and what is Cpk?',
    choices: [
      'Lower side; Cpk = 1.67',
      'Upper side; Cpk = 0.83',
      'Upper side; Cpk = 1.25',
      'Lower side; Cpk = 0.83',
    ],
    correctIndex: 1,
    explanation:
      'Cpl = (140 − 100) / (3 × 8) = 40 / 24 ≈ 1.67.\nCpu = (160 − 140) / 24 = 20 / 24 ≈ 0.83.\nCpk = min = 0.83, driven by the upper side (mean closer to USL).\n\nCp = 60 / 48 = 1.25 — not the answer asked.',
  },
  {
    id: 'chs-010',
    phase: 'measure',
    topic: 'capability',
    type: 'calc',
    difficulty: 'belt',
    prompt:
      'Tolerance width = 18, estimated σ = 2.25. What is Cp?',
    choices: ['0.75', '1.00', '1.33', '2.25'],
    correctIndex: 2,
    explanation:
      'Cp = (USL − LSL) / (6σ) = 18 / (6 × 2.25) = 18 / 13.5 = 1.33.\n\nUsing 3σ in the denominator (18/6.75 = 2.67) is a frequent slip.',
  },
  {
    id: 'chs-011',
    phase: 'measure',
    topic: 'capability',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'One-sided upper spec only: USL = 50, μ = 44, σ = 2. What is Cpu (often used as Cpk for unilateral specs)?',
    choices: ['1.00', '1.50', '3.00', '0.50'],
    correctIndex: 0,
    explanation:
      'Cpu = (USL − μ) / (3σ) = (50 − 44) / 6 = 6 / 6 = 1.00.\n\nThere is no LSL, so Cp (two-sided) is not defined the usual way; report the appropriate one-sided index.',
  },
  {
    id: 'chs-012',
    phase: 'measure',
    topic: 'capability',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'A Black Belt reports Cpk = 0.55 for a CTQ. What does this imply for a roughly normal process?',
    choices: [
      'Virtually no units will fall outside specs',
      'The process is centered perfectly; only MSA remains',
      'Cpk below 1 means the measurement system failed Gage R&R',
      'Substantial nonconformance is expected — the process spread and/or centering cannot meet the specs',
    ],
    correctIndex: 3,
    explanation:
      'Cpk < 1 means the nearer spec is inside the ±3σ process band, so a non-negligible fraction of output is expected out of spec (exact ppm depends on normality and both sides).\n\nCpk does not diagnose the gage; that is MSA.',
  },

  // ─── Defect metrics DPU / DPMO / ppm / yield (10 calc) ─────────────────────
  {
    id: 'chs-013',
    phase: 'measure',
    topic: 'process-performance',
    type: 'calc',
    difficulty: 'belt',
    prompt:
      '5,000 units inspected, 4 opportunities per unit, 60 defects found. What is DPMO?',
    choices: ['12,000', '3,000', '30,000', '60'],
    correctIndex: 1,
    explanation:
      'DPMO = defects / (units × opportunities) × 1,000,000 = 60 / (5,000 × 4) × 1e6 = 60 / 20,000 × 1e6 = 3,000.\n\nUsing units only: 60/5000×1e6 = 12,000 — that is not DPMO when opportunities > 1.',
    dgqTip: 'Always multiply units by opportunities in the DPMO denominator.',
  },
  {
    id: 'chs-014',
    phase: 'measure',
    topic: 'process-performance',
    type: 'calc',
    difficulty: 'belt',
    prompt: '240 defects observed in 8,000 units. What is DPU?',
    choices: ['0.003', '0.24', '0.03', '3.0'],
    correctIndex: 2,
    explanation:
      'DPU = defects / units = 240 / 8,000 = 0.03.\n\nDo not confuse with DPMO (×1e6 / opportunities) or percent defective.',
  },
  {
    id: 'chs-015',
    phase: 'measure',
    topic: 'process-performance',
    type: 'calc',
    difficulty: 'belt',
    prompt:
      '125 defective units in a lot of 25,000. What is ppm defective?',
    choices: ['5,000 ppm', '125 ppm', '500 ppm', '20,000 ppm'],
    correctIndex: 0,
    explanation:
      'ppm defective = (defectives / units) × 1,000,000 = 125 / 25,000 × 1e6 = 5,000.\n\nppm tracks defectives (units), while DPMO tracks defects across opportunities.',
  },
  {
    id: 'chs-016',
    phase: 'measure',
    topic: 'process-performance',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'DPU = 0.05 and defects occur approximately as a Poisson process. Approximate throughput yield e^(−DPU) is closest to…',
    choices: ['5%', '50%', '90%', '95%'],
    correctIndex: 3,
    explanation:
      'Y ≈ e^(−0.05) ≈ 0.9512 ≈ 95%.\n\nA common mistake is reporting 1 − DPU = 95% as if defects were mutually exclusive on units with at most one defect — that coincides numerically here but the Poisson model is the principled link used in Six Sigma texts.',
  },
  {
    id: 'chs-017',
    phase: 'measure',
    topic: 'process-performance',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'A PCB has 12 solder joints (opportunities). In 2,000 boards you find 96 joint defects. What is DPMO?',
    choices: ['4,000', '48,000', '96', '0.048'],
    correctIndex: 0,
    explanation:
      'Total opportunities = 2,000 × 12 = 24,000.\nDPMO = 96 / 24,000 × 1e6 = 4,000.\n\nDPU = 96/2000 = 0.048 (defects per board), which is not DPMO.',
  },
  {
    id: 'chs-018',
    phase: 'measure',
    topic: 'process-performance',
    type: 'calc',
    difficulty: 'belt',
    prompt:
      'Among 1,000 units there are 40 defectives. Some defectives have multiple defects; total defects = 70. What are DPU and the defective rate?',
    choices: [
      'DPU = 0.04; defective rate = 7%',
      'DPU = 70; defective rate = 40',
      'DPU = 0.07; defective rate = 4%',
      'DPU = 0.004; defective rate = 0.7%',
    ],
    correctIndex: 2,
    explanation:
      'DPU = defects/units = 70/1000 = 0.07.\nDefective rate = defectives/units = 40/1000 = 4%.\n\nDefects and defectives are different counts — swapping them is a classic error.',
  },
  {
    id: 'chs-019',
    phase: 'measure',
    topic: 'process-performance',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'Three process steps in series have first-pass yields 0.98, 0.95, and 0.90. What is the rolled throughput yield (RTY)?',
    choices: ['0.838', '0.943', '2.83', '0.90'],
    correctIndex: 0,
    explanation:
      'RTY = ∏ FTY_i = 0.98 × 0.95 × 0.90 = 0.8379 ≈ 0.838.\n\nAveraging yields (≈0.943) or taking the minimum (0.90) understates the compounding loss through the chain.',
  },
  {
    id: 'chs-020',
    phase: 'measure',
    topic: 'process-performance',
    type: 'calc',
    difficulty: 'belt',
    prompt:
      'DPMO = 2,500 with 5 opportunities per unit. For 10,000 units, how many defects are expected?',
    choices: ['25', '250', '2,500', '125'],
    correctIndex: 3,
    explanation:
      'DPMO = defects / (units × opp) × 1e6 ⇒ defects = DPMO × units × opp / 1e6\n= 2,500 × 10,000 × 5 / 1,000,000 = 125.\n\nForgetting opportunities yields 25 — a common trap.',
  },
  {
    id: 'chs-021',
    phase: 'measure',
    topic: 'process-performance',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'A line runs at about 3.4 DPMO (classic “Six Sigma” long-term claim with 1.5σ shift lore). For 1 opportunity per unit, approx. how many defectives per million units?',
    choices: ['3.4 million', '3.4', '340', '34,000'],
    correctIndex: 1,
    explanation:
      'With one opportunity per unit, DPMO numerically equals ppm defectives: ≈ 3.4 ppm → about 3.4 defectives per million units.\n\nDo not multiply by 1e6 again.',
  },
  {
    id: 'chs-022',
    phase: 'measure',
    topic: 'process-performance',
    type: 'calc',
    difficulty: 'belt',
    prompt:
      'From DPU = 0.12, using Y ≈ e^(−DPU), which yield is closest?',
    choices: ['12%', '88%', '89%', '98%'],
    correctIndex: 2,
    explanation:
      'e^(−0.12) ≈ 0.8869 ≈ 89%.\n\n1 − DPU = 88% is a rough linear approximation that understates yield slightly versus the Poisson model when multiple defects per unit are possible.',
  },

  // ─── Charts: selection & interpretation (12 scenario) ─────────────────────
  {
    id: 'chs-023',
    phase: 'measure',
    topic: 'charts',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'A Pareto of defect codes shows types A–E at 420, 95, 80, 30, and 25. What is the strongest interpretation?',
    choices: [
      'Type A alone is nearly half of all defects — prioritize understanding and attacking A first',
      'All five types are equally important because five bars appear',
      'A Pareto proves Type A is the root cause without further data',
      'You should start with Type E because it is rarest',
    ],
    correctIndex: 0,
    explanation:
      'Total = 650; A is 420/650 ≈ 65%. Pareto focuses the vital few. It prioritizes categories; it does not by itself prove root cause — that needs Analyze evidence.',
  },
  {
    id: 'chs-024',
    phase: 'measure',
    topic: 'charts',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'A histogram of shaft diameter is clearly bimodal with two well-separated peaks. What should you do before quoting a single Cp?',
    choices: [
      'Average the two peaks and treat the process as normal',
      'Widen the bin width until the histogram looks unimodal',
      'Replace Cp with DPMO only',
      'Stratify (e.g. by machine/tool/cavity) — a mixture process invalidates a single normal Cp narrative',
    ],
    correctIndex: 3,
    explanation:
      'Bimodality usually means two process streams. A pooled σ and one Cp hide that each stream may have different centering and capability.\n\nStratify, then assess each population.',
  },
  {
    id: 'chs-025',
    phase: 'measure',
    topic: 'charts',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'Side-by-side box plots for Cycle Time by Shift show Shift B with a much higher median and a long upper whisker/outliers. Best next analytical move?',
    choices: [
      'Conclude Shift B is best because the box is taller',
      'Investigate Shift B’s process conditions — location and upper-tail behavior differ from other shifts',
      'Ignore box plots; only ANOVA is allowed in Measure',
      'Merge all shifts before looking at any plot',
    ],
    correctIndex: 1,
    explanation:
      'Box plots flag differences in center, spread, and outliers across groups — ideal stratification clues before formal tests.\n\nA taller box means more spread, not “better.”',
  },
  {
    id: 'chs-026',
    phase: 'measure',
    topic: 'charts',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'A run chart of daily scrap % shows nine consecutive points all above the median, climbing slowly. What does this suggest?',
    choices: [
      'Nothing — run charts cannot show patterns',
      'The process is in perfect statistical control by definition',
      'A sustained shift/trend upward in scrap — investigate assignable causes in time order',
      'You must switch immediately to a contour plot',
    ],
    correctIndex: 2,
    explanation:
      'Long runs on one side of the median and gradual climbs are classic non-random signals on a run chart. Time order reveals what averages hide.\n\nFollow up with process knowledge and, when subgrouped, a control chart.',
  },
  {
    id: 'chs-027',
    phase: 'measure',
    topic: 'control-charts',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'On an X̄ chart, one point is beyond the upper control limit, then the next subgroups return inside the limits. What is the correct reaction?',
    choices: [
      'Treat the out-of-limit point as a special-cause signal — investigate that time window even if later points look quiet',
      'Ignore single points; only trends of eight matter',
      'Immediately change the specification limits',
      'Recalculate Cp using only the out-of-control point',
    ],
    correctIndex: 0,
    explanation:
      'A point beyond control limits is a primary Shewhart signal. Later in-control points do not erase the need to investigate the assignable cause for that subgroup.\n\nWestern Electric / Nelson rules add other patterns, but UCL/LCL breaches stand alone.',
  },
  {
    id: 'chs-028',
    phase: 'measure',
    topic: 'control-charts',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'Operators redraw control limits every week using last week’s max and min observed values “so the chart always looks green.” What is wrong?',
    choices: [
      'Control limits should be redrawn every hour, not weekly',
      'Green charts are forbidden in DGQ projects',
      'Max/min limits are preferred for attribute charts only',
      'Limits should be based on a stable baseline estimate of common-cause σ — constantly refitting to recent extremes masks signals',
    ],
    correctIndex: 3,
    explanation:
      'Adapting limits to whatever just happened converts the chart into a tautology. Proper limits come from a representative in-control period (or carefully justified updates after a real process change).',
  },
  {
    id: 'chs-029',
    phase: 'measure',
    topic: 'charts',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'A scatter plot of Temperature (X) vs Yield (Y) shows points rising then falling in a clear curve. Correlation r is near zero. What is the lesson?',
    choices: [
      'r ≈ 0 proves there is no relationship of any kind',
      'Linear correlation can miss strong nonlinear association — plot first; consider transforms or quadratic terms',
      'Scatter plots are invalid when r is computed',
      'You should use a Pareto chart instead of a scatter for two continuous variables',
    ],
    correctIndex: 1,
    explanation:
      'Pearson r measures linear association. Curved relationships can average to near-zero r. Always look at the scatter before trusting a single correlation number.',
  },
  {
    id: 'chs-030',
    phase: 'measure',
    topic: 'charts',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'A normal probability plot of residuals bends systematically in the tails (S-shape). Capability software still prints Cp assuming normality. Risk?',
    choices: [
      'None — probability plots are only for DOE',
      'S-shapes always mean the gage failed',
      'Normal-based Cp/Cpk and ppm projections may be wrong — consider transformation or non-normal capability methods',
      'You should replace the probability plot with a Gantt chart',
    ],
    correctIndex: 2,
    explanation:
      'Probability plots check the normality assumption behind many capability calculations. Systematic curvature warns that tail probabilities (and thus implied ppm) can be badly misestimated.',
  },
  {
    id: 'chs-031',
    phase: 'measure',
    topic: 'charts',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'You need the right chart for counts of scratches per painted panel (area roughly constant). Which fits best?',
    choices: [
      'c-chart (or u-chart if area/opportunity varies)',
      'X̄–R chart of continuous scratch length only',
      'np-chart of continuous diameters',
      'PERT network of scratch locations',
    ],
    correctIndex: 0,
    explanation:
      'Defect counts per unit with roughly equal opportunity → c-chart; unequal opportunity → u-chart.\n\nX̄–R needs continuous subgrouped measurements; np needs defectives with fixed n.',
    dgqTip: 'Match chart family to data type: continuous / proportion / count.',
  },
  {
    id: 'chs-032',
    phase: 'measure',
    topic: 'control-charts',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'Daily lot size varies from 80 to 400 units. You track fraction defective each day. Best chart?',
    choices: [
      'X̄ chart with n = 5 always',
      'c-chart ignoring sample size',
      'Individuals chart of the raw defective count only',
      'p-chart (or Laney p′ if overdispersion) with varying n',
    ],
    correctIndex: 3,
    explanation:
      'Proportion defective with unequal sample sizes → p-chart (control limits widen/narrow with n). A plain c-chart on counts ignores unequal opportunity from lot size.',
  },
  {
    id: 'chs-033',
    phase: 'measure',
    topic: 'variation',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'A control chart is in control, yet scrap is still too high versus the business goal. What does that mean?',
    choices: [
      'In-control processes cannot have scrap',
      'The process is stable but its common-cause level may still be incapable — need process improvement, not only firefighting points',
      'Special causes must still be present if scrap exists',
      'You should stop using control charts in Measure',
    ],
    correctIndex: 1,
    explanation:
      'Stability ≠ capability. An in-control process can sit at an unacceptable average defect level. Further gains require changing the system (Improve/DOE), not chasing phantom special causes.',
  },
  {
    id: 'chs-034',
    phase: 'analyze',
    topic: 'stratification',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'Overall defect rate looks flat, but stratified run charts by Supplier show Supplier C spiking while A and B are flat. Best conclusion?',
    choices: [
      'Stratification is unnecessary once the overall chart is flat',
      'Supplier C cannot matter because the overall average is stable',
      'Hidden supplier differences exist — analyze and act on Supplier C while monitoring A/B separately',
      'Only a two-way ANOVA is allowed; charts are obsolete',
    ],
    correctIndex: 2,
    explanation:
      'Aggregation can cancel opposing or localized signals. Stratification by supplier (or shift, product, site) is often the highest-ROI Analyze step before formal modeling.',
  },

  // ─── Statistics: CI, tests, ANOVA, regression, DOE (15) ────────────────────
  {
    id: 'chs-035',
    phase: 'analyze',
    topic: 'confidence-interval',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'A 95% CI for mean cycle time is [12.1, 13.4] seconds. Correct interpretation?',
    choices: [
      'The procedure that produced this interval covers the true mean in about 95% of repeated samples; this realized interval either covers μ or it does not',
      '95% of individual units fall between 12.1 and 13.4',
      'The true mean is guaranteed to be exactly 12.75',
      'There is a 95% chance the next observation is inside the interval',
    ],
    correctIndex: 0,
    explanation:
      'A CI is about the parameter, not a prediction interval for one unit. After the sample is drawn, coverage is a property of the method, not a posterior probability that μ “lives” randomly in the interval.',
  },
  {
    id: 'chs-036',
    phase: 'analyze',
    topic: 'hypothesis',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'You test H0: μ = 100 at α = 0.05 and obtain p = 0.03. What follows?',
    choices: [
      'Fail to reject H0 because p is small',
      'Accept H0 as proven true',
      'Reject H0 at α = 0.05 — evidence against the null is strong enough under this risk threshold',
      'The Type II error rate is exactly 0.03',
    ],
    correctIndex: 2,
    explanation:
      'Decision rule: reject H0 when p ≤ α. p = 0.03 ≤ 0.05 → reject. That does not quantify practical importance; check effect size and process impact.\n\np is not β (Type II).',
  },
  {
    id: 'chs-037',
    phase: 'analyze',
    topic: 'hypothesis',
    type: 'mcq',
    difficulty: 'master',
    prompt:
      'In hypothesis testing, what is a Type II error?',
    choices: [
      'Rejecting H0 when H0 is true (false alarm)',
      'Failing to reject H0 when H0 is false (missed detection)',
      'Choosing α = 0.05',
      'Using a two-sided instead of one-sided test',
    ],
    correctIndex: 1,
    explanation:
      'Type I (α): false alarm — reject a true H0.\nType II (β): miss — fail to reject a false H0.\nPower = 1 − β.\n\nConfusing α with β is a frequent exam error.',
  },
  {
    id: 'chs-038',
    phase: 'analyze',
    topic: 'anova',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'You compare mean strength across four resin suppliers with roughly normal, equal-variance data. Which analysis fits?',
    choices: [
      'Paired t-test of supplier 1 vs 4 only, ignoring 2 and 3',
      'Simple linear regression with binary Y',
      'c-chart of resin batch codes',
      'One-way ANOVA (then multiple comparisons if significant)',
    ],
    correctIndex: 3,
    explanation:
      'One-way ANOVA tests equality of means across 3+ levels of a single factor. Pairwise cherry-picking without multiplicity control misleads.\n\nTwo-way ANOVA adds a second factor and possible interaction.',
  },
  {
    id: 'chs-039',
    phase: 'analyze',
    topic: 'anova',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'In a two-way ANOVA, Factor A and Factor B main effects look small, but the A×B interaction is highly significant. What does that mean?',
    choices: [
      'The effect of A on Y depends on the level of B (and vice versa) — interpret interaction plots, not main effects alone',
      'Interaction significant means the data are invalid',
      'You should average A and B and ignore the interaction term',
      'Main effects are always more important than interactions',
    ],
    correctIndex: 0,
    explanation:
      'A significant interaction means factors do not act additively. Optimal settings for A change with B. Report and plot the interaction; do not rely on main-effect averages alone.',
  },
  {
    id: 'chs-040',
    phase: 'analyze',
    topic: 'regression',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'Ice cream sales and drowning incidents correlate strongly over months. Best statement?',
    choices: [
      'Ice cream sales cause drownings',
      'Correlation coefficients prove causation when |r| > 0.9',
      'Association can be driven by a lurking variable (e.g. hot weather / season) — correlation ≠ causation',
      'You must never compute correlation for seasonal data',
    ],
    correctIndex: 2,
    explanation:
      'Observational correlation does not establish cause. Confounders and common causes can induce association. Causal claims need design (DOE, randomization) or strong causal inference methods plus process knowledge.',
  },
  {
    id: 'chs-041',
    phase: 'analyze',
    topic: 'regression',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'A simple linear regression of Y on X has R² = 0.64. Correct reading?',
    choices: [
      '64% of data points lie exactly on the fitted line',
      'About 64% of the variance in Y is accounted for by the linear relationship with X',
      'The slope equals 0.64',
      'p-value must be 0.64',
    ],
    correctIndex: 1,
    explanation:
      'R² is the proportion of response variance explained by the model. It is not the slope, not a p-value, and not the percent of points on the line.',
  },
  {
    id: 'chs-042',
    phase: 'analyze',
    topic: 'regression',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'In a multiple regression, coefficient of Pressure is +2.5 (p = 0.01) holding other Xs fixed. Practical reading?',
    choices: [
      'Pressure is unrelated to Y because other Xs exist',
      'Every variable in the model causes Y',
      'R² must equal 2.5',
      'A one-unit increase in Pressure is associated with a 2.5-unit increase in predicted Y, adjusting for the other predictors — still check units, collinearity, and causation',
    ],
    correctIndex: 3,
    explanation:
      'Partial coefficients are ceteris-paribus associations under the model. Statistical significance ≠ causation; also inspect VIF/collinearity and residual assumptions.',
  },
  {
    id: 'chs-043',
    phase: 'analyze',
    topic: 'regression',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'Y is pass/fail (binary). Which modeling approach is most appropriate?',
    choices: [
      'Logistic regression (models log-odds of pass/fail)',
      'Ordinary least squares with no link, forcing predictions into [0,1] by clipping only',
      'X̄–R chart of the binary codes 0/1 as if continuous capability',
      'One-way ANOVA treating fail as a continuous strength',
    ],
    correctIndex: 0,
    explanation:
      'Logistic regression is the standard for binary outcomes. Linear probability models can predict outside [0,1] and mishandle variance.\n\nControl charts for defectives use p/np — different purpose than modeling Xs.',
  },
  {
    id: 'chs-044',
    phase: 'analyze',
    topic: 'doe',
    type: 'calc',
    difficulty: 'belt',
    prompt:
      'How many unique factor-level combinations does a full factorial 2^5 design require (one replicate, no center points)?',
    choices: ['10', '32', '25', '16'],
    correctIndex: 1,
    explanation:
      '2^k full factorial → 2^5 = 32 runs for one replicate.\n\n2×5 = 10 confuses OFAT thinking; 2^4 = 16 is one factor short.',
  },
  {
    id: 'chs-045',
    phase: 'analyze',
    topic: 'doe',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'You have 11 suspected continuous factors and a tight run budget. Goal: find the vital few, not yet optimize curvature. Best first design family?',
    choices: [
      'Response surface CCD with all 11 factors immediately',
      'Full 2^11 factorial in one go',
      'Fractional factorial (or similar screening design), then follow up on active factors',
      'One-factor-at-a-time with 2 runs per factor only',
    ],
    correctIndex: 2,
    explanation:
      'Screen many factors with fractionals / Plackett–Burman-type designs despite aliasing; confirm and then optimize (RSM) once the active set is small.\n\nFull 2^11 = 2048 runs is usually impractical; RSM too early wastes effort on inactive factors.',
  },
  {
    id: 'chs-046',
    phase: 'analyze',
    topic: 'doe',
    type: 'mcq',
    difficulty: 'master',
    prompt:
      'A 2^(5−1) fractional factorial has how many runs (one replicate), and what is the usual tradeoff?',
    choices: [
      '16 runs; some effects are aliased (resolution tradeoff vs a full 32-run design)',
      '5 runs; no aliasing ever occurs in fractions',
      '32 runs; identical to the full factorial',
      '10 runs; OFAT with two levels',
    ],
    correctIndex: 0,
    explanation:
      '2^(5−1) = 16 runs. Half-fractions alias effects (e.g. main effects with higher-order interactions depending on generators/resolution).\n\nYou buy fewer runs at the cost of confounding structure you must manage.',
  },
  {
    id: 'chs-047',
    phase: 'analyze',
    topic: 'confidence-interval',
    type: 'mcq',
    difficulty: 'belt',
    prompt:
      'Other things equal, what happens to a CI for the mean when sample size n increases?',
    choices: [
      'The interval always becomes wider',
      'α automatically becomes zero',
      'The sample mean must move to the true mean after one extra point',
      'The interval tends to become narrower (standard error shrinks like 1/√n)',
    ],
    correctIndex: 3,
    explanation:
      'SE(μ̂) ≈ s/√n, so larger n tightens CIs (for fixed confidence level and variability). Width also depends on confidence level and σ.',
  },
  {
    id: 'chs-048',
    phase: 'analyze',
    topic: 'hypothesis',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'A test of process A vs B yields p = 0.40 at α = 0.05. The team says “we proved A and B are identical.” Critique?',
    choices: [
      'Correct — large p always proves exact equality',
      'Incorrect — failure to reject H0 is not proof of equality; the study may be underpowered or the effect small relative to noise',
      'Incorrect only because α should have been 0.40',
      'Correct if and only if R² > 0.9',
    ],
    correctIndex: 1,
    explanation:
      '“Nonsignificant” ≠ “equal.” Consider power, confidence intervals for the difference, and practical tolerances. Absence of evidence is not evidence of absence.',
  },
  {
    id: 'chs-049',
    phase: 'analyze',
    topic: 'stratification',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'Before running a complex multiple regression on cycle time, a Belt slices data by product family and sees one family drives almost all long times. Best practice?',
    choices: [
      'Ignore the slice — modeling all data together is always better',
      'Delete the slow family from the dataset without comment',
      'Let stratification guide scope: analyze that family separately (or include family as a factor) rather than burying the structure in one pooled model',
      'Replace all analysis with a single pie chart',
    ],
    correctIndex: 2,
    explanation:
      'Stratification often reveals the real problem structure. Pooling heterogeneous families can produce misleading coefficients and hide the actionable segment.',
  },

  // ─── MSA edge cases (6) ────────────────────────────────────────────────────
  {
    id: 'chs-050',
    phase: 'measure',
    topic: 'gage-rr',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      '%Study Variation from Gage R&R is 48%. The team wants to publish Cpk = 1.8 from the same gage. What should happen first?',
    choices: [
      'Improve the measurement system — nearly half the observed study variation is measurement noise, so capability numbers are not trustworthy yet',
      'Publish Cpk anyway; MSA is optional after Define',
      'Increase %GRR further to make Cpk larger',
      'Switch to attribute MSA formulas for continuous data',
    ],
    correctIndex: 0,
    explanation:
      'High GRR means observed process σ is contaminated by measurement error. Capability and hypothesis tests on such data mislead.\n\nGuidelines often treat %SV ≳ 30% as unacceptable / needs improvement (context-dependent), and ~10% as desirable.',
    dgqTip: 'MSA before big statistical conclusions — classic DGQ theme.',
  },
  {
    id: 'chs-051',
    phase: 'measure',
    topic: 'msa',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'A linearity study shows bias near zero at mid-range but increasingly negative bias toward the high end of the measuring range. Implication?',
    choices: [
      'Linearity is perfect because mid-range bias is zero',
      'You can ignore bias if repeatability looks good',
      'Capability at high end is automatically better',
      'Calibration/linearity problems distort readings across the range — fix measurement before trusting process stats at those levels',
    ],
    correctIndex: 3,
    explanation:
      'Linearity assesses how bias changes with reference value. Good mid-range performance does not excuse range-dependent bias. Process decisions at the high end would be systematically wrong.',
  },
  {
    id: 'chs-052',
    phase: 'measure',
    topic: 'gage-rr',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'Inspectors rate cosmetic finish as Accept/Reject. A Belt runs continuous Type II %GRR formulas on coded 0/1 values. Problem?',
    choices: [
      'None — 0/1 coding always validates continuous GRR',
      'Attribute decisions need attribute agreement analysis (e.g. kappa / percent agreement vs standard), not continuous %GRR formulas',
      'Only Cp can assess attribute systems',
      'Cosmetic ratings never require MSA',
    ],
    correctIndex: 1,
    explanation:
      'Binary/ordinal appraisal systems use attribute MSA. Forcing continuous GRR on 0/1 codes abuses variance-component assumptions and can give nonsense %Study Variation.',
  },
  {
    id: 'chs-053',
    phase: 'measure',
    topic: 'gage-rr',
    type: 'mcq',
    difficulty: 'master',
    prompt:
      'ndc (number of distinct categories) from a Gage R&R study is about 1–2. What does that imply?',
    choices: [
      'The gage can finely resolve many process groups',
      'ndc is unrelated to discrimination',
      'The measurement system barely distinguishes process variation — poor discrimination for process control/capability work',
      'ndc = 1–2 means Six Sigma level performance',
    ],
    correctIndex: 2,
    explanation:
      'ndc ≈ 1.41 × (σ_parts / σ_measurement). Values ≲ 2 mean the gage mostly cannot tell parts apart relative to measurement noise. Many guides want ndc ≥ 5 for useful process analysis.',
  },
  {
    id: 'chs-054',
    phase: 'measure',
    topic: 'msa',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'Gage R&R shows repeatability is acceptable, but reproducibility between operators dominates the GR&R. Best focus?',
    choices: [
      'Operator training, clearer operational definitions, and fixtures/methods that reduce between-operator differences',
      'Buy a noisier gage to average out operators',
      'Ignore reproducibility because repeatability passed',
      'Only change the process specifications',
    ],
    correctIndex: 0,
    explanation:
      'Reproducibility issues are people/method/setup differences. Standardize the measurement method and train before interpreting process capability.',
  },
  {
    id: 'chs-055',
    phase: 'measure',
    topic: 'msa',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'A team jumps into a 16-run DOE on temperature and pressure using a micrometer later found to have %GRR = 55%. Likely consequence?',
    choices: [
      'DOE results become more precise because noise adds information',
      'Factor effects are automatically larger and easier to detect',
      'MSA is irrelevant once DOE randomization is used',
      'Measurement noise inflates error variance — real factor effects are harder to detect and may be misestimated; fix the gage and rethink the experiment',
    ],
    correctIndex: 3,
    explanation:
      'DOE power and effect estimates depend on trustworthy Y. Huge measurement error swamps true response changes. Randomization does not remove measurement bias/noise — MSA still comes first.',
    dgqTip: 'If %Study Variation is high, do not run DOE yet.',
  },
];
