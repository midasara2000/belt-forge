import { ANALYZE_COURSE } from '../src/academy/course';
import { BIASED, CENTERED, NDC_STUDY, STUDY_PCT, TIGHT_STUDY, TIGHT_TOL_PCT, TYPE3_STUDY, VAR_SHARE, type1Study } from '../src/academy/content/msa-shared';
import { MEASURE_COURSE } from '../src/academy/measureCourse';
import {
  anova,
  cg,
  cgk,
  chiP,
  chiSquare,
  fP,
  factorialEffect,
  grrSigma,
  iChartLimits,
  ndc,
  repeatabilityFromRange,
  studyVariationPct,
  tCrit,
  tP,
  tolerancePct,
  varianceSharePct,
} from '../src/academy/stats';
import type { AcademyCard, AcademyModule } from '../src/academy/types';

const problems: string[] = [];

function checkCard(where: string, card: AcademyCard) {
  if (card.kind === 'choice' || (card.kind === 'slider' && card.check)) {
    const choice = card.kind === 'choice' ? card : card.check!;
    if (!choice.options.some((o) => o.id === choice.answer)) {
      problems.push(`${where}: answer "${choice.answer}" missing from options`);
    }
  }
  if (card.kind === 'classify') {
    const ids = new Set(card.categories.map((c) => c.id));
    for (const item of card.items) {
      if (!ids.has(item.answer)) problems.push(`${where}: item ${item.id} answer "${item.answer}" not in categories`);
    }
  }
  if (card.kind === 'order') {
    const ids = card.steps.map((s) => s.id);
    if (new Set(ids).size !== ids.length) problems.push(`${where}: duplicate order ids`);
  }
  if (card.kind === 'numeric' && !Number.isFinite(card.answer)) {
    problems.push(`${where}: numeric answer is not finite`);
  }
}

function walk(name: string, course: AcademyModule[]) {
  let lessons = 0;
  let cards = 0;
  const answerIds = new Set<string>();
  const lessonIds = new Set<string>();
  for (const mod of course) {
    if (mod.comingSoon) problems.push(`${mod.id} is still marked coming soon`);
    if (mod.lessons.length === 0) problems.push(`${mod.id} has no lessons`);
    if (!mod.lessons.some((l) => l.checkpoint)) problems.push(`${mod.id} has no checkpoint`);
    for (const lesson of mod.lessons) {
      if (lessonIds.has(lesson.id)) problems.push(`${name}: duplicate lesson id ${lesson.id}`);
      lessonIds.add(lesson.id);
      lessons += 1;
      if (lesson.cards.length < 3) problems.push(`${lesson.id} has fewer than 3 cards`);
      for (const card of lesson.cards) {
        cards += 1;
        checkCard(`${lesson.id}/${card.title}`, card);
        if (card.kind === 'choice') answerIds.add(card.answer);
      }
    }
  }
  if (answerIds.size < 3) problems.push(`${name}: choice answers only use ids: ${[...answerIds].join(',')}`);
  return { lessons, cards, lessonIds };
}

const analyze = walk('analyze', ANALYZE_COURSE);
const measure = walk('measure', MEASURE_COURSE);
for (const id of measure.lessonIds) {
  if (analyze.lessonIds.has(id)) problems.push(`lesson id ${id} is in both academies`);
}

const crit = tCrit(24);
if (Math.abs(crit - 2.0639) > 1e-3) problems.push(`tCrit(24) = ${crit}`);
if (Math.abs(tP(crit, 24) - 0.05) > 1e-3) problems.push('t critical is not a 5% tail');
if (Math.abs(fP(3.8852938, 2, 12) - 0.05) > 1e-3) problems.push('F critical tail is off');
if (Math.abs(chiP(5.9914645, 2) - 0.05) > 1e-4) problems.push('chi-square critical tail is off');

const a = anova([
  [10, 11, 12, 11, 11],
  [14, 15, 13, 14, 14],
  [11, 12, 10, 11, 11],
]);
if (Math.abs(a.f - 30) > 1e-9) problems.push(`ANOVA F = ${a.f}`);

const chi = chiSquare([
  [80, 20],
  [60, 40],
  [90, 10],
]);
if (Math.abs(chi.chi - 26.086956521739133) > 1e-9) problems.push(`chi = ${chi.chi}`);

