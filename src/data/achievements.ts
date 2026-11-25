export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  icon: string;
  check: (ctx: {
    xp: number;
    streak: number;
    baselineDone: boolean;
    mockBest: number | null;
    mockAttempts: number;
    answeredCount: number;
    dailyCorrect: number;
    phaseMastered: number;
    calcCorrect: number;
    scenarioCorrect: number;
  }) => boolean;
}

export const ACHIEVEMENTS: AchievementDef[] = [
  {
    id: 'first-blood',
    title: 'First Strike',
    description: 'Answer your first question correctly.',
    icon: '⚡',
    check: (c) => c.answeredCount >= 1,
  },
  {
    id: 'baseline',
    title: 'Baseline Mapped',
    description: 'Complete the knowledge baseline assessment.',
    icon: '◎',
    check: (c) => c.baselineDone,
  },
  {
    id: 'streak-3',
    title: 'On a Roll',
    description: 'Reach a 3-day practice streak.',
    icon: '🔥',
    check: (c) => c.streak >= 3,
  },
  {
    id: 'streak-7',
    title: 'Week Warrior',
    description: 'Reach a 7-day practice streak.',
    icon: '▣',
    check: (c) => c.streak >= 7,
  },
  {
    id: 'mock-pass',
    title: 'DGQ Threshold',
    description: 'Score 80%+ on a 50-question mock exam.',
    icon: '◆',
    check: (c) => (c.mockBest ?? 0) >= 80,
  },
  {
    id: 'mock-try',
    title: 'Exam Warrior',
    description: 'Complete your first full mock exam.',
    icon: '◷',
    check: (c) => c.mockAttempts >= 1,
  },
  {
    id: 'xp-400',
    title: 'Green Contender',
    description: 'Earn 400 XP.',
    icon: '↑',
    check: (c) => c.xp >= 400,
  },
  {
    id: 'xp-1600',
    title: 'DGQ Ready',
    description: 'Earn 1600 XP — exam-ready territory.',
    icon: '★',
    check: (c) => c.xp >= 1600,
  },
  {
    id: 'daily-goal',
    title: 'Daily Target',
    description: 'Hit your daily correct-answer goal.',
    icon: '✓',
    check: (c) => c.dailyCorrect >= 15,
  },
  {
    id: 'calc-ace',
    title: 'Calculator Ready',
    description: 'Get 10 calculation questions right (DGQ allows a calculator).',
    icon: '∑',
    check: (c) => c.calcCorrect >= 10,
  },
  {
    id: 'tool-picker',
    title: 'Tool Selector',
    description: 'Get 15 scenario / tool-selection questions right.',
    icon: '⚙',
    check: (c) => c.scenarioCorrect >= 15,
  },
  {
    id: 'phase-pro',
    title: 'Phase Pro',
    description: 'Reach 75%+ accuracy in any DMAIC phase (min 8 answers).',
    icon: '◇',
    check: (c) => c.phaseMastered >= 1,
  },
  {
    id: 'century',
    title: 'Century Club',
    description: 'Answer 100 questions.',
    icon: '100',
    check: (c) => c.answeredCount >= 100,
  },
];
