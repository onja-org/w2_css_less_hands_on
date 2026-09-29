// lab/tests/exercise1.test.js

const { read, stripComments, compile, compileWithEdits } = require('./helpers');

const code = stripComments(read('exercise1.less'));
const usages = (name) =>
  (code.match(new RegExp(`${name}(?![\\w-])(?!\\s*:)`, 'g')) || []).length;

describe('TASK 1C: Define Variables', () => {
  test('define @brand-color: #16a085 and @brand-color-dark: #138d75', () => {
    expect(code).toMatch(/@brand-color\s*:\s*#16a085\s*;/);
    expect(code).toMatch(/@brand-color-dark\s*:\s*#138d75\s*;/);
  });
});

describe('TASK 1D: Use Variables', () => {
  test('no hard-coded brand colors left (old terracotta or new teal)', () => {
    const withoutDefinitions = code
      .replace(/@brand-color\s*:[^;]*;/, '')
      .replace(/@brand-color-dark\s*:[^;]*;/, '');
    for (const hex of ['#c0392b', '#a93226', '#16a085', '#138d75']) {
      expect(withoutDefinitions.toLowerCase()).not.toContain(hex);
    }
  });

  test('no hard-coded brand rgba() values — use fade() instead', () => {
    expect(code).not.toMatch(/rgba\(\s*192\s*,\s*57\s*,\s*43/);
    expect(code).not.toMatch(/rgba\(\s*22\s*,\s*160\s*,\s*133/);
    expect(code).toMatch(/fade\(\s*@brand-color\s*,\s*10%\s*\)/);
  });

  test('@brand-color is used throughout the stylesheet (at least 12 places)', () => {
    expect(usages('@brand-color')).toBeGreaterThanOrEqual(12);
  });

  test('@brand-color-dark is used for the darker shades (at least 3 places)', () => {
    expect(usages('@brand-color-dark')).toBeGreaterThanOrEqual(3);
  });
});

describe('TASK 1E: Variable Power', () => {
  test('changing the two variables re-colors the whole compiled stylesheet', async () => {
    const css = await compileWithEdits('exercise1.less', {
      'exercise1.less': (src) =>
        stripComments(src)
          .replace(/@brand-color\s*:\s*#16a085/g, '@brand-color: #e67e22')
          .replace(/@brand-color-dark\s*:\s*#138d75/g, '@brand-color-dark: #d35400'),
    });
    expect(css).toContain('#e67e22');
    expect(css).toContain('#d35400');
    expect(css).not.toContain('#16a085');
    expect(css).not.toContain('#138d75');
    expect(css).not.toContain('#c0392b');
  });

  test('exercise1.less compiles and the header uses the teal brand color', async () => {
    const css = await compile(read('exercise1.less'), 'exercise1.less');
    expect(css).toMatch(/\.header\s*\{[^}]*background:\s*#16a085/);
  });
});
