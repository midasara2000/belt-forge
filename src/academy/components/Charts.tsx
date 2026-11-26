import type { ReactNode } from 'react';
import { linearFit, mean, pearson, sd } from '../rng';
import { iChartLimits, invNorm, median } from '../stats';

const W = 340;
const H = 210;
const M = { l: 44, r: 14, t: 14, b: 38 };
const IW = W - M.l - M.r;
const IH = H - M.t - M.b;

const INK = '#1c2a26';
const MUTED = '#5a6b64';
const TEAL = '#1f6f5b';
const AMBER = '#b86b2b';
const WINE = '#8b3a3a';
const GRID = 'rgba(28,42,38,0.10)';

function niceTicks(min: number, max: number, count = 5): number[] {
  const span = max - min || 1;
  const raw = span / count;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => span / s <= count) ?? raw;
  const start = Math.ceil(min / step) * step;
  const ticks: number[] = [];
  for (let v = start; v <= max + step * 1e-6; v += step) ticks.push(Number(v.toFixed(10)));
  return ticks;
}

function fmt(v: number): string {
  if (Math.abs(v) >= 1000) return v.toFixed(0);
  if (Number.isInteger(v)) return String(v);
  return v.toFixed(Math.abs(v) < 1 ? 2 : 1);
}

function Frame({
  children,
  xLabel,
  yLabel,
  label,
}: {
  children: ReactNode;
  xLabel?: string;
  yLabel?: string;
  label: string;
}) {
  return (
    <svg className="ac-chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label}>
      {children}
      {xLabel && (
        <text x={M.l + IW / 2} y={H - 4} textAnchor="middle" fontSize="11" fill={MUTED}>
          {xLabel}
        </text>
      )}
      {yLabel && (
        <text
          x={12}
          y={M.t + IH / 2}
          textAnchor="middle"
          fontSize="11"
          fill={MUTED}
          transform={`rotate(-90 12 ${M.t + IH / 2})`}
        >
          {yLabel}
        </text>
      )}
    </svg>
  );
}

function YAxis({ ticks, sy }: { ticks: number[]; sy: (v: number) => number }) {
  return (
    <g>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={M.l} x2={M.l + IW} y1={sy(t)} y2={sy(t)} stroke={GRID} />
          <text x={M.l - 6} y={sy(t) + 3.5} textAnchor="end" fontSize="10" fill={MUTED}>
            {fmt(t)}
          </text>
        </g>
      ))}
    </g>
  );
}

function XAxis({ ticks, sx }: { ticks: number[]; sx: (v: number) => number }) {
  return (
    <g>
      <line x1={M.l} x2={M.l + IW} y1={M.t + IH} y2={M.t + IH} stroke={INK} strokeOpacity={0.4} />
      {ticks.map((t) => (
        <text key={t} x={sx(t)} y={M.t + IH + 14} textAnchor="middle" fontSize="10" fill={MUTED}>
          {fmt(t)}
        </text>
      ))}
    </g>
  );
}

export function Histogram({
  values,
  bins = 12,
  xLabel,
  lsl,
  usl,
}: {
  values: number[];
  bins?: number;
  xLabel: string;
  lsl?: number;
  usl?: number;
}) {
  const lo = Math.min(...values, lsl ?? Infinity);
  const hi = Math.max(...values, usl ?? -Infinity);
  const pad = (hi - lo) * 0.05 || 1;
  const min = lo - pad;
  const max = hi + pad;
  const width = (max - min) / bins;
  const counts = new Array(bins).fill(0);
  for (const v of values) {
    counts[Math.min(bins - 1, Math.floor((v - min) / width))]++;
  }
  const cmax = Math.max(...counts);
  const sx = (v: number) => M.l + ((v - min) / (max - min)) * IW;
  const sy = (c: number) => M.t + IH - (c / cmax) * IH;
  return (
    <Frame xLabel={xLabel} yLabel="Frequency" label={`Histogram of ${xLabel}`}>
      <YAxis ticks={niceTicks(0, cmax, 4)} sy={sy} />
      {counts.map((c, i) => (
        <rect
          key={i}
          x={sx(min + i * width) + 1}
          y={sy(c)}
          width={Math.max(0, (IW / bins) - 2)}
          height={M.t + IH - sy(c)}
          fill={TEAL}
          fillOpacity={0.78}
          rx={2}
        />
      ))}
      <XAxis ticks={niceTicks(min, max, 6)} sx={sx} />
      {lsl != null && (
        <g>
          <line x1={sx(lsl)} x2={sx(lsl)} y1={M.t} y2={M.t + IH} stroke={WINE} strokeDasharray="4 3" />
          <text x={sx(lsl) + 3} y={M.t + 10} fontSize="10" fill={WINE}>LSL</text>
        </g>
      )}
      {usl != null && (
        <g>
          <line x1={sx(usl)} x2={sx(usl)} y1={M.t} y2={M.t + IH} stroke={WINE} strokeDasharray="4 3" />
          <text x={sx(usl) - 22} y={M.t + 10} fontSize="10" fill={WINE}>USL</text>
        </g>
      )}
    </Frame>
  );
}

