// lab/tests/exercise3.test.js

const { read, stripComments, compile, compileWithEdits, allRules } = require('./helpers');

const source = read('exercise3.less');
const main = stripComments(source);
const cards = stripComments(read('partials/_cards.less'));
const buttons = stripComments(read('partials/_buttons.less'));

const VARIANTS = ['card-small', 'card-large', 'card-featured', 'card-sale'];

// The .card block from exercise 3 (not the one imported from exercise 1),
// recognisable by its 1px #e0e0e0 border.
const cardBlocks = (css) =>
  [...css.matchAll(/(^|\n)\.card\s*\{([^}]*)\}/g)]
    .map((m) => m[2])
    .filter((body) => /border:\s*1px solid #e0e0e0/.test(body));

describe('TASK 3A: The Search Mission', () => {
  test('the .card component compiles with border-radius: 8px', async () => {
    const css = await compile(source, 'exercise3.less');
    const blocks = cardBlocks(css);
    expect(blocks.length).toBeGreaterThan(0);
    for (const body of blocks) {
      expect(body).toMatch(/border-radius:\s*8px/);
    }
  });
});

describe('TASK 3D: Organize with Partials', () => {
  test('partials/_cards.less holds the card component and its variants', () => {
    expect(cards).toMatch(/(^|\n)\s*\.card\s*\{[^}]*border-radius\s*:\s*8px/);
    for (const name of ['card-title', 'card-price', ...VARIANTS]) {
      expect(cards).toMatch(new RegExp(`\\.${name}\\s*\\{`));
    }
  });

  test('partials/_buttons.less holds the button styles', () => {
    for (const name of ['btn', 'btn-primary', 'btn-secondary', 'btn-outline']) {
      expect(buttons).toMatch(new RegExp(`(^|\\n)\\s*\\.${name}\\s*\\{`));
    }
  });

  test('exercise3.less imports both partials', () => {
    expect(main).toMatch(/@import\s*["']partials\/_cards(\.less)?["']\s*;/);
    expect(main).toMatch(/@import\s*["']partials\/_buttons(\.less)?["']\s*;/);
  });

  test('the card and button code was moved out of exercise3.less, not copied', () => {
    // Top-level rules only — the .card override inside @media stays here.
    expect(main).not.toMatch(/(^|\n)\.card(-[a-z]+)?\s*\{/);
    expect(main).not.toMatch(/(^|\n)\.btn(-[a-z]+)?\s*\{/);
  });

  test('card variants reuse .card() and do not hard-code border-radius', () => {
    for (const name of VARIANTS) {
      const body = (cards.match(new RegExp(`\\.${name}\\s*\\{([^}]*)\\}`)) || [])[1] || '';
      expect(body).toMatch(/\.card\s*(\(\s*\))?\s*;/);
      expect(body).not.toMatch(/border-radius/);
    }
  });

  test('exercise3.less compiles from the partials with the same styles', async () => {
    expect(cards).not.toBe('');
    expect(buttons).not.toBe('');
    const css = await compile(source, 'exercise3.less');
    expect(cardBlocks(css).join('\n')).toMatch(/padding:\s*1\.5rem/);
    expect(allRules(css, '.btn-outline')).toMatch(/border:\s*2px solid #16a085/);
    expect(allRules(css, '.card-featured')).toMatch(/border:\s*2px solid #16a085/);
    expect(allRules(css, '.hero')).toMatch(/linear-gradient/);
  });
});

describe('TASK 3E: Partials Power', () => {
  test('changing border-radius once in _cards.less updates every card variant', async () => {
    expect(cards).not.toBe('');
    const css = await compileWithEdits('exercise3.less', {
      'partials/_cards.less': (src) =>
        stripComments(src).replace(
          /((^|\n)\s*\.card\s*\{[^}]*?border-radius\s*:\s*)8px/,
          '$116px'
        ),
    });
    expect(cardBlocks(css).join('\n')).toMatch(/border-radius:\s*16px/);
    for (const name of VARIANTS) {
      expect(allRules(css, `.${name}`)).toMatch(/border-radius:\s*16px/);
    }
  });
});
