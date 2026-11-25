# Belt Forge — Agent Handoff

Last updated: 2026-11-25 (v2.0.0 live). Written so a fresh agent can continue without re-investigating.

---

## 1. Project goal & core architecture

**Goal.** A gamified, interactive study app for one user preparing for the **DGQ Lean Six Sigma Black Belt** exam (50 MCQs, 90 min, 80 % pass, basic calculator allowed). The curriculum follows the user's **UMS** training book (DMAIC tool map). The user learns best through **interactive, visual, bite-sized building blocks**, not long text pages. They use both phone and desktop.

**Live site:** https://midasara2000.github.io/belt-forge/
**Repo:** https://github.com/midasara2000/belt-forge (private). Local clone: `/agent/repos/belt-forge`.

### Tech stack
- React 19, TypeScript ~7, Vite 8, oxlint. Recharts is used only for the knowledge radar.
- All other charts are **hand-written inline SVG**. No chart library in the Academy.
- Plain CSS: `src/App.css` holds the global design tokens (`--teal`, `--amber`, `--wine`, `--panel`, `--line`, `--muted`, `--font-display` Fraunces, `--font-body` IBM Plex Sans). The Academy has its own stylesheet, `src/academy/academy.css`.
- No backend. All progress lives in `localStorage` on the device.
- Hosting: GitHub Pages serves the **`gh-pages` branch**, which contains only the contents of `dist/`.

### Scripts
- `npm run dev` / `npm run build` (`tsc -b && vite build`) / `npm run lint` (oxlint) / `npm run preview`
- Local preview URL: `http://localhost:4173/belt-forge/` (the base path matters).

### Folder structure
```
vite.config.ts            base '/belt-forge/' (REQUIRED for Pages) + __BF_BUILT_AT__ define
src/
  main.tsx, App.tsx       App.tsx = screen state machine (hub, quiz, results, learn, lesson, path, academy, ...)
  version.ts              APP_VERSION (bump on every user-visible deploy) — shown by VersionMark
  types.ts                Core domain types (Question, Lesson, ProgressState, SessionConfig, GameMode...)
  data/
    questions.ts          ALL_QUESTIONS = 6 banks merged, lessonId attached via lessonIdForTopic()
    questions-foundation.ts / -define-measure.ts / -analyze-improve-control.ts   (original 133)
    questions-challenge-core.ts (chc-*, 40) / -stats.ts (chs-*, 55) / -lean.ts (chl-*, 45)
    lessons.ts            18 text "Learn & Recap" lessons + topic→lesson lookup (lessonIdForTopic, getLessonForTopic)
    topics.ts             PHASES, PHASE_ORDER, TOPICS (labels), phaseLabel()
    skillPath.ts          Skill Path units/nodes (1 node = 1 lesson)
    achievements.ts
  lib/
    scoring.ts            pickQuestions, balancedBaseline, shuffle, applyAnswer, beltRank, weakTopics
    storage.ts            localStorage key 'lss-bb-coach-v1' (+ migration defaults, e.g. pathStudied)
    skillPathProgress.ts  crowns (0–3) & unlock rules for Skill Path
  hooks/useProgress.ts    main progress hook (XP, streak, stats, achievements, markLessonStudied)
  components/
    QuizSession.tsx       quiz engine; per-presentation choice shuffle (ChoicePresentation) + QuizSnapshot resume
    Results.tsx, LearnLibrary.tsx, LessonView.tsx, LessonVisuals.tsx (16 SVG diagrams),
    SkillPath.tsx, KnowledgeRadar.tsx, VersionMark.tsx
  academy/                ← NEW interactive "Analyze Academy" (v2.0.0), self-contained
    types.ts              AcademyModule → AcademyLesson → AcademyCard (union), Visual (union), MinitabOutput
    course.ts             ANALYZE_COURSE (10 modules; 2 authored, 8 `planned(...)` stubs), allLessons, nextLessonAfter
    content/module1-data-types.ts       Module 1 (6 lessons incl. checkpoint)
    content/module4-tool-selection.ts   Module 4 (5 lessons incl. checkpoint) + Minitab outputs
    components/Cards.tsx       card renderers + RichText (**bold**, "- " bullets) + hint→retry→reveal logic
    components/LessonPlayer.tsx  progress bar, sticky Continue footer, completion screen, scoring
    components/Charts.tsx      SVG Histogram, Scatter (fit + r/R²), BoxPlot, Bars, StackedBars, DotStrip
    components/VisualView.tsx  Visual dispatcher + MinitabPanel + DataTypeTree + ToolMatrix + tag cloud
    components/Sims.tsx        slider sims: 'resolution' | 'sampleSize' | 'correlation'
    rng.ts                 seeded PRNG (mulberry32), normals(), mean/sd/pearson/linearFit, shuffleSeeded
    useAcademyProgress.ts  localStorage key 'belt-forge-academy-v1' {lessons:{[id]:LessonResult}, xp}
    Academy.tsx            course map + routes into LessonPlayer
    academy.css
```

