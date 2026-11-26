import { ANALYZE_COURSE } from './course';
import { MEASURE_COURSE } from './measureCourse';
import type { AcademyTrack } from './Academy';

import { ANALYZE_STORAGE_KEY, MEASURE_STORAGE_KEY } from './useAcademyProgress';

export const ANALYZE_TRACK: AcademyTrack = {
  course: ANALYZE_COURSE,
  storageKey: ANALYZE_STORAGE_KEY,
  eyebrow: 'Analyze Academy · building blocks',
  title: 'Analyze, one block at a time',
  lede: 'The full Analyze path, one block at a time: see the data, choose a tool, test it, then confirm the causes. Recommended order is top to bottom, and any lesson can be opened.',
};

export const MEASURE_TRACK: AcademyTrack = {
  course: MEASURE_COURSE,
  storageKey: MEASURE_STORAGE_KEY,
  eyebrow: 'Measure Academy · MSA',
  title: 'MSA, one block at a time',
  lede: 'Measurement system analysis for a continuous number and for a pass/fail call. Learn what Type 1, Type 2 and Type 3 are for, then use the formulas. Recommended order is top to bottom, and any lesson can be opened.',
};
