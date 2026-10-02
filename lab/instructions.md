# LESS CSS Lab - Exercise Instructions

> **CSS · Week 4 · Day 3**. Read `lesson/index.md` before starting.

You'll fix three real maintenance problems with the LESS preprocessor: a brand color copied everywhere (variables), nine near-identical buttons (mixins), and one giant stylesheet (partials). Each exercise has you feel the pain by hand first, then solve it with LESS.

## 🚀 Quick Start

Run every command from inside the `lab/` folder (`cd lab` from the project root).

1. **Install dependencies (once):**

   ```bash
   npm install
   ```

2. **Compile and run the demo:**

   ```bash
   npm start
   ```

3. **Open `demo.html` in your browser** to see the results. Recompile and refresh after every change.

> **Expected at first:** `npm run compile:ex1` works straight away, but `npm start`, `compile:ex2` and `compile:ex3` stop with `NameError: variable @brand-color is undefined`. That's because Exercises 2 and 3 import Exercise 1, and `@brand-color` doesn't exist until you define it in **Task 1C**. This is the only error in the starter files. Do the exercises in order and it goes away.

## 📜 Available Scripts

```bash
npm run compile:ex1    # Compile exercise 1 only
npm run compile:ex2    # Compile exercise 2 only
npm run compile:ex3    # Compile exercise 3 only
npm run compile:all    # Compile all exercises
npm run watch:less     # Recompile all exercises every time you save a .less file (Ctrl+C to stop)
npm start              # Compile all and prepare demo
npm test               # Run the automated checks (the last line shows your score)
```

## How to work through each exercise

- The detailed steps are in comments **inside each `.less` file**, labelled Task 1A, 1B, 1C… Work through them top to bottom. This page gives you the overview and tells you what the tests check.
- `npm test` groups its checks by the same task labels (e.g. `TASK 1D: Use Variables`), so a failing check tells you which task to revisit.
- The fill-in blanks (`_____`) and 💭 reflection questions are for you to think about. They are **not graded**.
- Some tasks ask you to try a temporary change (a different color or radius) to watch everything update. **Always change it back afterwards**. The tests check the final values listed below.

---

## Exercise 1: Variables - The Color Nightmare

**File:** `exercises/exercise1.less`

**Scenario:** "Heritage Weavers", a rug-making business, wants their brand color changed from terracotta (`#c0392b`) to teal (`#16a085`) across their whole site.

**Steps:**

1. **1A** - By hand, change every terracotta value to teal: `#c0392b` → `#16a085`, the darker `#a93226` → `#138d75`, and the two rgba colors `rgba(192, 57, 43, 0.1)` / `rgba(192, 57, 43, 0.3)` → `rgba(22, 160, 133, 0.1)` / `rgba(22, 160, 133, 0.3)`. Count how many places you touch.
2. **1B** - Think through the reflection questions.
3. **1C** - Uncomment the variables. `@brand-color: #16a085;` and `@brand-color-dark: #138d75;` are required. `@text-color`, `@light-gray` and `@white` are optional.
4. **1D** - Replace the hard-coded colors in the rules:
   - `#16a085` → `@brand-color`
   - `#138d75` → `@brand-color-dark` (3 places: `.btn-primary:hover`, `.link:hover`, and the second color of the `.progress-fill` gradient)
   - `rgba(22, 160, 133, 0.1)` → `fade(@brand-color, 10%)`, and `rgba(22, 160, 133, 0.3)` → `fade(@brand-color, 30%)`
5. **1E** - Change only `@brand-color` to another color (e.g. `#e67e22`), recompile and watch the whole page change. **Then set it back to `#16a085`.**

**The tests check:**

- Both brand variables are defined with the exact values above
- No brand hex code (old or new) or brand `rgba()` is left outside the two variable definitions, and `fade(@brand-color, 10%)` is used
- `@brand-color` is used in at least 12 places and `@brand-color-dark` in at least 3
- The file compiles, `.header` comes out teal, and changing the two variables recolors everything

![Exercise 1 reference: the Heritage Weavers page in teal](./resources/less_ex_1.png)

---

## Exercise 2: Mixins - The Button Factory

**File:** `exercises/exercise2.less`

**Scenario:** "Pixel Perfect Design Agency" has 9 button classes (primary / secondary / danger × small / medium / large) that are about 90% identical. The boss wants every button to have rounded corners and a subtle shadow.

**Steps:**

1. **2A** - By hand, change `border-radius: 4px` to `12px` on all 9 buttons. Don't add the shadow yet. You'll add it once, in the mixin.
2. **2B** - Think through the reflection questions.
3. **2C** - Uncomment the `.button-base(@bg-color: @brand-color, @text-color: white)` mixin and the three size mixins `.button-small()`, `.button-medium()` and `.button-large()`. The base mixin already includes the 12px radius, the new `box-shadow: 0 1px 3px rgba(0,0,0,0.1)` and the `&:hover` rule.
4. **2D** - Rewrite each of the 9 button classes as just two mixin calls, and delete the old `.btn-*:hover` rules:

   ```less
   .btn-primary-small {
     .button-base(@brand-color);
     .button-small();
   }
   ```

   Colors: primary = `@brand-color`, secondary = `#2ecc71`, danger = `#e74c3c`.
