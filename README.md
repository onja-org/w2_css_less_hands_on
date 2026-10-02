# CSS, Week 4 — LESS Fundamentals: Variables, Mixins and Partials

**Day:** Day 3

**Estimated time:** ~2 hours

**Block:** CSS · Week 4

---

You already know SCSS. Today you meet a second preprocessor, LESS, by fixing three real maintenance problems: a brand color scattered across a stylesheet, a pile of near-identical buttons, and a stylesheet that grew into one giant file. You'll feel the pain first, then solve each one with LESS variables, mixins and partials.

**Prerequisites:** SCSS basics from the previous labs this week.

## How this lab works

```
w2_css_less_hands_on/
├── lesson/
│   └── index.md         ← Start here. Read this first.
├── lab/
│   ├── instructions.md  ← Then do this.
│   ├── demo.html        ← Demo page to check your compiled CSS in the browser
│   ├── exercises/       ← Your LESS files (you write code here)
│   │   ├── exercise1.less  ← Variables: the color nightmare
│   │   ├── exercise2.less  ← Mixins: the button factory
│   │   ├── exercise3.less  ← Partials: the 2000-line monster
│   │   └── partials/       ← You create this in Exercise 3
│   ├── resources/       ← Reference images for each exercise
│   ├── tests/           ← Automated checks (don't edit)
│   ├── package.json     ← Tooling: LESS compiler + Jest (don't edit)
│   └── .gitignore
├── lab.json             ← Submission config (don't edit)
├── submit               ← Run this when you're done (./submit <your-student-id>)
├── submit.py            ← The submission script that ./submit runs (don't edit)
└── README.md            ← You are here
```

You need Node.js 18 or newer (`node --version`). Before you start, run `npm install` once from inside the `lab/` folder (`cd lab`). All `npm run ...` commands in the instructions are run from inside `lab/` too.

> **Note:** Until you define the variables in Exercise 1 (Task 1C), Exercises 2 and 3 won't compile (`NameError: variable @brand-color is undefined`). That's expected, and it's the only error in the starter files. Do the exercises in order.

---

## Step 1 — Read the lesson

Open `lesson/index.md` and read it fully before touching any code.

The lesson explains the concept you're about to practise. Don't skip it — the lab will be much harder without it.

---

## Step 2 — Do the lab

Open `lab/instructions.md` and work through the tasks in order.

Your work goes inside the `lab/` directory. Do not modify files outside of it.

---

## Step 3 — Submit

When all tasks are complete, run this from the project root (not from `lab/`):

```bash
./submit <your-student-id>
```

On Windows without Git Bash, run `python submit.py <your-student-id>` instead (or `python3`, depending on your install).

This runs the lab's tests and records your score in Canvas. You can submit multiple times — the most recent submission counts.

---

## Getting stuck

1. Re-read the relevant section of the lesson
2. Check the "Common mistakes" table in the lesson
3. Search the error message — copy it exactly into Google or your AI tool
4. Ask in the group chat — share your error message and what you've already tried
5. Escalate to your mentor only if steps 1–4 haven't resolved it

---

## This week's focus

> "Turn plain CSS into maintainable preprocessor code — SCSS variables, mixins and partials, a first look at LESS — and learn to diagnose and fix preprocessor mistakes."
