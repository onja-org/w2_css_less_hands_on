# LESS CSS Lab - Instructor Guide

## Overview
This 1-hour hands-on lab introduces students to LESS CSS as an alternative to SCSS. Students have ~3 hours of SCSS experience prior to this lesson.

## Learning Objectives
- Understand LESS syntax differences from SCSS
- Experience LESS-specific features (guarded mixins, parent selector flexibility)
- Gain situational awareness of when to choose LESS vs SCSS
- Build confidence with CSS preprocessor concepts

## Timing Breakdown
- **Setup** (5 min): `npm install` and first compilation
- **Exercise 1** (15 min): Variables and basic syntax comparison
- **Exercise 2** (15 min): Mixins and built-in functions
- **Exercise 3** (15 min): LESS-specific features (guarded mixins)
- **Exercise 4** (10 min): Mini project - theme switcher component

## Key Teaching Points

### Exercise 1: Variables & Basic Syntax
- **Focus**: Syntax differences (`@` vs `$`)
- **Demo**: Show compiled output is identical
- **Discussion**: "Why different syntax if output is the same?"

### Exercise 2: Mixins & Functions
- **Focus**: Mixin syntax (`.mixin()` vs `@include`)
- **Highlight**: LESS color functions (`fade()`, `saturate()`)
- **Demo**: Live editing with `npm run watch:all`

### Exercise 3: LESS-Specific Features
- **Key Concept**: Guarded mixins (multiple mixins with same name)
- **Comparison**: Show SCSS equivalent with `@if/@else`
- **Discussion**: When might guarded mixins be clearer?

### Exercise 4: Mini Project
- **Goal**: Synthesize all concepts
- **Approach**: Let students work independently, circulate for help
- **Demo**: Show theme switching in browser

## Common Questions

**"When would I use LESS over SCSS?"**  
- Simpler projects requiring less complexity
- Teams preferring CSS-like syntax
- Client-side compilation needs
- Existing LESS codebases

**"Is LESS still relevant?"**  
- Yes, still maintained and used in many projects
- Bootstrap used LESS before SCSS
- Good to understand ecosystem options

## Troubleshooting

### Compilation Issues
- Check file imports are correct
- Ensure variables are defined before use
- Watch for missing semicolons

### Watch Command Not Working
```bash
# Alternative watch setup
npm run compile:all
# Then manually recompile after changes
```

### Demo Not Updating
- Check browser cache (hard refresh)
- Verify CSS files are being generated
- Ensure HTML links are correct

## Solution Files
Complete solutions are in `/solutions/` directory:
- `exercise1-solution.less`
- `exercise4-solution.less`

## Extension Activities
If students finish early:
1. Experiment with LESS mathematical operations
2. Try nested media queries
3. Explore LESS string interpolation
4. Create additional theme variants

## Assessment
Students should be able to:
- Convert basic SCSS variables to LESS syntax
- Create simple mixins using LESS syntax
- Explain one advantage of guarded mixins
- Identify when LESS might be chosen over SCSS