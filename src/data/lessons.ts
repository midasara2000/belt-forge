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
    topics: [
      'variation',
      'charts',
      'location-spread',
      'control-charts',
      'multi-vari',
      'stratification',
    ],
    summary:
      'Black Belt graphical literacy: choose the right plot, read shape/spread/time signals, separate common vs special cause, and know when short-term and long-term variation diverge.',
    visual: 'pareto',
    visualCaption: 'Pareto focuses the vital few categories that dominate total defects.',
    sections: [
      {
        heading: 'Common vs special cause',
        body: 'Common cause variation is the stable “system noise” of the current process. Special cause variation is assignable — a spike, shift, or pattern that should trigger a reaction plan.\n\nTampering (reacting to every common-cause wiggle as if it were special) usually increases variation. Control charts exist to separate the two.',
      },
      {
        heading: 'Chart chooser (Black Belt)',
        body: 'Match the question to the graph:\n- Pareto / bar: which categories dominate defects or cost?\n- Histogram: shape, modality, skew, gaps vs specs\n- Box plot: compare location & spread across groups (shift, supplier, cavity)\n- Run chart: time order without control limits — trends, shifts, clusters\n- Individuals / X̄-R / X̄-S / p / np / c / u charts: monitor stability with rational subgroups\n- Scatter: association between continuous X and Y (before regression)\n- Multi-vari: within-piece vs between-piece vs time / cavity components\n- Normal probability plot: check distributional shape assumptions',
      },
      {
        heading: 'Reading values on the plot',
        body: 'Histogram: look for bimodality (mixtures), heavy tails, and how much mass sits outside LSL/USL.\n\nBox plot: box = IQR; line = median; whiskers/outliers show tails. Median near one side of the box ⇒ skew.\n\nScatter: direction, strength, linearity, outliers, and clusters. A curved banana with near-zero linear r still has structure — plot first.\n\nControl chart: points beyond limits, runs on one side of the center line, trends, and oscillating patterns are signals — investigate before recalculating limits to “hide” them.',
      },
      {
        heading: 'Short-term vs long-term variation',
        body: 'Short-term (within-subgroup) variation estimates the process noise when conditions are relatively stable — often the σ behind Cp/Cpk “within”.\n\nLong-term (overall) variation includes shifts across time, lots, operators, and setups — often the σ behind Pp/Ppk and what the customer actually feels over months.\n\nIf long-term ≫ short-term, the process is not staying on one common-cause system: find and remove special-cause / between-batch drivers before claiming world-class capability.',
      },
      {
        heading: 'Location & spread stats',
        body: 'Mean is pulled by outliers; median is more resistant. Standard deviation and range describe spread. Never report only a mean — Black Belts always ask “relative to what spread, and is it stable?”',
      },
    ],
    takeaways: [
      'Graph before test — shape and time order change the analysis path.',
      'Specs ≠ control limits; stable ≠ capable.',
      'Long-term variation larger than short-term ⇒ between-group / time drivers still alive.',
    ],
  },
  {
    id: 'capability',
    title: 'Performance Metrics & Capability',
    phase: 'measure',
    topics: ['process-performance', 'capability', 'gate-measure'],
    summary:
      'Quantify how bad the problem is (DPU, DPMO, ppm, yield, RTY) and whether a stable, well-measured process can meet specs — including Cp/Cpk vs Pp/Ppk and short- vs long-term σ.',
    visual: 'capability',
    visualCaption: 'Cp = potential vs tolerance; Cpk also penalizes off-center processes.',
    sections: [
      {
        heading: 'Defect & yield metrics',
        body: 'DPU = defects / units. DPMO = defects / (units × opportunities) × 1,000,000 — normalizes complexity so processes can be compared.\n\nppm often tracks defectives (bad units). First-pass yield is good units / starts. Rolled throughput yield (RTY) multiplies independent step yields.\n\nUnder a Poisson-like defect model, yield ≈ e^(−DPU). Always lock operational definitions: defect ≠ defective; opportunities must be honest.',
      },
      {
        heading: 'Cp, Cpk, Pp, Ppk',
        body: 'Cp = (USL − LSL) / (6σ_within) — potential capability if centered. Cpk = min( (USL−μ)/(3σ), (μ−LSL)/(3σ) ) — penalizes off-center location.\n\nPp / Ppk use overall (long-term) σ instead of within σ. High Cp with low Pp/Ppk often means the process wanders over time.\n\nHigh Cp + low Cpk ⇒ recenter (or retarget) before buying more precision. Both indices < 1 and similar ⇒ mainly a spread problem.',
      },
      {
        heading: 'One-sided specs & normality',
        body: 'With only USL (or only LSL), use Cpu or Cpl — bilateral Cp is not defined the usual way. Predicted % out-of-spec from Cp/Cpk assumes a distributional model (often normal); check shape or use empirical / non-normal methods when tails matter.',
      },
      {
        heading: 'Stability & MSA first',
        body: 'Capability on an unstable process or a noisy gage is theater. Sequence: operational definition → MSA → stability view → then capability / DPMO baseline for the Measure gate.',
      },
    ],
    takeaways: [
      'Know which σ your software used (within vs overall).',
      'Specs ≠ control limits.',
      'DGQ loves Cp vs Cpk and “stabilize before capability” traps.',
    ],
    dgqAngle: 'Cp vs Cpk interpretation and DPMO arithmetic are frequent items.',
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
      'takt',
      'throughput',
      'bottleneck',
      'wip',
      'lead-time',
      'process-efficiency',
    ],
    summary:
      'See waste and flow: spaghetti for motion, VSM for lead time & inventory, takt vs cycle time, throughput/WIP, value/time analysis, CFD for WIP buildup.',
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
        heading: 'Takt, throughput & efficiency',
        body: 'Takt = available production time / customer demand (the drumbeat). Compare cycle time at each step to takt to find overload. Throughput is output rate; WIP and lead time move together (Little’s Law: lead time ≈ WIP / throughput). Process cycle efficiency ≈ value-add time / lead time.',
      },
      {
        heading: 'Bottlenecks & capacity',
        body: 'System throughput ≤ the constraint’s rate. Queues upstream + idle downstream usually mark the bottleneck. Elevating non-constraints first just grows WIP.\n\nCapacity ≈ available time / cycle time (then apply availability and quality losses). Line balance redistributes work so no station exceeds takt.',
      },
      {
        heading: 'CFD & time analysis',
        body: 'Cumulative flow diagrams show WIP bands by stage over time — widening bands mean growing queues. Value/time analysis separates value-add, required non-value, and pure waste so Improve knows what to attack.',
      },
    ],
    takeaways: [
      'Match tool to symptom (motion → spaghetti; lead time → VSM).',
      'CT > takt at a step ⇒ that step cannot keep the drumbeat.',
      'Inventory triangles are waiting waste; elevating the constraint raises system throughput.',
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
      't-test',
      'proportion-test',
      'chi-square',
      'p-value',
      'r-squared',
      'independence',
    ],
    summary:
      'Black Belt “data door”: choose the right analysis from Y’s data type, move from graphs → association → models, interpret p-values and R² honestly, and respect independence / short- vs long-term variation.',
    visual: 'hypothesis',
    visualCaption: 'p-value vs α: reject H0 when evidence against the null is strong enough — still check practical size.',
    sections: [
      {
        heading: 'Analyze roadmap (through the data door)',
        body: 'Typical Black Belt sequence:\n- Clarify Y and the decision (compare groups? associate X–Y? prove a shift?)\n- Confirm MSA / operational definitions so you are not modeling noise\n- Graph and stratify (shape, time order, mixtures)\n- Estimate with confidence intervals where useful\n- Pick a hypothesis test or model matched to data type\n- Check assumptions / residuals\n- Judge statistical and practical significance\n- Only then name vital X’s for Improve\n\nSkipping graphs and jumping to p-values is a classic DGQ trap.',
      },
      {
        heading: 'Continuous Y vs discrete / attribute Y',
        body: 'This single fork drives almost every tool choice.\n\nContinuous Y (cycle time, dimension, temperature, cost):\n- Summaries: mean, SD, median, percentiles\n- Compare means: 1-sample t, 2-sample t, paired t, one-/two-way ANOVA\n- Relate X→Y: correlation, simple/multiple regression\n- Variation over time: Individuals / X̄ charts, capability on continuous scale\n\nDiscrete / attribute Y (pass/fail, defect count, categories):\n- Rates: proportion defective, DPU, DPMO\n- Compare proportions: 1-proportion, 2-proportion tests\n- Association of categories: Chi-square test of independence (contingency tables)\n- Counts per unit/area: Poisson / c or u thinking; logistic regression for binary Y with predictors\n\nRule of thumb: ANOVA and classic t-tests need a continuous (or well-approximated) Y. Do not ANOVA pass/fail 0/1 data as if it were a normal measurement without understanding the limitations — use proportion / chi-square / logistic paths instead.',
      },
      {
        heading: 'Stratification, dependence & confounding',
        body: 'Stratify by shift, product, machine, site, customer segment… Many “mysteries” are mixtures of two processes.\n\nIndependence matters: if observations are clustered (same batch, same patient, repeated measures on one unit), ordinary tests inflate false confidence. Use pairing, blocking, mixed models, or analyze at the right aggregation level.\n\nConfounding: X₁ and X₂ travel together (e.g. new machine always on night shift). Observed association may belong to the confounder — designed experiments and careful observational controls untangle dependencies.',
      },
      {
        heading: 'Confidence intervals',
        body: 'A 95% CI for a mean (or difference, or proportion) is a range of plausible values for the parameter given the data and assumptions — not “95% of future individual units fall here.”\n\nIf a CI for a difference includes 0, “no difference” remains plausible at that confidence level. Narrower intervals need more data or less noise — not wishful α changes.',
      },
      {
        heading: 'Hypothesis testing language',
        body: 'H0 = the skeptical default (often “no difference / no association”). H1 = the alternative you care about.\n\nα (significance level) = Type I risk — probability of a false alarm (reject true H0). Commonly 0.05 or 0.01.\n\np-value = probability, under H0, of data at least as extreme as observed. If p ≤ α, reject H0.\n\nType II error (β) = missing a real effect. Power = 1 − β. Underpowered studies (tiny n) often produce large p-values even when a meaningful effect exists — “fail to reject” is not proof of equality.\n\nStatistical significance ≠ practical significance. A tiny shift can be “significant” with huge n; a useful shift can be missed with small n. Always pair p with effect size and business impact.',
      },
      {
        heading: 'Test chooser (means & proportions)',
        body: 'Continuous Y:\n- 1-sample t: one mean vs a target / historical value\n- 2-sample t: means of two independent groups (check variance assumptions)\n- Paired t: before/after on the same unit, or matched pairs (removes between-unit noise)\n- One-way ANOVA: means across 3+ levels of one factor; follow with contrasts / post-hoc if significant\n- Two-way ANOVA: two factors; interpret interaction first — the effect of A may depend on B\n\nAttribute / discrete Y:\n- 1-proportion: one rate vs a standard\n- 2-proportion: compare two independent rates\n- Chi-square test of independence: is category of X associated with category of Y in a table?\n- Chi-square goodness-of-fit: do observed counts match an expected distribution?\n\nEqual-variance checks (e.g. Levene) and residual plots tell you when a plain t/ANOVA story is shaky — transform, use Welch-type methods, or nonparametrics when assumptions fail badly.',
      },
      {
        heading: 'ANOVA in practice',
        body: 'One-way ANOVA asks whether at least one group mean differs. A small p does not say which groups differ or that every pair differs — use planned contrasts or post-hoc comparisons plus practical judgment.\n\nTwo-way ANOVA adds factor B and A×B interaction. Significant interaction means you must not quote a single main-effect story for A without showing how it changes across B — always plot the interaction.\n\nANOVA residual diagnostics (Independence, roughly equal variance, approximate normality of residuals) protect you from pretty p-values on ugly data.',
      },
      {
        heading: 'Correlation → regression → p-values',
        body: 'Scatter first. Correlation (e.g. Pearson r) summarizes linear association strength/direction between two continuous variables. r near 0 can still hide nonlinear structure.\n\nCorrelation ≠ causation. A tight cloud can be driven by a lurking third variable or by process physics you have not manipulated.\n\nSimple linear regression: Ŷ = b0 + b1X. The slope’s p-value tests whether a linear association is detectable; the coefficient estimates how Y changes per unit X inside the data range.\n\nResiduals = Y − Ŷ. Fan shapes ⇒ unequal variance; curves ⇒ wrong form; wild points ⇒ influence. Fix the model before trusting coefficients.\n\nExtrapolation beyond the observed X range is risky — the fitted line is a local story.',
      },
      {
        heading: 'Reading R² (and friends)',
        body: 'R² = fraction of Y’s variance accounted for by the model. R² = 0.15 with p = 0.001 means “detectable but weak explanation.” R² = 0.9 can still be useless if residuals are patterned or the range is artificial.\n\nAdjusted R² penalizes extra predictors. In multiple regression, check VIF / collinearity: interdependent X’s make individual coefficients unstable even if overall prediction looks fine.\n\nLogistic regression is the usual path when Y is binary (pass/fail): model probability / log-odds, not a straight least-squares line through 0/1.',
      },
      {
        heading: 'Multiple predictors & interdependencies',
        body: 'When several X’s move together (temperature with humidity, speed with feed), observational regression cannot cleanly “credit” one factor — coefficients become interdependent.\n\nDesigned experiments (DOE) break many of those dependencies by orthogonal (or near-orthogonal) factor settings. Observationally, prefer process knowledge, stratification, and carefully chosen covariates — and be humble about causal claims.',
      },
      {
        heading: 'Short-term vs long-term in Analyze',
        body: 'A significant mean difference between two weeks may be a special-cause episode, not a new permanent process. Separate:\n- Within-lot / within-subgroup noise (short-term)\n- Between-lot, between-day, between-shift movement (long-term)\n\nImprove actions differ: reduce common-cause spread vs eliminate the assignable drivers of wandering. Capability and hypothesis results should name which variation you attacked.',
      },
    ],
    takeaways: [
      'Data type of Y chooses the family: t/ANOVA/regression vs proportion/chi-square/logistic.',
      'p ≤ α rejects H0 — it does not measure importance; R² and effect size speak to strength.',
      'Interaction, confounding, and non-independence break naive one-factor stories.',
      'Graph → stratify → test/model → residual check → practical decision.',
    ],
    dgqAngle:
      'Expect “which test?” scenarios, p-value wording traps, Cp/Cpk vs stability, and correlation-vs-causation items.',
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
      'DOE is how Black Belts learn causal factor effects and interactions efficiently: screen → confirm → optimize, with randomization, blocking, and honest handling of aliasing.',
    visual: 'doe',
    visualCaption: '2³ full factorial = 8 unique corners of the factor cube (before replicates).',
    sections: [
      {
        heading: 'Why not OFAT',
        body: 'One-factor-at-a-time misses interactions, confuses time drift with factor effects, and wastes runs. A designed experiment sets factor levels deliberately so effects and (where possible) interactions are estimable.',
      },
      {
        heading: 'Full vs fractional factorials',
        body: 'Full 2^k runs every corner combination (2³ = 8 unique runs before replicates). Use when factors are few and interactions matter.\n\nFractional 2^(k−p) screens many factors with fewer runs. Resolution describes aliasing: Resolution III aliases main effects with two-factor interactions — fine for rough screens, dangerous if you treat every “significant” effect as proven alone. Follow screens with confirmation or a higher-resolution design.',
      },
      {
        heading: 'Center points, curvature & RSM',
        body: 'Center points detect curvature / lack of fit vs a pure linear factorial model. When you are near an optimum and curvature matters, move to response surface methods (RSM) on the vital few factors.',
      },
      {
        heading: 'Randomize, block, replicate',
        body: 'Randomize run order against lurking time trends. Block known nuisance factors (day, batch, machine). Replicates estimate pure error and improve power. Analyze with effect plots and residual checks — the same discipline as regression.',
      },
      {
        heading: 'Link back to observational Analyze',
        body: 'Scatter/regression on historical data generates hypotheses; DOE tests them by breaking collinear process settings. After DOE, confirm in the real process window and lock gains in Control.',
      },
    ],
    takeaways: [
      '2³ → 8 corner runs (no replicates).',
      'Screen (fractional) → confirm → optimize (RSM).',
      'Aliasing means “significant C” might be AB — de-alias before you spend capital.',
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
      'bottleneck',
    ],
    summary:
      'Improve often applies Lean patterns to verified causes: 5S, poka-yoke, layout, TOC (elevate the constraint), SMED, TPM, and pull systems sized to demand.',
    visual: 'pull',
    visualCaption: 'Pull: downstream demand triggers upstream replenishment — limiting overproduction.',
    sections: [
      {
        heading: 'Mistake-proofing & 5S',
        body: 'Poka-yoke prevents or detects errors at source. 5S stabilizes the workplace so standards stick.',
      },
      {
        heading: 'Flow & constraints',
        body: 'TOC: identify the system bottleneck, exploit it, subordinate everything else, elevate it, then repeat. Local efficiency upstream of a constraint often just grows WIP. SMED converts internal setup to external to enable smaller batches.',
      },
      {
        heading: 'Pull variants',
        body: 'UMS covers generic, replenishment, and two-bin pull — match design to demand and item variety.',
      },
    ],
    takeaways: [
      'Solutions must attack verified X’s.',
      'Never starve the constraint; don’t flood it with unneeded WIP either.',
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
