# LESS CSS Tutorial

Welcome to the LESS CSS tutorial! This tutorial is designed to help you get started with LESS CSS, focusing on the differences between LESS and SASS.

## Table of Contents

1. [Introduction](#introduction)
2. [Key Differences](#key-differences)
3. [Setup](#setup)
4. [Basic Concepts](#basic-concepts)
5. [Advanced Features](#advanced-features)
6. [Exercises](#exercises)
7. [Conclusion](#conclusion)

## Introduction

### Purpose of the Tutorial
- This tutorial aims to introduce you to the LESS CSS preprocessor and highlight its key differences from SASS.
- By the end of this tutorial, you should be able to write basic LESS code and understand how to use its features effectively.

### Overview of LESS and SASS
- **LESS (Leaner Style Sheets)**:
  - A CSS preprocessor that extends CSS with dynamic behavior such as variables, mixins, operations, and functions.
  - Compiled into standard CSS before being sent to the browser.
- **SASS (Syntactically Awesome Style Sheets)**:
  - Another CSS preprocessor with similar features but different syntax.
  - Supports two syntaxes: SCSS (Sassy CSS) and indented syntax.

## Key Differences

### Syntax

- **Variable Declaration**
  - **LESS**: `@variable: value;`
  - **SASS**: `$variable: value;`

- **Mixins**
  - **LESS**: Uses `.mixin()`
  - **SASS**: Uses `@mixin`

- **Interpolation**
  - **LESS**: Uses `~"@{variable}"`
  - **SASS**: Uses `#{$variable}`

- **Importing**
  - Both support `@import`, but LESS is case-insensitive.

- **Operations**
  - Both support arithmetic operations, but LESS uses `@variable * 2` while SASS uses `$variable * 2`.

## Setup

### Installation

- **Install Node.js and npm**:
  - Download and install Node.js from [nodejs.org](https://nodejs.org/).
  - npm (Node Package Manager) comes bundled with Node.js.

- **Clone the repository**:
  ```bash
  git clone <repository-url>
  cd w2_css_less_tutorial
  ```

- **Install dependencies locally**:
  ```bash
  npm install
  ```

### Basic Configuration

- **Example LESS file and compilation command**:
  ```bash
  echo "// LESS Variables\n@primary-color: #3498db;\n@font-size: 16px;\n\nbody {\n  color: @primary-color;\n  font-size: @font-size;\n}\n" > exercises/exercise1.less
  npm run compile-less
  ```

- **Example SASS file and compilation command**:
  ```bash
  echo "// SASS Variables\n\$primary-color: #3498db;\n\$font-size: 16px;\n\nbody {\n  color: \$primary-color;\n  font-size: \$font-size;\n}\n" > exercises/exercise1.scss
  npm run compile-sass
  ```

## Basic Concepts

### Variables

- **LESS**:
  ```less
  @primary-color: #3498db;
  body {
    color: @primary-color;
  }
  ```

- **SASS**:
  ```scss
  $primary-color: #3498db;
  body {
    color: $primary-color;
  }
  ```

### Mixins

- **LESS**:
  ```less
  .border-radius(@radius) {
    -webkit-border-radius: @radius;
       -moz-border-radius: @radius;
            border-radius: @radius;
  }

  .box {
    .border-radius(10px);
  }
  ```

- **SASS**:
  ```scss
  @mixin border-radius($radius) {
    -webkit-border-radius: $radius;
       -moz-border-radius: $radius;
            border-radius: $radius;
  }

  .box {
    @include border-radius(10px);
  }
  ```

### Importing

- Both:
  ```less
  @import "variables";
  ```

### Operations

- **LESS**:
  ```less
  @base-font-size: 16px;
  h1 {
    font-size: @base-font-size * 2;
  }
  ```

- **SASS**:
  ```scss
  $base-font-size: 16px;
  h1 {
    font-size: $base-font-size * 2;
  }
  ```

## Advanced Features

### Guarded Mixins

- **LESS**:
  ```less
  .mixin (@a) when (@a = true) {
    background-color: black;
  }
  .mixin (@a) when (@a = false) {
    background-color: white;
  }

  .element {
    .mixin(true);
  }
  ```

- **SASS**:
  ```scss
  @mixin mixin($a) {
    @if $a == true {
      background-color: black;
    } @else {
      background-color: white;
    }
  }

  .element {
    @include mixin(true);
  }
  ```

## Exercises

### Exercise 1: Basic Variables

- **Objective**: Create a LESS file and a SASS file with the same variables for colors and fonts.
- **Instructions**:
  1. Create `exercise1.less` and `exercise1.scss` in the `exercises` directory.
  2. Define variables for `primary-color` and `font-size`.
  3. Use these variables to style the `body` element.
  4. Compile both files to CSS using the respective commands:
     - LESS: `npm run compile-less`
     - SASS: `npm run compile-sass`
  5. Compare the resulting CSS files.

### Exercise 2: Mixins

- **Objective**: Create a mixin for border-radius in both LESS and SASS.
- **Instructions**:
  1. Create `exercise2.less` and `exercise2.scss` in the `exercises` directory.
  2. Define a mixin for `border-radius`.
  3. Use the mixin in a CSS class.
  4. Compile both files to CSS using the respective commands:
     - LESS: `npm run compile-less`
     - SASS: `npm run compile-sass`
  5. Compare the resulting CSS files.

### Exercise 3: Guarded Mixins

- **Objective**: Implement a guarded mixin in LESS and a conditional mixin in SASS.
- **Instructions**:
  1. Create `exercise3.less` and `exercise3.scss` in the `exercises` directory.
  2. Define a guarded mixin in LESS and a conditional mixin in SASS.
  3. Test both by passing different values.
  4. Compile both files to CSS using the respective commands:
     - LESS: `npm run compile-less`
     - SASS: `npm run compile-sass`
  5. Compare the resulting CSS files.

## Conclusion

- **Recap**:
  - Reviewed key differences between LESS and SASS.
  - Practiced writing basic LESS code.
  - Compared the output of compiled CSS files.

- **Encouragement**:
  - Practice regularly to become proficient with LESS.
  - Explore more advanced features and techniques.
  - Join communities and forums for further learning.