export function Scatter({
  points,
  xLabel,
  yLabel,
  fit,
  showStats,
}: {
  points: [number, number][];
  xLabel: string;
  yLabel: string;
  fit?: boolean;
  showStats?: boolean;
}) {
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const xpad = (Math.max(...xs) - Math.min(...xs)) * 0.06 || 1;
  const ypad = (Math.max(...ys) - Math.min(...ys)) * 0.08 || 1;
  const xmin = Math.min(...xs) - xpad;
  const xmax = Math.max(...xs) + xpad;
  const ymin = Math.min(...ys) - ypad;
  const ymax = Math.max(...ys) + ypad;
  const sx = (v: number) => M.l + ((v - xmin) / (xmax - xmin)) * IW;
  const sy = (v: number) => M.t + IH - ((v - ymin) / (ymax - ymin)) * IH;
  const line = fit ? linearFit(points) : null;
  const r = showStats ? pearson(points) : null;
  return (
    <Frame xLabel={xLabel} yLabel={yLabel} label={`Scatter of ${yLabel} vs ${xLabel}`}>
      <YAxis ticks={niceTicks(ymin, ymax, 5)} sy={sy} />
      <XAxis ticks={niceTicks(xmin, xmax, 6)} sx={sx} />
      {points.map(([x, y], i) => (
        <circle key={i} cx={sx(x)} cy={sy(y)} r={3.4} fill={TEAL} fillOpacity={0.7} />
      ))}
      {line && (
        <line
          x1={sx(xmin)}
          y1={sy(line.b0 + line.b1 * xmin)}
          x2={sx(xmax)}
          y2={sy(line.b0 + line.b1 * xmax)}
          stroke={AMBER}
          strokeWidth={2.2}
        />
      )}
      {r != null && (
        <text x={M.l + 8} y={M.t + 14} fontSize="11" fontWeight={600} fill={INK}>
          r = {r.toFixed(2)} · R² = {(r * r * 100).toFixed(0)}%
        </text>
      )}
    </Frame>
  );
}

function quantile(sorted: number[], q: number): number {
  const pos = (sorted.length - 1) * q;
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (pos - lo);
}

