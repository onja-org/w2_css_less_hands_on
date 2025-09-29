# LESS CSS Hands-On Lab

A practical workshop designed to teach CSS preprocessors through- Integrate LESS compilation into development workflows

## Project Structure

```-world problems and solutions.

## Overview

This lab takes a **problem-first approach** to learning CSS preprocessors. Instead of jumping straight into syntax, you'll first experience the real maintenance nightmares that make preprocessors essential in professional web development.

**Duration:** ~2 hours  
**Prerequisites:** Basic knowledge of SCSS from previous lessons

## What You'll Learn

By completing this lab, you'll understand:

- **Why** CSS preprocessors exist and when they become essential
- **What problems** variables, mixins, and partials actually solve in real projects  
- How LESS syntax compares to SCSS you already know
- How preprocessors fit into professional web development workflows
- When to choose LESS over other preprocessors

## Lab Structure

The lab consists of three main exercises that build upon each other:

### Exercise 1: The Color Nightmare
Experience the maintenance hell of changing colors across a stylesheet manually, then discover how LESS variables provide a single source of truth.

**Problem:** Client wants to change brand color from terracotta to teal across entire site  
**Learning:** Variables aren't just convenient - they're essential for maintainable CSS

### Exercise 2: The Button Factory Hell  
Feel the pain of repetitive CSS patterns when updating dozens of similar button components, then solve it with LESS mixins.

**Problem:** Update border-radius across 9+ nearly identical button classes  
**Learning:** Mixins eliminate repetitive patterns and make scalable CSS possible

### Exercise 3: The 2000-Line Monster
Navigate an unorganized stylesheet chaos to find specific components, then solve it with LESS partials and imports.

**Problem:** Hunt through a massive single-file stylesheet to find one component  
**Learning:** Partials organize code into logical, maintainable files for team development

## Quick Start

```bash
# Install dependencies (run from project root)
npm install

# Compile LESS to CSS and open demo
npm start
```

> **Note:** Some files contain intentional errors that you'll fix during the exercises.

## Available Commands

From the project root directory:

```bash
npm run compile:ex1    # Compile exercise 1 only
npm run compile:ex2    # Compile exercise 2 only  
npm run compile:ex3    # Compile exercise 3 only
npm run compile:all    # Compile all exercises
npm run watch:less     # Watch for changes and auto-compile
npm start              # Compile all and prepare demo
```

## Why LESS?

LESS remains popular in web development because:

- **Simpler syntax** - Closer to vanilla CSS with easier learning curve
- **Client-side compilation** - Can run in browser during development  
- **JavaScript integration** - Written in JavaScript, easy to extend
- **Bootstrap legacy** - Many projects still use LESS from Bootstrap's legacy
- **Flexible approach** - Less opinionated than SCSS

## Learning Outcomes

After completing this lab, you'll be able to:

✅ Identify when CSS preprocessors become essential (file size, team size, repetition)  
✅ Use LESS variables, mixins, and partials to solve real maintenance problems  
✅ Organize stylesheets for professional team development  
✅ Choose the right preprocessor for different project needs  
✅ Integrate LESS compilation into development workflows

## 📁 Project Structure

```
├── package.json        # Build scripts and dependencies  
├── .gitignore         # Git ignore patterns
└── lab/
    ├── demo.html      # Demo page to test your solutions
    ├── README.md      # Detailed exercise instructions
    ├── exercises/     # LESS exercise files
    │   ├── exercise1.less  # Variables exercise
    │   ├── exercise2.less  # Mixins exercise
    │   └── exercise3.less  # Partials exercise
    └── resources/     # Reference images
        ├── less_ex_1.png
        ├── less_ex_2.png
        └── less_ex_3.png
```

## Additional Resources

- [LESS Documentation](https://lesscss.org/)
- [LESS vs SCSS Comparison](https://lesscss.org/features/#features-overview-feature)
- [CSS Preprocessor Comparison Guide](https://sass-lang.com/guide)

---

**Ready to start?** Check the `lab/README.md` for detailed exercise instructions!