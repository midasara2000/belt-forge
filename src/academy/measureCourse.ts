import { msa1 } from './content/msa1-strategy';
import { msa2 } from './content/msa2-type1';
import { msa3 } from './content/msa3-type2';
import { msa4 } from './content/msa4-type3';
import { msa5 } from './content/msa5-discrete';
import type { AcademyModule } from './types';

export const MEASURE_COURSE: AcademyModule[] = [msa1, msa2, msa3, msa4, msa5];

export function measureLessons() {
  return MEASURE_COURSE.flatMap((module) => module.lessons.map((lesson) => ({ module, lesson })));
}