export function BoxPlot({
  groups,
  yLabel,
}: {
  groups: { label: string; values: number[] }[];
  yLabel: string;
}) {
  const all = groups.flatMap((g) => g.values);
  const pad = (Math.max(...all) - Math.min(...all)) * 0.08 || 1;
  const ymin = Math.min(...all) - pad;
  const ymax = Math.max(...all) + pad;
  const sy = (v: number) => M.t + IH - ((v - ymin) / (ymax - ymin)) * IH;
  const slot = IW / groups.length;
  return (
    <Frame yLabel={yLabel} label={`Box plot of ${yLabel} by group`}>
      <YAxis ticks={niceTicks(ymin, ymax, 5)} sy={sy} />
      <line x1={M.l} x2={M.l + IW} y1={M.t + IH} y2={M.t + IH} stroke={INK} strokeOpacity={0.4} />
      {groups.map((g, i) => {
        const s = [...g.values].sort((a, b) => a - b);
        const q1 = quantile(s, 0.25);
        const q2 = quantile(s, 0.5);
        const q3 = quantile(s, 0.75);
        const iqr = q3 - q1;
        const loW = s.find((v) => v >= q1 - 1.5 * iqr) ?? s[0];
        const hiW = [...s].reverse().find((v) => v <= q3 + 1.5 * iqr) ?? s[s.length - 1];
        const outliers = s.filter((v) => v < loW || v > hiW);
        const cx = M.l + slot * i + slot / 2;
        const bw = Math.min(46, slot * 0.5);
        return (
          <g key={g.label}>
            <line x1={cx} x2={cx} y1={sy(hiW)} y2={sy(q3)} stroke={INK} />
            <line x1={cx} x2={cx} y1={sy(q1)} y2={sy(loW)} stroke={INK} />
            <line x1={cx - bw / 4} x2={cx + bw / 4} y1={sy(hiW)} y2={sy(hiW)} stroke={INK} />
            <line x1={cx - bw / 4} x2={cx + bw / 4} y1={sy(loW)} y2={sy(loW)} stroke={INK} />
            <rect
              x={cx - bw / 2}
              y={sy(q3)}
              width={bw}
              height={Math.max(1, sy(q1) - sy(q3))}
              fill={TEAL}
              fillOpacity={0.22}
              stroke={TEAL}
            />
            <line x1={cx - bw / 2} x2={cx + bw / 2} y1={sy(q2)} y2={sy(q2)} stroke={TEAL} strokeWidth={2.4} />
            <circle cx={cx} cy={sy(mean(g.values))} r={2.6} fill={AMBER} />
            {outliers.map((o, k) => (
              <text key={k} x={cx} y={sy(o) + 4} textAnchor="middle" fontSize="11" fill={WINE}>
                *
              </text>
            ))}
            <text x={cx} y={M.t + IH + 15} textAnchor="middle" fontSize="10.5" fill={MUTED}>
              {g.label}
            </text>
          </g>
        );
      })}
    </Frame>
  );
}

export function Bars({ bars, yLabel }: { bars: { label: string; value: number }[]; yLabel: string }) {
  const vmax = Math.max(...bars.map((b) => b.value)) * 1.1;
  const sy = (v: number) => M.t + IH - (v / vmax) * IH;
  const slot = IW / bars.length;
  return (
    <Frame yLabel={yLabel} label={`Bar chart of ${yLabel}`}>
      <YAxis ticks={niceTicks(0, vmax, 4)} sy={sy} />
      <line x1={M.l} x2={M.l + IW} y1={M.t + IH} y2={M.t + IH} stroke={INK} strokeOpacity={0.4} />
      {bars.map((b, i) => (
        <g key={b.label}>
          <rect
            x={M.l + slot * i + slot * 0.18}
            y={sy(b.value)}
            width={slot * 0.64}
            height={M.t + IH - sy(b.value)}
            fill={TEAL}
            fillOpacity={0.8}
            rx={3}
          />
          <text x={M.l + slot * i + slot / 2} y={M.t + IH + 15} textAnchor="middle" fontSize="10.5" fill={MUTED}>
            {b.label}
          </text>
        </g>
      ))}
    </Frame>
  );
}

export function StackedBars({
  groups,
  series,
  yLabel,
}: {
  groups: string[];
  series: { label: string; values: number[] }[];
  yLabel: string;
}) {
  const colors = [TEAL, AMBER, WINE, '#2a6f8f'];
  const sy = (v: number) => M.t + IH - (v / 100) * IH;
  const slot = IW / groups.length;
  return (
    <Frame yLabel={yLabel} label={`Stacked percentage bars of ${yLabel}`}>
      <YAxis ticks={[0, 25, 50, 75, 100]} sy={sy} />
      {groups.map((g, i) => {
        const total = series.reduce((a, s) => a + s.values[i], 0);
        let acc = 0;
        return (
          <g key={g}>
            {series.map((s, k) => {
              const pct = (s.values[i] / total) * 100;
              const y0 = sy(acc + pct);
              const h = sy(acc) - y0;
              acc += pct;
              return (
                <rect
                  key={s.label}
                  x={M.l + slot * i + slot * 0.2}
                  y={y0}
                  width={slot * 0.6}
                  height={h}
                  fill={colors[k % colors.length]}
                  fillOpacity={0.82}
                />
              );
            })}
            <text x={M.l + slot * i + slot / 2} y={M.t + IH + 15} textAnchor="middle" fontSize="10.5" fill={MUTED}>
              {g}
            </text>
          </g>
        );
      })}
      {series.map((s, k) => (
        <g key={s.label} transform={`translate(${M.l + 6 + k * 78}, ${M.t + 4})`}>
          <rect width={9} height={9} fill={colors[k % colors.length]} />
          <text x={13} y={8.5} fontSize="10" fill={INK}>
            {s.label}
          </text>
        </g>
      ))}
    </Frame>
  );
}

