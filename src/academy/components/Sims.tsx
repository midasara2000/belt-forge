import { useMemo, useState } from 'react';
import { normals, round } from '../rng';
import type { SimKind } from '../types';
import { Histogram, Scatter } from './Charts';

function phi(z: number): number {
  // Abramowitz–Stegun approximation of the standard normal CDF.
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - p : p;
}

const RESOLUTIONS = [0.001, 0.01, 0.05, 0.1];

function ResolutionSim() {
  const raw = useMemo(() => normals(11, 150, 25, 0.035), []);
  const [idx, setIdx] = useState(0);
  const res = RESOLUTIONS[idx];
  const dp = Math.max(0, -Math.floor(Math.log10(res) + 1e-9));
  const recorded = raw.map((v) => round(Math.round(v / res) * res, dp));
  const distinct = new Set(recorded).size;
  return (
    <div className="ac-sim">
      <Histogram values={recorded} bins={Math.min(14, Math.max(3, distinct))} xLabel="Shaft diameter (mm)" />
      <label className="ac-sim__control">
        <span>
          Gauge resolution: <strong>{res} mm</strong>
        </span>
        <input
          type="range"
          min={0}
          max={RESOLUTIONS.length - 1}
          step={1}
          value={idx}
          onChange={(e) => setIdx(Number(e.target.value))}
        />
      </label>
      <div className="ac-sim__readout">
        <span>
          Distinct values recorded: <strong>{distinct}</strong>
        </span>
        <span>
          Same 150 shafts — only the gauge changed.
        </span>
      </div>
    </div>
  );
}

function SampleSizeSim() {
  const [n, setN] = useState(60);
  const contPower = phi(0.5 * Math.sqrt(n / 2) - 1.96);
  const p1 = 0.05;
  const p2 = 0.025;
  const pbar = (p1 + p2) / 2;
  const propPower = phi(
    (Math.abs(p1 - p2) * Math.sqrt(n) - 1.96 * Math.sqrt(2 * pbar * (1 - pbar))) /
      Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2)),
  );
  const bar = (label: string, sub: string, p: number, tone: string) => (
    <div className="ac-power">
      <div className="ac-power__label">
        <strong>{label}</strong>
        <span>{sub}</span>
      </div>
      <div className="ac-power__track">
        <div className="ac-power__fill" style={{ width: `${Math.round(p * 100)}%`, background: tone }} />
        <div className="ac-power__target" />
      </div>
      <span className="ac-power__pct">{Math.round(p * 100)}%</span>
    </div>
  );
  return (
    <div className="ac-sim">
      <p className="ac-sim__note">
        Chance of detecting a real improvement (power) — target line at 80%.
      </p>
      {bar('Continuous Y', 'mean shifts by 0.5 σ', contPower, '#1f6f5b')}
      {bar('Discrete Y', 'defect rate 5% → 2.5%', propPower, '#b86b2b')}
      <label className="ac-sim__control">
        <span>
          Samples per group: <strong>{n}</strong>
        </span>
        <input type="range" min={10} max={1000} step={10} value={n} onChange={(e) => setN(Number(e.target.value))} />
      </label>
    </div>
  );
}

/** Standardised x and a noise vector orthogonal to it, so the sample r equals the slider exactly. */
function orthoBase(n: number) {
  const std = (v: number[]) => {
    const m = v.reduce((a, b) => a + b, 0) / v.length;
    const c = v.map((x) => x - m);
    const s = Math.sqrt(c.reduce((a, b) => a + b * b, 0) / c.length);
    return c.map((x) => x / s);
  };
  const x = std(normals(21, n));
  const raw = std(normals(22, n));
  const dot = raw.reduce((a, v, i) => a + v * x[i], 0) / n;
  const e = std(raw.map((v, i) => v - dot * x[i]));
  return { x, e };
}

function CorrelationSim() {
  const base = useMemo(() => orthoBase(40), []);
  const [r, setR] = useState(0.6);
  const points: [number, number][] = base.x.map((x, i) => [
    180 + 12 * x,
    50 + 8 * (r * x + Math.sqrt(1 - r * r) * base.e[i]),
  ]);
  return (
    <div className="ac-sim">
      <Scatter points={points} xLabel="Oven temperature (°C)" yLabel="Coating hardness" fit showStats />
      <label className="ac-sim__control">
        <span>
          Underlying relationship strength: <strong>{r.toFixed(2)}</strong>
        </span>
        <input
          type="range"
          min={-0.95}
          max={0.95}
          step={0.05}
          value={r}
          onChange={(e) => setR(Number(e.target.value))}
        />
      </label>
    </div>
  );
}

export function Sim({ kind }: { kind: SimKind }) {
  if (kind === 'resolution') return <ResolutionSim />;
  if (kind === 'sampleSize') return <SampleSizeSim />;
  return <CorrelationSim />;
}