### Key data schemas
**Question** (`src/types.ts`): `{ id, phase, topic, type: 'mcq'|'scenario'|'calc', difficulty, prompt, choices[4], correctIndex, explanation, dgqTip?, lessonId? }`. The canonical `correctIndex` lives in data. The UI reshuffles the choices on every presentation.

**Academy card union** (`src/academy/types.ts`):
- `concept` `{title, body, visual?, keyIdea?}`: not graded
- `choice` `{prompt, visual?, options:{id,label}[], answer:id, hint, explanation}`
- `classify` `{prompt, visual?, categories:{id,label}[], items:{id,label,sample?,answer,why}[], hint}`
- `numeric` `{prompt, visual?, answer, tolerance, unit?, hint, explanation}`. Accepts a comma as the decimal separator.
- `order` `{prompt, steps (listed in CORRECT order), hint, explanation}`. Tap to place, tap again to remove.
- `slider` `{prompt, sim, check?: choice-without-kind/title}`

`Visual` types: `table | histogram | scatter | boxplot | bars | stackedBars | dotstrip | dataTypeTree | toolMatrix(highlight dc|cc|dd|cd) | minitab | tagCloud`.

Scoring: each graded card earns 2 points (first try), 1 point (right after the hint) or 0 points (answer revealed).

### Design patterns to keep
- Answers are referenced by **id, never by position**. Positions are shuffled at runtime (Academy `ChoiceBody`, quiz `freshPresentation`).
- Example datasets are **deterministic** (seeded `normals(seed, n, mean, sd)`) so a chart looks identical on every visit.
- Content is plain TS data. Adding a lesson means adding data; no new components are needed unless a new card or visual type is required.
- Every user-visible change → bump `APP_VERSION` in `src/version.ts`. The user checks the badge to confirm a cache refresh.

---

## 2. Completed work & verified state

