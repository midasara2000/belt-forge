import { normals, round } from '../rng';
import type { AcademyModule, Choice, MinitabOutput } from '../types';

const QUADRANTS: Choice[] = [
  { id: 'dc', label: 't-test / ANOVA' },
  { id: 'cc', label: 'Correlation / regression' },
  { id: 'dd', label: 'Proportions / chi-square' },
  { id: 'cd', label: 'Logistic regression' },
];

const TESTS: Choice[] = [
  { id: 't1', label: '1-sample t' },
  { id: 't2', label: '2-sample t' },
  { id: 'tp', label: 'Paired t' },
  { id: 'anova', label: 'One-way ANOVA' },
  { id: 'p2', label: '2-proportion' },
  { id: 'chi', label: 'Chi-square' },
];

const supplierA = normals(401, 25, 52.8, 4.2).map((v) => round(v, 1));
const supplierB = normals(402, 25, 48.7, 5).map((v) => round(v, 1));
const supplierC = normals(403, 25, 55.5, 8.5).map((v) => round(v, 1));

const tempX = normals(411, 40, 0, 1);
const tempE = normals(412, 40, 0, 1);
const hardness: [number, number][] = tempX.map((z, i) => {
  const t = 225 + 14 * z;
  return [round(t, 1), round(-12.4 + 0.31 * t + 3.1 * tempE[i], 1)];
});

const lineScatterNone: [number, number][] = normals(421, 30, 0, 1).map((z, i) => [
  round(20 + 3 * z, 1),
  round(80 + 6 * normals(422, 30, 0, 1)[i], 1),
]);

const TWO_SAMPLE_T: MinitabOutput = {
  title: 'Two-Sample T-Test and CI: Strength_A, Strength_B',
  blocks: [
    {
      heading: 'Method',
      lines: [
        'μ₁: population mean of Strength_A',
        'µ₂: population mean of Strength_B',
        'Difference: μ₁ - µ₂',
        'Equal variances are not assumed for this analysis.',
      ],
    },
    {
      heading: 'Descriptive Statistics',
      table: {
        columns: ['Sample', 'N', 'Mean', 'StDev', 'SE Mean'],
        rows: [
          ['Strength_A', 25, '52.84', '4.21', '0.84'],
          ['Strength_B', 25, '48.72', '5.06', '1.01'],
        ],
      },
    },
    {
      heading: 'Estimation for Difference',
      table: { columns: ['Difference', '95% CI for Difference'], rows: [['4.12', '(1.48, 6.76)']] },
    },
    {
      heading: 'Test',
      lines: ['Null hypothesis        H₀: μ₁ - µ₂ = 0', 'Alternative hypothesis H₁: μ₁ - µ₂ ≠ 0'],
      table: { columns: ['T-Value', 'DF', 'P-Value'], rows: [['3.13', 46, '0.003']] },
    },
  ],
};

const ONE_WAY: MinitabOutput = {
  title: 'One-way ANOVA: Fill weight versus Line',
  blocks: [
    {
      heading: 'Analysis of Variance',
      table: {
        columns: ['Source', 'DF', 'Adj SS', 'Adj MS', 'F-Value', 'P-Value'],
        rows: [
          ['Line', 2, '18.40', '9.20', '1.60', '0.214'],
          ['Error', 42, '241.50', '5.75', '', ''],
          ['Total', 44, '259.90', '', '', ''],
        ],
      },
    },
    {
      heading: 'Means',
      table: {
        columns: ['Line', 'N', 'Mean', 'StDev'],
        rows: [
          ['L1', 15, '501.2', '2.3'],
          ['L2', 15, '502.4', '2.5'],
          ['L3', 15, '501.6', '2.4'],
        ],
      },
    },
  ],
};

