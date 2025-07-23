# LESS CSS Hands-On Lab (1 Hour)

**🎯 Goal:** Get familiar with LESS as an alternative to SCSS through hands-on practice  
**⏱️ Duration:** ~60 minutes  
**📚 Prerequisites:** Basic knowledge of SCSS from previous lessons

## What You'll Learn

By the end of this lab, you'll understand:
- How LESS differs from SCSS syntactically
- When you might choose LESS over SCSS in real projects  
- Key LESS-specific features that make it unique
- How LESS fits into the broader frontend tooling ecosystem

## Lab Structure

- **Setup** (5 min)
- **Exercise 1: Variables & Basic Syntax** (15 min)
- **Exercise 2: Mixins & Functions** (15 min) 
- **Exercise 3: LESS-Specific Features** (15 min)
- **Exercise 4: Mini Project** (10 min)

## Quick Start

```bash
# Install dependencies
npm install

# Start watching files (we'll use this throughout)
npm run watch-all
```

## Why LESS?

LESS was one of the first CSS preprocessors and remains popular because:
- **Simpler syntax** - Closer to vanilla CSS
- **Client-side compilation** - Can run in the browser during development
- **JavaScript integration** - Written in JavaScript, easy to extend
- **Bootstrap legacy** - Bootstrap used LESS before switching to SCSS

## LESS vs SCSS: Quick Reference

| Feature | LESS | SCSS |
|---------|------|------|
| Variables | `@color: blue;` | `$color: blue;` |
| Mixins | `.border-radius(@r) { }` | `@mixin border-radius($r) { }` |
| Using Mixins | `.border-radius(5px);` | `@include border-radius(5px);` |
| Interpolation | `@{variable}` | `#{$variable}` |
| Conditionals | `when (@a > 0)` | `@if $a > 0` |

---

## Exercise 1: Variables & Basic Syntax (15 min)

**🎯 Objective:** Compare LESS and SCSS variable syntax by building a simple color theme.

### Task 1A: Create Theme Variables
1. Open `exercises/exercise1.less` and `exercises/exercise1.scss`
2. Add theme variables to both files:
   ```less
   // LESS version
   @primary: #3498db;
   @secondary: #2ecc71;
   @danger: #e74c3c;
   @dark: #2c3e50;
   @spacing: 1rem;
   ```

3. Apply these to create a simple button theme
4. Run `npm run compile:ex1` to see the results
5. Open `demo.html` in your browser

### Task 1B: Spot the Differences
- Compare the compiled CSS from both preprocessors
- Notice: Are there any differences in output? Why or why not?

---

## Exercise 2: Mixins & Functions (15 min)

**🎯 Objective:** Experience LESS's simpler mixin syntax and built-in functions.

### Task 2A: Create Utility Mixins
Add these mixins to `exercise2.less`:
```less
// Flexbox center mixin
.flex-center(@direction: row) {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: @direction;
}

// Button style mixin
.button-style(@bg: @primary, @size: medium) {
  background: @bg;
  border: none;
  padding: when(@size=small, 0.5rem 1rem, 0.75rem 1.5rem);
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: darken(@bg, 10%);
  }
}
```

### Task 2B: Use LESS Built-in Functions
Experiment with these LESS color functions:
- `lighten(@color, 20%)`
- `darken(@color, 10%)`
- `saturate(@color, 30%)`
- `fade(@color, 50%)`

---

## Exercise 3: LESS-Specific Features (15 min)

**🎯 Objective:** Explore features that make LESS unique.

### Task 3A: Guarded Mixins (LESS's version of conditionals)
```less
// Responsive breakpoint mixin
.respond-to(@size) when (@size = mobile) {
  @media (max-width: 767px) { @content(); }
}
.respond-to(@size) when (@size = tablet) {
  @media (min-width: 768px) and (max-width: 1023px) { @content(); }
}
.respond-to(@size) when (@size = desktop) {
  @media (min-width: 1024px) { @content(); }
}
```

### Task 3B: Parent Selector Magic
Create hover effects and state variations:
```less
.card {
  background: white;
  padding: 1rem;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  .dark-theme & {
    background: @dark;
    color: white;
  }
}
```

---

## Exercise 4: Mini Project - Theme Switcher (10 min)

**🎯 Objective:** Build a component with light/dark theme using LESS.

### Your Mission
Create a card component that:
1. Uses LESS variables for theming
2. Has different styles for `.light-theme` and `.dark-theme` contexts
3. Uses mixins for reusable button styles
4. Includes hover animations using LESS functions

**Starter code is in `exercises/exercise4.less`**

---

## What You've Learned

✅ **Syntax Differences:** `@` vs `$`, `.mixin()` vs `@include`  
✅ **LESS Advantages:** Simpler syntax, guarded mixins, parent selector flexibility  
✅ **When to Choose LESS:** Simpler projects, teams preferring CSS-like syntax, client-side compilation needs  
✅ **Ecosystem Fit:** Understanding preprocessor choices in different frameworks

## Next Steps

- Try LESS in a real project alongside a framework like Bootstrap
- Explore LESS plugins and advanced features
- Consider when LESS vs SCSS makes sense for your team/project
