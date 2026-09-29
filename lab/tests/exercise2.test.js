// lab/tests/exercise2.test.js

const { read, stripComments, compile, compileWithEdits, rule, allRules } = require('./helpers');

const source = read('exercise2.less');
const code = stripComments(source);

const COLORS = { primary: '#16a085', secondary: '#2ecc71', danger: '#e74c3c' };
const SIZES = {
  small: { padding: '0.5rem 1rem', fontSize: '0.8rem' },
  medium: { padding: '0.75rem 1.5rem', fontSize: '0.9rem' },
  large: { padding: '1rem 2rem', fontSize: '1.1rem' },
};
const BUTTONS = Object.keys(COLORS).flatMap((c) => Object.keys(SIZES).map((s) => [c, s]));

// The source block of one button class, e.g. ".btn-primary-small { ... }".
const block = (name) => {
  const match = code.match(new RegExp(`\\.${name}\\s*\\{([^}]*)\\}`));
  return match ? match[1] : '';
};

describe('TASK 2A: Rounded corners on every button', () => {
  test('all 9 buttons compile with border-radius: 12px (none left at 4px)', async () => {
    const css = await compile(source, 'exercise2.less');
    for (const [color, size] of BUTTONS) {
      const declarations = rule(css, `.btn-${color}-${size}`);
      expect(declarations).toMatch(/border-radius:\s*12px/);
      expect(declarations).not.toMatch(/border-radius:\s*4px/);
    }
  });
});

describe('TASK 2C: Define Mixins', () => {
  test('define a .button-base(@bg-color ...) mixin', () => {
    expect(code).toMatch(/\.button-base\s*\(\s*@bg-color[^)]*\)\s*\{/);
  });

  test('define size mixins .button-small(), .button-medium() and .button-large()', () => {
    for (const size of Object.keys(SIZES)) {
      expect(code).toMatch(new RegExp(`\\.button-${size}\\s*\\(\\s*\\)\\s*\\{`));
    }
  });
});

describe('TASK 2D: Refactor with Mixins', () => {
  test('all 9 buttons call .button-base(...) and their size mixin', () => {
    for (const [color, size] of BUTTONS) {
      const body = block(`btn-${color}-${size}`);
      expect(body).toMatch(/\.button-base\s*\([^)]*\)\s*;/);
      expect(body).toMatch(new RegExp(`\\.button-${size}\\s*\\(\\s*\\)\\s*;`));
    }
  });

  test('no repeated properties left inside the button classes', () => {
    for (const [color, size] of BUTTONS) {
      const body = block(`btn-${color}-${size}`);
      expect(body).not.toMatch(/border\s*:\s*none/);
      expect(body).not.toMatch(/cursor\s*:\s*pointer/);
      expect(body).not.toMatch(/transition\s*:/);
    }
  });

  test('buttons still compile with the right color, size, shadow and hover', async () => {
    const css = await compile(source, 'exercise2.less');
    for (const [color, size] of BUTTONS) {
      const declarations = rule(css, `.btn-${color}-${size}`);
      expect(declarations).toContain(`background: ${COLORS[color]}`);
      expect(declarations).toContain(`padding: ${SIZES[size].padding}`);
      expect(declarations).toContain(`font-size: ${SIZES[size].fontSize}`);
      expect(declarations).toMatch(/box-shadow:\s*0 1px 3px rgba\(0,\s*0,\s*0,\s*0\.1\)/);
      expect(allRules(css, `.btn-${color}-${size}:hover`)).toMatch(/background:\s*#[0-9a-f]{6}/);
    }
  });
});

describe('TASK 2E: Test Mixin Power', () => {
  test('a .btn-warning-medium button (#f39c12) built from the mixins', async () => {
    const css = await compile(source, 'exercise2.less');
    const declarations = rule(css, '.btn-warning-medium');
    expect(declarations).toContain('background: #f39c12');
    expect(declarations).toContain('padding: 0.75rem 1.5rem');
  });

  test('changing border-radius once in .button-base() updates all 9 buttons', async () => {
    // After the refactor, 12px should appear in exactly one place: the mixin.
    expect((code.match(/border-radius\s*:\s*12px/g) || []).length).toBe(1);
    const css = await compileWithEdits('exercise2.less', {
      'exercise2.less': (src) => stripComments(src).replace(/border-radius\s*:\s*12px/, 'border-radius: 20px'),
    });
    for (const [color, size] of BUTTONS) {
      expect(rule(css, `.btn-${color}-${size}`)).toMatch(/border-radius:\s*20px/);
    }
  });
});
