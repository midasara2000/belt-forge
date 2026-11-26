import { mean, sd } from './rng';

/** Round half away from zero to a fixed number of decimals. */
export function num(x: number, dp = 2): string {
  return x.toFixed(dp);
}

/** Minitab-style p-value: three decimals, or 0.000 when it would round to zero. */
export function pTxt(p: number): string {
  if (!Number.isFinite(p)) return '—';
  if (p < 0.0005) return '0.000';
  return p.toFixed(3);
}

export function median(xs: number[]): number {
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 === 1 ? s[m] : (s[m - 1] + s[m]) / 2;
}

/** Individuals chart limits. UCL/LCL = mean ± 2.66 × average moving range (n = 2). */
export function iChartLimits(values: number[]): { cl: number; mr: number; ucl: number; lcl: number } {
  const cl = mean(values);
  const mrs: number[] = [];
  for (let i = 1; i < values.length; i++) mrs.push(Math.abs(values[i] - values[i - 1]));
  const mr = mean(mrs);
  return { cl, mr, ucl: cl + 2.66 * mr, lcl: cl - 2.66 * mr };
}

function logGamma(z: number): number {
  const p = [
    676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059,
    12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
  ];
  if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - logGamma(1 - z);
  let x = 0.99999999999980993;
  const zz = z - 1;
  for (let i = 0; i < p.length; i++) x += p[i] / (zz + i + 1);
  const t = zz + p.length - 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (zz + 0.5) * Math.log(t) - t + Math.log(x);
}

function betacf(a: number, b: number, x: number): number {
  const qab = a + b;
  const qap = a + 1;
  const qam = a - 1;
  let c = 1;
  let d = 1 - (qab * x) / qap;
  if (Math.abs(d) < 1e-30) d = 1e-30;
  d = 1 / d;
  let h = d;
  for (let m = 1; m <= 200; m++) {
    const m2 = 2 * m;
    let aa = (m * (b - m) * x) / ((qam + m2) * (a + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < 1e-30) d = 1e-30;
    c = 1 + aa / c;
    if (Math.abs(c) < 1e-30) c = 1e-30;
    d = 1 / d;
    h *= d * c;
    aa = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < 1e-30) d = 1e-30;
    c = 1 + aa / c;
    if (Math.abs(c) < 1e-30) c = 1e-30;
    d = 1 / d;
    const del = d * c;
    h *= del;
    if (Math.abs(del - 1) < 3e-12) break;
  }
  return h;
}

/** Regularized incomplete beta I_x(a, b). */
export function regularizedBeta(x: number, a: number, b: number): number {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const lnBeta = logGamma(a) + logGamma(b) - logGamma(a + b);
  const front = Math.exp(Math.log(x) * a + Math.log(1 - x) * b - lnBeta);
  if (x < (a + 1) / (a + b + 2)) return (front * betacf(a, b, x)) / a;
  return 1 - (front * betacf(b, a, 1 - x)) / b;
}

/** Two-sided p-value for a t statistic. */
export function tP(t: number, df: number): number {
  const x = df / (df + t * t);
  return regularizedBeta(x, df / 2, 0.5);
}

