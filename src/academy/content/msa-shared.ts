import { mean, sd } from '../rng';
import { cg, cgk, ndc, studyVariationPct, tolerancePct, varianceSharePct } from '../stats';

/** Twelve repeats of a 10.00 mm master. Sample sd is about 0.021 mm. */
export const CENTERED = [10.02, 9.99, 10.01, 10.03, 9.98, 10, 10.02, 9.97, 10.01, 10, 10.04, 9.99];

/** Same cloud, shifted +0.08 mm. Spread is unchanged, so Cg stays and Cgk falls. */
export const BIASED = CENTERED.map((v) => Math.round((v + 0.08) * 100) / 100);

export const MASTER = 10;
export const TYPE1_TOLERANCE = 1;

export function type1Study(values: number[], reference = MASTER, tolerance = TYPE1_TOLERANCE) {
  const m = mean(values);
  const s = sd(values);
  const bias = m - reference;
  return { mean: m, sd: s, bias, cg: cg(tolerance, s), cgk: cgk(tolerance, s, bias) };
}

/** The variance example used in the question bank: 0.04, 0.05, 0.91. */
export const VAR_EV = 0.04;
export const VAR_AV = 0.05;
export const VAR_PV = 0.91;
export const SIG_GRR = Math.sqrt(VAR_EV + VAR_AV);
export const SIG_PV = Math.sqrt(VAR_PV);
export const STUDY_PCT = studyVariationPct(SIG_GRR, SIG_PV);
export const VAR_SHARE = varianceSharePct(VAR_EV, VAR_AV, VAR_PV);
export const NDC_STUDY = ndc(SIG_PV, SIG_GRR);

/** A process much tighter than its tolerance: %Study Variation near 35, %Tolerance = 8. */
export const TIGHT_GRR = 0.1;
export const TIGHT_PART = Math.sqrt((TIGHT_GRR / 0.35) ** 2 - TIGHT_GRR ** 2);
export const TIGHT_TOLERANCE = 7.5;
export const TIGHT_STUDY = studyVariationPct(TIGHT_GRR, TIGHT_PART);
export const TIGHT_TOL_PCT = tolerancePct(TIGHT_GRR, TIGHT_TOLERANCE);

export const TYPE3_EV = 0.04;
export const TYPE3_PART = 0.4;
export const TYPE3_STUDY = studyVariationPct(TYPE3_EV, TYPE3_PART);