export function Pareto({
  bars,
  yLabel = 'Percent',
}: {
  bars: { label: string; value: number }[];
  yLabel?: string;
}) {
  const sorted = [...bars].sort((a, b) => b.value - a.value);
  const total = sorted.reduce((s, b) => s + b.value, 0) || 1;
  const cum = sorted.map((_, i) => (sorted.slice(0, i + 1).reduce((s, b) => s + b.value, 0) / total) * 100);
  const sy = (v: number) => M.t + IH - (v / 100) * IH;
  const slot = IW / sorted.length;
  const pts = cum.map((c, i) => `${M.l + slot * i + slot / 2},${sy(c)}`).join(' ');
  return (
    <Frame yLabel={yLabel} label="Pareto chart with cumulative percent">
      <YAxis ticks={[0, 25, 50, 75, 100]} sy={sy} />
      <line x1={M.l} x2={M.l + IW} y1={M.t + IH} y2={M.t + IH} stroke={INK} strokeOpacity={0.4} />
      {sorted.map((b, i) => {
        const pct = (b.value / total) * 100;
        return (
          <g key={b.label}>
            <rect
              x={M.l + slot * i + slot * 0.18}
              y={sy(pct)}
              width={slot * 0.64}
              height={M.t + IH - sy(pct)}
              fill={TEAL}
              fillOpacity={0.8}
              rx={2}
            />
            <text x={M.l + slot * i + slot / 2} y={M.t + IH + 14} textAnchor="middle" fontSize="10" fill={MUTED}>
              {b.label}
            </text>
          </g>
        );
      })}
      <polyline points={pts} fill="none" stroke={AMBER} strokeWidth={2} />
      {cum.map((c, i) => (
        <g key={sorted[i].label}>
          <circle cx={M.l + slot * i + slot / 2} cy={sy(c)} r={3.1} fill={AMBER} />
          <text
            x={M.l + slot * i + slot / 2}
            y={Math.max(11, sy(c) - 7)}
            textAnchor="middle"
            fontSize="10"
            fontWeight={700}
            fill={INK}
            stroke="#fff"
            strokeWidth="3"
            paintOrder="stroke"
          >
            {Math.round(c)}%
          </text>
        </g>
      ))}
    </Frame>
  );
}

export function RunChart({
  values,
  xLabel = 'Observation order',
  yLabel,
  markFrom,
}: {
  values: number[];
  xLabel?: string;
  yLabel: string;
  markFrom?: number;
}) {
  const c = median(values);
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const pad = (hi - lo) * 0.14 || 1;
  const min = lo - pad;
  const max = hi + pad;
  const sx = (i: number) => M.l + (values.length === 1 ? IW / 2 : (i / (values.length - 1)) * IW);
  const sy = (v: number) => M.t + IH - ((v - min) / (max - min)) * IH;
  const line = values.map((v, i) => `${sx(i)},${sy(v)}`).join(' ');
  const medLabel = Number.isInteger(c) ? String(c) : c.toFixed(1);
  return (
    <Frame xLabel={xLabel} yLabel={yLabel} label={`Run chart of ${yLabel}`}>
      <YAxis ticks={niceTicks(min, max, 5)} sy={sy} />
      <XAxis ticks={niceTicks(1, values.length, 4).filter((t) => t >= 1 && t <= values.length)} sx={(v) => sx(v - 1)} />
      <line x1={M.l} x2={M.l + IW} y1={sy(c)} y2={sy(c)} stroke={AMBER} strokeDasharray="5 3" />
      <text x={M.l + IW - 4} y={sy(c) - 5} textAnchor="end" fontSize="10" fill={AMBER}>
        median {medLabel}
      </text>
      <polyline points={line} fill="none" stroke={TEAL} strokeWidth={1.6} />
      {values.map((v, i) => (
        <circle key={i} cx={sx(i)} cy={sy(v)} r={3.3} fill={markFrom != null && i >= markFrom ? WINE : TEAL} />
      ))}
    </Frame>
  );
}