| Version | Feature | Verified |
|---|---|---|
| 1.0–1.4 | Hub, baseline (25 balanced Qs), DGQ mock (50 Q / 90 min / 80 %), drill, blind-spot, tool-match, calc modes, achievements, radar | Built & used live |
| 1.4 | Learn & Recap library (18 lessons, SVG visuals); "Study" from missed questions; resume drill with the same shuffle | Built & used live |
| 1.5 | Runtime choice shuffle (fixed the "answer is always A" bug); version watermark | Live |
| 1.6 | Bank expanded **133 → 273** (Cp/Cpk, DPMO, charts, TOC/takt/Little's Law, stats, DOE) | Script check: 273 Qs, 0 without lessonId; build passes |
| 1.7 | Skill Path (Duolingo-style tree, crowns, sequential unlock) | Build passes; live bundle contains it |
| 1.8 | Deepened lessons `stats-inference`, `charts-variation`, `capability`, `doe`, `process-lean-maps`; LessonView renders paragraphs/bullets | Live |
| **2.0.0** | **Analyze Academy**: Module 1 + Module 4, 11 lessons, 60 cards (19 concept, 23 choice, 8 classify, 5 numeric, 2 order, 3 slider) | See below |

**v2.0.0 verification (done):**
- `tsc -b` + `vite build` pass. A content-integrity script confirmed every `answer` id exists in its options/categories.
- A Playwright walkthrough on a 414×860 viewport (`/tmp/pw/walk.mjs`; the /tmp copy may be gone) passed with **0 console errors**. It covered: hub → Academy → M1 L1 (wrong answer → hint → retry → correct), classify card, lesson completion, M4 "Reading Minitab output" (choice, numeric wrong→right, regression prediction 55.8, R² slider), progress saved on the course map.
- Artifacts: `/opt/cursor/artifacts/analyze-academy-walkthrough.webm`, `academy-hint-retry.png`, `academy-minitab-output.png`, `academy-r2-slider.png`.
- Live bundle confirmed to contain `v2.0.0` and "Analyze Academy".
- Every Minitab output was hand-checked for internal consistency: 2-sample t (t = 3.13, df 46, CI 1.48–6.76), ANOVA F = 1.60 / p = 0.214, regression R² 66.1 % for t = 8.61 with n = 40, 2-proportion z = 2.30 / p = 0.021, chi-square **21.08** / p 0.000.

**Lint state:** `npm run lint` gives 0 errors and 5 warnings, all pre-existing patterns: set-state-in-effect in `useProgress.ts:99` and `QuizSession.tsx:84,93`; `zig` reassignment in `SkillPath.tsx:144`; `Math.random` in `useMemo` in `academy/components/Cards.tsx:118` (intentional per-visit shuffle).

---

## 3. Key decisions, rejected approaches & constraints

**Decisions (from the user):**
- Academy language: **English only**. Scope: **full Analyze phase** (stats + process/lean + cause tools). Exercise types: **all seven** (label, pick tool, read chart, numeric, Minitab output, sliders, ordering). Output style: **Minitab**.
- Gating: **soft**. There's a recommended next lesson, but anything can be opened.
- Wrong answers: **hint → retry → reveal** (no hearts/lives).
- Math depth: **exam level**. Interpret outputs plus simple calculator arithmetic; no derivations.
- Academy is a **new hub mode**. Do not remove Skill Path, Learn & Recap, or the quiz modes.
- Build-first scope was M1 + M4. The user is now asked to play-test before the remaining modules are built.

**Rejected / failed approaches:**
- Fixed or build-time choice ordering: rejected. The authored data had the correct answer at index 0 for most DEFINE/MEASURE questions, so the user saw "always A". A seeded build-time shuffle was also rejected ("why predetermined?"). Use a **runtime shuffle** every time.
- No Vite `base`: this caused a white page on Pages because assets 404'd at `/assets/...`. Keep `base: '/belt-forge/'`.
- One long text page per topic (Learn & Recap, Skill Path "Read"): the user found it too light and too text-heavy. That's why the Academy uses bite-sized cards. Don't regress to long pages.
- Background subagents writing files that the parent also writes caused a lost-file race once. If you parallelize, give each subagent its **own file** and don't touch those files until it finishes.
- First-draft chi-square output (18.62) didn't match its own count table. **Always compute statistics from the displayed data** before shipping.
- The correlation sim originally showed a sample r of 0.44 with the slider at 0.50, which contradicted the answer key. It was fixed by orthogonalising the noise (`orthoBase` in `Sims.tsx`). Any sim whose check question quotes a number must display exactly that number.

**Constraints you must not violate:**
1. Keep `base: '/belt-forge/'` in `vite.config.ts`.
2. Reference answers by id. Never rely on option position. Keep the runtime shuffle.
3. Don't change existing question `id`s, or the localStorage keys `lss-bb-coach-v1` / `belt-forge-academy-v1`. Existing user progress depends on them. Add migration defaults in `storage.ts` when new fields are added.
4. Bump `APP_VERSION` for every deploy and tell the user the number.
5. Statistics must be correct and internally consistent (DGQ exam prep). Verify by script.
6. Mobile-first: test at about 414 px wide. The Continue footer is fixed, and the player top bar is sticky at `top: 2.1rem` so it sits under the version badge.
7. Not affiliated with DGQ/UMS. Don't copy UMS book text verbatim; write original explanations.

**Deploy procedure (used every time):**
```bash
cd /agent/repos/belt-forge && npm run build
git add -A && git commit -m "..." && git push origin main   # feature branches: cursor/<name>-61ed, merged to main
rm -rf /tmp/belt-pages && mkdir -p /tmp/belt-pages && cp -a dist/. /tmp/belt-pages/
cd /tmp/belt-pages && git init -q -b gh-pages && git add -A && git commit -qm "Deploy vX" \
  && git remote add origin https://github.com/midasara2000/belt-forge.git && git push -qf origin gh-pages
# wait ~60 s, then confirm: curl the index for the assets/index-*.js name and grep the bundle for the version
```
Commits are authored as `Alex Pearce <midasara2000@gmail.com>` via `git -c user.name/-c user.email`. GitHub access was granted through RequestAccess for `midasara2000/belt-forge`. Retry pushes with backoff if the remote returns a 500 error.

---

## 4. Current bugs / unfinished work

- **No known functional bugs** in v2.0.0.
- **Unfinished: Academy modules 2, 3, 5, 6, 7, 8, 9, 10** are `planned(...)` stubs in `src/academy/course.ts`. They show as "Coming next" with their UMS topics.
- **Awaiting user feedback** on card length, text amount, difficulty and exercise mix (asked at the end of the last turn). Incorporate it before mass-authoring.
- Minor or tech debt:
  - The bundle is about 800 kB, which triggers Vite's chunk-size warning. It's harmless; code-splitting the Academy with `React.lazy` is optional.
  - Academy XP (`belt-forge-academy-v1`) is separate from the main hub XP/rank. Unify it only if the user wants that.
  - The 5 oxlint warnings listed above.
  - The version badge is sticky and can overlap page eyebrow text when scrolled (cosmetic).
  - In `fullPage` Playwright screenshots, the fixed footer appears mid-page. That's a screenshot artifact, not a bug.
- The text lessons for Define/Improve/Control (`src/data/lessons.ts`) are still recap-depth. That's acceptable; the Academy approach may later extend to other phases.

---

## 5. Immediate next step

**Task:** Author **Academy Module 2 — "Seeing your data"** (graphical analysis). It's the next building block after data types and comes before tool selection. Apply any feedback the user gives on Module 1 and 4 first.

**Target files:**
- New: `src/academy/content/module2-seeing-data.ts`, exporting `module2: AcademyModule` (`id: 'm2'`, `number: 2`).
- Edit: `src/academy/course.ts`. Replace the `planned(2, ...)` entry with `module2`.
- Optionally extend `src/academy/components/Charts.tsx` / `VisualView.tsx` / `types.ts` with new visual types:
  - `runChart` (time-ordered points + median line)
  - `pareto` (sorted bars + cumulative % line)
  - `controlChart` (I-chart with UCL/CL/LCL and a flagged point)
  - `probPlot` (normal probability plot)
- Bump `src/version.ts` to `2.1.0`.

**Suggested lessons** (about 5–8 cards each, following the existing patterns):
1. Histogram: shape, centre, spread, bimodal = mixture, skew, specs on the histogram.
2. Box plot: reading quartiles, whiskers and outliers; comparing groups.
3. Run chart and time order: trends, shifts, the "histogram hides time" trap.
4. Pareto: the vital few, the cumulative %, and the flat-Pareto trap.
5. Scatter and probability plot: association strength, curvature, normality.
6. Common vs special cause on an I-chart: tampering, rule violations.
7. Checkpoint.

Include classify cards (match the chart to the question), read-chart choice cards, at least one numeric card (e.g. read a cumulative % or count from a Pareto), at least one slider sim (e.g. histogram bin width, or adding a shift to a run chart), and one order card.

**Acceptance criteria:**
1. `npm run build` passes, and `npm run lint` adds no new errors.
2. A content-integrity script passes: every choice/slider `answer` exists in its options, and every classify item's `answer` exists in its categories. Template: iterate `ANALYZE_COURSE` with `npx tsx`.
3. Every number quoted in a prompt, option or explanation matches what the chart or sim actually displays (verify by script for computed values).
4. Answer ids are spread across options. The runtime shuffle handles position.
5. A Playwright run at 414×860 completes at least one full Module 2 lesson with 0 console errors, including one wrong→hint→retry interaction. Save a `.webm` plus key screenshots to `/opt/cursor/artifacts/`.
6. Deployed to `gh-pages`, and the live bundle contains `v2.1.0`. Tell the user to hard-refresh and check the badge.
7. Then continue in order: M3 Stratification → M5 Hypothesis & CIs → M6 Comparing groups → M7 Regression → M8 DOE → M9 Process & flow → M10 Cause analysis. Each module gets its own content file, the same verification steps, and a version bump.
