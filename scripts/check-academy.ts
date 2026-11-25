import { ANALYZE_COURSE } from '../src/academy/course';
import { anova, chiP, chiSquare, fP, factorialEffect, iChartLimits, tCrit, tP } from '../src/academy/stats';
import type { AcademyCard } from '../src/academy/types';

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

let lessons = 0;
let cards = 0;
const answerIds = new Set<string>();
for (const mod of ANALYZE_COURSE) {
  if (mod.comingSoon) problems.push(`${mod.id} is still marked coming soon`);
  if (mod.lessons.length === 0) problems.push(`${mod.id} has no lessons`);
  if (!mod.lessons.some((l) => l.checkpoint)) problems.push(`${mod.id} has no checkpoint`);
  for (const lesson of mod.lessons) {
    lessons += 1;
    if (lesson.cards.length < 3) problems.push(`${lesson.id} has fewer than 3 cards`);
    for (const card of lesson.cards) {
      cards += 1;
      checkCard(`${lesson.id}/${card.title}`, card);
      if (card.kind === 'choice') answerIds.add(card.answer);
    }
  }
}

if (answerIds.size < 3) problems.push(`choice answers only use ids: ${[...answerIds].join(',')}`);

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

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}

console.log(`OK ${ANALYZE_COURSE.length} modules, ${lessons} lessons, ${cards} cards`);