export function ControlChart({ values, yLabel }: { values: number[]; yLabel: string }) {
  const { cl, ucl, lcl } = iChartLimits(values);
  const lo = Math.min(...values, lcl);
  const hi = Math.max(...values, ucl);
  const pad = (hi - lo) * 0.12 || 1;
  const min = lo - pad;
  const max = hi + pad;
  const sx = (i: number) => M.l + (values.length === 1 ? IW / 2 : (i / (values.length - 1)) * IW);
  const sy = (v: number) => M.t + IH - ((v - min) / (max - min)) * IH;
  const line = values.map((v, i) => `${sx(i)},${sy(v)}`).join(' ');
  const guide = (v: number, label: string, color: string) => (
    <g>
      <line x1={M.l} x2={M.l + IW} y1={sy(v)} y2={sy(v)} stroke={color} strokeDasharray={label === 'CL' ? undefined : '4 3'} />
      <text x={M.l + IW - 2} y={sy(v) - 3} textAnchor="end" fontSize="10" fill={color}>
        {label} {v.toFixed(2)}
      </text>
    </g>
  );
  return (
    <Frame xLabel="Observation order" yLabel={yLabel} label={`Individuals chart of ${yLabel}`}>
      <YAxis ticks={niceTicks(min, max, 5)} sy={sy} />
      <XAxis ticks={niceTicks(1, values.length, 4).filter((t) => t >= 1 && t <= values.length)} sx={(v) => sx(v - 1)} />
      {guide(ucl, 'UCL', WINE)}
      {guide(cl, 'CL', AMBER)}
      {guide(lcl, 'LCL', WINE)}
      <polyline points={line} fill="none" stroke={TEAL} strokeWidth={1.5} />
      {values.map((v, i) => {
        const out = v > ucl || v < lcl;
        return <circle key={i} cx={sx(i)} cy={sy(v)} r={out ? 4.2 : 3.2} fill={out ? WINE : TEAL} />;
      })}
    </Frame>
  );
}

export function ProbPlot({ values, yLabel }: { values: number[]; yLabel: string }) {
  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;
  const zs = sorted.map((_, i) => invNorm((i + 0.5) / n));
  const m = mean(values);
  const sigma = sd(values);
  const zmin = Math.min(...zs);
  const zmax = Math.max(...zs);
  const yLine = (z: number) => m + sigma * z;
  const ymin = Math.min(...sorted, yLine(zmin));
  const ymax = Math.max(...sorted, yLine(zmax));
  const xpad = (zmax - zmin) * 0.08 || 0.2;
  const ypad = (ymax - ymin) * 0.1 || 1;
  const sx = (z: number) => M.l + ((z - (zmin - xpad)) / (zmax - zmin + 2 * xpad)) * IW;
  const sy = (v: number) => M.t + IH - ((v - (ymin - ypad)) / (ymax - ymin + 2 * ypad)) * IH;
  return (
    <Frame xLabel="Theoretical normal quantile" yLabel={yLabel} label={`Normal probability plot of ${yLabel}`}>
      <YAxis ticks={niceTicks(ymin - ypad, ymax + ypad, 5)} sy={sy} />
      <XAxis ticks={niceTicks(zmin - xpad, zmax + xpad, 5)} sx={sx} />
      <line x1={sx(zmin)} y1={sy(yLine(zmin))} x2={sx(zmax)} y2={sy(yLine(zmax))} stroke={AMBER} strokeWidth={1.8} />
      {sorted.map((v, i) => (
        <circle key={i} cx={sx(zs[i])} cy={sy(v)} r={3.2} fill={TEAL} fillOpacity={0.75} />
      ))}
    </Frame>
  );
}

