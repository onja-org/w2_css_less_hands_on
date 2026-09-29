// lab/tests/helpers.js — shared helpers for the LESS exercise tests (don't edit)

const fs = require('fs');
const os = require('os');
const path = require('path');
const less = require('less');

const EXERCISES = path.join(__dirname, '../exercises');

// Read a file from lab/exercises/ ('' if it doesn't exist yet).
function read(relPath) {
  const file = path.join(EXERCISES, relPath);
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
}

// Remove /* block */ and // line comments, so the teaching text and
// commented-out examples in the starter files never count as student code.
function stripComments(code) {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/.*$/gm, '$1');
}

// Compile LESS source as if it lived at lab/exercises/<relPath>, so its
// @import paths resolve the same way `npm run compile:exN` resolves them.
// Comments are stripped from the output.
async function compile(source, relPath) {
  const result = await less.render(source, {
    filename: path.join(EXERCISES, relPath),
  });
  return stripComments(result.css);
}

// Copy lab/exercises/ to a temp folder, apply edits ({ relPath: fn(content) }),
// then compile <entry> from the copy. Used to test "change one value, see it
// update everywhere" without touching the student's files.
async function compileWithEdits(entry, edits) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'less-lab-'));
  try {
    fs.cpSync(EXERCISES, dir, { recursive: true });
    for (const [relPath, edit] of Object.entries(edits)) {
      const file = path.join(dir, relPath);
      fs.writeFileSync(file, edit(fs.readFileSync(file, 'utf8')));
    }
    const result = await less.render(fs.readFileSync(path.join(dir, entry), 'utf8'), {
      filename: path.join(dir, entry),
    });
    return stripComments(result.css);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

// The declarations of the first top-level rule for `selector` in compiled CSS.
function rule(css, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = css.match(new RegExp(`(^|\\n)${escaped}\\s*\\{([^}]*)\\}`));
  return match ? match[2] : '';
}

// Every declaration block for `selector` in compiled CSS, joined together.
function allRules(css, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`(^|\\n)${escaped}\\s*\\{([^}]*)\\}`, 'g');
  return [...css.matchAll(re)].map((m) => m[2]).join('\n');
}

module.exports = { read, stripComments, compile, compileWithEdits, rule, allRules };