const CHI_SQ: MinitabOutput = {
  title: 'Chi-Square Test for Association: Shift, Defect type',
  blocks: [
    {
      heading: 'Rows: Shift   Columns: Defect type   (observed counts)',
      table: {
        columns: ['', 'Scratch', 'Dent', 'Stain', 'All'],
        rows: [
          ['Early', 42, 18, 10, 70],
          ['Late', 38, 22, 15, 75],
          ['Night', 25, 40, 30, 95],
          ['All', 105, 80, 55, 240],
        ],
      },
    },
    {
      heading: 'Chi-Square Test',
      table: {
        columns: ['', 'Chi-Square', 'DF', 'P-Value'],
        rows: [['Pearson', '21.08', 4, '0.000']],
      },
    },
  ],
};

const REGRESSION: MinitabOutput = {
  title: 'Regression Analysis: Hardness versus Temp',
  blocks: [
    { heading: 'Regression Equation', lines: ['Hardness = -12.4 + 0.310 Temp'] },
    {
      heading: 'Coefficients',
      table: {
        columns: ['Term', 'Coef', 'SE Coef', 'T-Value', 'P-Value'],
        rows: [
          ['Constant', '-12.4', '8.1', '-1.53', '0.134'],
          ['Temp', '0.310', '0.036', '8.61', '0.000'],
        ],
      },
    },
    {
      heading: 'Model Summary',
      table: { columns: ['S', 'R-sq', 'R-sq(adj)'], rows: [['3.12', '66.1%', '65.2%']] },
    },
  ],
};

const TWO_PROP: MinitabOutput = {
  title: 'Test and CI for Two Proportions: Late, Carrier',
  blocks: [
    {
      heading: 'Descriptive Statistics',
      table: {
        columns: ['Sample', 'N', 'Event', 'Sample p'],
        rows: [
          ['North', 400, 38, '0.095000'],
          ['South', 400, 21, '0.052500'],
        ],
      },
    },
    {
      heading: 'Estimation for Difference',
      lines: ['Difference: p(North) - p(South)'],
      table: { columns: ['Difference', '95% CI for Difference'], rows: [['0.0425', '(0.0064, 0.0786)']] },
    },
    {
      heading: 'Test',
      lines: ['Null hypothesis        H₀: p₁ - p₂ = 0', 'Alternative hypothesis H₁: p₁ - p₂ ≠ 0'],
      table: { columns: ['Method', 'Z-Value', 'P-Value'], rows: [['Normal approximation', '2.30', '0.021']] },
    },
  ],
};

