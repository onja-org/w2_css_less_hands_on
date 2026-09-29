# LESS — a second CSS preprocessor

> **CSS · Week 4 · Day 3**
> Estimated reading time: 15 min

---

## What you're learning

Plain CSS has no way to name a value, reuse a block of declarations, or split a stylesheet into files that are combined for you. On a small page that's fine. On a real site it means the same hex code copied into dozens of rules, nine button classes that are 90% identical, and one enormous file nobody can find anything in. A **CSS preprocessor** fixes this: you write in an extended language, and a compiler turns it into ordinary CSS the browser reads. You've already used one (SCSS). Today you learn **LESS**, which solves the same problems with syntax that stays closer to plain CSS.

**You should already know:** CSS selectors and properties, plus SCSS variables, mixins and partials from earlier this week.

**By the end of the lab you'll be able to:**

- Replace repeated values with LESS variables, and derive shades with `darken()`, `lighten()` and `fade()`
- Write LESS mixins with parameters and default values
- Split a stylesheet into partials and combine them with `@import`
- Say how LESS syntax differs from SCSS

---

## Core idea

LESS is CSS plus three tools. A **variable** (`@brand-color`) is a single source of truth for a value. A **mixin** (`.button-base()`) is a reusable block of declarations. A **partial** is a separate `.less` file pulled in with `@import`. You write `.less` files and run `lessc` to compile them into a `.css` file. The browser never sees LESS, only the compiled CSS.

---

## How it works

### Compiling

LESS files don't work in the browser directly. The `lessc` compiler reads a `.less` file and writes a `.css` file:

```bash
# from inside lab/
npx lessc exercises/exercise1.less exercises/exercise1.css
# or use the script: npm run compile:ex1
```

`demo.html` links the compiled `.css` files, so recompile after every change and refresh the page.

### Variables

A LESS variable starts with `@` (SCSS uses `$`). Declare it once and use it anywhere below:

```less
@brand-color: #16a085;
@brand-color-dark: #138d75;

.header {
  background: @brand-color;
}

.button:hover {
  background: @brand-color-dark;
}
```

Change `@brand-color` in one place and every rule that uses it updates on the next compile.

### Color functions

LESS has built-in functions that calculate new colors from a variable, so shades stay consistent with the base color:

```less
@brand-color: #16a085;

.button:hover {
  background: darken(@brand-color, 10%);   // 10% darker
}
.badge {
  background: lighten(@brand-color, 20%);  // 20% lighter
}
.highlight {
  background: fade(@brand-color, 10%);     // same color at 10% opacity (rgba)
}
```

If the brand color changes, every hover state and tint changes with it. You don't have to recalculate any hex codes.

### Mixins

In LESS, a mixin looks like a class with parentheses. You "call" it inside another rule. Parameters also start with `@`, and a colon sets a default value:

```less
.button-base(@bg-color: @brand-color, @padding: 0.75rem 1.5rem) {
  background: @bg-color;
  padding: @padding;
  border: none;
  border-radius: 8px;

  &:hover {
    background: darken(@bg-color, 10%);
  }
}

.btn-primary { .button-base(); }             // uses the defaults
.btn-danger  { .button-base(#e74c3c); }      // overrides the color
```

Edit `border-radius` in the mixin and every button that calls it updates. Adding the parentheses in the definition (`.button-base()`) stops LESS from also outputting it as a real `.button-base` class.

### Partials and `@import`

A partial is just a `.less` file that holds one part of the styles: variables, mixins, or one component. By convention its name starts with `_`. `@import` pulls it in at compile time, so the output is still one CSS file:

```less
// partials/_cards.less — only the card component
.card {
  border-radius: 8px;
  background: white;
}
.card-small { .card(); padding: 1rem; }
```

```less
// exercise3.less — the main file just pulls the pieces together
@import "exercise1.less";         // variables
@import "exercise2.less";         // mixins
@import "partials/_cards.less";   // card component
```

The path in `@import` is relative to the file that contains the import. A partial can use variables and mixins imported earlier in the main file, because everything is compiled together as one stylesheet. Once the styles are split by purpose, you find the card styles in `_cards.less` instead of scrolling through 2000 lines.

### LESS vs SCSS

| Feature | LESS | SCSS |
|---|---|---|
| Variables | `@color: blue;` | `$color: blue;` |
| Mixins | `.border-radius(@r) { }` | `@mixin border-radius($r) { }` |
| Using mixins | `.border-radius(5px);` | `@include border-radius(5px);` |
| Interpolation | `@{variable}` | `#{$variable}` |
| Conditionals | `when (@a > 0)` | `@if $a > 0` |
| Imports | `@import "file.less";` | `@use "file";` |

People choose LESS when a team wants CSS-like syntax, when a project comes from older Bootstrap (which was written in LESS), or when they want to compile in the browser for a quick prototype.

---

## Common mistakes

| Mistake | Why it happens | How to fix it |
|---------|---------------|---------------|
| Writing `$brand-color` in a `.less` file | Habit from SCSS | LESS variables use `@`: `@brand-color` |
| Using `@include` or `@mixin` | SCSS syntax | Define with `.name() { }` and call with `.name();` |
| Changes don't show in the browser | The browser reads the compiled `.css`, not the `.less` | Run `npm run compile:ex1` (or `compile:all`) from inside `lab/`, then refresh |
| `'exercise1.less' wasn't found` | The `@import` path is wrong for where the file sits | Make the path relative to the file doing the import |
| Hard-coding a darker hex for a hover state | Copying the old CSS pattern | Use `darken(@brand-color, 10%)` so it follows the base color |

---

## Check your understanding

Answer these before moving to the lab. If you can't, re-read the relevant section.

1. How do you declare a variable and a mixin with a default parameter in LESS, and how do you use each?
2. You changed `@brand-color` but the page in the browser still shows the old color. What are two likely reasons?
3. Why is `darken(@brand-color, 10%)` better than typing the darker hex code yourself?

---

## Reference

- [LESS documentation](https://lesscss.org/)
- [LESS features overview](https://lesscss.org/features/)
- [Sass guide (for comparison with SCSS)](https://sass-lang.com/guide)

---

*Ready? Open the lab →*
