import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';
import type { Phase } from '../types';
import { PHASE_ORDER, phaseLabel } from '../data/topics';

interface Props {
  scores: Record<Phase, number>;
}

export function KnowledgeRadar({ scores }: Props) {
  const data = PHASE_ORDER.map((p) => ({
    phase: phaseLabel(p),
    score: scores[p] ?? 0,
  }));

  return (
    <div className="radar-wrap">
      <ResponsiveContainer width="100%" height={260}>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="72%">
          <PolarGrid stroke="rgba(28, 42, 38, 0.15)" />
          <PolarAngleAxis
            dataKey="phase"
            tick={{ fill: '#3d4f48', fontSize: 12, fontFamily: 'IBM Plex Sans, sans-serif' }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Accuracy"
            dataKey="score"
            stroke="#1F6F5B"
            fill="#1F6F5B"
            fillOpacity={0.28}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
