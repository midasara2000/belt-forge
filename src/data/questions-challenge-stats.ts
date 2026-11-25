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
      'LSL = 10.0, USL = 16.0, process σ = 1.0, mean μ = 13.0. What is Cp?',
    choices: [
      '1.00',
      '1.33',
      '2.00',
      '0.67'
    ],
    correctIndex: 0,
    explanation:
      'Cp = (USL − LSL) / (6σ) = (16 − 10) / (6 × 1) = 6/6 = 1.00.\n\nCp ignores centering; it only compares tolerance width to process spread.',
    dgqTip: 'Memorize Cp = tolerance / 6σ. Cpk adds the centering penalty.',
  },
  {
    id: 'chs-002',
    phase: 'measure',
    topic: 'capability',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'LSL = 10.0, USL = 16.0, σ = 1.0, μ = 14.0. What is Cpk (rounded to 2 decimals)?',
    choices: [
      '2.00',
      '0.67',
      '1.00',
      '1.33'
    ],
    correctIndex: 1,
    explanation:
      'Cpu = (USL − μ)/(3σ) = (16 − 14)/3 = 0.667.\nCpl = (μ − LSL)/(3σ) = (14 − 10)/3 = 1.333.\nCpk = min(Cpu, Cpl) ≈ 0.67.\n\nCp would still be 1.00 — the mean sits closer to the USL.',
  },
  {
    id: 'chs-003',
    phase: 'measure',
    topic: 'capability',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'A process shows Cp = 1.67 and Cpk = 0.85. What is the most accurate interpretation?',
    choices: [
      'The process is incapable of meeting specs even if centered',
      'Cpk > Cp always means over-centering',
      'Spread is tight enough for the specs, but the process is poorly centered',
      'The gage is broken; capability cannot be computed'
    ],
    correctIndex: 2,
    explanation:
      'High Cp with low Cpk is the classic “recenter first” signal: 6σ fits inside the tolerance, but the mean sits too close to one limit.',
    dgqTip: 'High Cp + low Cpk ⇒ adjust location before buying precision.',
  },
  {
    id: 'chs-004',
    phase: 'measure',
    topic: 'capability',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'USL = 50, LSL = 20, σ = 2.5, μ = 32. Compute Cp and Cpk (2 decimals).',
    choices: [
      'Cp = 1.50, Cpk = 1.07',
      'Cp = 1.20, Cpk = 2.00',
      'Cp = 2.00, Cpk = 2.40',
      'Cp = 2.00, Cpk = 1.60'
    ],
    correctIndex: 3,
    explanation:
      'Cp = (50 − 20)/(6 × 2.5) = 30/15 = 2.00.\nCpu = (50 − 32)/(7.5) = 18/7.5 = 2.40.\nCpl = (32 − 20)/7.5 = 12/7.5 = 1.60.\nCpk = 1.60.',
  },
  {
    id: 'chs-005',
    phase: 'measure',
    topic: 'capability',
    type: 'mcq',
    difficulty: 'belt',
    prompt: 'When is it inappropriate to report Cp/Cpk as a process capability baseline?',
    choices: [
      'When the process is statistically unstable (special-cause signals on the control chart)',
      'Whenever sample size exceeds 30',
      'Only when the customer uses ppm instead of Cpk',
      'When Cp equals Cpk'
    ],
    correctIndex: 0,
    explanation:
      'Capability indices assume a predictable, stable process. Unstable processes have no single meaningful “capability” — fix special causes first.',
  },
  {
    id: 'chs-006',
    phase: 'measure',
    topic: 'capability',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'One-sided upper spec only: USL = 100, μ = 88, σ = 4. What is Cpk (here Cpu)?',
    choices: [
      '0.50',
      '1.00',
      '1.50',
      '3.00'
    ],
    correctIndex: 1,
    explanation:
      'With only a USL, Cpk = Cpu = (USL − μ)/(3σ) = (100 − 88)/(12) = 12/12 = 1.00.\n\nThere is no Cpl; do not invent an LSL.',
  },
  {
    id: 'chs-007',
    phase: 'measure',
    topic: 'capability',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'Short-term within-subgroup σ gives Cp = 1.50. Long-term overall σ gives Pp = 1.05. What does this gap most often indicate?',
    choices: [
      'MSA is unnecessary for long-term studies',
      'Pp is always higher than Cp by definition',
      'Between-subgroup shifts inflate long-term variation relative to short-term potential',
      'The USL and LSL were swapped'
    ],
    correctIndex: 2,
    explanation:
      'Cp/Cpk use short-term (within) σ; Pp/Ppk use overall σ. Drift, setup changes, and material lots widen overall σ and drop Pp below Cp.',
  },
  {
    id: 'chs-008',
    phase: 'measure',
    topic: 'capability',
    type: 'calc',
    difficulty: 'belt',
    prompt:
      'Tolerance width = 12, process σ = 1.5. What minimum Cp do you have if the process is perfectly centered?',
    choices: [
      '2.00',
      '0.75',
      '1.00',
      '1.33'
    ],
    correctIndex: 3,
    explanation:
      'Cp = 12 / (6 × 1.5) = 12/9 ≈ 1.333. If centered, Cpk = Cp ≈ 1.33.',
  },
  {
    id: 'chs-009',
    phase: 'measure',
    topic: 'capability',
    type: 'mcq',
    difficulty: 'belt',
    prompt: 'A customer requires Cpk ≥ 1.33. Which statement is true?',
    choices: [
      'At Cpk = 1.33 the nearer spec is about 4σ away from the mean (3 × 1.33)',
      'Cpk = 1.33 means zero defects forever',
      'Cpk ignores the mean entirely',
      'Cpk = 1.33 requires a six-sigma process by definition'
    ],
    correctIndex: 0,
    explanation:
      'Cpk = (distance to nearer limit)/(3σ). Cpk = 1.33 ⇒ nearer limit ≈ 4σ from the mean. It is not a guarantee of zero defects.',
  },
  {
    id: 'chs-010',
    phase: 'measure',
    topic: 'capability',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'LSL = 0, USL = 10, μ = 5.5, σ = 1.2. Is the process more limited by the upper or lower side, and what is Cpk?',
    choices: [
      'Upper side; Cpk ≈ 0.83',
      'Upper side; Cpk ≈ 1.25',
      'Lower side; Cpk ≈ 1.53',
      'Both equal; Cpk ≈ 1.39'
    ],
    correctIndex: 1,
    explanation:
      'Cpu = (10 − 5.5)/(3 × 1.2) = 4.5/3.6 = 1.25.\nCpl = (5.5 − 0)/3.6 ≈ 1.53.\nCpk = 1.25 — limited by the USL.',
  },
  {
    id: 'chs-011',
    phase: 'measure',
    topic: 'capability',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'After a centering move, Cp stays 1.40 while Cpk rises from 0.90 to 1.38. What happened?',
    choices: [
      'Specs were widened',
      'MSA %GRR doubled',
      'Mean moved toward the middle of the specs; spread was essentially unchanged',
      'σ was cut in half while the mean stayed put'
    ],
    correctIndex: 2,
    explanation:
      'Cp depends only on σ and tolerance. Stable Cp with rising Cpk means the mean moved closer to target without a large σ change.',
  },
  {
    id: 'chs-012',
    phase: 'measure',
    topic: 'capability',
    type: 'mcq',
    difficulty: 'master',
    prompt: 'Why can a normal-assumption Cpk be misleading for heavily skewed cycle-time data?',
    choices: [
      'Cpk formulas require discrete data only',
      'Skewed data always have Cp = 0',
      'Skewness invalidates all sampling plans',
      'Tail probabilities and “% out of spec” from ±3σ formulas do not match the true skewed distribution'
    ],
    correctIndex: 3,
    explanation:
      'Classical Cp/Cpk interpret distance in σ units under approximate normality. For skewed Y, use transforms, non-normal capability methods, or empirical % defective.',
  },

  // ─── DPMO / DPU / ppm / yield / RTY (10) ───────────────────────────────────
  {
    id: 'chs-013',
    phase: 'measure',
    topic: 'process-performance',
    type: 'calc',
    difficulty: 'belt',
    prompt:
      '2,000 units inspected; 5 defect opportunities per unit; 40 defects found. What is DPMO?',
    choices: [
      '4,000',
      '8,000',
      '20,000',
      '40,000'
    ],
    correctIndex: 0,
    explanation:
      'Opportunities = 2,000 × 5 = 10,000.\nDPMO = (40 / 10,000) × 1,000,000 = 4,000.',
    dgqTip: 'DPMO = defects ÷ (units × opportunities) × 10⁶.',
  },
  {
    id: 'chs-014',
    phase: 'measure',
    topic: 'process-performance',
    type: 'calc',
    difficulty: 'belt',
    prompt: '500 units yield 75 defects total. What is DPU?',
    choices: [
      '0.075',
      '0.15',
      '0.75',
      '1.50'
    ],
    correctIndex: 1,
    explanation: 'DPU = defects / units = 75 / 500 = 0.15.',
  },
  {
    id: 'chs-015',
    phase: 'measure',
    topic: 'process-performance',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'DPU = 0.20. Using the Poisson approximation, what is first-pass yield (e^(−DPU)), nearest percent?',
    choices: [
      '67%',
      '80%',
      '82%',
      '98%'
    ],
    correctIndex: 2,
    explanation:
      'Y ≈ e^(−0.20) ≈ 0.8187 ≈ 82%.\n\nDo not confuse with 1 − DPU = 80% (linear approximation, worse when DPU is not tiny).',
  },
  {
    id: 'chs-016',
    phase: 'measure',
    topic: 'process-performance',
    type: 'calc',
    difficulty: 'belt',
    prompt:
      'Of 25,000 units shipped, 50 are defective. What is the defective rate in ppm?',
    choices: [
      '5,000 ppm',
      '50 ppm',
      '500 ppm',
      '2,000 ppm'
    ],
    correctIndex: 3,
    explanation:
      'ppm = (defectives / units) × 10⁶ = (50 / 25,000) × 1,000,000 = 2,000 ppm.\n\nHere ppm tracks defectives (units), not defect opportunities.',
  },
  {
    id: 'chs-017',
    phase: 'measure',
    topic: 'process-performance',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'Three sequential steps have yields 95%, 90%, and 98%. Assuming independence, what is RTY?',
    choices: [
      '83.8%',
      '90.0%',
      '94.3%',
      '98.0%'
    ],
    correctIndex: 0,
    explanation:
      'RTY = 0.95 × 0.90 × 0.98 = 0.8379 ≈ 83.8%.\n\nAverage yield (≈94.3%) overstates end-to-end performance.',
  },
  {
    id: 'chs-018',
    phase: 'measure',
    topic: 'process-performance',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'A team reports “3.4 DPMO” after counting only final scrap units, ignoring 4 internal rework loops per unit. What is wrong?',
    choices: [
      'Only RTY matters; DPMO is never used in Measure',
      'They confused end scrap with opportunity-based defect counting; hidden rework defects are missing from DPMO',
      'DPMO can never be below 10,000',
      'Rework improves DPMO by definition so it should be ignored'
    ],
    correctIndex: 1,
    explanation:
      'Honest DPMO needs a clear opportunity definition and should capture defects generated — including those “fixed” by rework — or the baseline is painted too rosy.',
  },
  {
    id: 'chs-019',
    phase: 'measure',
    topic: 'process-performance',
    type: 'calc',
    difficulty: 'master',
    prompt:
      '1,000 units, 3 opportunities each, 15 defects. Also 12 of the 1,000 units are defective. Compare DPMO vs defective ppm.',
    choices: [
      'Both equal 15,000',
      'DPMO = 12,000; defective ppm = 5,000',
      'DPMO = 5,000; defective ppm = 12,000',
      'DPMO = 15,000; defective ppm = 5,000'
    ],
    correctIndex: 2,
    explanation:
      'DPMO = 15/(1,000×3)×10⁶ = 5,000.\nDefective ppm = 12/1,000×10⁶ = 12,000.\n\nDefects ≠ defectives when multiple defects can hit one unit.',
  },
  {
    id: 'chs-020',
    phase: 'measure',
    topic: 'process-performance',
    type: 'calc',
    difficulty: 'belt',
    prompt:
      'Step yields: 0.99, 0.99, 0.99, 0.99. What is RTY (nearest 0.1%)?',
    choices: [
      '99.0%',
      '99.6%',
      '3.96%',
      '96.1%'
    ],
    correctIndex: 3,
    explanation: 'RTY = 0.99⁴ ≈ 0.9606 ≈ 96.1%. Four “good” steps still leak ~4%.',
  },
  {
    id: 'chs-021',
    phase: 'measure',
    topic: 'process-performance',
    type: 'mcq',
    difficulty: 'belt',
    prompt: 'Which metric best captures rolled first-pass performance across a multi-step process?',
    choices: [
      'RTY (rolled throughput yield)',
      'Cp alone',
      'Single-step DPU average',
      'Control-chart UCL'
    ],
    correctIndex: 0,
    explanation:
      'RTY multiplies step yields (or uses e^(−total DPU) under Poisson assumptions) to show what fraction survives all steps defect-free.',
  },
  {
    id: 'chs-022',
    phase: 'measure',
    topic: 'process-performance',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'A process has DPU = 0.05. Approximate yield with e^(−DPU). How many defect-free units do you expect from 10,000 starts?',
    choices: [
      '9,500',
      '9,512',
      '9,000',
      '9,951'
    ],
    correctIndex: 1,
    explanation:
      'Y ≈ e^(−0.05) ≈ 0.9512 → 10,000 × 0.9512 ≈ 9,512 defect-free units.\n\n1 − DPU = 9,500 is the linear shortcut.',
  },

  // ─── Chart reading (12) ────────────────────────────────────────────────────
  {
    id: 'chs-023',
    phase: 'measure',
    topic: 'charts',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'A Pareto of 200 defects: Type A 110, B 50, C 25, D 10, E 5. Which action prioritizes the vital few?',
    choices: [
      'Ignore counts and pick the cheapest defect type',
      'Only plot a histogram of continuous Y',
      'Attack A and B first (~80% of defects) before spreading effort across C–E',
      'Start with E because it is rarest'
    ],
    correctIndex: 2,
    explanation:
      'A+B = 160/200 = 80%. Pareto thinking concentrates improvement on the vital few categories.',
  },
  {
    id: 'chs-024',
    phase: 'measure',
    topic: 'charts',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'A histogram of fill weight shows two distinct peaks separated by a gap. Specs sit between them. Best next interpretation?',
    choices: [
      'The process is perfectly normal',
      'Delete one peak so Cp improves',
      'Switch immediately to a c-chart',
      'Likely mixture of two process settings/lots — stratify before computing a single Cp'
    ],
    correctIndex: 3,
    explanation:
      'Bimodality usually means two populations (shifts, tooling, suppliers). A pooled Cp/Cpk is misleading until you stratify.',
  },
  {
    id: 'chs-025',
    phase: 'analyze',
    topic: 'charts',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'Box plots of cycle time by shift show Shift 3 with a much higher median and longer upper whisker. What does this suggest?',
    choices: [
      'Shift 3 tends to run slower with a heavier slow tail — investigate that stratum',
      'All shifts are identical',
      'Box plots prove causation from staffing alone',
      'You must use only pie charts next'
    ],
    correctIndex: 0,
    explanation:
      'Box plots compare location and spread across groups. Shift 3’s pattern flags a stratification lead for hypothesis testing.',
  },
  {
    id: 'chs-026',
    phase: 'measure',
    topic: 'charts',
    type: 'mcq',
    difficulty: 'belt',
    prompt: 'A run chart of daily scrap % shows a sustained step-up after week 6 with no return. Most useful reading?',
    choices: [
      'This proves capability improved',
      'A process shift likely occurred around week 6 — investigate assignable change',
      'Noise only; ignore time order',
      'Run charts cannot show shifts'
    ],
    correctIndex: 1,
    explanation:
      'Time-ordered run charts reveal shifts and trends that summaries hide. A lasting step-up is a classic special-cause candidate.',
  },
  {
    id: 'chs-027',
    phase: 'control',
    topic: 'control-charts',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'On an Xbar chart, one point exceeds the UCL; the R chart is in control. What does this typically indicate?',
    choices: [
      'The gage always fails when R is in control',
      'Ignore Xbar if R is quiet',
      'A mean-level special cause (shift in location) while within-subgroup dispersion looks stable',
      'The process σ exploded while the mean stayed fixed'
    ],
    correctIndex: 2,
    explanation:
      'Xbar monitors subgroup means; R (or S) monitors within-subgroup variation. An Xbar signal with quiet R points to a location shift.',
  },
  {
    id: 'chs-028',
    phase: 'control',
    topic: 'control-charts',
    type: 'mcq',
    difficulty: 'belt',
    prompt: 'Control limits on a Shewhart chart are primarily based on…',
    choices: [
      'Customer USL/LSL exclusively',
      'Management stretch goals',
      'The project budget line',
      'Process variation (typically ±3σ of the plotted statistic), not the customer specs'
    ],
    correctIndex: 3,
    explanation:
      'Control limits describe voice of the process. Spec limits are voice of the customer. Do not confuse the two.',
    dgqTip: 'Control ≠ capability: UCL/LCL ≠ USL/LSL.',
  },
  {
    id: 'chs-029',
    phase: 'analyze',
    topic: 'charts',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'A scatter plot of temperature (X) vs yield (Y) shows a clear upward cloud with no obvious outliers. Reasonable next step?',
    choices: [
      'Quantify association (correlation/regression) and then test causation carefully',
      'Declare temperature the only root cause with no further work',
      'Switch to a Pareto of temperatures',
      'Delete the X axis because correlation is banned'
    ],
    correctIndex: 0,
    explanation:
      'Scatter plots motivate correlation/regression. Association ≠ proven causation — still need process knowledge and designed tests.',
  },
  {
    id: 'chs-030',
    phase: 'measure',
    topic: 'charts',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'A normal probability plot of residuals bends systematically in both tails. What should you question?',
    choices: [
      'Whether takt time equals cycle time',
      'The normality assumption for methods that require it (many classical capability/CI procedures)',
      'Whether SIPOC suppliers were listed',
      'Whether RACI has enough Cs'
    ],
    correctIndex: 1,
    explanation:
      'Curved probability plots signal non-normality. Consider transforms, nonparametric methods, or distribution-specific capability.',
  },
  {
    id: 'chs-031',
    phase: 'measure',
    topic: 'charts',
    type: 'mcq',
    difficulty: 'belt',
    prompt: 'Which chart is best to compare defect counts by category for prioritization?',
    choices: [
      'Normal probability plot',
      'Gantt chart',
      'Pareto chart',
      'I-MR chart of a continuous Y only'
    ],
    correctIndex: 2,
    explanation: 'Pareto ranks categorical contributors. Probability plots and I-MR serve continuous distribution/stability questions.',
  },
  {
    id: 'chs-032',
    phase: 'control',
    topic: 'control-charts',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'Western Electric: 2 of 3 consecutive points beyond 2σ on the same side of the centerline, none beyond 3σ. Correct reaction?',
    choices: [
      'Ignore because nothing crossed 3σ',
      'Widen specs to absorb the pattern',
      'Recalculate Cp immediately and close the project',
      'Treat as a special-cause signal and investigate — do not wait for a point outside 3σ'
    ],
    correctIndex: 3,
    explanation:
      'Supplemental run rules catch non-random patterns earlier than a single 3σ breach. Investigate assignable causes.',
  },
  {
    id: 'chs-033',
    phase: 'measure',
    topic: 'charts',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'Histogram looks roughly bell-shaped and centered in specs, but the run chart shows a strong upward trend. What is the risk?',
    choices: [
      'Time-blind summaries hide an unstable, drifting process that will soon breach specs',
      'Histograms always override run charts',
      'Trends prove the process is capable',
      'No risk if the histogram looks nice'
    ],
    correctIndex: 0,
    explanation:
      'Always pair distributional views with time order. A pretty histogram of a trending process is a trap.',
  },
  {
    id: 'chs-034',
    phase: 'analyze',
    topic: 'charts',
    type: 'mcq',
    difficulty: 'belt',
    prompt: 'A box plot flags points beyond the whiskers. What do those points represent in the usual construction?',
    choices: [
      'Points that must be deleted to raise Cpk',
      'Observations beyond a multiple of the IQR from the quartiles — candidates for investigation, not automatic deletes',
      'Proof of special causes on a control chart',
      'Mandatory MSA failures'
    ],
    correctIndex: 1,
    explanation:
      'Box-plot “outliers” are exploratory flags. Confirm with process knowledge and appropriate charts before discarding data.',
  },

  // ─── Hypothesis / CI / ANOVA / regression / DOE (14) ───────────────────────
  {
    id: 'chs-035',
    phase: 'analyze',
    topic: 'hypothesis',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'Two-sample t-test of means: p = 0.03 at α = 0.05. Practical difference is 0.2 seconds on a 120-second cycle. Best conclusion?',
    choices: [
      'Reject the data because p is not zero',
      'Accept H₀ because the cycle is long',
      'Statistically significant at 5%, but judge practical importance separately — the effect may be tiny',
      'p < 0.05 proves the change is always business-critical'
    ],
    correctIndex: 2,
    explanation:
      'Statistical significance ≠ practical significance. Report effect size and business impact alongside the p-value.',
  },
  {
    id: 'chs-036',
    phase: 'analyze',
    topic: 'hypothesis',
    type: 'mcq',
    difficulty: 'master',
    prompt: 'Failing to reject H₀ when a real difference exists is…',
    choices: [
      'A Type I error (α)',
      'Always caused by α = 0.01',
      'Impossible if n > 30',
      'A Type II error (β); power = 1 − β'
    ],
    correctIndex: 3,
    explanation:
      'Type I: false alarm (reject true H₀). Type II: miss (fail to reject false H₀). Power rises with larger effects, larger n, and lower noise.',
  },
  {
    id: 'chs-037',
    phase: 'analyze',
    topic: 'confidence-interval',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'A 95% CI for the mean defect rate is [2.1%, 2.9%]. The target is 2.0%. Correct reading?',
    choices: [
      'The interval does not include 2.0%, so data are inconsistent with a mean of 2.0% at this confidence level',
      '95% of individual units fall between 2.1% and 2.9%',
      'The true mean is exactly 2.5%',
      'CI width is unrelated to sample size'
    ],
    correctIndex: 0,
    explanation:
      'A CI for the mean estimates where the mean likely sits. It is not a prediction interval for individuals. Here 2.0% lies outside the interval.',
  },
  {
    id: 'chs-038',
    phase: 'analyze',
    topic: 'confidence-interval',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'n = 100, sample mean = 50, known σ = 10. Approximate 95% CI for μ using z ≈ 1.96 (round to 1 decimal).',
    choices: [
      '[30.4, 69.6]',
      '[48.0, 52.0]',
      '[40.0, 60.0]',
      '[49.0, 51.0]'
    ],
    correctIndex: 1,
    explanation:
      'SE = σ/√n = 10/10 = 1.\nMargin ≈ 1.96 × 1 ≈ 1.96 → CI ≈ [48.0, 52.0].',
  },
  {
    id: 'chs-039',
    phase: 'analyze',
    topic: 'anova',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'One-way ANOVA across 4 machines: p = 0.01. What is a sound next step?',
    choices: [
      'Pool all machines forever without checking',
      'Switch to a pie chart as proof',
      'Conclude at least one machine mean differs; use multiple comparisons / process knowledge to find which',
      'Stop — ANOVA already names the best machine'
    ],
    correctIndex: 2,
    explanation:
      'ANOVA signals that not all means are equal. Pairwise or planned contrasts (with multiplicity control) identify where differences lie.',
  },
  {
    id: 'chs-040',
    phase: 'analyze',
    topic: 'anova',
    type: 'mcq',
    difficulty: 'master',
    prompt: 'Two-way ANOVA with interaction: the A×B interaction is significant. What does that mean?',
    choices: [
      'A and B are always independent of Y',
      'Main effects can be interpreted in isolation without plots',
      'The experiment failed and must be discarded',
      'The effect of A on Y depends on the level of B (and vice versa)'
    ],
    correctIndex: 3,
    explanation:
      'Interaction means factor effects are not additive. Interpret with interaction plots; be careful summarizing main effects alone.',
  },
  {
    id: 'chs-041',
    phase: 'analyze',
    topic: 'regression',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'Simple linear regression: R² = 0.81, residual plots show a clear curve. Best action?',
    choices: [
      'Do not trust the linear fit — consider a nonlinear term or transform despite high R²',
      'High R² always validates linearity',
      'Delete residuals to raise R² further',
      'Conclude causation from R² alone'
    ],
    correctIndex: 0,
    explanation:
      'R² measures fit, not assumption validity. Curved residuals mean the linear model is misspecified.',
  },
  {
    id: 'chs-042',
    phase: 'analyze',
    topic: 'regression',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'Fitted model Ŷ = 10 + 2X. At X = 7, what is the predicted Y? If observed Y = 20, what is the residual?',
    choices: [
      'Ŷ = 14; residual = 6',
      'Ŷ = 24; residual = −4',
      'Ŷ = 17; residual = 3',
      'Ŷ = 24; residual = 4'
    ],
    correctIndex: 1,
    explanation:
      'Ŷ = 10 + 2×7 = 24.\nResidual = Y − Ŷ = 20 − 24 = −4.',
  },
  {
    id: 'chs-043',
    phase: 'analyze',
    topic: 'regression',
    type: 'mcq',
    difficulty: 'belt',
    prompt: 'Correlation r = −0.92 between X and Y means…',
    choices: [
      'No linear relationship',
      'The process is out of control',
      'A strong inverse linear association — not automatically that X causes Y',
      'X causes Y with 92% probability'
    ],
    correctIndex: 2,
    explanation:
      'Large |r| indicates strong linear association. Causation needs theory, time order, and preferably designed experiments.',
  },
  {
    id: 'chs-044',
    phase: 'analyze',
    topic: 'doe',
    type: 'mcq',
    difficulty: 'belt',
    prompt: 'A full factorial 2³ design has how many unique factor-level combinations (before replicates)?',
    choices: [
      '9',
      '16',
      '6',
      '8'
    ],
    correctIndex: 3,
    explanation: '2³ = 8 corner points. Each added factor doubles the factorial points.',
  },
  {
    id: 'chs-045',
    phase: 'analyze',
    topic: 'doe',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'You need to screen 7 factors with a limited budget. Which DOE approach fits first?',
    choices: [
      'A fractional factorial (or similar screening design) to find vital few, then follow up',
      'A full 2⁷ with 10 replicates immediately',
      'Only one-factor-at-a-time forever',
      'Skip DOE and adjust all knobs at once on the line'
    ],
    correctIndex: 0,
    explanation:
      'Screening designs efficiently separate vital factors from noise. Confirm and optimize with follow-on designs (RSM, fuller factorials).',
    dgqTip: 'Screen → characterize → optimize is the usual DOE path.',
  },
  {
    id: 'chs-046',
    phase: 'analyze',
    topic: 'doe',
    type: 'mcq',
    difficulty: 'master',
    prompt: 'In a 2^(k−p) fractional factorial, aliasing means…',
    choices: [
      'Center points are forbidden',
      'Some effects are confounded — you cannot separately estimate aliased terms without more runs',
      'All interactions are always zero',
      'Randomization is unnecessary'
    ],
    correctIndex: 1,
    explanation:
      'Fractionation saves runs but aliases effects. Resolution and follow-up de-aliasing matter for correct conclusions.',
  },
  {
    id: 'chs-047',
    phase: 'analyze',
    topic: 'hypothesis',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'Before comparing two process means with a t-test, %GRR is 48% of process variation. What should you do?',
    choices: [
      'Widen α to 0.20 to compensate',
      'Replace the t-test with ANOVA of the same noisy data',
      'Fix the measurement system first — high measurement noise can mask or invent process differences',
      'Run a larger t-test sample and ignore MSA'
    ],
    correctIndex: 2,
    explanation:
      'MSA is a gate before statistical inference. Loud gages inflate error variance and corrupt hypothesis tests and capability.',
  },
  {
    id: 'chs-048',
    phase: 'analyze',
    topic: 'variation',
    type: 'mcq',
    difficulty: 'belt',
    prompt: 'Tampering (reacting to common-cause noise as if it were special) typically…',
    choices: [
      'Always reduces σ to zero',
      'Has no effect on control charts',
      'Converts Cp into Pp automatically',
      'Increases process variation over time'
    ],
    correctIndex: 3,
    explanation:
      'Deming’s funnel experiment: chasing noise adds variation. Use control-chart logic to decide when to act.',
  },

  // ─── MSA gates before stats (7) ────────────────────────────────────────────
  {
    id: 'chs-049',
    phase: 'measure',
    topic: 'msa',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'A Belt wants baseline Cp before any Gage R&R. Sponsor asks for speed. Correct coaching?',
    choices: [
      'Pause capability claims until MSA shows the gage is adequate — otherwise numbers may be fiction',
      'Cp does not use measurements, so MSA is optional',
      'Always compute Cp first; MSA only in Control',
      'Skip MSA if n > 100'
    ],
    correctIndex: 0,
    explanation:
      'Measure-gate discipline: operational definition → MSA → then baseline capability/DPMO. Bad gages fake good or bad processes.',
    dgqTip: 'MSA before big conclusions — classic DGQ theme.',
  },
  {
    id: 'chs-050',
    phase: 'measure',
    topic: 'msa',
    type: 'mcq',
    difficulty: 'master',
    prompt: 'Type II Gage R&R %Study Variation = 32%. Common rule-of-thumb assessment?',
    choices: [
      'Proof the process Cpk is 1.33',
      'Marginal — investigate and improve; not a comfortable “green” system',
      'Excellent; ignore operators entirely',
      'Impossible; %GRR cannot exceed 30%'
    ],
    correctIndex: 1,
    explanation:
      'Common AIAG-style bands: under ~10% good, ~10–30% marginal/conditional, over ~30% unacceptable for many uses. 32% needs improvement.',
  },
  {
    id: 'chs-051',
    phase: 'measure',
    topic: 'msa',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'Attribute MSA: inspectors disagree on borderline parts versus the master standard. Process data will be pass/fail scrap rates. Risk?',
    choices: [
      'Only continuous gages need MSA',
      'Disagreement proves the process is Six Sigma',
      'Observed scrap rates mix process defects with inspection noise — fix criteria/training before analyzing the process',
      'Attribute disagreement never affects DPMO'
    ],
    correctIndex: 2,
    explanation:
      'Pass/fail systems need attribute agreement studies. Misclassification biases defect metrics and hypothesis tests on proportions.',
  },
  {
    id: 'chs-052',
    phase: 'measure',
    topic: 'msa',
    type: 'mcq',
    difficulty: 'belt',
    prompt: 'MSA Type I primarily evaluates…',
    choices: [
      'Full multi-operator reproducibility across many parts only',
      'Customer Kano delight features',
      'Kanban bin quantities',
      'Instrument bias and repeatability against a reference standard'
    ],
    correctIndex: 3,
    explanation:
      'Type I is reference-based (bias/Cg-style). Type II adds parts and operators for R&R.',
  },
  {
    id: 'chs-053',
    phase: 'measure',
    topic: 'gate-measure',
    type: 'scenario',
    difficulty: 'master',
    prompt:
      'Gate Measure review: operational definitions unclear, no MSA, and a single Cp quoted from an unstable I-chart. What should the gate decide?',
    choices: [
      'Do not pass — require definitions, MSA, and stability evidence before trusting the baseline',
      'Pass because a Cp number exists',
      'Skip to Improve solutions',
      'Approve Analyze DOE immediately'
    ],
    correctIndex: 0,
    explanation:
      'Measure gates protect the project from analyzing noise. Definitions, MSA, and a stable baseline are non-negotiable.',
  },
  {
    id: 'chs-054',
    phase: 'measure',
    topic: 'msa',
    type: 'calc',
    difficulty: 'master',
    prompt:
      'Gage study: repeatability variance = 0.04, reproducibility variance = 0.05, part variance = 0.91. Approximate %GRR of total variance?',
    choices: [
      '≈91%',
      '≈9%',
      '≈10%',
      '≈33%'
    ],
    correctIndex: 1,
    explanation:
      'σ²_GRR = 0.04 + 0.05 = 0.09.\nTotal = 0.09 + 0.91 = 1.00.\n%GRR ≈ 0.09/1.00 = 9% (variance basis; %Study Variation uses σ ratios and can differ).',
  },
  {
    id: 'chs-055',
    phase: 'analyze',
    topic: 'msa',
    type: 'scenario',
    difficulty: 'belt',
    prompt:
      'After improving a gage from 40% to 8% GRR, previously “significant” machine differences disappear in a re-run ANOVA. Likely explanation?',
    choices: [
      'Lower %GRR always creates more false positives',
      'The process must have gotten worse',
      'Earlier differences were partly measurement artifacts; cleaner data changed the inference',
      'ANOVA is invalid whenever MSA improves'
    ],
    correctIndex: 2,
    explanation:
      'Measurement error can create spurious separation between groups. Re-analyzing with a trustworthy gage is the correct scientific response.',
  },
];
