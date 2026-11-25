import type { VisualKind } from '../types';

/** Inline SVG teaching diagrams — no external assets required */
export function LessonVisual({ kind }: { kind: VisualKind }) {
  switch (kind) {
    case 'dmaic':
      return (
        <svg viewBox="0 0 520 120" className="lesson-svg" role="img" aria-label="DMAIC phases">
          {['Define', 'Measure', 'Analyze', 'Improve', 'Control'].map((label, i) => {
            const x = 20 + i * 100;
            return (
              <g key={label}>
                <rect x={x} y={30} width={88} height={52} rx={10} fill={i % 2 ? '#1F6F5B' : '#2A6F8F'} />
                <text x={x + 44} y={62} textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">
                  {label}
                </text>
                {i < 4 && (
                  <path d={`M${x + 90} 56 L${x + 98} 56`} stroke="#1c2a26" strokeWidth="2" markerEnd="url(#arrow)" />
                )}
              </g>
            );
          })}
        </svg>
      );
    case 'sipoc':
      return (
        <svg viewBox="0 0 520 130" className="lesson-svg" role="img" aria-label="SIPOC diagram">
          {[
            ['S', 'Suppliers', '#5B6E5E'],
            ['I', 'Inputs', '#2A6F8F'],
            ['P', 'Process', '#1F6F5B'],
            ['O', 'Outputs', '#B86B2B'],
            ['C', 'Customers', '#8B3A3A'],
          ].map(([letter, label, color], i) => {
            const x = 16 + i * 102;
            return (
              <g key={letter}>
                <rect x={x} y={24} width={92} height={80} rx={12} fill="#fffdf8" stroke={color} strokeWidth="2.5" />
                <circle cx={x + 46} cy={48} r={14} fill={color} />
                <text x={x + 46} y={53} textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700">
                  {letter}
                </text>
                <text x={x + 46} y={84} textAnchor="middle" fill="#1c2a26" fontSize="11" fontWeight="600">
                  {label}
                </text>
              </g>
            );
          })}
        </svg>
      );
    case 'kano':
      return (
        <svg viewBox="0 0 420 200" className="lesson-svg" role="img" aria-label="Kano model curves">
          <line x1="40" y1="160" x2="390" y2="160" stroke="#1c2a26" strokeWidth="1.5" />
          <line x1="40" y1="20" x2="40" y2="160" stroke="#1c2a26" strokeWidth="1.5" />
          <text x="210" y="190" textAnchor="middle" fontSize="11" fill="#5a6b64">
            Fulfillment →
          </text>
          <text x="14" y="90" fontSize="11" fill="#5a6b64" transform="rotate(-90 14 90)">
            Satisfaction
          </text>
          <path d="M50 150 Q120 150 200 110 T380 40" fill="none" stroke="#1F6F5B" strokeWidth="3" />
          <path d="M50 120 L380 50" fill="none" stroke="#2A6F8F" strokeWidth="3" />
          <path d="M50 40 Q140 40 220 100 T380 150" fill="none" stroke="#8B3A3A" strokeWidth="3" />
          <text x="300" y="36" fontSize="11" fill="#1F6F5B" fontWeight="600">
            Delighter
          </text>
          <text x="300" y="70" fontSize="11" fill="#2A6F8F" fontWeight="600">
            Performance
          </text>
          <text x="300" y="155" fontSize="11" fill="#8B3A3A" fontWeight="600">
            Basic
          </text>
        </svg>
      );
    case 'raci':
      return (
        <svg viewBox="0 0 420 160" className="lesson-svg" role="img" aria-label="RACI letters">
          {[
            ['R', 'Responsible', 'Does the work'],
            ['A', 'Accountable', 'One owner'],
            ['C', 'Consulted', 'Two-way input'],
            ['I', 'Informed', 'Kept updated'],
          ].map(([l, t, s], i) => {
            const x = 18 + i * 100;
            return (
              <g key={l}>
                <rect x={x} y={20} width={90} height={110} rx={12} fill="#fffdf8" stroke="#1F6F5B" strokeWidth="2" />
                <text x={x + 45} y={58} textAnchor="middle" fontSize="28" fontWeight="700" fill="#1F6F5B">
                  {l}
                </text>
                <text x={x + 45} y={88} textAnchor="middle" fontSize="11" fontWeight="600" fill="#1c2a26">
                  {t}
                </text>
                <text x={x + 45} y={108} textAnchor="middle" fontSize="10" fill="#5a6b64">
                  {s}
                </text>
              </g>
            );
          })}
        </svg>
      );
    case 'msa':
      return (
        <svg viewBox="0 0 440 160" className="lesson-svg" role="img" aria-label="MSA variation split">
          <rect x="30" y="50" width="380" height="44" rx="8" fill="#d8e8e2" />
          <rect x="30" y="50" width="250" height="44" rx="8" fill="#1F6F5B" />
          <rect x="280" y="50" width="130" height="44" rx="8" fill="#B86B2B" />
          <text x="155" y="78" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">
            Process variation
          </text>
          <text x="345" y="78" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">
            Measurement
          </text>
          <text x="220" y="130" textAnchor="middle" fontSize="12" fill="#5a6b64">
            Observed = Process + Measurement — keep the orange bar small
          </text>
        </svg>
      );
    case 'capability':
      return (
        <svg viewBox="0 0 460 180" className="lesson-svg" role="img" aria-label="Cp Cpk illustration">
          <line x1="70" y1="140" x2="420" y2="140" stroke="#1c2a26" strokeWidth="1.5" />
          <line x1="100" y1="30" x2="100" y2="140" stroke="#8B3A3A" strokeWidth="2" strokeDasharray="4 3" />
          <line x1="390" y1="30" x2="390" y2="140" stroke="#8B3A3A" strokeWidth="2" strokeDasharray="4 3" />
          <text x="100" y="24" textAnchor="middle" fontSize="11" fill="#8B3A3A">
            LSL
          </text>
          <text x="390" y="24" textAnchor="middle" fontSize="11" fill="#8B3A3A">
            USL
          </text>
          <path
            d="M130 140 C150 140 160 40 220 40 C280 40 290 140 310 140"
            fill="rgba(31,111,91,0.25)"
            stroke="#1F6F5B"
            strokeWidth="2"
          />
          <path
            d="M200 140 C220 140 240 55 290 55 C340 55 360 140 380 140"
            fill="rgba(184,107,43,0.2)"
            stroke="#B86B2B"
            strokeWidth="2"
          />
          <text x="220" y="165" textAnchor="middle" fontSize="11" fill="#1F6F5B">
            Centered → Cp ≈ Cpk
          </text>
          <text x="340" y="165" textAnchor="middle" fontSize="11" fill="#B86B2B">
            Shifted → Cpk drops
          </text>
        </svg>
      );
    case 'pareto':
      return (
        <svg viewBox="0 0 420 180" className="lesson-svg" role="img" aria-label="Pareto chart">
          {[80, 48, 28, 16, 10].map((h, i) => (
            <rect key={i} x={50 + i * 60} y={150 - h} width={44} height={h} fill={i === 0 ? '#1F6F5B' : '#7aa897'} />
          ))}
          <polyline
            points="72,70 132,95 192,118 252,132 312,140"
            fill="none"
            stroke="#B86B2B"
            strokeWidth="2.5"
          />
          <line x1="40" y1="150" x2="380" y2="150" stroke="#1c2a26" strokeWidth="1.5" />
          <text x="210" y="172" textAnchor="middle" fontSize="11" fill="#5a6b64">
            Vital few categories (bars) + cumulative % (line)
          </text>
        </svg>
      );
    case 'controlchart':
      return (
        <svg viewBox="0 0 460 170" className="lesson-svg" role="img" aria-label="Control chart">
          <line x1="40" y1="40" x2="430" y2="40" stroke="#8B3A3A" strokeWidth="1.5" strokeDasharray="5 4" />
          <line x1="40" y1="85" x2="430" y2="85" stroke="#1F6F5B" strokeWidth="1.5" />
          <line x1="40" y1="130" x2="430" y2="130" stroke="#8B3A3A" strokeWidth="1.5" strokeDasharray="5 4" />
          <polyline
            points="50,90 90,80 130,95 170,70 210,88 250,75 290,92 330,30 370,85 410,78"
            fill="none"
            stroke="#2A6F8F"
            strokeWidth="2.5"
          />
          <circle cx="330" cy="30" r="5" fill="#8B3A3A" />
          <text x="40" y="28" fontSize="10" fill="#8B3A3A">
            UCL
          </text>
          <text x="40" y="82" fontSize="10" fill="#1F6F5B">
            CL
          </text>
          <text x="40" y="148" fontSize="10" fill="#8B3A3A">
            LCL
          </text>
          <text x="250" y="165" textAnchor="middle" fontSize="11" fill="#5a6b64">
            Point beyond limits → investigate (special cause)
          </text>
        </svg>
      );
    case 'fishbone':
      return (
        <svg viewBox="0 0 480 180" className="lesson-svg" role="img" aria-label="Cause effect fishbone">
          <line x1="40" y1="90" x2="400" y2="90" stroke="#1c2a26" strokeWidth="3" />
          <polygon points="400,90 430,78 430,102" fill="#1F6F5B" />
          <text x="448" y="94" fontSize="12" fontWeight="700" fill="#1F6F5B">
            Y
          </text>
          {[
            [120, 40, 'Man'],
            [200, 40, 'Machine'],
            [280, 40, 'Method'],
            [120, 140, 'Material'],
            [200, 140, 'Measure'],
            [280, 140, 'Mother nature'],
          ].map(([x, y, label], i) => (
            <g key={i}>
              <line
                x1={Number(x)}
                y1={Number(y)}
                x2={Number(x) + 40}
                y2={90}
                stroke="#2A6F8F"
                strokeWidth="2"
              />
              <text
                x={Number(x) - 4}
                y={Number(y) < 90 ? Number(y) - 6 : Number(y) + 14}
                fontSize="11"
                fill="#1c2a26"
                fontWeight="600"
              >
                {label}
              </text>
            </g>
          ))}
        </svg>
      );
    case 'fmea':
      return (
        <svg viewBox="0 0 420 140" className="lesson-svg" role="img" aria-label="FMEA RPN">
          <rect x="20" y="40" width="110" height="60" rx="10" fill="#8B3A3A" />
          <rect x="155" y="40" width="110" height="60" rx="10" fill="#B86B2B" />
          <rect x="290" y="40" width="110" height="60" rx="10" fill="#2A6F8F" />
          <text x="75" y="75" textAnchor="middle" fill="#fff" fontWeight="700">
            Severity
          </text>
          <text x="210" y="75" textAnchor="middle" fill="#fff" fontWeight="700">
            Occurrence
          </text>
          <text x="345" y="75" textAnchor="middle" fill="#fff" fontWeight="700">
            Detection
          </text>
          <text x="210" y="125" textAnchor="middle" fontSize="13" fill="#1c2a26" fontWeight="600">
            RPN = S × O × D (still escalate high Severity)
          </text>
        </svg>
      );
    case 'vsm':
      return (
        <svg viewBox="0 0 460 150" className="lesson-svg" role="img" aria-label="Simple value stream">
          <rect x="30" y="50" width="70" height="50" fill="#1F6F5B" rx="6" />
          <polygon points="120,55 145,75 120,95" fill="#B86B2B" />
          <text x="132" y="110" fontSize="10" fill="#B86B2B">
            Inv
          </text>
          <rect x="160" y="50" width="70" height="50" fill="#1F6F5B" rx="6" />
          <polygon points="250,55 275,75 250,95" fill="#B86B2B" />
          <rect x="290" y="50" width="70" height="50" fill="#1F6F5B" rx="6" />
          <path d="M40 30 H340" stroke="#2A6F8F" strokeWidth="2" strokeDasharray="4 3" />
          <text x="180" y="24" fontSize="11" fill="#2A6F8F">
            Information flow
          </text>
          <text x="65" y="80" textAnchor="middle" fill="#fff" fontSize="12">
            Proc
          </text>
          <text x="195" y="80" textAnchor="middle" fill="#fff" fontSize="12">
            Proc
          </text>
          <text x="325" y="80" textAnchor="middle" fill="#fff" fontSize="12">
            Proc
          </text>
          <text x="230" y="140" textAnchor="middle" fontSize="11" fill="#5a6b64">
            Triangles = inventory / waiting driving lead time
          </text>
        </svg>
      );
    case 'doe':
      return (
        <svg viewBox="0 0 280 200" className="lesson-svg" role="img" aria-label="Factorial cube">
          <path d="M70 130 L70 60 L140 30 L210 60 L210 130 L140 160 Z" fill="rgba(42,111,143,0.15)" stroke="#2A6F8F" strokeWidth="2" />
          <circle cx="70" cy="130" r="5" fill="#1F6F5B" />
          <circle cx="70" cy="60" r="5" fill="#1F6F5B" />
          <circle cx="140" cy="30" r="5" fill="#1F6F5B" />
          <circle cx="210" cy="60" r="5" fill="#1F6F5B" />
          <circle cx="210" cy="130" r="5" fill="#1F6F5B" />
          <circle cx="140" cy="160" r="5" fill="#1F6F5B" />
          <circle cx="100" cy="95" r="5" fill="#1F6F5B" />
          <circle cx="180" cy="95" r="5" fill="#1F6F5B" />
          <text x="140" y="190" textAnchor="middle" fontSize="12" fill="#5a6b64">
            2³ corners = 8 run conditions
          </text>
        </svg>
      );
    case 'pull':
      return (
        <svg viewBox="0 0 460 130" className="lesson-svg" role="img" aria-label="Pull system">
          <rect x="30" y="40" width="100" height="50" rx="8" fill="#5B6E5E" />
          <rect x="180" y="40" width="100" height="50" rx="8" fill="#2A6F8F" />
          <rect x="330" y="40" width="100" height="50" rx="8" fill="#1F6F5B" />
          <text x="80" y="70" textAnchor="middle" fill="#fff" fontSize="12">
            Upstream
          </text>
          <text x="230" y="70" textAnchor="middle" fill="#fff" fontSize="12">
            Supermarket
          </text>
          <text x="380" y="70" textAnchor="middle" fill="#fff" fontSize="12">
            Downstream
          </text>
          <path d="M320 65 L290 65" stroke="#B86B2B" strokeWidth="3" markerEnd="url(#arrow)" />
          <text x="230" y="115" textAnchor="middle" fontSize="12" fill="#B86B2B" fontWeight="600">
            Pull signal ← demand
          </text>
        </svg>
      );
    case 'smed':
      return (
        <svg viewBox="0 0 420 140" className="lesson-svg" role="img" aria-label="SMED internal external">
          <rect x="30" y="50" width="160" height="40" fill="#8B3A3A" rx="6" />
          <rect x="200" y="50" width="90" height="40" fill="#1F6F5B" rx="6" />
          <rect x="300" y="50" width="90" height="40" fill="#2A6F8F" rx="6" />
          <text x="110" y="75" textAnchor="middle" fill="#fff" fontSize="12">
            Internal (machine stopped)
          </text>
          <text x="245" y="75" textAnchor="middle" fill="#fff" fontSize="11">
            Convert
          </text>
          <text x="345" y="75" textAnchor="middle" fill="#fff" fontSize="11">
            External
          </text>
          <text x="210" y="120" textAnchor="middle" fontSize="12" fill="#5a6b64">
            Move prep off the stopped machine → shorter changeover
          </text>
        </svg>
      );
    case 'hypothesis':
      return (
        <svg viewBox="0 0 420 160" className="lesson-svg" role="img" aria-label="P-value decision">
          <rect x="40" y="40" width="150" height="70" rx="12" fill="#1F6F5B" />
          <rect x="230" y="40" width="150" height="70" rx="12" fill="#8B3A3A" />
          <text x="115" y="70" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="14">
            p ≤ α
          </text>
          <text x="115" y="92" textAnchor="middle" fill="#fff" fontSize="12">
            Reject H0
          </text>
          <text x="305" y="70" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="14">
            p &gt; α
          </text>
          <text x="305" y="92" textAnchor="middle" fill="#fff" fontSize="12">
            Do not reject
          </text>
          <text x="210" y="140" textAnchor="middle" fontSize="12" fill="#5a6b64">
            Still judge practical importance of the effect size
          </text>
        </svg>
      );
    case 'gate':
    default:
      return (
        <svg viewBox="0 0 460 120" className="lesson-svg" role="img" aria-label="Phase gate">
          <rect x="20" y="35" width="120" height="50" rx="8" fill="#2A6F8F" />
          <rect x="170" y="25" width="50" height="70" rx="6" fill="#B86B2B" />
          <rect x="250" y="35" width="120" height="50" rx="8" fill="#1F6F5B" />
          <text x="80" y="65" textAnchor="middle" fill="#fff" fontWeight="700">
            Phase work
          </text>
          <text x="195" y="65" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="12">
            GATE
          </text>
          <text x="310" y="65" textAnchor="middle" fill="#fff" fontWeight="700">
            Next phase
          </text>
          <text x="230" y="110" textAnchor="middle" fontSize="11" fill="#5a6b64">
            Exit criteria must pass before moving on
          </text>
        </svg>
      );
  }
}
