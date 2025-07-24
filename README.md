# LESS CSS Hands-On Lab

**🎯 Goal:** Get familiar with LESS as an alternative to SCSS through hands-on practice
**⏱️ Duration:** ~1.5 hours
**📚 Prerequisites:** Basic knowledge of SCSS from previous lessons

## What You'll Learn

By the end of this lab, you'll understand:
- How LESS differs from SCSS syntactically
- When you might choose LESS over SCSS in real projects
- Key LESS-specific features that make it unique
- How LESS fits into the broader frontend tooling ecosystem

## Lab Structure

- **Setup**
- **Exercise 1: Variables & Basic Syntax** - Learn LESS variable syntax and how it differs from SCSS
- **Exercise 2: Mixins & Functions** - Understand LESS mixins, parameters, and built-in functions
- **Exercise 3: LESS-Specific Features** - Explore guarded mixins, parent selectors, and detached rulesets
- **Exercise 4: Mini Project** - Build a theme-aware component using all LESS features

## Quick Start

```bash
# Install dependencies
npm install

# Compile LESS to CSS
npm start
```

> Note that there are currently errors in some of the files -- these will be fixed as you go through the exercises.

## Why LESS?

LESS was one of the first CSS preprocessors and remains popular because:
- **Simpler syntax** - Closer to vanilla CSS, easier learning curve
- **Client-side compilation** - Can run in the browser during development (great for prototyping)
- **JavaScript integration** - Written in JavaScript, easy to extend with custom functions
- **Bootstrap legacy** - Bootstrap used LESS before switching to SCSS (many projects still use LESS)
- **Flexible approach** - Less opinionated than SCSS, multiple ways to solve problems

## LESS vs SCSS: Quick Reference

| Feature | LESS | SCSS |
|---------|------|------|
| Variables | `@color: blue;` | `$color: blue;` |
| Mixins | `.border-radius(@r) { }` | `@mixin border-radius($r) { }` |
| Using Mixins | `.border-radius(5px);` | `@include border-radius(5px);` |
| Interpolation | `@{variable}` | `#{$variable}` |
| Conditionals | `when (@a > 0)` | `@if $a > 0` |

---

## Exercise 1: Variables & Basic Syntax

**🎯 Objective:** Compare LESS and SCSS variable syntax by building a simple color theme.

### What You'll Learn: Variables
**Variables** store reusable values like colors, fonts, or spacing. They make your CSS maintainable and consistent.

**Key Differences from SCSS:**
- LESS uses `@` prefix: `@primary: blue;`
- SCSS uses `$` prefix: `$primary: blue;`
- Both compile to the same CSS output

**Why use variables?**
- **Consistency**: Change a color once, update everywhere
- **Maintainability**: Easy to update themes or branding
- **Readability**: `@primary` is clearer than `#3498db`

### Task 1A: Create Theme Variables
1. Open `exercises/exercise1.less`
2. Add theme variables using LESS syntax:
   ```less
   // LESS variables start with @
   @primary: #3498db;    // Blue
   @secondary: #2ecc71;  // Green  
   @danger: #e74c3c;     // Red
   @dark: #2c3e50;       // Dark blue-gray
   @spacing: 1rem;       // Base spacing unit
   ```

3. Create button styles using these variables
4. Run `npm run compile:ex1` to see the results
5. Open `demo.html` in your browser

### Task 1B: Variable Scope & Context
**In LESS, variables have scope** - they can be overridden in different contexts:
```less
@color: red;
.light-theme {
  @color: blue;  // Overrides for this context
  .btn { color: @color; } // Will be blue
}
```

**Pro Tip:** LESS evaluates variables "lazily" - the last definition wins, even if it comes after usage!

---

## Exercise 2: Mixins & Functions

**🎯 Objective:** Experience LESS's simpler mixin syntax and built-in functions.

### What You'll Learn: Mixins
**Mixins** are reusable blocks of CSS that can accept parameters. Think of them as "CSS functions."

**Key Differences from SCSS:**
- **LESS**: Define with `.mixin-name()`, use with `.mixin-name()`
- **SCSS**: Define with `@mixin name()`, use with `@include name()`
- **LESS is simpler**: No separate keywords, mixins look like CSS classes

**Why use mixins?**
- **DRY Principle**: Don't repeat yourself
- **Parameterization**: Customize behavior with arguments
- **Maintenance**: Update in one place, change everywhere

### Task 2A: Create Utility Mixins
Add these mixins to `exercise2.less`:
```less
// LESS mixin syntax - looks like a CSS class with parameters
.flex-center(@direction: row) {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: @direction;
}

// Mixin with multiple parameters and default values
.button-style(@bg: @primary, @size: medium) {
  background: @bg;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  // Conditional logic with guards (we'll learn more in Exercise 3)
  & when (@size = small) { padding: 0.5rem 1rem; }
  & when (@size = medium) { padding: 0.75rem 1.5rem; }
  & when (@size = large) { padding: 1rem 2rem; }

  &:hover {
    background: darken(@bg, 10%); // Built-in function!
  }
}
```

