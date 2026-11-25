import type { MinitabOutput } from './types';
import type { AnovaResult, ChiResult, PropResult, TResult, WelchResult } from './stats';
import { num, pTxt } from './stats';

export function oneSamplePanel(title: string, hypothesis: string, r: TResult): MinitabOutput {
  return {
    title,
    blocks: [
      { heading: hypothesis },
      {
        heading: 'Descriptive Statistics',
        table: {
          columns: ['N', 'Mean', 'StDev', 'SE Mean'],
          rows: [[r.n, num(r.mean, 2), num(r.sd, 3), num(r.se, 3)]],
        },
      },
      {
        lines: [
          `t = ${num(r.t, 2)}`,
          `df = ${r.df}`,
          `p = ${pTxt(r.p)}`,
          `95% CI: (${num(r.ci[0], 2)}, ${num(r.ci[1], 2)})`,
        ],
      },
    ],
  };
}

export function welchPanel(title: string, nameA: string, nameB: string, r: WelchResult): MinitabOutput {
  return {
    title,
    blocks: [
      { heading: `Difference: ${nameA} − ${nameB}. Equal variances are not assumed.` },
      {
        heading: 'Descriptive Statistics',
        table: {
          columns: ['Sample', 'N', 'Mean', 'StDev'],
          rows: [
            [nameA, r.na, num(r.ma, 2), num(r.sa, 2)],
            [nameB, r.nb, num(r.mb, 2), num(r.sb, 2)],
          ],
        },
      },
      {
        heading: 'Estimation for difference',
        lines: [
          `Difference = ${num(r.diff, 2)}`,
          `95% CI for difference: (${num(r.ci[0], 2)}, ${num(r.ci[1], 2)})`,
        ],
      },
      {
        heading: 'Test',
        lines: [`t = ${num(r.t, 2)}`, `df = ${num(r.df, 1)}`, `p = ${pTxt(r.p)}`],
      },
    ],
  };
}

export function anovaPanel(title: string, factor: string, labels: string[], r: AnovaResult): MinitabOutput {
  return {
    title,
    blocks: [
      {
        heading: 'Means',
        table: {
          columns: [factor, 'N', 'Mean', 'StDev'],
          rows: labels.map((label, i) => [label, r.ns[i], num(r.means[i], 2), num(r.sds[i], 2)]),
        },
      },
      {
        heading: 'Analysis of Variance',
        table: {
          columns: ['Source', 'DF', 'Adj SS', 'Adj MS', 'F', 'P'],
          rows: [
            [factor, r.dfb, num(r.ssb, 2), num(r.msb, 2), num(r.f, 2), pTxt(r.p)],
            ['Error', r.dfw, num(r.ssw, 2), num(r.msw, 2), '', ''],
            ['Total', r.dfb + r.dfw, num(r.ssb + r.ssw, 2), '', '', ''],
          ],
        },
      },
    ],
  };
}

export function chiPanel(title: string, rowLabels: string[], colLabels: string[], counts: number[][], r: ChiResult): MinitabOutput {
  return {
    title,
    blocks: [
      {
        heading: 'Observed counts',
        table: {
          columns: ['', ...colLabels],
          rows: counts.map((row, i) => [rowLabels[i], ...row]),
        },
      },
      {
        lines: [`Chi-square = ${num(r.chi, 2)}`, `df = ${r.df}`, `p = ${pTxt(r.p)}`],
      },
    ],
  };
}

export function propPanel(title: string, name1: string, name2: string, x1: number, n1: number, x2: number, n2: number, r: PropResult): MinitabOutput {
  return {
    title,
    blocks: [
      {
        heading: 'Descriptive Statistics',
        table: {
          columns: ['Sample', 'Events', 'N', 'Proportion'],
          rows: [
            [name1, x1, n1, num(r.p1, 3)],
            [name2, x2, n2, num(r.p2, 3)],
          ],
        },
      },
      {
        heading: 'Test',
        lines: [
          `Difference = p(${name1}) − p(${name2})`,
          `z = ${num(r.z, 2)}`,
          `p = ${pTxt(r.p)}`,
        ],
      },
    ],
  };
}