const ys = [72, 80, 74, 90];
if (factorialEffect(ys, [-1, 1, -1, 1]) !== 12) problems.push('effect A');
if (factorialEffect(ys, [-1, -1, 1, 1]) !== 6) problems.push('effect B');
if (factorialEffect(ys, [1, -1, -1, 1]) !== 4) problems.push('effect AB');

const limits = iChartLimits([10, 10.2, 9.8, 10.1, 9.9, 10.3, 10, 9.7, 10.2, 9.9, 10.1, 10, 9.8, 10.2, 10.1, 9.9, 12.6]);
if (!(limits.ucl < 12.6 && limits.lcl < 10)) problems.push(`I-chart limits do not flag 12.6: ${limits.ucl}`);

if (Math.abs(cg(0.6, 0.01) - 2) > 1e-12) problems.push(`Cg = ${cg(0.6, 0.01)}`);
if (Math.abs(cgk(0.6, 0.01, 0.02) - 4 / 3) > 1e-12) problems.push(`Cgk = ${cgk(0.6, 0.01, 0.02)}`);
if (Math.abs(grrSigma(0.03, 0.04) - 0.05) > 1e-12) problems.push('GRR 0.03/0.04');
if (Math.abs(grrSigma(0.05, 0.12) - 0.13) > 1e-12) problems.push('GRR 0.05/0.12');
if (Math.abs(studyVariationPct(0.3, Math.sqrt(0.91)) - 30) > 1e-9) problems.push(`%Study = ${STUDY_PCT}`);
if (Math.abs(varianceSharePct(0.04, 0.05, 0.91) - 9) > 1e-12) problems.push(`variance share = ${VAR_SHARE}`);
if (Math.abs(tolerancePct(0.04, 1.2) - 20) > 1e-12) problems.push('%Tolerance');
if (Math.abs(ndc(0.6, 0.1) - 8.46) > 1e-12) problems.push('ndc');
if (Math.abs(repeatabilityFromRange(0.0564, 1.128) - 0.05) > 1e-12) problems.push('range method');
if (Math.abs(TIGHT_STUDY - 35) > 0.05) problems.push(`tight study ${TIGHT_STUDY}`);
if (Math.abs(TIGHT_TOL_PCT - 8) > 1e-9) problems.push(`tight tolerance ${TIGHT_TOL_PCT}`);
if (!(TYPE3_STUDY < 10 && TYPE3_STUDY > 9)) problems.push(`type 3 study ${TYPE3_STUDY}`);
if (Math.trunc(NDC_STUDY) !== 4) problems.push(`reported ndc ${NDC_STUDY}`);

const passed = type1Study(CENTERED);
const shifted = type1Study(BIASED);
if (passed.cg < 1.33 || passed.cgk < 1.33) problems.push(`centred Type 1 should pass: ${passed.cg}, ${passed.cgk}`);
if (Math.abs(shifted.cg - passed.cg) > 1e-9) problems.push('bias changed Cg');
if (shifted.cgk >= 1) problems.push(`shifted Cgk should fail: ${shifted.cgk}`);

function numericAnswer(course: AcademyModule[], lessonId: string, title: string): number {
  for (const mod of course) {
    const lesson = mod.lessons.find((l) => l.id === lessonId);
    const card = lesson?.cards.find((c) => c.title === title);
    if (card?.kind === 'numeric') return card.answer;
  }
  problems.push(`missing numeric ${lessonId} / ${title}`);
  return NaN;
}

if (Math.abs(numericAnswer(MEASURE_COURSE, 'msa2-index', 'Compute Cg') - 2) > 1e-12) problems.push('card Cg');
if (Math.abs(numericAnswer(MEASURE_COURSE, 'msa2-index', 'Compute Cgk') - 4 / 3) > 1e-12) problems.push('card Cgk');
if (Math.abs(numericAnswer(MEASURE_COURSE, 'msa3-percent', 'Variance percent') - 9) > 1e-12) problems.push('card variance');
if (Math.abs(numericAnswer(MEASURE_COURSE, 'msa5-kappa', 'Kappa') - 0.16 / 0.26) > 1e-12) problems.push('card kappa');
if (Math.abs(numericAnswer(MEASURE_COURSE, 'msa5-errors', 'Miss rate') - (400 / 9)) > 1e-12) problems.push('card miss');

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}

console.log(`OK analyze ${ANALYZE_COURSE.length} modules, ${analyze.lessons} lessons, ${analyze.cards} cards`);
console.log(`OK measure ${MEASURE_COURSE.length} modules, ${measure.lessons} lessons, ${measure.cards} cards`);