### Task 2B: LESS Built-in Functions
**Color Functions** manipulate colors mathematically:
- `lighten(@color, 20%)` - Make color lighter
- `darken(@color, 10%)` - Make color darker  
- `saturate(@color, 30%)` - Increase color intensity
- `desaturate(@color, 20%)` - Decrease color intensity
- `fade(@color, 50%)` - Add transparency (like rgba)
- `mix(@color1, @color2, 50%)` - Blend two colors

**Pro Tip:** These functions help create consistent color schemes without manually calculating hex values!

---

## Exercise 3: LESS-Specific Features

**🎯 Objective:** Explore features that make LESS unique and powerful.

### What You'll Learn: Advanced LESS Features

#### 1. Guarded Mixins (Pattern Matching)
**Guarded mixins** let you create multiple mixins with the same name that activate based on conditions. This is LESS's equivalent to SCSS's `@if` statements.

**In SCSS you'd write:**
```scss
@mixin respond-to($size) {
  @if $size == mobile {
    @media (max-width: 767px) { @content; }
  }
}
```

**In LESS you write multiple mixins:**
```less
.respond-to(@size, @rules) when (@size = mobile) {
  @media (max-width: 767px) { @rules(); }
}
.respond-to(@size, @rules) when (@size = tablet) {
  @media (min-width: 768px) and (max-width: 1023px) { @rules(); }
}
// LESS picks the right one automatically!
```

#### 2. Detached Rulesets
**Detached rulesets** are blocks of CSS wrapped in `{}` that can be passed to mixins:
```less
// Pass CSS rules as a parameter
.respond-to(mobile, {
  padding: 1rem;
  font-size: 0.9rem;
});
```

#### 3. Advanced Parent Selectors
The `&` (parent selector) in LESS is more flexible than SCSS:
```less
.card {
  background: white;
  
  // Standard nesting (same as SCSS)
  &:hover { transform: translateY(-2px); }
  
  // LESS specialty: Context-dependent styling
  .dark-theme & {
    background: @dark;
    color: white;
  }
  
  // Multiple contexts
  .mobile &, .tablet & {
    padding: 1rem;
  }
}
```

### Task 3A: Build Responsive Mixins
Create the guarded mixins shown above for responsive design.

### Task 3B: Master Parent Selectors  
Use `&` to create hover effects and theme-based styling.

---

## Exercise 4: Mini Project - Theme Switcher

**🎯 Objective:** Build a comprehensive component using all LESS features you've learned.

### What You'll Build
A sophisticated card component that demonstrates:
- **Variables**: Consistent theming values
- **Mixins**: Reusable styling patterns  
- **Guarded Mixins**: Conditional logic for themes and sizes
- **Functions**: Dynamic color manipulation
- **Parent Selectors**: Context-aware styling
- **Detached Rulesets**: Flexible responsive behavior

### Your Mission
Create a card component that:
1. **Uses variables** for consistent theming across light/dark modes
2. **Implements guarded mixins** for theme switching (light/dark/colorful)
3. **Has size variants** (compact/default/comfortable) using pattern matching
4. **Responds to context** using parent selectors (`.light-theme &`, `.dark-theme &`)
5. **Uses color functions** for hover states and variations
6. **Includes responsive behavior** with detached rulesets

### Key LESS Concepts in Action
- **Pattern Matching**: Multiple `.theme-style()` mixins for different themes
- **Default Guards**: `when (default())` for fallback behavior
- **Color Functions**: `lighten()`, `darken()`, `fade()` for dynamic theming
- **Context Styling**: Theme classes change component appearance

**Starter code with detailed TODOs is in `exercises/exercise4.less`**

---

## What You've Learned

### Core Concepts
✅ **Variables:** `@primary` vs `$primary` - LESS uses @ prefix  
✅ **Mixins:** `.mixin()` vs `@mixin/@include` - LESS syntax is simpler  
✅ **Functions:** Built-in color manipulation (`darken`, `lighten`, `fade`)  
✅ **Nesting:** Same as SCSS, with more flexible parent selector (`&`)

### LESS-Specific Features  
✅ **Guarded Mixins:** Pattern matching with `when` conditions - more elegant than `@if`  
✅ **Detached Rulesets:** Pass CSS blocks as parameters `{}`  
✅ **Lazy Evaluation:** Variables evaluated at compile time, last definition wins  
✅ **Context-Aware Styling:** `.parent &` for responsive, theme-aware components

### When to Choose LESS vs SCSS
**Choose LESS when:**
- Team prefers CSS-like syntax (lower learning curve)
- Need client-side compilation for rapid prototyping  
- Working with Bootstrap-based projects (legacy)
- Want flexible, less opinionated approach

**Choose SCSS when:**
- Need advanced control structures (`@for`, `@each`, `@while`)
- Want stricter, more structured approach
- Working with Angular, Vue, or React (better tooling integration)
- Team has strong Sass background

## Next Steps

- Try LESS in a real project alongside a framework like Bootstrap
- Explore LESS plugins and advanced features
- Consider when LESS vs SCSS makes sense for your team/project
