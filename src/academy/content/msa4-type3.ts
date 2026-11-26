import { TYPE3_EV, TYPE3_PART, TYPE3_STUDY } from './msa-shared';
import { grrSigma, num, studyVariationPct } from '../stats';
import type { AcademyModule, Choice } from '../types';

const type3Grr = grrSigma(TYPE3_EV, 0);
const type3Pct = studyVariationPct(TYPE3_EV, TYPE3_PART);

const STUDY: Choice[] = [
  { id: 't1', label: 'Type 1' },
  { id: 't2', label: 'Type 2' },
  { id: 't3', label: 'Type 3' },
  { id: 'attr', label: 'Attribute' },
];

export const msa4: AcademyModule = {
  id: 'msa4',
  number: 4,
  title: 'Type 3',
  summary: 'The person is not in the measurement. Estimate equipment variation only, then use the same percentages.',
  umsTopics: ['MSA Type III', 'Automated measurement'],
  lessons: [
    {
      id: 'msa4-purpose',
      title: 'No one touches the reading',
      goal: 'Choose Type 3 when the operator cannot move the result, and Type 2 when they can.',
      cards: [
        {
          kind: 'concept',
          title: 'What Type 3 is for',
          body: 'Type 3 is the study for an automatic gauge, an inline sensor, or a fixture that locates the part the same way every time. The design is parts × repeats. There is no operator column.\n\nReproducibility is left out **on purpose**, so σ_GRR = σ_EV. You still compare that noise with the part variation and with the tolerance, and you still want ndc of about 5 or more.\n\nA passed Type 3 does not certify that people would agree if they started seating the part themselves.',
          keyIdea: 'Purpose: equipment variation only, because the person was designed out of the system.',
        },
        {
          kind: 'choice',
          title: 'A nest and a laser',
          prompt: 'Parts drop into a fixed nest. A laser writes the diameter. The operator presses start and never touches the part. Which study?',
          options: [
            { id: 'a', label: 'Type 2, because someone pressed the button.' },
            { id: 'b', label: 'Type 3. The person does not influence the reading.' },
            { id: 'c', label: 'Attribute agreement, because the gauge is automatic.' },
            { id: 'd', label: 'Type 1 only. Parts are not allowed in an automatic study.' },
          ],
          answer: 'b',
          hint: 'Ask whether a different person would change the number. The output is still a diameter.',
          explanation:
            'The button does not move the part. Type 3 estimates the equipment noise across parts. Type 1 would still be the first check against a reference, but the parts study, when you come to it, is Type 3 rather than Type 2.',
        },
        {
          kind: 'choice',
          title: 'Hands still matter',
          prompt: 'A digital indicator reads the height, but the number changes with how hard the operator seats the housing. Which study?',
          options: [
            { id: 'a', label: 'Type 3, because the display is digital.' },
            { id: 'b', label: 'Type 2. The person is inside the measurement, even though the display is a number.' },
            { id: 'c', label: 'Attribute agreement, because seating is a skill.' },
            { id: 'd', label: 'Neither. A digital display does not need MSA.' },
          ],
          answer: 'b',
          hint: 'Look at what changes the reading, not at whether the screen has digits.',
          explanation:
            'If seating changes the number, reproducibility is real and you must estimate it. That is Type 2. A digital display does not make a measurement automatic.',
        },
        {
          kind: 'choice',
          title: 'What a pass does not cover',
          prompt: 'Type 3 passed on the inline laser. Three inspectors also look at the same parts and scrap by eye. What did the Type 3 certify?',
          options: [
            { id: 'a', label: 'The laser’s equipment variation. Not the inspectors’ calls.' },
            { id: 'b', label: 'Both the laser and the visual scrap decision.' },
            { id: 'c', label: 'That Cpk is above 1.33.' },
            { id: 'd', label: 'That kappa is above 0.75.' },
          ],
          answer: 'a',
          hint: 'Type 3 never watched the inspectors.',
          explanation:
            'The laser’s number has a Type 3 result. The inspectors’ good/bad call is a different output and needs an attribute study. Capability is a later question about the process, not a result of Type 3.',
        },
      ],
    },
    {
      id: 'msa4-formula',
      title: 'The same percentages, AV = 0',
      goal: 'Drop the operator term and still compute %Study Variation.',
      cards: [
        {
          kind: 'concept',
          title: 'One term comes out',
          body: `The formulas do not change their jobs. You simply have no AV to put in.\n\nσ_GRR = σ_EV\n\n%Study Variation and %Tolerance and ndc are the Type 2 formulas with that GRR.\n\nExample: σ_EV = ${num(TYPE3_EV, 2)} and σ_part = ${num(TYPE3_PART, 2)}. Then σ_GRR = ${num(type3Grr, 2)} and %Study Variation = ${num(TYPE3_STUDY, 2)}%, just under the 10% line.`,
          visual: {
            type: 'table',
            data: {
              caption: 'What changes from Type 2 to Type 3',
              columns: ['Piece', 'Type 2', 'Type 3'],
              rows: [
                ['Repeatability EV', 'Estimated', 'Estimated'],
                ['Reproducibility AV', 'Estimated', 'Left out'],
                ['σ_GRR', '√(EV² + AV²)', 'EV'],
                ['%Study Variation, %Tolerance, ndc', 'Same formulas', 'Same formulas'],
              ],
            },
          },
          keyIdea: 'AV = 0 by design, not because you deleted a bad column.',
        },
        {
          kind: 'numeric',
          title: 'Type 3 GRR',
          prompt: 'A Type 3 study has σ_EV = 0.04. There is no operator term. What is σ_GRR?',
          answer: type3Grr,
          tolerance: 0.001,
          hint: 'With AV = 0, √(EV² + 0) is EV.',
          explanation: `σ_GRR = ${num(type3Grr, 2)}. The square root of EV² is EV. Do not invent an operator spread the study did not run.`,
        },
        {
          kind: 'numeric',
          title: 'Type 3 percent',
          prompt: 'σ_GRR = 0.04 and σ_part = 0.40. %Study Variation = 100 × σ_GRR / √(σ_GRR² + σ_part²). Give the percent to 2 decimal places.',
          answer: type3Pct,
          tolerance: 0.05,
          unit: '%',
          hint: 'The total standard deviation is √(0.04² + 0.40²) = √0.1616.',
          explanation: `%Study Variation = ${num(type3Pct, 2)}. That is just under 10%, so the equipment noise is acceptable beside these part differences. You still have not studied a human loader.`,
        },
        {
          kind: 'choice',
          title: 'Just under 10%',
          prompt: `That Type 3 result is ${num(type3Pct, 2)}% of study variation. What does it support?`,
          options: [
            { id: 'a', label: 'The equipment can see part differences of this size. It says nothing about operators who are not in the system.' },
            { id: 'b', label: 'Three shifts will agree, because %Study Variation is under 10%.' },
            { id: 'c', label: 'The process is capable.' },
            { id: 'd', label: 'Cgk is 1.33.' },
          ],
          answer: 'a',
          hint: 'Type 3 has no AV term, and capability was not calculated.',
          explanation:
            'Under 10% of study variation means the equipment noise is small next to these parts. Operators were not in the study. Capability still needs a stable process baseline after the measurement is accepted.',
        },
      ],
    },
    {
      id: 'msa4-cp',
      title: 'Checkpoint: name the study',
      goal: 'Match a scene to Type 1, Type 2, Type 3, or an attribute study.',
      checkpoint: true,
      cards: [
        {
          kind: 'classify',
          title: 'Four scenes',
          prompt: 'Which study fits?',
          categories: STUDY,
          items: [
            {
              id: 'master',
              label: 'Fifty repeats of one master plug on one bench micrometer',
              answer: 't1',
              why: 'One reference, one device, repeats. That is Type 1.',
            },
            {
              id: 'shifts',
              label: 'Ten shafts, three operators, two trials each, with a micrometer',
              answer: 't2',
              why: 'Parts and people, crossed. That is Type 2.',
            },
            {
              id: 'inline',
              label: 'An inline camera writes a diameter. Ten parts, three repeats, no one touches the part',
              answer: 't3',
              why: 'A continuous output and no operator influence. That is Type 3.',
            },
            {
              id: 'panels',
              label: 'Three inspectors, fifty known good or bad panels, two rounds',
              answer: 'attr',
              why: 'The output is a call compared with a known standard.',
            },
          ],
          hint: 'A number with no person is Type 3. A number with people is Type 2. One master is Type 1. A call is attribute.',
        },
        {
          kind: 'choice',
          title: 'Someone seats it',
          prompt: 'Operators seat a housing by hand. A digital indicator then reads the height, and the reading moves with the seating. Which study?',
          options: [
            { id: 'a', label: 'Type 3, because the indicator is automatic once the part is in place.' },
            { id: 'b', label: 'Type 2, because the way a person seats the part changes the number.' },
            { id: 'c', label: 'Type 1, because a height has a reference somewhere.' },
            { id: 'd', label: 'Attribute, because seating is a skill rather than a measurement.' },
          ],
          answer: 'b',
          hint: 'If the person can change the number, AV belongs in the study.',
          explanation:
            'The output is still a height, so the path is continuous. The person moves that height, so the parts study is Type 2. Type 3 would hide the seating effect by leaving AV out.',
        },
        {
          kind: 'choice',
          title: 'Press start',
          prompt: 'A CMM program measures 15 parts twice. The operator only presses start. A fixture locates every part. Which parts study?',
          options: [
            { id: 'a', label: 'Type 3. The fixture, not the person, determines the location.' },
            { id: 'b', label: 'Type 2, because a human is in the room.' },
            { id: 'c', label: 'Attribute agreement, because a CMM prints a report.' },
            { id: 'd', label: 'No MSA. A programmed cycle is exact.' },
          ],
          answer: 'a',
          hint: 'Ask whether swapping the operator would change the coordinate.',
          explanation:
            'The fixture replaced the operator’s influence, so this is Type 3: parts and repeats, AV left out. The output is a coordinate, not a pass/fail call. A program can still be biased, which is why the study exists.',
        },
      ],
    },
  ],
};
