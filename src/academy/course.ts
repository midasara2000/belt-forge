import { module1 } from './content/module1-data-types';
import { module2 } from './content/module2-seeing-data';
import { module3 } from './content/module3-stratification';
import { module4 } from './content/module4-tool-selection';
import { module5 } from './content/module5-hypothesis';
import { module6 } from './content/module6-comparing-groups';
import { module7 } from './content/module7-regression';
import { module8 } from './content/module8-doe';
import { module9 } from './content/module9-process-flow';
import { module10 } from './content/module10-cause';
import type { AcademyModule } from './types';

export const ANALYZE_COURSE: AcademyModule[] = [
  module1,
  module2,
  module3,
  module4,
  module5,
  module6,
  module7,
  module8,
  module9,
  module10,
];

export function allLessons() {
  return ANALYZE_COURSE.flatMap((m) => m.lessons.map((l) => ({ module: m, lesson: l })));
}

export function nextLessonAfter(lessonId: string) {
  const list = allLessons();
  const i = list.findIndex((x) => x.lesson.id === lessonId);
  return i >= 0 && i < list.length - 1 ? list[i + 1] : undefined;
}
