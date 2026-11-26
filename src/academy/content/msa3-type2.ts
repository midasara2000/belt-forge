import {
  NDC_STUDY,
  SIG_GRR,
  SIG_PV,
  STUDY_PCT,
  TIGHT_GRR,
  TIGHT_PART,
  TIGHT_STUDY,
  TIGHT_TOL_PCT,
  VAR_AV,
  VAR_EV,
  VAR_PV,
  VAR_SHARE,
} from './msa-shared';
import { grrSigma, ndc, num, repeatabilityFromRange, studyVariationPct, tolerancePct } from '../stats';
import type { AcademyModule, Choice } from '../types';

const grrAnswer = grrSigma(0.03, 0.04);
const studyAnswer = studyVariationPct(0.3, Math.sqrt(0.91));
const tolAnswer = tolerancePct(0.04, 1.2);
const ndcAnswer = ndc(0.6, 0.1);
const rangeAnswer = repeatabilityFromRange(0.0564, 1.128);
const grrCheckpoint = grrSigma(0.05, 0.12);

const PIECE: Choice[] = [
  { id: 'ev', label: 'Repeatability (EV)' },
  { id: 'av', label: 'Reproducibility (AV)' },
];

export const msa3: AcademyModule = {
  id: 'msa3',
  number: 3,
  title: 'Type 2',
  summary: 'Parts and operators. Separate equipment noise from people, then compare both with the parts and the tolerance.',
  umsTopics: ['MSA Type II', 'Gage R&R'],
  lessons: [
    {
      id: 'msa3-purpose',
      title: 'Parts and people',
      goal: 'Say what Type 2 adds, and name repeatability versus reproducibility.',
      cards: [
        {
          kind: 'concept',
          title: 'Type 2 asks a harder question',
          body: 'Type 2 (Type II) is a crossed gage R&R. Several parts, several operators, and each operator measures each part more than once. A common plan is 10 parts × 3 operators × 2 or 3 trials.\n\n- **Repeatability (EV)** is the device: the same person, the same part, another trial.\n- **Reproducibility (AV)** is the people: the extra spread between operators.\n- **Part variation (PV)** is the real difference you hope to detect.\n\nThe purpose is: once people are included, can we still tell parts apart?',
          keyIdea: 'Type 1 cleared the device at one master. Type 2 puts parts and people back in.',
        },
        {
          kind: 'concept',
          title: 'How to read a small layout',
          body: 'Operator B reads higher than operator A on every part. That is reproducibility. The two trials of one operator are close. That is repeatability. The three parts sit in different places. That is part variation.\n\nYou would not compute the official %GRR from three parts. The picture is the design: parts down the rows, people across the columns, trials beside each other.',
          visual: {
            type: 'table',
            data: {
              caption: 'Millimetres. Two trials each.',
              columns: ['Part', 'A trial 1', 'A trial 2', 'B trial 1', 'B trial 2'],
              rows: [
                ['1', '10.01', '10.03', '10.08', '10.06'],
                ['2', '10.21', '10.19', '10.28', '10.25'],
                ['3', '9.81', '9.84', '9.90', '9.88'],
              ],
            },
          },
          keyIdea: 'Down a column: parts. Across operators: people. Between the two trials: the device.',
        },
        {
          kind: 'choice',
          title: 'Name repeatability',
          prompt: 'Which comparison is repeatability?',
          options: [
            { id: 'a', label: 'The same operator measures the same part again.' },
            { id: 'b', label: 'Two operators measure the same part.' },
            { id: 'c', label: 'One operator measures two different parts.' },
            { id: 'd', label: 'The part average is compared with the specification.' },
          ],
          answer: 'a',
          hint: 'Repeatability holds the person and the part still.',
          explanation:
            'Same person, same part, another trial: that scatter is equipment variation (EV). Different people on the same part are reproducibility (AV). Different parts are part variation.',
        },
        {
          kind: 'choice',
          title: 'Why not stop at Type 1',
          prompt: 'Type 1 passed on a master. Operators place the part by hand, and the reading is the one you will baseline. What do you still need?',
          options: [
            { id: 'a', label: 'Nothing. A passed Cgk covers every later operator.' },
            { id: 'b', label: 'Type 2, because people may add noise the master study never saw.' },
            { id: 'c', label: 'An attribute study, because hands make the output discrete.' },
            { id: 'd', label: 'A new specification, so %GRR becomes smaller.' },
          ],
          answer: 'b',
          hint: 'Type 1 never changed the operator.',
          explanation:
            'Hands on the part put the person inside the measurement. Type 2 estimates that extra spread. The output is still a number, so this is not an attribute study. Tightening nothing about the spec does not remove operator noise.',
        },
      ],
    },
    {
      id: 'msa3-formula',
      title: 'The formulas',
      goal: 'Compute GRR, both percentages, and ndc, and use the 10 / 30 rule on the right percentage.',
      cards: [
        {
          kind: 'concept',
          title: 'Work in standard deviations',
          body: 'σ_GRR combines the two measurement pieces. They are standard deviations here, not variances, so they combine by squares: σ_GRR = √(σ_EV² + σ_AV²).\n\nσ_total = √(σ_GRR² + σ_part²).\n\n%Study Variation compares the gauge with the **parts in the study**. %Tolerance compares the gauge with the **specification width**. They answer different questions and can disagree.\n\nndc, the number of distinct categories, asks how many groups of parts the gauge can sort. You want about **5 or more**. The reported ndc is the integer part of 1.41 × σ_part / σ_GRR.\n\nRule of thumb, for %Study Variation and for %Tolerance: under 10% acceptable, 10% to 30% marginal, over 30% not acceptable for many uses. Read the exam item for which percentage it means.',
          visual: {
            type: 'table',
            data: {
              caption: 'Type 2 formulas',
              columns: ['Name', 'Formula', 'Purpose'],
              rows: [
                ['σ_GRR', '√(EV² + AV²)', 'Measurement noise, device plus people'],
                ['%Study Variation', '100 × σ_GRR / σ_total', 'Noise versus the part differences'],
                ['%Tolerance', '100 × (6 × σ_GRR) / T', 'Noise versus the specification'],
                ['ndc', '1.41 × σ_part / σ_GRR', 'How many distinct groups you can tell apart'],
              ],
            },
          },
          keyIdea: 'The 10 / 30 rule is about these percentages, not about a share of variance.',
        },
        {
          kind: 'numeric',
          title: 'Combine EV and AV',
          prompt: 'σ_EV = 0.03 mm and σ_AV = 0.04 mm. σ_GRR = √(EV² + AV²). Give the standard deviation.',
          answer: grrAnswer,
          tolerance: 0.005,
          unit: 'mm',
          hint: '0.03² + 0.04² = 0.0009 + 0.0016 = 0.0025. Then take the square root.',
          explanation: `σ_GRR = √0.0025 = ${num(grrAnswer, 2)} mm. Do not add 0.03 and 0.04. Standard deviations combine by their squares.`,
        },
        {
          kind: 'numeric',
          title: 'Percent of study variation',
          prompt: 'σ_GRR = 0.30 and σ_total = 1.00. %Study Variation = 100 × σ_GRR / σ_total. Give the percent.',
          answer: studyAnswer,
          tolerance: 0.1,
          unit: '%',
          hint: 'The ratio of the two standard deviations is 0.30. Convert it to a percent.',
          explanation: `%Study Variation = 100 × 0.30 / 1.00 = ${num(studyAnswer, 0)}. That is the top of the marginal band. It is not the same number as the measurement’s share of the variance.`,
        },
        {
          kind: 'numeric',
          title: 'Percent of tolerance',
          prompt: 'σ_GRR = 0.04 mm and the tolerance T = 1.20 mm. %Tolerance = 100 × (6 × σ_GRR) / T. Give the percent.',
          answer: tolAnswer,
          tolerance: 0.1,
          unit: '%',
          hint: '6 × 0.04 = 0.24. Then 0.24 / 1.20, as a percent.',
          explanation: `%Tolerance = 100 × 0.24 / 1.20 = ${num(tolAnswer, 0)}. Twenty percent is inside the marginal band (10% to 30%). It says nothing yet about whether the parts differ by more than the gauge.`,
        },
        {
          kind: 'numeric',
          title: 'Distinct categories',
          prompt: 'σ_part = 0.60 and σ_GRR = 0.10. ndc = 1.41 × σ_part / σ_GRR. Use 1.41 and give 2 decimal places. The reported integer comes after that.',
          answer: ndcAnswer,
          tolerance: 0.015,
          hint: '0.60 / 0.10 = 6. Multiply by 1.41.',
          explanation: `ndc = 1.41 × 6 = ${num(ndcAnswer, 2)}. The reported value is the integer part, 8, which is at least 5. The gauge can sort parts into several groups.`,
        },
        {
          kind: 'choice',
          title: 'Read the band',
          prompt: '%Study Variation = 8% and the reported ndc = 7. What is the usual call?',
          options: [
            { id: 'a', label: 'Acceptable for most decisions. The gauge is small next to the parts, and ndc clears 5.' },
            { id: 'b', label: 'Not acceptable, because ndc must be at least 10.' },
            { id: 'c', label: 'Marginal, because 8% sits between 10% and 30%.' },
            { id: 'd', label: 'Impossible. %Study Variation cannot be under 10%.' },
          ],
          answer: 'a',
          hint: 'Under 10% is the acceptable band. ndc wants about 5 or more.',
          explanation:
            '8% is under the 10% line, and ndc of 7 is above 5. That is a comfortable continuous measurement for most process decisions. Still say which percentage you were given: study variation, not tolerance.',
        },
      ],
    },
    {
      id: 'msa3-percent',
      title: 'Nine percent and thirty percent',
      goal: 'Tell a share of variance from %Study Variation, using one study.',
      cards: [
        {
          kind: 'concept',
          title: 'Same study, two percentages',
          body: `Repeatability variance = ${num(VAR_EV, 2)}, reproducibility variance = ${num(VAR_AV, 2)}, part variance = ${num(VAR_PV, 2)}.\n\nMeasurement variance = 0.04 + 0.05 = 0.09. Total variance = 1.00. The measurement’s **share of variance** is ${num(VAR_SHARE, 0)}%.\n\nσ_GRR = √0.09 = ${num(SIG_GRR, 2)} and σ_total = 1, so %Study Variation = ${num(STUDY_PCT, 0)}%. The part standard deviation is ${num(SIG_PV, 3)}, and ndc = 1.41 × ${num(SIG_PV, 3)} / ${num(SIG_GRR, 2)} = ${num(NDC_STUDY, 2)}, reported as ${Math.trunc(NDC_STUDY)}.\n\nThe bars add to 1.00 because they are variances. The 10 / 30 rule does **not** apply to the ${num(VAR_SHARE, 0)}%. An item that says “percent of total variance” wants ${num(VAR_SHARE, 0)}. An item that says %Study Variation wants ${num(STUDY_PCT, 0)}.`,
          visual: {
            type: 'bars',
            yLabel: 'Variance',
            bars: [
              { label: 'Repeatability', value: VAR_EV },
              { label: 'Reproducibility', value: VAR_AV },
              { label: 'Part', value: VAR_PV },
            ],
          },
          keyIdea: '9% of the variance is 30% of the standard deviation. √0.09 = 0.30.',
        },
        {
          kind: 'choice',
          title: 'Which number is %Study Variation?',
          prompt: 'In that study, which figure is %Study Variation?',
          options: [
            { id: 'a', label: '9%, the share of the variance.' },
            { id: 'b', label: '30%, the ratio of the standard deviations.' },
            { id: 'c', label: '91%, the part variance.' },
            { id: 'd', label: '4.48, the ndc before it is cut to an integer.' },
          ],
          answer: 'b',
          hint: '%Study Variation divides σ_GRR by σ_total. It does not divide variances.',
          explanation:
            'σ_GRR / σ_total = 0.30 / 1.00 = 30%. The 9% is real, and it is the variance share. Using 9% with the 10 / 30 rule would make a marginal gauge look acceptable.',
        },
        {
          kind: 'numeric',
          title: 'Variance percent',
          prompt: 'Repeatability variance 0.04, reproducibility variance 0.05, part variance 0.91. What percent of the total variance is the measurement system?',
          answer: VAR_SHARE,
          tolerance: 0.1,
          unit: '%',
          hint: 'Add 0.04 and 0.05. The total of all three variances is 1.00.',
          explanation: `0.09 / 1.00 = ${num(VAR_SHARE, 0)}%. Say “percent of variance” when you quote it. %Study Variation for this same study is 30%.`,
        },
        {
          kind: 'choice',
          title: 'Sign the gauge off?',
          prompt: `%Study Variation is ${num(STUDY_PCT, 0)}% and the reported ndc is ${Math.trunc(NDC_STUDY)}. What is the call?`,
          options: [
            { id: 'a', label: 'Acceptable, because the variance share is only 9%.' },
            { id: 'b', label: 'Marginal on %Study Variation, and short of 5 distinct categories. Do not sign it off.' },
            { id: 'c', label: 'Excellent. An ndc of 4 is more than enough.' },
            { id: 'd', label: 'Impossible. Variances cannot sum to 1.' },
          ],
          answer: 'b',
          hint: 'Use the 10 / 30 rule on 30%, and compare the reported ndc with 5.',
          explanation: `30% is the top of the marginal band, not a green result. The calculated ndc is ${num(NDC_STUDY, 2)}, reported as ${Math.trunc(NDC_STUDY)}, which is below 5. The 9% variance share does not overturn either of those.`,
        },
      ],
    },
    {
      id: 'msa3-act',
      title: 'Where to act',
      goal: 'Send a large EV to the device and a large AV to the people, and use the range formula.',
      cards: [
        {
          kind: 'concept',
          title: 'The big piece names the fix',
          body: 'A large **EV** points at the device, the fixture, or the resolution. Retraining the team will not shrink it.\n\nA large **AV** points at people, the method, or how the part is held. A new gauge will not shrink a method problem.\n\nRead the split before you buy anything.',
          keyIdea: 'EV → equipment. AV → appraisers and method.',
        },
        {
          kind: 'choice',
          title: 'Operators dominate',
          prompt: 'σ_AV is much larger than σ_EV. The three shifts use different ways of seating the part. What do you change first?',
          options: [
            { id: 'a', label: 'Buy a higher-resolution gauge. EV is always the expensive problem.' },
            { id: 'b', label: 'The method and the training: one way to seat the part, then repeat the study.' },
            { id: 'c', label: 'Widen the tolerance until %Tolerance drops under 10%.' },
            { id: 'd', label: 'Drop the operators from the file so AV becomes zero.' },
          ],
          answer: 'b',
          hint: 'AV is the people and the method, not the device’s own repeats.',
          explanation:
            'The repeats of one person are already tight. The noise arrives when the person changes. Standardise the seating, train it, and rerun Type 2. Deleting operators from the file hides the problem you have to baseline.',
        },
        {
          kind: 'choice',
          title: 'The device dominates',
          prompt: 'σ_EV is most of the GRR. Operators agree with each other. Where do you look?',
          options: [
            { id: 'a', label: 'The gauge, its fixture, or a resolution that is too coarse.' },
            { id: 'b', label: 'A longer operator training course.' },
            { id: 'c', label: 'Kappa. A large EV means the output was pass/fail.' },
            { id: 'd', label: 'The part variance. EV is another name for PV.' },
          ],
          answer: 'a',
          hint: 'EV is what remains when the same person repeats the same part.',
          explanation:
            'Agreement between operators is already good, so more training is the wrong first spend. Improve the device, the fixture, or the resolution, then repeat the study.',
        },
        {
          kind: 'concept',
          title: 'A calculator form for repeatability',
          body: 'When you only have the ranges, the repeatability standard deviation is\n\nσ_EV = R̄ / d₂\n\nR̄ is the average of the within-part ranges. d₂ depends on how many trials you averaged: **1.128 for 2 trials**, **1.693 for 3 trials**. You look d₂ up. You do not derive it in the exam.',
          keyIdea: 'Two trials → divide the average range by 1.128.',
        },
        {
          kind: 'numeric',
          title: 'Repeatability from ranges',
          prompt: 'The average within-part range is 0.0564 mm, from 2 trials. d₂ = 1.128. σ_EV = R̄ / d₂. Give the standard deviation.',
          answer: rangeAnswer,
          tolerance: 0.005,
          unit: 'mm',
          hint: 'Divide 0.0564 by 1.128.',
          explanation: `σ_EV = 0.0564 / 1.128 = ${num(rangeAnswer, 2)} mm. This is only the equipment piece. Reproducibility is a separate calculation.`,
        },
      ],
    },
    {
      id: 'msa3-cp',
      title: 'Checkpoint: Type 2',
      goal: 'Apply the 32% call, tell the two percentages apart, and compute a GRR.',
      checkpoint: true,
      cards: [
        {
          kind: 'choice',
          title: 'Thirty-two percent',
          prompt: 'Type 2 %Study Variation = 32%. Which call matches the usual rule of thumb?',
          options: [
            { id: 'a', label: 'Excellent. Ignore the operators.' },
            { id: 'b', label: 'Marginal: investigate and improve. It is not a comfortable green system.' },
            { id: 'c', label: 'Proof that the process Cpk is 1.33.' },
            { id: 'd', label: 'Impossible. %GRR cannot exceed 30%.' },
          ],
          answer: 'b',
          hint: 'Under 10% acceptable, 10–30% marginal, over 30% not acceptable for many uses. 32% is just past the line.',
          explanation:
            '32% needs improvement. The exam call is marginal — not a comfortable green — rather than “excellent” or “impossible”. It is also not a Cpk.',
        },
        {
          kind: 'choice',
          title: 'A tight process, a wide tolerance',
          prompt: `σ_GRR = ${num(TIGHT_GRR, 2)} and σ_part = ${num(TIGHT_PART, 3)}. %Study Variation is ${num(TIGHT_STUDY, 0)}%. The tolerance is 7.5, so %Tolerance is ${num(TIGHT_TOL_PCT, 0)}%. Which warning matters for telling parts apart?`,
          options: [
            { id: 'a', label: '%Tolerance. 8% means the gauge can rank the parts.' },
            { id: 'b', label: '%Study Variation. The gauge is large next to the part differences, even though it is small next to the tolerance.' },
            { id: 'c', label: 'Neither. Both percentages use the same comparison.' },
            { id: 'd', label: 'ndc is unnecessary once %Tolerance is under 10%.' },
          ],
          answer: 'b',
          hint: 'Ranking parts uses the part-to-part spread, not the width of the specification.',
          explanation: `%Study Variation is about ${num(TIGHT_STUDY, 0)}%, over the 30% line, so the gauge swallows the differences between parts. %Tolerance of ${num(TIGHT_TOL_PCT, 0)}% only says the gauge is small beside a wide specification. Quote the percentage that matches the decision.`,
        },
        {
          kind: 'numeric',
          title: 'Another GRR',
          prompt: 'σ_EV = 0.05 and σ_AV = 0.12. σ_GRR = √(EV² + AV²). Give the standard deviation.',
          answer: grrCheckpoint,
          tolerance: 0.005,
          hint: '0.05² + 0.12² = 0.0025 + 0.0144 = 0.0169.',
          explanation: `√0.0169 = ${num(grrCheckpoint, 2)}. The people (0.12) dominate the device (0.05), so the first fix is method and training, not a new gauge.`,
        },
        {
          kind: 'classify',
          title: 'EV or AV',
          prompt: 'Which piece of a Type 2 study is each clue?',
          categories: PIECE,
          items: [
            { id: 'again', label: 'One operator, one part, trial 2 differs from trial 1', answer: 'ev', why: 'The person and the part were held still. That is equipment variation.' },
            { id: 'shifts', label: 'Shift B sits above shift A on the same parts', answer: 'av', why: 'The extra level belongs to the person or the method.' },
            { id: 'coarse', label: 'The display only resolves in steps of 0.1, and repeats jump between two steps', answer: 'ev', why: 'Resolution is a property of the device, so it lands in repeatability.' },
          ],
          hint: 'If the person changed, it is AV. If the person stayed and the reading still moved, it is EV.',
        },
      ],
    },
  ],
};
