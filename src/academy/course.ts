import { module1 } from './content/module1-data-types';
import { module4 } from './content/module4-tool-selection';
import type { AcademyModule } from './types';

function planned(number: number, title: string, summary: string, umsTopics: string[]): AcademyModule {
  return { id: `m${number}`, number, title, summary, umsTopics, lessons: [], comingSoon: true };
}

export const ANALYZE_COURSE: AcademyModule[] = [
  module1,
  planned(2, 'Seeing your data', 'Histogram, box plot, run chart, Pareto, scatter and probability plots — read each one.', [
    'Graphical analysis',
    'Variation: common vs special cause',
    'Location & spread',
  ]),
  planned(3, 'Stratification', 'Slice data by shift, line, supplier to expose hidden mixtures.', [
    'Data Stratification',
  ]),
  module4,
  planned(5, 'Hypothesis testing & confidence intervals', 'H₀/H₁, α, β, power, p-values and CIs built step by step.', [
    'Confidence Interval',
    'Hypothesis Tests',
  ]),
  planned(6, 'Comparing groups', 't-tests, one/two-way ANOVA, equal variance, proportions and chi-square in depth.', [
    'Hypothesis Tests',
    'One/Two Way ANOVA',
  ]),
  planned(7, 'Correlation & regression', 'Correlation, simple/multiple/logistic regression, R², residuals and multicollinearity.', [
    'Correlation',
    'Simple/Multiple/Logistic Regression',
  ]),
  planned(8, 'Design of Experiments', 'Full and fractional factorials, interactions, aliasing and response surfaces.', [
    'Full Factorial',
    'Fractional Factorial',
    'Response Surface Methods',
    'Variation Reduction',
  ]),
  planned(9, 'Process & flow analysis', 'Spaghetti, flow chart, CFD, VSM, value & time analysis, capacity, process efficiency.', [
    'Process Analysis',
    'Spaghetti Diagram',
    'Process Flow Chart',
    'CFD',
    'Value Stream Map',
    'Value Analysis',
    'Time Analysis',
    'Capacity Analysis',
    'Process Efficiency',
  ]),
  planned(10, 'Cause analysis & main causes', 'Cause–effect diagram, FMEA and deriving the validated vital few.', [
    'Cause-Effect Diagram',
    'FMEA',
    'Derive Main Causes',
  ]),
];

export function allLessons() {
  return ANALYZE_COURSE.flatMap((m) => m.lessons.map((l) => ({ module: m, lesson: l })));
}

export function nextLessonAfter(lessonId: string) {
  const list = allLessons();
  const i = list.findIndex((x) => x.lesson.id === lessonId);
  return i >= 0 && i < list.length - 1 ? list[i + 1] : undefined;
}
