# Belt Forge — Agent Handoff

Last updated: 2026-11-25 (v3.0.0, full Analyze Academy). Written so a fresh agent can continue without re-investigating.

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
  academy/                ← interactive "Analyze Academy" (v3.0.0, all 10 modules), self-contained
    types.ts              AcademyModule → AcademyLesson → AcademyCard (union), Visual (union), MinitabOutput
    stats.ts              t / F / chi-square / proportion helpers, I-chart limits, factorial effects. Lessons call these so quoted numbers match the charts.
    minitab.ts            Session-window panels built from those results
    course.ts             ANALYZE_COURSE (10 modules, all authored), allLessons, nextLessonAfter
    content/module1-data-types.ts … module10-cause.ts   one file per module
    components/Cards.tsx       card renderers + RichText (**bold**, "- " bullets) + hint→retry→reveal logic
    components/LessonPlayer.tsx  progress bar, sticky Continue footer, completion screen, scoring
    components/Charts.tsx      SVG charts: histogram, scatter, box, bars, Pareto, run, I-chart, probability plot, effects
    components/VisualView.tsx  Visual dispatcher, plus fishbone and flow strip
    components/Sims.tsx        slider sims: resolution, sampleSize, correlation, binWidth, runShift
    rng.ts                 seeded PRNG (mulberry32), normals(), mean/sd/pearson/linearFit, shuffleSeeded
    useAcademyProgress.ts  localStorage key 'belt-forge-academy-v1' {lessons:{[id]:LessonResult}, xp}
    Academy.tsx            course map + routes into LessonPlayer
    academy.css
scripts/check-academy.ts    integrity + golden stats (`npx tsx scripts/check-academy.ts`)
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
| **2.0.0** | **Analyze Academy** started: Module 1 + Module 4 | See below |
| **3.0.0** | **Full Analyze Academy**: modules 1–10, 51 lessons, 239 cards (61 concept, 114 choice, 14 classify, 32 numeric, 11 order, 7 slider). New visuals: Pareto, run chart, I-chart, probability plot, effects, fishbone, flow. New sims: bin width, run shift. | `npx tsx scripts/check-academy.ts` OK. Playwright 414×860, 0 console errors. |

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
- Build-first scope was M1 + M4. v3.0.0 then authored the rest of Analyze (M2, M3, M5–M10) in book order of ideas: pictures, stratification, then inference, groups, regression, DOE, flow, causes. Control-chart *selection* (which chart for which data) stays a Control-phase topic; M2 only teaches the individuals chart and common vs special cause.

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

- **No known functional bugs** in v3.0.0. The Analyze Academy has no `comingSoon` modules.
- **Awaiting user feedback** on card length, text amount, difficulty and exercise mix across the full path. Adjust existing lessons from that feedback before opening a new phase academy.
- Minor or tech debt:
  - The bundle is about 1 MB, which triggers Vite's chunk-size warning. It's harmless; code-splitting the Academy with `React.lazy` is optional.
  - Academy XP (`belt-forge-academy-v1`) is separate from the main hub XP/rank. Unify it only if the user wants that.
  - The 5 oxlint warnings listed above.
  - The version badge is sticky and can overlap page eyebrow text when scrolled (cosmetic).
  - In `fullPage` Playwright screenshots, the fixed footer appears mid-page. That's a screenshot artifact, not a bug.
- The text lessons for Define, Measure (MSA, DPMO, Cp/Cpk), Improve and Control (`src/data/lessons.ts`) are still recap-depth. Measure’s MSA / performance / capability chapters are the highest-value gap relative to the UMS contents. Control-chart selection (which chart for which data type) belongs in a future Control academy, not in Module 2.

---

## 5. Immediate next step

**Do not author another phase until the user has played v3.0.0.** The live badge must read **v3.0.0**.

When they want the next academy, build a **Measure academy** (MSA including Gage R&R binary / Type I / Type II / linearity, DPMO / ppm / DPU / yield, Cp/Cpk and stability). Reuse the card, chart and Minitab patterns. Keep answers computed in `stats.ts`. Bump `APP_VERSION`. Run `npx tsx scripts/check-academy.ts`, `npm run lint`, `npm run build`, and a 414 px Playwright pass.

After that, the book’s highest-yield remaining clusters are Improve selection (must criteria, effort-benefit, N/3, Pugh) and Control charts. Define project-management topics can stay at recap depth.
