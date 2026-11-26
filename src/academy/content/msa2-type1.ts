import { BIASED, CENTERED, MASTER, TYPE1_TOLERANCE, type1Study } from './msa-shared';
import { cg, cgk, num } from '../stats';
import type { AcademyModule } from '../types';

const pass = type1Study(CENTERED);
const off = type1Study(BIASED);

const cgAnswer = cg(0.6, 0.01);
const cgkAnswer = cgk(0.6, 0.01, 0.02);
const cgCheckpoint = cg(1, 0.025);

export const msa2: AcademyModule = {
  id: 'msa2',
  number: 2,
  title: 'Type 1',
  summary: 'One reference, many repeats. Cg watches the spread. Cgk watches the spread after bias.',
  umsTopics: ['MSA Type I', 'Linearity and systematic deviations'],
  lessons: [
    {
      id: 'msa2-purpose',
      title: 'The device, alone',
      goal: 'Say what Type 1 is for, and what one master cannot see.',
      cards: [
        {
          kind: 'concept',
          title: 'Type 1 before parts and people',
          body: 'Type 1 (Type I) studies **one device against one known reference**. You repeat the reading many times — often 25 or 50. It answers two questions before you spend time on parts and operators.\n\n- **Repeatability:** how wide is the cloud of repeats?\n- **Bias:** does the average sit on the reference?\n\nIt cannot see operator differences, part-to-part variation, or a bias that changes as the size changes.',
          keyIdea: 'Purpose: is the device precise enough, and centred, at this one master?',
        },
        {
          kind: 'concept',
          title: 'A passing cloud',
          body: `Twelve repeats of a ${num(MASTER, 2)} mm master. Tolerance T = ${num(TYPE1_TOLERANCE, 2)} mm.\n\nMean = ${num(pass.mean, 3)} mm. Sample standard deviation s = ${num(pass.sd, 3)} mm. Cg = ${num(pass.cg, 2)} and Cgk = ${num(pass.cgk, 2)}.\n\nA usual decision line is **1.33 on both**. This device clears it at this master. The mean sits on the reference, so the two lines overlap.`,
          visual: { type: 'type1', values: CENTERED, reference: MASTER, tolerance: TYPE1_TOLERANCE, yLabel: 'Diameter (mm)' },
          keyIdea: 'Both indices clear 1.33 here. That certificate is only for this reference.',
        },
        {
          kind: 'choice',
          title: 'When Type 1 is the next study',
          prompt: 'You have a reference master and you have not yet shown that the device itself is trustworthy. What do you run?',
          options: [
            { id: 'a', label: 'Type 1: repeats of that one reference on this device.' },
            { id: 'b', label: 'A three-shift Type 2, so operators are included immediately.' },
            { id: 'c', label: 'A capability study. The master proves the process is good.' },
            { id: 'd', label: 'An attribute agreement study, because a master is a standard.' },
          ],
          answer: 'a',
          hint: 'Operators and capability both wait until the device has faced the reference.',
          explanation:
            'Type 1 is the small study: one reference, one device, many repeats. A master is a known value, not a pass/fail standard, so this is still the continuous path.',
        },
        {
          kind: 'choice',
          title: 'What this study cannot see',
          prompt: 'Type 1 passed. Which question is still completely open?',
          options: [
            { id: 'a', label: 'Whether the repeats on this master are tight.' },
            { id: 'b', label: 'Whether the average matches this master.' },
            { id: 'c', label: 'Whether three operators add noise when they measure real parts.' },
            { id: 'd', label: 'Whether a standard deviation can be calculated.' },
          ],
          answer: 'c',
          hint: 'Type 1 never changes the operator or the part.',
          explanation:
            'Repeatability and bias against **this** reference are what Type 1 just answered. Operator noise needs Type 2. A bias that grows with the size needs a linearity check.',
        },
      ],
    },
    {
      id: 'msa2-index',
      title: 'Cg and Cgk',
      goal: 'Use both formulas, and say which failure each one catches.',
      cards: [
        {
          kind: 'concept',
          title: 'Two formulas, two jobs',
          body: 'T is the tolerance, USL − LSL. s is the **sample** standard deviation of the repeats. Bias is the mean minus the reference, x̄ − xₘ.\n\nThe 0.2 in Cg is a rule of thumb: the gauge may consume 20% of the tolerance. 6 × s is the width of the repeat cloud. Cg compares those two widths and **ignores where the cloud sits**.\n\nCgk spends a 10%-of-tolerance allowance on the bias first. Whatever is left is compared with 3 × s. Bias lowers Cgk and leaves Cg alone.\n\nA common decision line is Cg ≥ 1.33 and Cgk ≥ 1.33. The 20% window in this form is centred on the reference.',
          visual: {
            type: 'table',
            data: {
              caption: 'Type 1 formulas',
              columns: ['Index', 'Formula', 'Purpose'],
              rows: [
                ['Cg', '(0.2 × T) / (6 × s)', 'Spread only. A tight cloud scores well even if it is off the master.'],
                ['Cgk', '(0.1 × T − |bias|) / (3 × s)', 'Spread after bias. This is the one that fails a precise but shifted gauge.'],
              ],
            },
          },
          keyIdea: 'Cg can pass while Cgk fails. Quote both.',
        },
        {
          kind: 'numeric',
          title: 'Compute Cg',
          prompt: 'Tolerance T = 0.60 mm. The repeats have s = 0.010 mm. Cg = (0.2 × T) / (6 × s). Give the value to 2 decimal places.',
          answer: cgAnswer,
          tolerance: 0.01,
          hint: '0.2 × 0.60 = 0.12. Six times 0.010 = 0.060. Divide.',
          explanation: `Cg = 0.12 / 0.060 = ${num(cgAnswer, 2)}. Bias was not in the formula. A Cg of 2.00 is above 1.33, so the **spread** is acceptable.`,
        },
        {
          kind: 'numeric',
          title: 'Compute Cgk',
          prompt: 'Same study: T = 0.60 mm, s = 0.010 mm, and |bias| = 0.020 mm. Cgk = (0.1 × T − |bias|) / (3 × s). Give the value to 2 decimal places.',
          answer: cgkAnswer,
          tolerance: 0.01,
          hint: '0.1 × 0.60 − 0.020 = 0.040. The denominator is 3 × 0.010 = 0.030.',
          explanation: `Cgk = 0.040 / 0.030 = ${num(cgkAnswer, 2)}. Cg was 2.00. Cgk is on the 1.33 line because the bias used up part of the allowance. The spread did not change.`,
        },
        {
          kind: 'choice',
          title: 'Precise, but shifted',
          prompt: 'A study reports Cg = 2.00 and Cgk = 0.80. Which reading is right?',
          options: [
            { id: 'a', label: 'The gauge is noisy. Both indices are about the spread.' },
            { id: 'b', label: 'Both indices passed the 1.33 line.' },
            { id: 'c', label: 'The repeats are tight, but the mean is off the reference. Cgk is the index that failed.' },
            { id: 'd', label: 'The tolerance must be too wide, because Cg is large.' },
          ],
          answer: 'c',
          hint: 'Which formula contains the bias, and which result is below 1.33?',
          explanation:
            'Cg = 2.00 says the cloud is narrow. Cgk = 0.80 is below 1.33, so the location is the problem. Adjust the device, then repeat Type 1. Do not jump to a Type 2 on a biased gauge.',
        },
        {
          kind: 'slider',
          title: 'Move the bias',
          prompt: 'Drag the bias from 0 to 0.04 mm. Tolerance and s stay fixed. Set the bias to 0.02 mm before you answer.',
          sim: 'type1Bias',
          check: {
            prompt: 'At a bias of 0.02 mm the readout shows Cg = 2.00 and Cgk = 1.33. What moved?',
            options: [
              { id: 'a', label: 'Only the location of the mean. The spread, and therefore Cg, stayed put.' },
              { id: 'b', label: 'The standard deviation doubled, so both indices fell.' },
              { id: 'c', label: 'The tolerance changed.' },
              { id: 'd', label: 'Cgk rose, because a larger bias helps the index.' },
            ],
            answer: 'a',
            hint: 'Cg has no bias term. Compare the two readouts as you drag.',
            explanation:
              'Cg = (0.2 × 0.60) / (6 × 0.010) = 2.00 at every slider position. Cgk = (0.060 − 0.020) / 0.030 = 1.33 at a bias of 0.02 mm. Moving the mean spends the allowance. It does not widen the cloud.',
          },
        },
      ],
    },
    {
      id: 'msa2-line',
      title: 'One master is not the range',
      goal: 'Recognise a bias that changes with the size, which Type 1 at one point cannot see.',
      cards: [
        {
          kind: 'concept',
          title: 'The same device, a different size',
          body: 'These twelve repeats are the passing cloud, shifted up by about 0.08 mm. The spread is the same, so Cg is still ' +
            `${num(off.cg, 2)}. Cgk falls to ${num(off.cgk, 2)}.\n\nThe mean is still inside the shaded band. That band is the bias you could afford if the spread were zero. Real spread uses the rest, so Cgk can fail while the mean is inside the shade.\n\nA second problem sits beside this one. If the device is 0.02 mm high at 10 mm and 0.15 mm high at 50 mm, the bias **depends on the size**. That is linearity. A perfect Cgk at one master can hide it.`,
          visual: { type: 'type1', values: BIASED, reference: MASTER, tolerance: TYPE1_TOLERANCE, yLabel: 'Diameter (mm)' },
          keyIdea: 'Linearity is bias that changes across the range you actually measure.',
        },
        {
          kind: 'choice',
          title: 'The parts are not the master',
          prompt: 'Type 1 passed at a 10.00 mm master. Production parts run from 8 mm to 40 mm. What is still open?',
          options: [
            { id: 'a', label: 'Nothing. One master covers every size inside the tolerance.' },
            { id: 'b', label: 'Only whether operators agree. The device is finished.' },
            { id: 'c', label: 'Linearity: the bias may be different at other sizes.' },
            { id: 'd', label: 'The data type. A diameter becomes discrete away from the master.' },
          ],
          answer: 'c',
          hint: 'Type 1 never moved the reference.',
          explanation:
            'Bias at 10 mm does not certify bias at 40 mm. Check linearity with several references spread across the range you measure. The output is still a continuous diameter.',
        },
        {
          kind: 'choice',
          title: 'Name the pattern',
          prompt: 'Bias plotted against the reference slopes upward across the sizes you measure. What is that?',
          options: [
            { id: 'a', label: 'Repeatability. The repeats got wider.' },
            { id: 'b', label: 'An attribute miss rate.' },
            { id: 'c', label: 'Linearity: a systematic deviation that changes across the range.' },
            { id: 'd', label: 'A failed ndc.' },
          ],
          answer: 'c',
          hint: 'The horizontal axis is the reference value, not an operator.',
          explanation:
            'Linearity is a bias that changes with the measured size. Repeatability would be the width of repeats at one size. ndc belongs to a parts study, not to this plot.',
        },
      ],
    },
    {
      id: 'msa2-cp',
      title: 'Checkpoint: Type 1',
      goal: 'Compute Cg, and decide whether the device is ready for a bigger study.',
      checkpoint: true,
      cards: [
        {
          kind: 'numeric',
          title: 'Checkpoint Cg',
          prompt: 'T = 1.00 mm and s = 0.025 mm. Cg = (0.2 × T) / (6 × s). Give the value to 2 decimal places.',
          answer: cgCheckpoint,
          tolerance: 0.01,
          hint: '0.2 × 1.00 = 0.20. Six times 0.025 = 0.150.',
          explanation: `Cg = 0.20 / 0.150 = ${num(cgCheckpoint, 2)}. That is the 1.33 line for the spread alone. You still need Cgk before you accept the device.`,
        },
        {
          kind: 'choice',
          title: 'Which index failed',
          prompt: `The shifted cloud has Cg = ${num(off.cg, 2)} and Cgk = ${num(off.cgk, 2)}. What do you do next?`,
          visual: { type: 'type1', values: BIASED, reference: MASTER, tolerance: TYPE1_TOLERANCE, yLabel: 'Diameter (mm)' },
          options: [
            { id: 'a', label: 'Accept it. Cg is above 1.33, so the location does not matter.' },
            { id: 'b', label: 'Run Type 2 now. More parts will pull the mean back to the reference.' },
            { id: 'c', label: 'Fix the bias and repeat Type 1. Cgk is far below 1.33.' },
            { id: 'd', label: 'Switch to kappa. Cgk below 1 means the output is discrete.' },
          ],
          answer: 'c',
          hint: 'Type 2 does not remove a bias that is already in the device.',
          explanation: `Cg stayed at ${num(off.cg, 2)} because s did not change. Cgk is ${num(off.cgk, 2)}, well below 1.33. Centre the device on the reference, then repeat Type 1 before any parts-and-people study.`,
        },
        {
          kind: 'choice',
          title: 'Passed at one point',
          prompt: 'Cg and Cgk both clear 1.33 at a single master in the middle of a wide production range. What do you still not know?',
          options: [
            { id: 'a', label: 'Whether the spread at that master is small enough.' },
            { id: 'b', label: 'Whether the bias stays acceptable at the other sizes you measure.' },
            { id: 'c', label: 'The formula for Cg.' },
            { id: 'd', label: 'Whether the output is continuous.' },
          ],
          answer: 'b',
          hint: 'One reference is one point on the linearity plot.',
          explanation:
            'A pass at one master is real, and it is local. Linearity is the open question when the parts cover a range. Operator noise is still open too, but this question is about the size of the reference.',
        },
      ],
    },
  ],
};