export const module4: AcademyModule = {
  id: 'm4',
  number: 4,
  title: 'Picking the right tool',
  summary: 'Use Y and X data types to choose the graph and the test — then read the Minitab output.',
  umsTopics: [
    'Hypothesis Tests (selection)',
    'One/Two Way ANOVA',
    'Correlation',
    'Simple/Multiple/Logistic Regression',
    'Confidence Interval (reading output)',
  ],
  lessons: [
    {
      id: 'm4-l1',
      title: 'The X–Y matrix',
      goal: 'Pick the tool family from the data types of Y and X.',
      cards: [
        {
          kind: 'concept',
          title: 'Y = f(X)',
          body: '**Y** is the output you want to improve (e.g. strength, % late). **X** is an input you suspect drives it (supplier, temperature, shift).\n\nThe data type of **Y** and of **X** together point to one of four tool families.',
          visual: { type: 'toolMatrix' },
          keyIdea: 'Two questions: Is Y continuous or discrete? Is X continuous or discrete?',
        },
        {
          kind: 'concept',
          title: 'Y continuous, X discrete',
          body: 'You compare a measured Y **across groups** — suppliers, lines, shifts. Graph it with a **box plot**. Test the means with **t-tests** (2 groups) or **ANOVA** (3+ groups).',
          visual: {
            type: 'boxplot',
            yLabel: 'Tensile strength (MPa)',
            groups: [
              { label: 'Supplier A', values: supplierA },
              { label: 'Supplier B', values: supplierB },
              { label: 'Supplier C', values: supplierC },
            ],
          },
          keyIdea: 'Box = middle 50 %, line = median, dot = mean, * = outlier.',
        },
        {
          kind: 'concept',
          title: 'Y continuous, X continuous',
          body: 'Both are measured. Ask: **does Y move when X moves?** Graph with a **scatter plot**; quantify with **correlation** (r) and model with **regression** (fitted line).',
          visual: { type: 'scatter', points: hardness, xLabel: 'Oven temperature (°C)', yLabel: 'Hardness', fit: true },
        },
        {
          kind: 'concept',
          title: 'Y discrete, X discrete',
          body: 'You compare **rates or category mixes** across groups. Graph with **stacked % bars**. Use **1- or 2-proportion tests** for a yes/no Y, and the **chi-square test** for a table of categories.',
          visual: {
            type: 'stackedBars',
            yLabel: '% of defects',
            groups: ['Early', 'Late', 'Night'],
            series: [
              { label: 'Scratch', values: [42, 38, 25] },
              { label: 'Dent', values: [18, 22, 40] },
              { label: 'Stain', values: [10, 15, 30] },
            ],
          },
        },
        {
          kind: 'concept',
          title: 'Y discrete, X continuous',
          body: 'A yes/no outcome driven by a measured input — e.g. **does the probability of a leak rise with torque?** Use **logistic regression**, which models the probability of the event.',
          visual: { type: 'toolMatrix', highlight: 'cd' },
        },
        {
          kind: 'classify',
          title: 'Which tool family?',
          prompt: 'Type Y and X for each scenario, then pick the family.',
          categories: QUADRANTS,
          hint: 'Find the Y (outcome) first. Then check X: groups/categories, or a measurement?',
          items: [
            { id: 'a', label: 'Does call handle time differ between 3 teams?', answer: 'dc', why: 'Y time = continuous; X team = discrete → ANOVA.' },
            { id: 'b', label: 'Does coating thickness depend on line speed (m/min)?', answer: 'cc', why: 'Both measured → regression.' },
            { id: 'c', label: 'Is % late different between two carriers?', answer: 'dd', why: 'Y late yes/no; X carrier → 2-proportion test.' },
            { id: 'd', label: 'Does leak (yes/no) probability rise with clamp torque (Nm)?', answer: 'cd', why: 'Binary Y, continuous X → logistic regression.' },
            { id: 'e', label: 'Is defect type associated with shift?', answer: 'dd', why: 'Both categorical → chi-square.' },
            { id: 'f', label: 'Is fill weight different before vs after a nozzle change?', answer: 'dc', why: 'Y weight continuous; X before/after → t-test.' },
          ],
        },
      ],
    },
    {
      id: 'm4-l2',
      title: 'Graph first, then test',
      goal: 'Choose and read the graph that matches the data types.',
      cards: [
        {
          kind: 'concept',
          title: 'Always look before you test',
          body: 'A graph shows shape, outliers, mixtures and practical size. A p-value only answers one narrow question.\n\nBlack Belts graph **every** analysis first — the graph often tells the story; the test confirms it is not chance.',
          keyIdea: '“Practical, graphical, analytical” — in that order.',
        },
        {
          kind: 'choice',
          title: 'Read the box plot',
          prompt: 'Tensile strength by supplier. What does the graph suggest?',
          visual: {
            type: 'boxplot',
            yLabel: 'Tensile strength (MPa)',
            groups: [
              { label: 'Supplier A', values: supplierA },
              { label: 'Supplier B', values: supplierB },
              { label: 'Supplier C', values: supplierC },
            ],
          },
          options: [
            { id: 'a', label: 'B is weakest on average; C varies far more than A and B' },
            { id: 'b', label: 'All three suppliers are identical' },
            { id: 'c', label: 'C is the most consistent supplier' },
            { id: 'd', label: 'A has the most variation' },
          ],
          answer: 'a',
          hint: 'Compare the centre lines (location) and the box + whisker heights (spread).',
          explanation: 'B’s box sits lowest → lower mean strength. C’s box and whiskers are tallest → the most variation. Both location and spread are possible Analyze findings.',
        },
        {
          kind: 'choice',
          title: 'Which graph?',
          prompt: 'Question: “Is the % of late deliveries different for our two carriers?” Which graph fits?',
          options: [
            { id: 'a', label: 'Bar / stacked bar of % late by carrier' },
            { id: 'b', label: 'Scatter plot' },
            { id: 'c', label: 'Histogram of carriers' },
            { id: 'd', label: 'Box plot of % late' },
          ],
          answer: 'a',
          hint: 'Y is yes/no; X is a category. Which graph shows rates by category?',
          explanation: 'Discrete Y vs discrete X → compare **proportions by group** with bars. Scatter needs two continuous variables; histograms and box plots need a continuous Y.',
        },
        {
          kind: 'choice',
          title: 'Read the scatter',
          prompt: 'Hardness versus oven temperature with a fitted line. What do you conclude?',
          visual: { type: 'scatter', points: hardness, xLabel: 'Oven temperature (°C)', yLabel: 'Hardness', fit: true },
          options: [
            { id: 'a', label: 'Clear positive relationship — hotter ovens give harder coatings, with some scatter' },
            { id: 'b', label: 'No relationship' },
            { id: 'c', label: 'Negative relationship' },
            { id: 'd', label: 'Temperature proven to cause hardness' },
          ],
          answer: 'a',
          hint: 'Which way does the cloud slope? How tight is it around the line?',
          explanation: 'Points rise left to right → **positive** association. Scatter alone shows association, not proof of cause — process knowledge or a DOE confirms causation.',
        },
        {
          kind: 'choice',
          title: 'No pattern',
          prompt: 'Fill volume versus ambient humidity. What does this scatter tell you?',
          visual: { type: 'scatter', points: lineScatterNone, xLabel: 'Ambient humidity (%)', yLabel: 'Fill volume (ml)', fit: true },
          options: [
            { id: 'a', label: 'Little or no linear relationship — humidity is unlikely to be a vital X for fill volume' },
            { id: 'b', label: 'Strong positive relationship' },
            { id: 'c', label: 'Humidity explains most of the variation' },
          ],
          answer: 'a',
          hint: 'Is the cloud tilted, or a shapeless blob around a nearly flat line?',
          explanation: 'A round, shapeless cloud and flat line → weak or no linear association. Moving on to other X’s is a valid Analyze outcome.',
        },
      ],
    },
    {
      id: 'm4-l3',
      title: 'Choosing the exact test',
      goal: 'Go from tool family to the specific test.',
      cards: [
        {
          kind: 'concept',
          title: 'Continuous Y: how many groups?',
          body: '- **1-sample t:** one group vs a target (“is mean fill = 500 g?”)\n- **2-sample t:** two independent groups (supplier A vs B)\n- **Paired t:** same units measured twice (before/after on the same machines)\n- **One-way ANOVA:** three or more groups of one factor\n- **Two-way ANOVA:** two factors at once (and their interaction)\n\nAlso check **equal variances** (Levene / Bartlett) — spread differences are findings too.',
          visual: { type: 'toolMatrix', highlight: 'dc' },
        },
        {
          kind: 'concept',
          title: 'Discrete Y: rates and tables',
          body: '- **1-proportion:** one rate vs a target (“is % defective below 2 %?”)\n- **2-proportion:** two independent rates (carrier North vs South)\n- **Chi-square:** a table of categories — 3+ groups or a Y with several categories (shift × defect type)',
          visual: { type: 'toolMatrix', highlight: 'dd' },
        },
        {
          kind: 'classify',
          title: 'Name the test',
          prompt: 'Choose the specific test for each question.',
          categories: TESTS,
          hint: 'Continuous or discrete Y? Then count the groups — and ask whether the same units appear twice.',
          items: [
            { id: 'a', label: 'Is the average cycle time on 3 production lines the same?', answer: 'anova', why: 'Continuous Y, 3 groups → one-way ANOVA.' },
            { id: 'b', label: '12 machines measured before and after a new lubricant', answer: 'tp', why: 'Same 12 machines twice → paired t.' },
            { id: 'c', label: 'Is mean fill weight on target at 500 g?', answer: 't1', why: 'One group vs a target → 1-sample t.' },
            { id: 'd', label: 'Is % rework different for day vs night shift?', answer: 'p2', why: 'Binary Y, two groups → 2-proportion.' },
            { id: 'e', label: 'Does complaint category differ by region (4 regions)?', answer: 'chi', why: 'Categorical Y and X in a table → chi-square.' },
            { id: 'f', label: 'Do two suppliers deliver the same mean strength?', answer: 't2', why: 'Two independent groups, continuous Y → 2-sample t.' },
          ],
        },
        {
          kind: 'choice',
          title: 'Paired or not?',
          prompt: '20 operators each assemble a unit with the old fixture and with the new one. You compare assembly times. Why is the **paired t** better than the 2-sample t here?',
          options: [
            { id: 'a', label: 'It removes operator-to-operator differences, so the fixture effect is clearer' },
            { id: 'b', label: 'It works for discrete data' },
            { id: 'c', label: 'It needs no data' },
            { id: 'd', label: 'Paired tests always give smaller p-values regardless of the design' },
          ],
          answer: 'a',
          hint: 'Each operator appears in both groups. What noise does that let you cancel?',
          explanation: 'Pairing analyses the **difference per operator**, removing the large between-operator variation. Same data, much more sensitive test — but only valid when the pairs genuinely belong together.',
        },
        {
          kind: 'order',
          title: 'The selection roadmap',
          prompt: 'Put the tool-selection steps in order.',
          steps: [
            { id: '1', label: 'Write the practical question' },
            { id: '2', label: 'Type Y (continuous / discrete)' },
            { id: '3', label: 'Type X and count the groups' },
            { id: '4', label: 'Graph the data' },
            { id: '5', label: 'Check assumptions (normality, equal variance)' },
            { id: '6', label: 'Run the test and read the p-value' },
            { id: '7', label: 'Translate into a practical conclusion' },
          ],
          hint: 'Graphing comes before formal checks; the practical conclusion is always last.',
          explanation: 'Question → Y type → X type/groups → graph → assumptions → test → practical conclusion. Exam scenarios often hide which step was skipped.',
        },
      ],
    },
    {
      id: 'm4-l4',
      title: 'Reading Minitab output',
      goal: 'Find the p-value, the estimate and the conclusion in real output.',
      cards: [
        {
          kind: 'concept',
          title: 'The p-value in one card',
          body: 'Every test starts with **H₀: no difference / no relationship**.\n\nThe **p-value** is the probability of seeing data at least this extreme if H₀ were true. With α = 0.05:\n\n- p ≤ 0.05 → reject H₀: the difference is statistically significant\n- p > 0.05 → not enough evidence; this is **not** proof that the groups are equal',
          keyIdea: '“If p is low, H₀ must go.” Then ask: is the difference big enough to matter?',
        },
        {
          kind: 'choice',
          title: '2-sample t output',
          prompt: 'Strength of material from two suppliers. What is the correct conclusion at α = 0.05?',
          visual: { type: 'minitab', output: TWO_SAMPLE_T },
          options: [
            { id: 'a', label: 'p = 0.003 → significant difference; A is stronger by about 4.1 MPa (CI 1.5 to 6.8)' },
            { id: 'b', label: 'p = 0.003 → no difference between suppliers' },
            { id: 'c', label: 'T = 3.13 is above 0.05, so not significant' },
            { id: 'd', label: 'B is stronger than A' },
          ],
          answer: 'a',
          hint: 'Find the P-Value in the Test table and compare it to 0.05. Then check the sign of the difference.',
          explanation: 'p = 0.003 < 0.05 → reject H₀. Difference (A − B) = 4.12 MPa, and the 95 % CI (1.48, 6.76) excludes 0 — the same conclusion from another angle.',
        },
        {
          kind: 'numeric',
          title: 'Pull a number',
          prompt: 'From the same output: what is the **upper** limit of the 95 % CI for the difference?',
          visual: { type: 'minitab', output: TWO_SAMPLE_T },
          answer: 6.76,
          tolerance: 0.005,
          unit: 'MPa',
          hint: 'Look at “Estimation for Difference”.',
          explanation: 'CI = (1.48, **6.76**). The true difference is plausibly between 1.5 and 6.8 MPa — useful for judging practical importance.',
        },
        {
          kind: 'choice',
          title: 'One-way ANOVA output',
          prompt: 'Fill weight across three lines. What do you conclude?',
          visual: { type: 'minitab', output: ONE_WAY },
          options: [
            { id: 'a', label: 'p = 0.214 → no evidence the line means differ; look elsewhere for vital X’s' },
            { id: 'b', label: 'Line 2 is proven to be different' },
            { id: 'c', label: 'The lines are proven to be exactly equal' },
            { id: 'd', label: 'F = 1.60 > 0.05 so it is significant' },
          ],
          answer: 'a',
          hint: 'Compare P-Value with α. Remember: “not significant” ≠ “proven equal”.',
          explanation: 'p = 0.214 > 0.05 → fail to reject H₀. The ~1 g differences in means are within noise. Line is probably not a vital X for fill weight — but you have not proven the lines identical.',
        },
        {
          kind: 'choice',
          title: 'Chi-square output',
          prompt: 'Is defect type associated with shift?',
          visual: { type: 'minitab', output: CHI_SQ },
          options: [
            { id: 'a', label: 'Yes — p < 0.001; the night shift has relatively more dents and stains' },
            { id: 'b', label: 'No — a p-value that small means the effect is too small to matter' },
            { id: 'c', label: 'Chi-square 21.08 proves the night shift causes dents' },
            { id: 'd', label: 'Cannot tell — chi-square needs continuous data' },
          ],
          answer: 'a',
          hint: 'Low p → reject “no association”. Then look at the counts to see where the pattern is.',
          explanation: 'Minitab shows 0.000, meaning p < 0.001 → shift and defect type are **associated**. The table shows night shift with more dents/stains. Association ≠ cause — investigate what differs on nights (staff, lighting, material).',
        },
        {
          kind: 'choice',
          title: 'Regression output',
          prompt: 'Hardness versus oven temperature (n = 40). Which reading is correct?',
          visual: { type: 'minitab', output: REGRESSION },
          options: [
            { id: 'a', label: 'Temperature is significant (p = 0.000); each +1 °C adds ~0.31 hardness; the model explains ~66 % of variation' },
            { id: 'b', label: 'Constant p = 0.134 means temperature is not significant' },
            { id: 'c', label: 'R-sq 66.1 % means 66 % of parts are good' },
            { id: 'd', label: 'Each +1 °C reduces hardness by 12.4' },
          ],
          answer: 'a',
          hint: 'Read the Temp row (not Constant) for significance and slope. R-sq is the share of variation explained.',
          explanation: 'Temp p = 0.000 → significant. Slope 0.310 per °C. R-sq 66.1 % → temperature accounts for about two-thirds of hardness variation; the rest is other X’s and noise.',
        },
        {
          kind: 'numeric',
          title: 'Predict with the equation',
          prompt: 'Using **Hardness = −12.4 + 0.310 × Temp**, predict hardness at **220 °C**.',
          visual: { type: 'minitab', output: REGRESSION },
          answer: 55.8,
          tolerance: 0.05,
          hint: 'Multiply 0.310 by 220, then add −12.4.',
          explanation: '0.310 × 220 = 68.2; 68.2 − 12.4 = **55.8**. Only predict inside the temperature range you studied.',
        },
        {
          kind: 'slider',
          title: 'Feel R²',
          prompt: 'Drag the relationship strength. Watch the cloud, the fitted line, r and R².',
          sim: 'correlation',
          check: {
            prompt: 'With r = 0.50, how much of the variation in Y does X explain?',
            options: [
              { id: 'a', label: '25 % (R² = r²)' },
              { id: 'b', label: '50 %' },
              { id: 'c', label: '5 %' },
              { id: 'd', label: '100 % — any correlation is total' },
            ],
            answer: 'a',
            hint: 'Set the slider to 0.50 and read the R² label.',
            explanation: 'R² = r² = 0.5² = **0.25**. A “moderate” correlation still leaves three-quarters of the variation unexplained.',
          },
        },
      ],
    },
    {
      id: 'm4-cp',
      title: 'Checkpoint: scenario lab',
      goal: 'From raw scenario to tool to conclusion.',
      checkpoint: true,
      cards: [
        {
          kind: 'choice',
          title: 'Scenario 1',
          prompt: 'Logistics: you log **late (yes/no)** for 400 shipments from each of two carriers. Which test?',
          options: [
            { id: 'a', label: '2-proportion test' },
            { id: 'b', label: '2-sample t' },
            { id: 'c', label: 'Regression' },
            { id: 'd', label: 'One-way ANOVA' },
          ],
          answer: 'a',
          hint: 'Y is binary, X has two groups.',
          explanation: 'Binary Y, two independent groups → **2-proportion test**.',
        },
        {
          kind: 'choice',
          title: 'Scenario 1 — the output',
          prompt: 'Here is the result. What is the right conclusion?',
          visual: { type: 'minitab', output: TWO_PROP },
          options: [
            { id: 'a', label: 'North is late more often (9.5 % vs 5.3 %); p = 0.021 → significant at α = 0.05' },
            { id: 'b', label: 'No difference because both are below 10 %' },
            { id: 'c', label: 'South is late more often' },
            { id: 'd', label: 'Z = 2.30 means 230 % more late deliveries' },
          ],
          answer: 'a',
          hint: 'Compare the Sample p values, then the P-Value against 0.05.',
          explanation: '9.5 % vs 5.25 %, p = 0.021 < 0.05, and the CI (0.0064, 0.0786) excludes 0 → North’s late rate is significantly higher by ~4 percentage points.',
        },
        {
          kind: 'classify',
          title: 'Rapid fire',
          prompt: 'Choose the tool family for each.',
          categories: QUADRANTS,
          hint: 'Type Y first, then X.',
          items: [
            { id: 'a', label: 'Weld strength vs current (A)', answer: 'cc', why: 'Both continuous → regression.' },
            { id: 'b', label: 'Approval yes/no vs loan amount (€)', answer: 'cd', why: 'Binary Y, continuous X → logistic.' },
            { id: 'c', label: 'Wait time by 4 clinics', answer: 'dc', why: 'Continuous Y, groups → ANOVA.' },
            { id: 'd', label: 'Error type by software version', answer: 'dd', why: 'Categories × categories → chi-square.' },
          ],
        },
        {
          kind: 'numeric',
          title: 'R² from r',
          prompt: 'A correlation between line speed and scrap rate is **r = −0.80**. What % of the scrap variation does line speed explain (R²)?',
          answer: 64,
          tolerance: 0.5,
          unit: '%',
          hint: 'Square r. The sign disappears.',
          explanation: '(−0.80)² = 0.64 → **64 %**. Negative r means scrap falls as speed rises; R² measures strength only.',
        },
        {
          kind: 'choice',
          title: 'Trap',
          prompt: 'A 2-sample t-test gives p = 0.38. Your colleague writes “the suppliers are proven identical”. Best correction?',
          options: [
            { id: 'a', label: '“We found no evidence of a difference” — the test may lack power; it does not prove equality' },
            { id: 'b', label: 'Agree — p > 0.05 proves equality' },
            { id: 'c', label: 'p = 0.38 means a 38 % difference' },
            { id: 'd', label: 'Re-run with α = 0.40 so it becomes significant' },
          ],
          answer: 'a',
          hint: 'Failing to reject H₀ is not the same as accepting it.',
          explanation: 'p > α means **insufficient evidence**, not proof of equality. Small samples often miss real effects. Never move α after seeing the data.',
        },
      ],
    },
  ],
};
