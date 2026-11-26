import type { AcademyModule, Choice } from '../types';

const PATH: Choice[] = [
  { id: 'cont', label: 'Continuous MSA' },
  { id: 'attr', label: 'Attribute agreement' },
];

export const msa1: AcademyModule = {
  id: 'msa1',
  number: 1,
  title: 'Which study',
  summary: 'A continuous reading and a pass/fail call are different strategies. Pick the path before any formula.',
  umsTopics: ['MSA', 'Gage R&R for discrete (binary) data', 'Test the quality of available data'],
  lessons: [
    {
      id: 'msa1-why',
      title: 'The gauge is inside the number',
      goal: 'See why a later chart cannot be trusted until the measurement is.',
      cards: [
        {
          kind: 'concept',
          title: 'You never see the process alone',
          body: 'Every recorded value is the process **plus** the measurement system. If the gauge wobbles, the histogram wobbles with it.\n\nA capability number, a control chart, and a comparison of two machines will all blame the process for noise the gauge created. MSA asks a prior question: is this measurement good enough for the decision you are about to make?',
          keyIdea: 'MSA does not improve the process. It tells you whether the data can support the conclusion.',
        },
        {
          kind: 'concept',
          title: 'Three ways a gauge lies',
          body: 'Name the failure before you pick a study.\n\n- **Spread.** Repeats of the same thing disagree. The process looks worse than it is.\n- **Bias.** Every reading is shifted. A good process can look off target.\n- **Instability.** The gauge itself drifts. That looks like a special cause in the process.',
          visual: {
            type: 'table',
            data: {
              caption: 'What the bad gauge does to a later analysis',
              columns: ['Gauge problem', 'What you might conclude'],
              rows: [
                ['Wide repeats', 'Capability looks poor, or groups look different'],
                ['Bias', 'The mean looks off target'],
                ['Drift', 'A special cause that is really the gauge'],
              ],
            },
          },
          keyIdea: 'Fix the measurement before you launch a project to fix the process.',
        },
        {
          kind: 'choice',
          title: 'A Cpk arrived first',
          prompt: 'Someone hands you a Cpk of 0.7. No one has studied the gauge. What can you use?',
          options: [
            { id: 'a', label: 'The Cpk. The software computed it from the data you have.' },
            { id: 'b', label: 'Neither the Cpk nor a group comparison, until you know the gauge noise.' },
            { id: 'c', label: 'Only the mean. Bias always cancels in a capability study.' },
            { id: 'd', label: 'The control chart, because its limits are immune to measurement noise.' },
          ],
          answer: 'b',
          hint: 'Capability, charts, and group tests all use the same recorded numbers.',
          explanation:
            'Those numbers already include the gauge. A noisy gauge makes Cpk look worse and can invent differences between machines. Study the measurement, then baseline the process.',
        },
        {
          kind: 'choice',
          title: 'The question MSA answers',
          prompt: 'Which question is MSA for?',
          options: [
            { id: 'a', label: 'Is the process capable of the specification?' },
            { id: 'b', label: 'Which factor has the largest effect?' },
            { id: 'c', label: 'Can this measurement system support the decision I want to make?' },
            { id: 'd', label: 'Is the distribution normal?' },
          ],
          answer: 'c',
          hint: 'Capability, effects, and normality come after you trust the Y.',
          explanation:
            'MSA is about the **measurement**, not the process. A passed study means the recorded Y is fit for the decision. It does not mean the process is capable.',
        },
      ],
    },
    {
      id: 'msa1-fork',
      title: 'Continuous or pass/fail',
      goal: 'Choose the strategy from the output, and name what each study is for.',
      cards: [
        {
          kind: 'concept',
          title: 'The fork is the output',
          body: 'The strategy follows **what you record**, not how expensive the gauge is.\n\nA continuous output is a number on a scale: millimetres, grams, seconds. Noise is a spread and a bias. You compare that noise with the tolerance and with real part-to-part differences.\n\nA discrete output is a call: good or bad, go or no-go. There is no standard deviation to drop into Cg. You study whether people repeat the call, agree with each other, and agree with a known standard.',
          visual: {
            type: 'table',
            data: {
              caption: 'Same phase, two strategies',
              columns: ['', 'Continuous', 'Pass / fail'],
              rows: [
                ['You record', 'mm, g, seconds', 'good or bad'],
                ['Noise looks like', 'spread and bias', 'disagreement'],
                ['Studies', 'Type 1, then 2 or 3', 'Attribute agreement'],
                ['Formulas', 'Cg, Cgk, %GRR, ndc', '% agreement, kappa'],
                ['Wrong tool', '%GRR is not a call', 'Cg is not a yes/no'],
              ],
            },
          },
          keyIdea: 'Continuous: quantify the noise. Discrete: study the decisions.',
        },
        {
          kind: 'concept',
          title: 'What each study is for',
          body: 'On a continuous path, go in this order. Type 1 asks whether the **device** is good enough against one reference. If it fails, stop and fix it. Type 2 adds **parts and people**. Type 3 is the same part-to-part question when a person does not influence the reading.\n\nOn a pass/fail path, skip Cg entirely and run an attribute agreement study.',
          visual: {
            type: 'table',
            data: {
              caption: 'Purpose of each study',
              columns: ['Study', 'Purpose'],
              rows: [
                ['Type 1', 'Device vs one reference: bias and repeatability'],
                ['Type 2', 'Parts and people: can we still tell parts apart?'],
                ['Type 3', 'Equipment only: the person is not in the measurement'],
                ['Attribute', 'Do calls repeat, agree, and match the standard?'],
              ],
            },
          },
          keyIdea: 'Type 1 before Type 2. A biased device will spoil the bigger study.',
        },
        {
          kind: 'classify',
          title: 'Sort the outputs',
          prompt: 'Which family of study does each output need?',
          categories: PATH,
          items: [
            { id: 'bore', label: 'Bore diameter', sample: '12.04 mm', answer: 'cont', why: 'A number on a scale. Type 1, then Type 2 or Type 3.' },
            { id: 'stamp', label: 'Inspector’s stamp', sample: 'OK or scrap', answer: 'attr', why: 'A call. Attribute agreement, not Cg.' },
            { id: 'leak', label: 'Leak rate', sample: '0.8 ml/min', answer: 'cont', why: 'A measured rate is continuous, even if a spec later turns it into pass/fail.' },
            { id: 'scratch', label: 'Visual check', sample: 'scratch / no scratch', answer: 'attr', why: 'Two categories. Study the calls against known good and known bad parts.' },
            { id: 'torque', label: 'Closing torque', sample: '2.4 N·m', answer: 'cont', why: 'Torque is a number. Use the continuous path.' },
          ],
          hint: 'Ignore the instrument. Look at what gets written down: a number, or a category.',
        },
        {
          kind: 'choice',
          title: 'Why Cg cannot take a pass/fail',
          prompt: 'Why is Cg the wrong formula for a good/bad inspection?',
          options: [
            { id: 'a', label: 'Cg only works when there are more than three operators.' },
            { id: 'b', label: 'Cg needs a tolerance and a standard deviation of repeated numbers. A call has neither.' },
            { id: 'c', label: 'Pass/fail data are always more precise than millimetres.' },
            { id: 'd', label: 'Cg is reserved for Type 3.' },
          ],
          answer: 'b',
          hint: 'Look at the inputs of Cg: T and s.',
          explanation:
            'Cg = (0.2 × T) / (6 × s). Both T and s are properties of a **number**. A pass/fail call needs agreement, a miss rate, and kappa instead.',
        },
        {
          kind: 'choice',
          title: 'A laser that writes a diameter',
          prompt: 'An automatic laser records a diameter in millimetres. Nobody touches the part. Which path?',
          options: [
            { id: 'a', label: 'Attribute agreement, because a laser has no operator.' },
            { id: 'b', label: 'Either path. The formulas are the same.' },
            { id: 'c', label: 'Continuous: Type 1, then Type 3, because the output is a number and a person is not in the reading.' },
            { id: 'd', label: 'Skip MSA. Automatic gauges do not need it.' },
          ],
          answer: 'c',
          hint: 'The output is a millimetre. The missing person only chooses Type 3 over Type 2.',
          explanation:
            'A diameter is continuous, so Cg and %GRR still apply. Type 3 is the version with no operator. Attribute agreement would be right only if the laser’s output were “pass” or “fail”.',
        },
      ],
    },
    {
      id: 'msa1-cp',
      title: 'Checkpoint: pick the path',
      goal: 'Put MSA in the right place, and match each output to a study.',
      checkpoint: true,
      cards: [
        {
          kind: 'order',
          title: 'Order the Measure gate',
          prompt: 'Tap the steps in the order you would actually do them.',
          steps: [
            { id: 'def', label: 'Write what is measured, and the decision it supports' },
            { id: 'fork', label: 'Decide whether the output is continuous or a call' },
            { id: 'msa', label: 'Run the matching MSA, and fix a failure before going on' },
            { id: 'base', label: 'Baseline the process: stability, then capability' },
          ],
          hint: 'A capability number is the last step, not the first.',
          explanation:
            'An operational definition comes first, then the continuous-or-discrete fork, then the matching study. Stability and capability use the data only after the measurement can support them.',
        },
        {
          kind: 'choice',
          title: 'Where this project went wrong',
          prompt: 'A team calculated Cpk, found it low, and only then discovered the gauge used a third of the tolerance. What should they have done first?',
          options: [
            { id: 'a', label: 'Opened a DOE on the process, because Cpk was already low.' },
            { id: 'b', label: 'Studied the gauge before trusting the capability number.' },
            { id: 'c', label: 'Widened the specification so the Cpk looked acceptable.' },
            { id: 'd', label: 'Averaged more parts. A larger sample removes gauge noise.' },
          ],
          answer: 'b',
          hint: 'More parts of a noisy measurement give a more precise estimate of a contaminated number.',
          explanation:
            'MSA comes **before** capability. A larger sample does not remove gauge noise; it estimates that noisy number more tightly. Study the gauge, improve it if it fails, then repeat the baseline.',
        },
        {
          kind: 'classify',
          title: 'One more sort',
          prompt: 'Continuous MSA, or attribute agreement?',
          categories: PATH,
          items: [
            { id: 'cam', label: 'Camera output', sample: 'defect present: yes/no', answer: 'attr', why: 'The saved result is a category, even though a camera produced it.' },
            { id: 'weight', label: 'Fill weight', sample: '502.6 g', answer: 'cont', why: 'A weight is continuous.' },
            { id: 'go', label: 'Plug gauge', sample: 'goes / does not go', answer: 'attr', why: 'A go/no-go is a call. Study agreement with known masters.' },
          ],
          hint: 'A camera is not automatically continuous. Read the column that gets stored.',
        },
      ],
    },
  ],
};
