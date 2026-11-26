# Belt Forge — Lean Six Sigma Black Belt Coach

Interactive, gamified study coach aligned to the **UMS** DMAIC curriculum for **DGQ** Black Belt exam prep.

## Modes

- **Analyze Academy** — bite-sized interactive lessons for the whole Analyze phase (charts, tests, DOE, flow, causes)
- **Measure Academy** — MSA Type 1, 2 and 3, plus pass/fail agreement (Cg, Cgk, %GRR, ndc, kappa)
- **Knowledge Baseline** — 25 questions across Define→Control; builds your phase radar
- **DGQ Mock Exam** — 50 questions, 90-minute timer, 80% pass line, no instant feedback
- **Blind Spot Trainer** — adaptive practice on your weakest topics
- **Tool Match Arena** — scenario → pick the right LSS tool
- **Calc Challenge** — DPMO, yield, Cp/Cpk (use a basic calculator, as in the exam)
- **Rapid Drill** — timed mixed set
- **Train by phase** — focus on one DMAIC phase

Progress (XP, streak, achievements, topic stats) is stored in your browser via `localStorage`.

## Run locally

```bash
cd lss-bb-coach
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## DGQ notes baked into the coach

- Written exam shape: ~50 MCQs / ~90 minutes / high pass threshold (~80%)
- Calculator allowed; scenario & tool-selection judgment heavily weighted
- Certification also requires completed DMAIC projects (this tool covers the knowledge side)

Not affiliated with DGQ or UMS.
