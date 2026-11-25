import type { MinitabOutput, Visual } from '../types';
import { BoxPlot, Bars, ControlChart, DotStrip, EffectsChart, Histogram, Pareto, ProbPlot, RunChart, Scatter, StackedBars } from './Charts';

export function MinitabPanel({ output }: { output: MinitabOutput }) {
  return (
    <div className="ac-minitab" aria-label={`Minitab-style output: ${output.title}`}>
      <div className="ac-minitab__bar">
        <span className="ac-minitab__dot" />
        <span className="ac-minitab__dot" />
        <span className="ac-minitab__dot" />
        <span className="ac-minitab__title">Session · {output.title}</span>
      </div>
      <div className="ac-minitab__body">
        {output.blocks.map((b, i) => (
          <div key={i} className="ac-minitab__block">
            {b.heading && <div className="ac-minitab__heading">{b.heading}</div>}
            {b.lines && <pre>{b.lines.join('\n')}</pre>}
            {b.table && (
              <table>
                <thead>
                  <tr>
                    {b.table.columns.map((c) => (
                      <th key={c}>{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {b.table.rows.map((r, k) => (
                    <tr key={k}>
                      {r.map((cell, j) => (
                        <td key={j}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DataTypeTree() {
  return (
    <svg className="ac-chart" viewBox="0 0 340 200" role="img" aria-label="Data type tree">
      <g fontSize="11" textAnchor="middle">
        <rect x="130" y="8" width="80" height="26" rx="13" fill="#1c2a26" />
        <text x="170" y="25" fill="#fff" fontWeight="600">Data</text>
        <path d="M170 34 V48 H80 V60 M170 48 H250 V60" fill="none" stroke="#5a6b64" />
        <rect x="22" y="60" width="116" height="30" rx="8" fill="#1f6f5b" />
        <text x="80" y="79" fill="#fff" fontWeight="600">Continuous</text>
        <text x="80" y="106" fill="#1f6f5b">measured on a scale</text>
        <text x="80" y="121" fill="#5a6b64">time · weight · length</text>
        <text x="80" y="136" fill="#5a6b64">temperature · cost</text>
        <rect x="192" y="60" width="116" height="30" rx="8" fill="#b86b2b" />
        <text x="250" y="79" fill="#fff" fontWeight="600">Discrete</text>
        <text x="250" y="106" fill="#b86b2b">counted or categorised</text>
        <path d="M250 112 V122 H176 V132 M250 122 H324 V132 M225 122 V132 M275 122 V132" fill="none" stroke="#b86b2b" strokeOpacity="0.6" />
        <g fontSize="9.5">
          <rect x="150" y="132" width="52" height="22" rx="5" fill="#f6e7d8" />
          <text x="176" y="147" fill="#7a4518">Binary</text>
          <rect x="204" y="132" width="44" height="22" rx="5" fill="#f6e7d8" />
          <text x="226" y="147" fill="#7a4518">Nominal</text>
          <rect x="250" y="132" width="46" height="22" rx="5" fill="#f6e7d8" />
          <text x="273" y="147" fill="#7a4518">Ordinal</text>
          <rect x="298" y="132" width="40" height="22" rx="5" fill="#f6e7d8" />
          <text x="318" y="147" fill="#7a4518">Count</text>
        </g>
        <text x="244" y="174" fontSize="9.5" fill="#5a6b64">pass/fail · supplier · rating 1–5 · # defects</text>
      </g>
    </svg>
  );
}

const MATRIX: Record<'dc' | 'cc' | 'dd' | 'cd', { tools: string; graph: string }> = {
  dc: { tools: 't-tests · ANOVA', graph: 'Box plot / dot plot' },
  cc: { tools: 'Correlation · Regression', graph: 'Scatter plot' },
  dd: { tools: 'Proportion tests · Chi-square', graph: 'Stacked bar / Pareto' },
  cd: { tools: 'Logistic regression', graph: 'Binary fitted-line plot' },
};

function ToolMatrix({ highlight }: { highlight?: keyof typeof MATRIX }) {
  const cell = (key: keyof typeof MATRIX) => (
    <div className={`ac-matrix__cell ${highlight === key ? 'is-hot' : ''} ${highlight && highlight !== key ? 'is-dim' : ''}`}>
      <strong>{MATRIX[key].tools}</strong>
      <span>{MATRIX[key].graph}</span>
    </div>
  );
  return (
    <div className="ac-matrix" role="table" aria-label="Tool selection matrix by X and Y data type">
      <div className="ac-matrix__corner">Y ↓ / X →</div>
      <div className="ac-matrix__colhead">X discrete<br /><small>groups / categories</small></div>
      <div className="ac-matrix__colhead">X continuous<br /><small>measured input</small></div>
      <div className="ac-matrix__rowhead">Y continuous</div>
      {cell('dc')}
      {cell('cc')}
      <div className="ac-matrix__rowhead">Y discrete</div>
      {cell('dd')}
      {cell('cd')}
    </div>
  );
}

function Fishbone({ effect, bones }: { effect: string; bones: { label: string; causes: string[] }[] }) {
  return (
    <div className="ac-fish" role="img" aria-label={`Cause-effect diagram for ${effect}`}>
      <div className="ac-fish__bones">
        {bones.map((b) => (
          <div key={b.label} className="ac-fish__bone">
            <strong>{b.label}</strong>
            <ul>
              {b.causes.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="ac-fish__head">{effect}</div>
    </div>
  );
}

function FlowStrip({ steps }: { steps: { label: string; note: string; kind: 'va' | 'nva' | 'wait' }[] }) {
  return (
    <div className="ac-flow" role="img" aria-label="Process steps with times">
      {steps.map((s) => (
        <div key={s.label} className={`ac-flow__step is-${s.kind}`}>
          <strong>{s.label}</strong>
          <span>{s.note}</span>
        </div>
      ))}
    </div>
  );
}

export function VisualView({ visual }: { visual: Visual }) {
  switch (visual.type) {
    case 'table':
      return (
        <div className="ac-table-wrap">
          {visual.data.caption && <div className="ac-table__caption">{visual.data.caption}</div>}
          <table className="ac-table">
            <thead>
              <tr>
                {visual.data.columns.map((c) => (
                  <th key={c}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visual.data.rows.map((r, i) => (
                <tr key={i}>
                  {r.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'histogram':
      return <Histogram {...visual} />;
    case 'scatter':
      return <Scatter {...visual} />;
    case 'boxplot':
      return <BoxPlot {...visual} />;
    case 'bars':
      return <Bars bars={visual.bars} yLabel={visual.yLabel} />;
    case 'stackedBars':
      return <StackedBars {...visual} />;
    case 'dotstrip':
      return <DotStrip {...visual} />;
    case 'runChart':
      return <RunChart {...visual} />;
    case 'pareto':
      return <Pareto {...visual} />;
    case 'controlChart':
      return <ControlChart {...visual} />;
    case 'probPlot':
      return <ProbPlot {...visual} />;
    case 'effects':
      return <EffectsChart effects={visual.effects} />;
    case 'fishbone':
      return <Fishbone effect={visual.effect} bones={visual.bones} />;
    case 'flow':
      return <FlowStrip steps={visual.steps} />;
    case 'dataTypeTree':
      return <DataTypeTree />;
    case 'toolMatrix':
      return <ToolMatrix highlight={visual.highlight} />;
    case 'minitab':
      return <MinitabPanel output={visual.output} />;
    case 'tagCloud':
      return (
        <div className="ac-tags">
          {visual.items.map((t) => (
            <span key={t.label} className={`ac-tag ac-tag--${t.tone}`}>
              {t.label}
            </span>
          ))}
        </div>
      );
  }
}
