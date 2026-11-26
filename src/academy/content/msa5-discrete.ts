import { cg, num } from '../stats';
import type { AcademyModule, Choice } from '../types';

const agree = ((40 + 5) / 50) * 100;
const miss = (4 / 9) * 100;
const falseAlarm = (1 / 41) * 100;
const kappa = (0.9 - 0.74) / (1 - 0.74);
const cgCheckpoint = cg(1, 0.025);

const STUDY: Choice[] = [
  { id: 't1', label: 'Type 1' },
  { id: 't2', label: 'Type 2' },
  { id: 't3', label: 'Type 3' },
  { id: 'attr', label: 'Attribute' },
];

export const msa5: AcademyModule = {
  id: 'msa5',
  number: 5,
  title: 'Pass / fail',
  summary: 'Agreement, misses, false alarms, and kappa. Cg and %GRR do not take a yes or a no.',
  umsTopics: ['Gage R&R for discrete (binary) data'],
  lessons: [
    {
      id: 'msa5-strategy',
      title: 'Decisions, not millimetres',
      goal: 'State the three questions an attribute study asks.',
      cards: [
        {
          kind: 'concept',
          title: 'The measurement is a decision',
          body: 'Pass/fail, go/no-go, and a visual accept or reject do not have a spread you can put into Cg. The recorded result is a **call**.\n\nYou need known good parts and known bad parts. Then three questions:\n\n- **Repeatability:** does the same person call the same part the same way twice?\n- **Reproducibility:** do people agree with each other?\n- **Accuracy:** do they agree with the known standard?\n\nThose are the attribute versions of “device”, “people”, and “truth”. The formulas are percentages and kappa, not Cg.',
          keyIdea: 'Purpose: can we trust the call, not the millimetre.',
        },
        {
          kind: 'concept',
          title: 'The formulas on this path',
          body: 'Count matches and errors against the standard. A miss lets a bad part go. A false alarm scraps a good part. They are not one combined “disagreement”.\n\nKappa comes next. It asks how much of the agreement is above the agreement you would get by chance.',
          visual: {
            type: 'table',
            data: {
              caption: 'Attribute formulas',
              columns: ['Name', 'Formula', 'Purpose'],
              rows: [
                ['% agreement', '100 × matches / decisions', 'Raw agreement, including lucky matches'],
                ['Miss rate', '100 × bad parts called good / bad parts', 'Escapes. Often the costly error.'],
                ['False-alarm rate', '100 × good parts called bad / good parts', 'Good parts scrapped or reworked'],
                ['Kappa', '(P_o − P_e) / (1 − P_e)', 'Agreement beyond chance'],
              ],
            },
          },
          keyIdea: 'Do not average a miss and a false alarm into one comfortable percent.',
        },
        {
          kind: 'choice',
          title: 'The wrong formula',
          prompt: 'Inspectors stamp panels good or bad. A colleague starts calculating Cg. What do you say?',
          options: [
            { id: 'a', label: 'Cg is fine if you code good as 1 and bad as 0.' },
            { id: 'b', label: 'Stop. Cg needs a tolerance and a standard deviation of a number. This output needs an attribute study.' },
            { id: 'c', label: 'Cg works once you have three inspectors.' },
            { id: 'd', label: 'Use %Tolerance. Kappa is only for continuous data.' },
          ],
          answer: 'b',
          hint: 'Look at the inputs of Cg again: T and s.',
          explanation:
            'Coding good and bad as 1 and 0 does not create a millimetre. The study is attribute agreement: within-appraiser, between-appraiser, and versus the standard. Kappa belongs on this path, not on a diameter.',
        },
        {
          kind: 'choice',
          title: 'Fifty known panels',
          prompt: 'Three inspectors classify 50 known parts as pass or fail, twice each. Which study fits?',
          options: [
            { id: 'a', label: 'Attribute agreement: repeatability, reproducibility, and agreement with the standard.' },
            { id: 'b', label: 'Type 2 %Study Variation only.' },
            { id: 'c', label: 'Type 1, because 50 is a common repeat count.' },
            { id: 'd', label: 'A probability plot of the residuals.' },
          ],
          answer: 'a',
          hint: 'The recorded result is a category, and the parts have a known truth.',
          explanation:
            'Two rounds of the same person estimate repeatability of the call. Three inspectors estimate reproducibility. The known good and bad parts estimate accuracy. Continuous %GRR formulas do not apply.',
        },
      ],
    },
    {
      id: 'msa5-errors',
      title: 'Misses and false alarms',
      goal: 'Compute agreement, the miss rate, and the false-alarm rate from one table.',
      cards: [
        {
          kind: 'concept',
          title: 'Two errors, two costs',
          body: 'One inspector against the standard, 50 parts.\n\n- **Miss** (false accept): a bad part called good. It escapes.\n- **False alarm** (false reject): a good part called bad. It becomes scrap or rework.\n\nA 2% miss on a safety characteristic can be unacceptable while a 2% false alarm is a cost problem. Report them separately. The denominator for a miss is the bad parts, not all the parts.',
          visual: {
            type: 'table',
            data: {
              caption: 'One inspector, 50 parts, against the standard',
              columns: ['', 'Called good', 'Called bad'],
              rows: [
                ['Actually good', '40', '1'],
                ['Actually bad', '4', '5'],
              ],
            },
          },
          keyIdea: 'Misses use the bad row. False alarms use the good row.',
        },
        {
          kind: 'numeric',
          title: 'Percent agreement',
          prompt: 'From the table: 40 good parts called good and 5 bad parts called bad, out of 50. What is the percent agreement?',
          answer: agree,
          tolerance: 0.1,
          unit: '%',
          hint: 'Matches are 40 + 5. Divide by 50 and convert to a percent.',
          explanation: `% agreement = 100 × 45 / 50 = ${num(agree, 0)}. This raw percent still counts lucky matches. It is not kappa, and it hides where the 5 mistakes sit.`,
        },
        {
          kind: 'numeric',
          title: 'Miss rate',
          prompt: 'Four of the 9 actually bad parts were called good. Miss rate = 100 × missed bad parts / bad parts. Give the percent to 1 decimal place.',
          answer: miss,
          tolerance: 0.15,
          unit: '%',
          hint: '4 ÷ 9, then times 100.',
          explanation: `4 / 9 = ${num(miss / 100, 3)}, so the miss rate is ${num(miss, 1)}%. Nearly half the bad parts escaped. The 90% agreement hid that, because most parts were good.`,
        },
        {
          kind: 'numeric',
          title: 'False-alarm rate',
          prompt: 'One of the 41 actually good parts was called bad. Give the false-alarm rate to 1 decimal place.',
          answer: falseAlarm,
          tolerance: 0.1,
          unit: '%',
          hint: '1 ÷ 41, then times 100.',
          explanation: `1 / 41 ≈ ${num(falseAlarm / 100, 3)}, so the false-alarm rate is ${num(falseAlarm, 1)}%. The inspector rarely scraps a good part and often misses a bad one. Those are different actions.`,
        },
        {
          kind: 'choice',
          title: 'Which percent would you quote',
          prompt: 'A safety characteristic uses this inspector. Agreement is 90%, the miss rate is about 44%, and the false-alarm rate is about 2.4%. What do you lead with?',
          options: [
            { id: 'a', label: 'The 90% agreement. It is the largest number.' },
            { id: 'b', label: 'The miss rate. Bad parts are escaping, and the headline agreement hides them.' },
            { id: 'c', label: 'The false-alarm rate. Scrap is the only costly error.' },
            { id: 'd', label: 'Cgk. A 44% miss means the gauge is biased in millimetres.' },
          ],
          answer: 'b',
          hint: 'On a safety call, which error reaches the customer?',
          explanation:
            'The escapes are the decision. 90% agreement is mostly “good called good” on a pile of good parts. Cgk is the wrong family: this output is a call.',
        },
      ],
    },
    {
      id: 'msa5-kappa',
      title: 'Agreement beyond chance',
      goal: 'Compute kappa from P_o and P_e, and not be fooled by a high raw percent.',
      cards: [
        {
          kind: 'concept',
          title: 'Chance already agrees a lot',
          body: 'If most parts are truly good, two careless inspectors who stamp almost everything “good” will match often. Percent agreement treats that luck as skill.\n\nKappa removes it:\n\nκ = (P_o − P_e) / (1 − P_e)\n\nP_o is the proportion of actual matches. P_e is the proportion of matches expected from the marginal rates alone.\n\nFrom the table, calls of “good” are 44/50 = 0.88 and truly good parts are 41/50 = 0.82, so chance agreement on good is 0.88 × 0.82. The bad margins add a little more. P_e comes out at 0.743, which we round to **0.74** for the calculator. P_o is 45/50 = **0.90**.\n\nA common rule of thumb: kappa ≥ 0.75 acceptable, 0.40 to 0.75 marginal, below 0.40 poor.',
          keyIdea: 'A high percent agreement can still be a weak kappa.',
        },
        {
          kind: 'numeric',
          title: 'Kappa',
          prompt: 'P_o = 0.90 and P_e = 0.74. κ = (P_o − P_e) / (1 − P_e). Give the value to 2 or 3 decimal places.',
          answer: kappa,
          tolerance: 0.01,
          hint: '0.90 − 0.74 = 0.16. The denominator is 1 − 0.74 = 0.26.',
          explanation: `κ = 0.16 / 0.26 = ${num(kappa, 3)}. That is about 0.62, inside the marginal band (0.40 to 0.75), even though raw agreement was 90%.`,
        },
        {
          kind: 'choice',
          title: 'Why 90% was not enough',
          prompt: 'Agreement is 90%, kappa is about 0.62, and 4 of 9 bad parts were missed. Why is the 90% a poor headline?',
          options: [
            { id: 'a', label: 'Most parts are good, so chance agreement is already high, and the misses sit on the bad parts.' },
            { id: 'b', label: 'Kappa cannot be below the percent agreement.' },
            { id: 'c', label: '90% agreement always means kappa is under 0.40.' },
            { id: 'd', label: 'The table has too few good parts for a percentage.' },
          ],
          answer: 'a',
          hint: 'P_e was 0.74. That is the agreement you get without skill.',
          explanation:
            'Chance already explains most of the matches, because “good” is the common call and the common truth. Kappa near 0.62 is marginal, and the miss rate shows the practical failure: bad parts are getting through.',
        },
        {
          kind: 'choice',
          title: 'The three attribute questions',
          prompt: 'Within-appraiser agreement, between-appraiser agreement, and agreement with the standard. Which labels match?',
          options: [
            { id: 'a', label: 'Repeatability, reproducibility, and accuracy of the call.' },
            { id: 'b', label: 'Cg, Cgk, and linearity.' },
            { id: 'c', label: 'EV, PV, and ndc.' },
            { id: 'd', label: '%Tolerance, %Study Variation, and a share of variance.' },
          ],
          answer: 'a',
          hint: 'Same person twice is repeatability, on a call just as on a millimetre.',
          explanation:
            'Within-appraiser is repeatability of the decision. Between-appraiser is reproducibility. Versus the known standard is accuracy. Cg and %GRR stay on the continuous path.',
        },
      ],
    },
    {
      id: 'msa5-cp',
      title: 'Checkpoint: the whole MSA',
      goal: 'Pick the study, use one Type 1 formula, and keep the two strategies apart.',
      checkpoint: true,
      cards: [
        {
          kind: 'classify',
          title: 'Choose the study',
          prompt: 'Type 1, Type 2, Type 3, or attribute?',
          categories: STUDY,
          items: [
            {
              id: 'seat',
              label: 'Operators seat a housing by hand and a digital indicator reads the height',
              answer: 't2',
              why: 'A number, and the person can change it. Type 2.',
            },
            {
              id: 'cmm',
              label: 'A CMM measures 15 parts twice. The operator only presses start',
              answer: 't3',
              why: 'Continuous, and the fixture removed the person. Type 3.',
            },
            {
              id: 'plug',
              label: 'Fifty repeats of one master on one micrometer',
              answer: 't1',
              why: 'One reference, one device. Type 1.',
            },
            {
              id: 'eye',
              label: 'A visual scratch / no-scratch check against known panels',
              answer: 'attr',
              why: 'A call against a standard. Attribute agreement.',
            },
          ],
          hint: 'Number or call first. Then ask whether a person can move the result.',
        },
        {
          kind: 'numeric',
          title: 'Checkpoint Cg',
          prompt: 'A continuous Type 1 study has T = 1.00 mm and s = 0.025 mm. Cg = (0.2 × T) / (6 × s). Give the value to 2 decimal places.',
          answer: cgCheckpoint,
          tolerance: 0.01,
          hint: '0.20 / 0.150.',
          explanation: `Cg = ${num(cgCheckpoint, 2)}. That is the spread index only. You still need Cgk, and you would not use this formula on a pass/fail call.`,
        },
        {
          kind: 'choice',
          title: 'A 32% gauge',
          prompt: 'Type 2 %Study Variation = 32%. What do you tell the team?',
          options: [
            { id: 'a', label: 'Marginal: investigate and improve. Do not treat it as a green system, and do not quote it as a Cpk.' },
            { id: 'b', label: 'Excellent. Over 30% means the gauge is better than the process.' },
            { id: 'c', label: 'Switch to kappa. 32% is an attribute result.' },
            { id: 'd', label: 'Impossible, so the software has a bug.' },
          ],
          answer: 'a',
          hint: '32% is just past the 30% line. The usual exam wording is marginal, not excellent.',
          explanation:
            'Under 10% acceptable, 10–30% marginal, over 30% not acceptable for many uses. 32% is called marginal — investigate and improve — not a comfortable green result.',
        },
        {
          kind: 'choice',
          title: 'Keep the strategies apart',
          prompt: 'The output that will be baselined is scrap or not scrap, from a visual standard. Which analysis belongs in the MSA?',
          options: [
            { id: 'a', label: 'Cg and Cgk against a master length.' },
            { id: 'b', label: 'Attribute agreement, including the miss rate against known bad parts.' },
            { id: 'c', label: '%Tolerance, with good coded as 1.' },
            { id: 'd', label: 'ndc of the scrap codes.' },
          ],
          answer: 'b',
          hint: 'The stored Y is a category.',
          explanation:
            'Scrap / not scrap is a call. Study agreement and, especially, how often a truly bad part is called good. Cg, %Tolerance, and ndc are continuous tools.',
        },
        {
          kind: 'order',
          title: 'A continuous Measure gate',
          prompt: 'The output is a diameter, and operators handle the part. Tap the order.',
          steps: [
            { id: 't1', label: 'Type 1 against a reference' },
            { id: 'fix', label: 'Fix a failed Cg or Cgk before a bigger study' },
            { id: 't2', label: 'Type 2, because people affect the reading' },
            { id: 'cap', label: 'Only then estimate stability and capability' },
          ],
          hint: 'A failed device should not be taken into the parts-and-people study.',
          explanation:
            'Type 1 first. A bias or a huge spread will contaminate Type 2, so fix it and repeat Type 1. Operators handle the part, so the parts study is Type 2, not Type 3. Capability is last.',
        },
      ],
    },
  ],
};
