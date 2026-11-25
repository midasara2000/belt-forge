import { anovaPanel, chiPanel, propPanel, welchPanel } from '../minitab';
import { anova, chiSquare, num, pairedT, pTxt, twoProp, welchT } from '../stats';
import { oneSamplePanel as tPanel } from '../minitab';
import type { AcademyModule } from '../types';

const NEW = [48.2, 47.6, 49.1, 48.8, 47.9, 48.4, 49.4, 48.0, 47.5, 48.7];
const OLD = [51.0, 50.4, 52.2, 51.6, 50.8, 51.9, 50.1, 52.4, 51.3, 50.6];
const welch = welchT(NEW, OLD);
const welchOut = welchPanel('Two-Sample t: Cycle time', 'New', 'Old', welch);

const SAVED = [2, 3, 1, 4, 2, 3, 2, 1];
const paired = pairedT(SAVED);
const pairedOut = tPanel('Paired t: Minutes saved', 'Test of mean difference = 0 vs ≠ 0', paired);

const LINES = [
  [10, 11, 12, 11, 11],
  [14, 15, 13, 14, 14],
  [11, 12, 10, 11, 11],
];
const fit = anova(LINES);
const anovaOut = anovaPanel('One-way ANOVA: Yield', 'Line', ['A', 'B', 'C'], fit);

const TABLE = [
  [80, 20],
  [60, 40],
  [90, 10],
];
const chi = chiSquare(TABLE);
const chiOut = chiPanel('Chi-square: Shift vs result', ['Shift A', 'Shift B', 'Shift C'], ['Pass', 'Fail'], TABLE, chi);

const prop = twoProp(18, 200, 8, 200);
const propOut = propPanel('Two-proportion test', 'Carrier A', 'Carrier B', 18, 200, 8, 200, prop);