/** Two-sided critical t for a given alpha (default 5%). */
export function tCrit(df: number, alpha = 0.05): number {
  let lo = 0;
  let hi = 40;
  for (let i = 0; i < 70; i++) {
    const mid = (lo + hi) / 2;
    if (tP(mid, df) > alpha) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

/** Upper-tail p-value for an F statistic. */
export function fP(f: number, d1: number, d2: number): number {
  if (f <= 0) return 1;
  const x = d2 / (d2 + d1 * f);
  return regularizedBeta(x, d2 / 2, d1 / 2);
}

function gammaP(s: number, x: number): number {
  if (x <= 0) return 0;
  if (x < s + 1) {
    let term = 1 / s;
    let sum = term;
    for (let n = 1; n < 400; n++) {
      term *= x / (s + n);
      sum += term;
      if (Math.abs(term) < Math.abs(sum) * 1e-14) break;
    }
    return sum * Math.exp(-x + s * Math.log(x) - logGamma(s));
  }
  let b = x + 1 - s;
  let c = 1 / 1e-30;
  let d = 1 / b;
  let h = d;
  for (let i = 1; i <= 400; i++) {
    const an = -i * (i - s);
    b += 2;
    d = an * d + b;
    if (Math.abs(d) < 1e-30) d = 1e-30;
    c = b + an / c;
    if (Math.abs(c) < 1e-30) c = 1e-30;
    d = 1 / d;
    const del = d * c;
    h *= del;
    if (Math.abs(del - 1) < 1e-12) break;
  }
  const q = Math.exp(-x + s * Math.log(x) - logGamma(s)) * h;
  return 1 - q;
}

/** Upper-tail p-value for a chi-square statistic. */
export function chiP(x: number, df: number): number {
  if (x <= 0) return 1;
  return Math.min(1, Math.max(0, 1 - gammaP(df / 2, x / 2)));
}

/** Standard normal CDF. */
export function normalCdf(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - p : p;
}

/** Acklam's inverse standard normal, used by the probability plot. */
export function invNorm(p: number): number {
  const a = [
    -3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2, 1.38357751867269e2,
    -3.066479806614716e1, 2.506628277459239,
  ];
  const b = [
    -5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2, 6.680131188771972e1,
    -1.328068155288572e1,
  ];
  const c = [
    -7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838, -2.549732539343734,
    4.374664141464968, 2.938163982698783,
  ];
  const d = [7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996, 3.754408661907416];
  const plow = 0.02425;
  const phigh = 1 - plow;
  if (p < plow) {
    const q = Math.sqrt(-2 * Math.log(p));
    return (
      (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
    );
  }
  if (p > phigh) {
    const q = Math.sqrt(-2 * Math.log(1 - p));
    return -(
      (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
    );
  }
  const q = p - 0.5;
  const r = q * q;
  return (
    ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) /
    (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1)
  );
}

export interface TResult {
  n: number;
  mean: number;
  sd: number;
  se: number;
  t: number;
  df: number;
  p: number;
  crit: number;
  diff: number;
  ci: [number, number];
}

/** One-sample t against a target mean. CI is for the mean. */
export function oneSampleT(values: number[], mu0: number): TResult {
  const n = values.length;
  const m = mean(values);
  const s = sd(values);
  const se = s / Math.sqrt(n);
  const diff = m - mu0;
  const t = diff / se;
  const df = n - 1;
  const crit = tCrit(df);
  const moe = crit * se;
  return { n, mean: m, sd: s, se, t, df, p: tP(t, df), crit, diff, ci: [m - moe, m + moe] };
}

/** Paired t: one-sample t on the differences (after − before). */
export function pairedT(diffs: number[]): TResult {
  return oneSampleT(diffs, 0);
}

export interface WelchResult {
  na: number;
  nb: number;
  ma: number;
  mb: number;
  sa: number;
  sb: number;
  diff: number;
  se: number;
  t: number;
  df: number;
  p: number;
  ci: [number, number];
}

/** Welch two-sample t. Difference is mean(a) − mean(b). */
export function welchT(a: number[], b: number[]): WelchResult {
  const na = a.length;
  const nb = b.length;
  const ma = mean(a);
  const mb = mean(b);
  const sa = sd(a);
  const sb = sd(b);
  const va = (sa * sa) / na;
  const vb = (sb * sb) / nb;
  const se2 = va + vb;
  const diff = ma - mb;
  const t = diff / Math.sqrt(se2);
  const df = (se2 * se2) / ((va * va) / (na - 1) + (vb * vb) / (nb - 1));
  const crit = tCrit(df);
  const moe = crit * Math.sqrt(se2);
  return { na, nb, ma, mb, sa, sb, diff, se: Math.sqrt(se2), t, df, p: tP(t, df), ci: [diff - moe, diff + moe] };
}

export interface AnovaResult {
  labels: string[];
  ns: number[];
  means: number[];
  sds: number[];
  dfb: number;
  dfw: number;
  ssb: number;
  ssw: number;
  msb: number;
  msw: number;
  f: number;
  p: number;
}

export function anova(groups: number[][]): AnovaResult {
  const all = groups.flat();
  const grand = mean(all);
  let ssb = 0;
  let ssw = 0;
  const means = groups.map((g) => mean(g));
  const sds = groups.map((g) => sd(g));
  groups.forEach((g, i) => {
    ssb += g.length * (means[i] - grand) ** 2;
    ssw += g.reduce((acc, v) => acc + (v - means[i]) ** 2, 0);
  });
  const dfb = groups.length - 1;
  const dfw = all.length - groups.length;
  const msb = ssb / dfb;
  const msw = ssw / dfw;
  const f = msb / msw;
  return {
    labels: groups.map((_, i) => String(i + 1)),
    ns: groups.map((g) => g.length),
    means,
    sds,
    dfb,
    dfw,
    ssb,
    ssw,
    msb,
    msw,
    f,
    p: fP(f, dfb, dfw),
  };
}

export interface ChiResult {
  chi: number;
  df: number;
  p: number;
  expected: number[][];
  n: number;
}

/** Contingency table. `counts[row][col]`. */
export function chiSquare(counts: number[][]): ChiResult {
  const rowT = counts.map((r) => r.reduce((a, b) => a + b, 0));
  const cols = counts[0].length;
  const colT = Array.from({ length: cols }, (_, j) => counts.reduce((a, r) => a + r[j], 0));
  const n = rowT.reduce((a, b) => a + b, 0);
  let chi = 0;
  const expected = counts.map((r, i) =>
    r.map((o, j) => {
      const e = (rowT[i] * colT[j]) / n;
      chi += ((o - e) ** 2) / e;
      return e;
    }),
  );
  const df = (counts.length - 1) * (cols - 1);
  return { chi, df, p: chiP(chi, df), expected, n };
}

export interface PropResult {
  p1: number;
  p2: number;
  z: number;
  p: number;
}

/** Two-proportion z-test, pooled. */
export function twoProp(x1: number, n1: number, x2: number, n2: number): PropResult {
  const p1 = x1 / n1;
  const p2 = x2 / n2;
  const p = (x1 + x2) / (n1 + n2);
  const se = Math.sqrt(p * (1 - p) * (1 / n1 + 1 / n2));
  const z = (p1 - p2) / se;
  return { p1, p2, z, p: 2 * (1 - normalCdf(Math.abs(z))) };
}

/** Effect in a two-level design: Σ(sign × y) / (N/2). Signs are −1 or +1 in run order. */
export function factorialEffect(ys: number[], signs: number[]): number {
  let s = 0;
  for (let i = 0; i < ys.length; i++) s += signs[i] * ys[i];
  return s / (ys.length / 2);
}

/**
 * Type 1 gauge index. Cg = (0.2 × tolerance) / (6 × s).
 * The 0.2 is the share of the tolerance the gauge is allowed to consume.
 * Cg ignores where the mean sits.
 */
export function cg(tolerance: number, s: number): number {
  return (0.2 * tolerance) / (6 * s);
}

/**
 * Type 1 gauge index with bias. Cgk = (0.1 × tolerance − |bias|) / (3 × s).
 * Bias is the mean minus the reference. A large bias lowers Cgk and leaves Cg unchanged.
 */
export function cgk(tolerance: number, s: number, bias: number): number {
  return (0.1 * tolerance - Math.abs(bias)) / (3 * s);
}

/** Combined measurement standard deviation: √(EV² + AV²). Pass standard deviations, not variances. */
export function grrSigma(ev: number, av: number): number {
  return Math.sqrt(ev * ev + av * av);
}

/** %Study Variation = 100 × σ_GRR / σ_total, with σ_total = √(σ_GRR² + σ_part²). */
export function studyVariationPct(grr: number, part: number): number {
  const total = Math.sqrt(grr * grr + part * part);
  return (100 * grr) / total;
}

/** %Tolerance = 100 × (6 × σ_GRR) / tolerance. */
export function tolerancePct(grr: number, tolerance: number): number {
  return (100 * 6 * grr) / tolerance;
}

/** Number of distinct categories: 1.41 × σ_part / σ_GRR. The reported ndc is the integer part. */
export function ndc(part: number, grr: number): number {
  return (1.41 * part) / grr;
}

/** Range method for repeatability: σ_EV = average range / d₂. */
export function repeatabilityFromRange(averageRange: number, d2: number): number {
  return averageRange / d2;
}

/** Share of total variance that belongs to the measurement system, in percent. */
export function varianceSharePct(evVar: number, avVar: number, partVar: number): number {
  return (100 * (evVar + avVar)) / (evVar + avVar + partVar);
}