export function EffectsChart({ effects }: { effects: { label: string; value: number }[] }) {
  const vals = effects.map((e) => e.value);
  const min = Math.min(0, ...vals);
  const max = Math.max(0, ...vals);
  const pad = (max - min) * 0.16 || 1;
  const lo = min - pad;
  const hi = max + pad;
  const sy = (v: number) => M.t + IH - ((v - lo) / (hi - lo)) * IH;
  const slot = IW / effects.length;
  return (
    <Frame yLabel="Effect" label="Factor effects">
      <YAxis ticks={niceTicks(lo, hi, 5)} sy={sy} />
      <line x1={M.l} x2={M.l + IW} y1={sy(0)} y2={sy(0)} stroke={INK} strokeOpacity={0.45} />
      {effects.map((e, i) => {
        const y = sy(Math.max(e.value, 0));
        const h = Math.abs(sy(e.value) - sy(0));
        const cx = M.l + slot * i + slot / 2;
        return (
          <g key={e.label}>
            <rect x={cx - Math.min(22, slot * 0.28)} y={y} width={Math.min(44, slot * 0.56)} height={Math.max(h, 1)} fill={e.value >= 0 ? TEAL : WINE} fillOpacity={0.82} rx={2} />
            <text x={cx} y={M.t + IH + 14} textAnchor="middle" fontSize="10" fill={MUTED}>
              {e.label}
            </text>
          </g>
        );
      })}
    </Frame>
  );
}

/** Type 1 repeats against a reference, with the ±10% of tolerance band drawn around it. */
export function Type1Chart({
  values,
  reference,
  tolerance,
  yLabel,
}: {
  values: number[];
  reference: number;
  tolerance: number;
  yLabel: string;
}) {
  const m = mean(values);
  const half = 0.1 * tolerance;
  const loData = Math.min(...values, reference - half, m);
  const hiData = Math.max(...values, reference + half, m);
  const pad = (hiData - loData) * 0.22 || 0.02;
  const lo = loData - pad;
  const hi = hiData + pad;
  const sy = (v: number) => M.t + ((hi - v) / (hi - lo)) * IH;
  const sx = (i: number) => M.l + ((i + 0.5) / values.length) * IW;
  const yRef = sy(reference);
  const yMean = sy(m);
  const bandTop = sy(reference + half);
  const bandBot = sy(reference - half);
  const meanAbove = m >= reference;
  return (
    <Frame xLabel="Repeat" yLabel={yLabel} label={`Type 1 repeats of ${yLabel}`}>
      <YAxis ticks={niceTicks(lo, hi, 5)} sy={sy} />
      <rect
        x={M.l}
        y={Math.min(bandTop, bandBot)}
        width={IW}
        height={Math.max(1, Math.abs(bandBot - bandTop))}
        fill={TEAL}
        fillOpacity={0.12}
      />
      <line x1={M.l} x2={M.l + IW} y1={yRef} y2={yRef} stroke={TEAL} strokeWidth={1.7} />
      <line
        x1={M.l}
        x2={M.l + IW}
        y1={yMean}
        y2={yMean}
        stroke={AMBER}
        strokeWidth={1.7}
        strokeDasharray="5 3"
      />
      {values.map((v, i) => (
        <circle key={i} cx={sx(i)} cy={sy(v)} r={3.5} fill={INK} fillOpacity={0.82} />
      ))}
      <text x={M.l + IW - 4} y={yRef + (meanAbove ? 12 : -5)} textAnchor="end" fontSize="10" fill={TEAL}>
        reference {reference.toFixed(2)}
      </text>
      <text x={M.l + 4} y={yMean + (meanAbove ? -5 : 12)} textAnchor="start" fontSize="10" fill={AMBER}>
        mean {m.toFixed(3)}
      </text>
    </Frame>
  );
}

export function DotStrip({ values, xLabel }: { values: number[]; xLabel: string }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pad = (max - min) * 0.06 || 1;
  const sx = (v: number) => M.l + ((v - min + pad) / (max - min + 2 * pad)) * IW;
  const stacks = new Map<number, number>();
  return (
    <Frame xLabel={xLabel} label={`Dot plot of ${xLabel}`}>
      <XAxis ticks={niceTicks(min - pad, max + pad, 6)} sx={sx} />
      {values.map((v, i) => {
        const key = Math.round(sx(v) / 7);
        const n = stacks.get(key) ?? 0;
        stacks.set(key, n + 1);
        return <circle key={i} cx={sx(v)} cy={M.t + IH - 5 - n * 7} r={3.1} fill={TEAL} fillOpacity={0.75} />;
      })}
    </Frame>
  );
}