export const module6: AcademyModule = {
  id: 'm6',
  number: 6,
  title: 'Comparing groups',
  summary: 'Two-sample t, paired t, ANOVA, proportions and chi-square — pick the comparison that matches the data.',
  umsTopics: ['Two-sample and paired t', 'One-way and two-way ANOVA', 'Proportion tests', 'Chi-square'],
  lessons: [
    {
      id: 'm6-l1',
      title: 'Two samples, or the same unit twice',
      goal: 'Choose paired t when the units match, and two-sample t when they do not.',
      cards: [
        {
          kind: 'concept',
          title: 'Independent groups versus pairs',
          body: 'A two-sample t compares the means of two **separate** groups: supplier A against supplier B, this week’s parts against last month’s.\n\nA paired t compares two measurements on the **same** unit: before and after on the same machine, left and right on the same part, two operators on the same job. Pairing removes the unit-to-unit noise, so a real difference is easier to see.',
          keyIdea: 'If you can write “the same unit, twice”, it is paired.',
        },
        {
          kind: 'choice',
          title: 'Ten operators, two methods',
          prompt: 'Each of 10 operators runs the old method and the new method on the same job. Which test?',
          options: [
            { id: 'a', label: 'Paired t on the ten differences' },
            { id: 'b', label: 'Two-sample t, as if the 20 runs were unrelated people' },
            { id: 'c', label: 'Chi-square, because there are two methods' },
            { id: 'd', label: 'A Pareto of the operators' },
          ],
          answer: 'a',
          hint: 'Can you subtract “new minus old” inside each operator?',
          explanation: 'The operator is the pair. Analyse the **ten differences**. A two-sample t would treat a fast operator’s old run and a slow operator’s new run as unrelated, and the operator noise would hide the method.',
        },
        {
          kind: 'choice',
          title: 'Thirty parts, two suppliers',
          prompt: 'You draw 30 parts from supplier A and 30 different parts from supplier B. Which test?',
          options: [
            { id: 'a', label: 'Paired t — there are two columns' },
            { id: 'b', label: 'Two-sample t — the parts are different units' },
            { id: 'c', label: 'One-sample t against zero' },
            { id: 'd', label: 'Logistic regression' },
          ],
          answer: 'b',
          hint: 'Is part 1 from A the same physical part as part 1 from B?',
          explanation: 'Different parts are **independent groups**. Two columns in a spreadsheet do not create pairs. Pairing would invent a match that the sampling does not have.',
        },
        {
          kind: 'concept',
          title: 'New fixture versus old',
          body: `Ten parts on the new fixture, ten on the old. Mean cycle time is ${num(welch.ma, 2)} versus ${num(welch.mb, 2)}. The difference (new − old) is ${num(welch.diff, 2)} minutes.\n\nWelch’s test does not assume equal spreads. t = ${num(welch.t, 2)}, df = ${num(welch.df, 1)}, p = ${pTxt(welch.p)}. The 95% interval for the difference is entirely below zero.`,
          visual: { type: 'minitab', output: welchOut },
        },
        {
          kind: 'numeric',
          title: 'The difference',
          prompt: 'From the output, new minus old cycle time is how many minutes? Use the printed difference, including the sign.',
          visual: { type: 'minitab', output: welchOut },
          answer: Number(num(welch.diff, 2)),
          tolerance: 0.01,
          unit: 'min',
          hint: 'The estimation block prints Difference. A negative number means the new fixture is faster.',
          explanation: `Difference = **${num(welch.diff, 2)} minutes**. The interval (${num(welch.ci[0], 2)}, ${num(welch.ci[1], 2)}) does not contain 0, and p = ${pTxt(welch.p)}. The new fixture is faster, by roughly 2 to 3.5 minutes, not by a vague “significant amount”.`,
        },
      ],
    },
    {
      id: 'm6-l2',
      title: 'One-way ANOVA',
      goal: 'Compare three or more means without a pile of t-tests.',
      cards: [
        {
          kind: 'concept',
          title: 'One factor, several levels',
          body: 'ANOVA asks whether **all** the group means are equal. A significant F says at least one mean differs. It does not say which one, and it does not say the difference is large enough to fund.\n\nRunning a t-test on every pair inflates the false-alarm rate. Three lines means three pairs; the chance of a spurious winner climbs.',
          keyIdea: 'F answers “any difference?”. The means, the box plot and a follow-up comparison answer “which?”.',
        },
        {
          kind: 'concept',
          title: 'Three lines, five batches each',
          body: `Line means are ${num(fit.means[0], 0)}, ${num(fit.means[1], 0)} and ${num(fit.means[2], 0)}. F = ${num(fit.f, 0)} on ${fit.dfb} and ${fit.dfw} degrees of freedom, p = ${pTxt(fit.p)}.\n\nThe spreads are similar, so the equal-variance picture is reasonable. Line B is the one that sits apart.`,
          visual: { type: 'minitab', output: anovaOut },
        },
        {
          kind: 'numeric',
          title: 'Degrees of freedom between lines',
          prompt: 'Three lines are compared. What is the between-groups degrees of freedom?',
          answer: 2,
          tolerance: 0.01,
          hint: 'df between = number of groups − 1.',
          explanation: '3 − 1 = **2**, which is the DF on the Line row of the ANOVA table. Error df is 15 − 3 = 12. F = 30 sits on those two numbers.',
        },
        {
          kind: 'choice',
          title: 'What F = 30 does not say',
          prompt: 'The ANOVA is significant. Which statement overclaims?',
          options: [
            { id: 'a', label: 'At least one line mean differs from the others' },
            { id: 'b', label: 'Line B’s mean of 14 is the one that stands away from 11 and 11' },
            { id: 'c', label: 'Every line differs from every other line' },
            { id: 'd', label: 'A box plot is still worth looking at' },
          ],
          answer: 'c',
          hint: 'Look at the three means. Are A and C different from each other?',
          explanation: 'A and C share a mean of 11. **Not every pair differs.** The significant F, plus the means table, points at Line B. A follow-up comparison or the intervals would confirm it. “All lines differ” is the overclaim.',
        },
        {
          kind: 'choice',
          title: 'Why not three t-tests',
          prompt: 'An engineer runs three two-sample t-tests at α = 0.05 and highlights the one pair with p = 0.04. What is the risk?',
          options: [
            { id: 'a', label: 'The false-alarm rate across the family of tests is higher than 5%' },
            { id: 'b', label: 't-tests cannot compare means' },
            { id: 'c', label: 'ANOVA is only legal for two groups' },
            { id: 'd', label: 'There is no risk if each test used α = 0.05' },
          ],
          answer: 'a',
          hint: 'Each test spends a 5% false-alarm budget. How many tests were spent?',
          explanation: 'Three tests at 5% each give more than a 5% chance of **some** false winner when nothing differs. ANOVA is the single question. If you then compare pairs, use a method that protects the family of comparisons.',
        },
      ],
    },
    {
      id: 'm6-l3',
      title: 'Two factors and interaction',
      goal: 'Notice when the effect of A depends on the level of B.',
      cards: [
        {
          kind: 'concept',
          title: 'Interaction is a change of story',
          body: 'A main effect is the average influence of a factor. An **interaction** means that influence changes depending on another factor.\n\nIf a lubricant helps machine 1 and hurts machine 2, there is no single “lubricant effect” worth quoting. The lines on an interaction plot are not parallel.',
          keyIdea: 'When the lines cross or fan out, interpret the combination, not the average.',
        },
        {
          kind: 'choice',
          title: 'Name the pattern',
          prompt: 'Yield rises when temperature is raised on product A, and falls when temperature is raised on product B. What is that?',
          options: [
            { id: 'a', label: 'No effect of temperature, because the average change is near zero' },
            { id: 'b', label: 'An interaction: the temperature effect depends on the product' },
            { id: 'c', label: 'A paired t-test' },
            { id: 'd', label: 'Proof that temperature is not a factor' },
          ],
          answer: 'b',
          hint: 'Does “raise the temperature” have one answer, or two?',
          explanation: 'That is an **interaction**. The average temperature effect can look like nothing while each product has a large, opposite effect. Quoting the average would tell both products the wrong thing.',
        },
        {
          kind: 'choice',
          title: 'What you report',
          prompt: 'The interaction of lubricant and machine is large. What do you tell the plant?',
          options: [
            { id: 'a', label: 'One lubricant setting for every machine, based on the main effect' },
            { id: 'b', label: 'The lubricant decision has to be made per machine' },
            { id: 'c', label: 'Ignore both factors, because they disagree' },
            { id: 'd', label: 'Interaction means the data entry failed' },
          ],
          answer: 'b',
          hint: 'A large interaction means the simple recommendation is false for someone.',
          explanation: 'Report the **simple effects**: what the lubricant does on each machine. A single plant-wide setting, taken from the main effect, helps one machine and harms the other.',
        },
        {
          kind: 'order',
          title: 'How to read a two-way study',
          prompt: 'Put the reading order in sequence.',
          steps: [
            { id: 's1', label: 'Plot the groups, including an interaction plot' },
            { id: 's2', label: 'Look at the interaction before the main effects' },
            { id: 's3', label: 'If the interaction is real, describe each combination' },
            { id: 's4', label: 'If the interaction is absent, then quote the main effects' },
          ],
          hint: 'Main effects are the shortcut you earn only when the lines are parallel.',
          explanation: 'Picture, then interaction, then either the combinations or the main effects. Leading with a main effect when the lines cross is how a correct analysis becomes the wrong instruction.',
        },
        {
          kind: 'choice',
          title: 'One run at each corner',
          prompt: 'A two-factor study was run once at each combination. Someone wants a p-value for the interaction. What is missing?',
          options: [
            { id: 'a', label: 'Nothing — one observation per cell is enough to test the interaction' },
            { id: 'b', label: 'Replication. Without a second run, there is no estimate of noise to test the interaction against' },
            { id: 'c', label: 'A third factor' },
          ],
          answer: 'b',
          hint: 'A test needs a comparison with ordinary run-to-run noise. Where would that noise come from?',
          explanation: 'With one observation per cell, the interaction **is** the leftover. You cannot test it against noise you have not measured. Replicate, or accept that the interaction plot is a description, not a p-value.',
        },
      ],
    },
    {
      id: 'm6-l4',
      title: 'Proportions and chi-square',
      goal: 'Compare rates and categories without pretending they are measurements.',
      cards: [
        {
          kind: 'concept',
          title: 'Counts in, rates out',
          body: 'When Y is pass/fail or a set of categories, you compare **counts**, not a t-test on the daily percentages.\n\nTwo groups and a binary Y: a two-proportion test. Several groups, or two categorical factors: a chi-square test. The expected count in each cell should be roughly 5 or more, or the p-value gets shaky.',
          keyIdea: 'A percentage hides the sample size. The test needs the counts and the totals.',
        },
        {
          kind: 'concept',
          title: 'Three shifts, pass or fail',
          body: `Each shift ran 100 units. Failures were 20, 40 and 10. Chi-square = ${num(chi.chi, 2)} on ${chi.df} df, p = ${pTxt(chi.p)}.\n\nThe rates differ. Shift B, at 40 fails, is the problem cell. The test says “not the same”; the table says where.`,
          visual: { type: 'minitab', output: chiOut },
        },
        {
          kind: 'numeric',
          title: 'Degrees of freedom',
          prompt: 'A chi-square table has 3 rows and 2 columns. What is df?',
          answer: 2,
          tolerance: 0.01,
          hint: 'df = (rows − 1) × (columns − 1).',
          explanation: `(3 − 1) × (2 − 1) = **2**. That is why the output reports df = ${chi.df} next to chi-square = ${num(chi.chi, 2)}.`,
        },
        {
          kind: 'choice',
          title: 'Two carriers',
          prompt: `Late shipments: Carrier A 18 of 200 (9%), Carrier B 8 of 200 (4%). z = ${num(prop.z, 2)}, p = ${pTxt(prop.p)}. At α = 0.05, what is fair?`,
          visual: { type: 'minitab', output: propOut },
          options: [
            { id: 'a', label: 'The rates differ. A is worse in this sample, and the result clears 5%' },
            { id: 'b', label: 'p = 0.043 means there is a 4.3% chance A is the better carrier' },
            { id: 'c', label: 'Use a t-test on the two percentages 9 and 4' },
            { id: 'd', label: 'The sample is too small to say anything because each rate is under 10%' },
          ],
          answer: 'a',
          hint: 'Compare p with 0.05, then look back at which carrier had more late shipments.',
          explanation: `p = ${pTxt(prop.p)} is **just under 0.05**, so the rates differ at the usual α. Carrier A’s 18 late shipments against B’s 8 is the direction. Do not feed the two percentages into a t-test — the information is in the counts. And do not treat a close p-value as a huge practical gap; 5 percentage points on 200 shipments is the size you discuss with logistics.`,
        },
        {
          kind: 'choice',
          title: 'A sparse table',
          prompt: 'A chi-square table has several cells with expected counts of 1 or 2. The software still prints p = 0.03. What do you do?',
          options: [
            { id: 'a', label: 'Trust p = 0.03. The software would not print it otherwise' },
            { id: 'b', label: 'Treat the p-value as shaky. Combine sensible categories or collect more data before you decide' },
            { id: 'c', label: 'Convert the counts to percentages and run ANOVA' },
          ],
          answer: 'b',
          hint: 'The chi-square approximation needs expected counts that are not tiny.',
          explanation: 'Expected counts near **1 or 2** make the printed p-value unreliable. Pool categories that genuinely belong together, or get more data. Do not “fix” it by running ANOVA on percentages.',
        },
      ],
    },
    {
      id: 'm6-cp',
      title: 'Checkpoint: which comparison?',
      goal: 'From the structure of the data to the test.',
      checkpoint: true,
      cards: [
        {
          kind: 'classify',
          title: 'Pick the comparison',
          prompt: 'Which test fits each study?',
          categories: [
            { id: 'pair', label: 'Paired t' },
            { id: 'two', label: 'Two-sample t' },
            { id: 'anova', label: 'ANOVA' },
            { id: 'chi', label: 'Chi-square / proportions' },
          ],
          hint: 'Same unit twice, two independent groups, three or more means, or categories.',
          items: [
            { id: 'i1', label: 'Weight before and after the same 12 parts are reworked', answer: 'pair', why: 'Each part is its own control → paired t on the differences.' },
            { id: 'i2', label: 'Diameter of 40 parts from press 1 and 40 from press 2', answer: 'two', why: 'Two independent groups, continuous Y → two-sample t.' },
            { id: 'i3', label: 'Yield on lines A, B and C', answer: 'anova', why: 'Three means, one factor → one-way ANOVA, then see which line.' },
            { id: 'i4', label: 'Pass/fail counts across three shifts', answer: 'chi', why: 'Categories by categories → chi-square. Two shifts would be a two-proportion test.' },
          ],
        },
        {
          kind: 'choice',
          title: 'Paired output',
          prompt: `Eight batches saved ${SAVED.join(', ')} minutes. Mean saving ${num(paired.mean, 2)}, t = ${num(paired.t, 2)}, p = ${pTxt(paired.p)}, 95% CI (${num(paired.ci[0], 2)}, ${num(paired.ci[1], 2)}). What is fair?`,
          visual: { type: 'minitab', output: pairedOut },
          options: [
            { id: 'a', label: 'The saving is distinguishable from zero, somewhere around 1.4 to 3.1 minutes' },
            { id: 'b', label: 'The saving is exactly 2.25 minutes in the future, with no uncertainty' },
            { id: 'c', label: 'p small means the saving is zero' },
            { id: 'd', label: 'Use chi-square because there are eight numbers' },
          ],
          answer: 'a',
          hint: 'Does the interval contain 0? How wide is it?',
          explanation: `The interval **excludes 0**, so a saving is established. Its plausible size is about ${num(paired.ci[0], 2)} to ${num(paired.ci[1], 2)} minutes, centred on ${num(paired.mean, 2)}. Quote the interval to the sponsor, not only “significant”.`,
        },
        {
          kind: 'choice',
          title: 'A crossing interaction',
          prompt: 'Machine and material interact strongly. The material main effect is not significant. What do you recommend?',
          options: [
            { id: 'a', label: 'Material does not matter. Buy the cheaper one' },
            { id: 'b', label: 'Choose the material per machine. The average hides opposite effects' },
            { id: 'c', label: 'Run a chi-square test on the yields' },
          ],
          answer: 'b',
          hint: 'A quiet main effect next to a loud interaction is a warning, not a green light.',
          explanation: 'The materials disagree **by machine**. Buying “the” material from the main effect will be right on one machine and wrong on the other. Report the combinations.',
        },
        {
          kind: 'numeric',
          title: 'ANOVA error df',
          prompt: 'Five batches on each of three lines: 15 observations. What is the error degrees of freedom?',
          answer: 12,
          tolerance: 0.01,
          hint: 'Error df = N − number of groups.',
          explanation: '15 − 3 = **12**. Together with 2 df for lines, the total df is 14, one less than the 15 observations. This matches the ANOVA table in the lesson.',
        },
      ],
    },
  ],
};