5. **2E** - Add a new button in one line and **keep it**: `.btn-warning-medium { .button-base(#f39c12); .button-medium(); }`. Then try changing the mixin's radius to `20px`, recompile, watch all buttons update, and **change it back to `12px`.**

**The tests check:**

- `.button-base(@bg-color …)` and the three size mixins are defined
- Every button class calls `.button-base(...)` plus its size mixin, with no repeated properties (`border`, `cursor`, `transition`) left inside
- All 9 buttons compile with `border-radius: 12px`, the right color, padding and font-size, the new shadow, and a hover color
- `12px` appears exactly once (in the mixin), so changing it there updates every button
- `.btn-warning-medium` exists with background `#f39c12` and medium padding

![Exercise 2 reference: the 9 rounded buttons](./resources/less_ex_2.png)

---

## Exercise 3: Partials - The 2000-Line Monster

**File:** `exercises/exercise3.less`

**Scenario:** You've inherited the CSS for "Artisan Marketplace". The previous developer put everything in one file.

**Steps:**

1. **3A** - Find the `.card` rule and change its `border-radius` from `4px` to `8px`. Change only that rule, not `.card-image` or the other `4px` values.
2. **3B / 3C** - Read the reflection questions and the partials explanation.
3. **3D** - Split two components into partials:
   - Create the folder `exercises/partials/`
   - Create `partials/_cards.less` and **move** (cut, don't copy) everything from the "CARD STYLES" and "MORE CARD VARIATIONS" sections into it
   - Create `partials/_buttons.less` and **move** the "BUTTON STYLES" section into it
   - Add these right after the existing imports at the top of `exercise3.less`:

     ```less
     @import "partials/_cards.less";
     @import "partials/_buttons.less";
     ```

   - Leave the `.card { padding: 1rem; }` inside the `@media` block in `exercise3.less`
   - Run `npm run compile:ex3`. The page should look exactly the same as before
4. **3E** - In `_cards.less`, change the `.card` radius to `16px`, recompile, check every card variant updated, then **change it back to `8px`.**

You don't need to import `exercise1.less` inside the partials. They're compiled as part of `exercise3.less`, so they can already see `@brand-color` and `.card()`.

**The tests check:**

- `.card` compiles with `border-radius: 8px`
- `_cards.less` holds `.card` (with the 8px radius), `.card-title`, `.card-price` and the four variants. The variants still reuse `.card();` and don't set their own radius
- `_buttons.less` holds `.btn`, `.btn-primary`, `.btn-secondary` and `.btn-outline`
- `exercise3.less` imports both partials, and no top-level `.card…` or `.btn…` rules are left in it
- It still compiles with the same styles, and changing the radius once in `_cards.less` updates every card variant

![Exercise 3 reference: the Artisan Marketplace cards](./resources/less_ex_3.png)

---

## Finish

1. Run `npm test` from inside `lab/`. The last line shows your score out of 23.
2. Submit from the project root, as described in the project `README.md` (`./submit <your-student-id>`).

**You've succeeded when:**

- ✅ **Exercise 1:** You can change the entire site's color scheme by modifying one variable
- ✅ **Exercise 2:** You can create new button variants in seconds using your mixins
- ✅ **Exercise 3:** You can quickly find and modify any component in organized partials

## Debugging Tips

- Compile one exercise at a time (`npm run compile:ex1`) and read the error in the terminal. LESS tells you the file, line and column
- Refresh `demo.html` after each compile. The browser reads the compiled `.css`, not your `.less`
- Use browser dev tools to inspect the generated CSS
- See the "Common mistakes" table in `lesson/index.md` (e.g. `$` instead of `@`, or `@include` instead of `.mixin();`)

## LESS vs SCSS Quick Reference

| Feature | LESS | SCSS |
|---------|------|------|
| Variables | `@color: blue;` | `$color: blue;` |
| Mixins | `.border-radius(@r) { }` | `@mixin border-radius($r) { }` |
| Using Mixins | `.border-radius(5px);` | `@include border-radius(5px);` |
| Interpolation | `@{variable}` | `#{$variable}` |
| Conditionals | `when (@a > 0)` | `@if $a > 0` |

## Why LESS?

- **Simpler syntax** - closer to vanilla CSS, easier learning curve
- **Client-side compilation** - can run in the browser during development (handy for prototyping)
- **JavaScript integration** - written in JavaScript, easy to extend with custom functions
- **Bootstrap legacy** - Bootstrap used LESS before switching to SCSS, and many projects still use it

## Next Steps

If you have time left, explore the [LESS documentation](https://lesscss.org/#overview) for more features.

---

**Need help?** Check the project `README.md` (one folder up) for the overview and the "Getting stuck" steps, and `lesson/index.md` for the concepts.
