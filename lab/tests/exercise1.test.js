// lab/tests/exercise1.test.js

const { read, stripComments, compile, compileWithEdits, allRules } = require('./helpers');

const code = stripComments(read('exercise1.less'));
const usages = (name) =>
  (code.match(new RegExp(`${name}(?![\\w-])(?!\\s*:)`, 'g')) || []).length;

describe('TASK 1C: Define Variables', () => {
  test('define @brand-color: #16a085 and @brand-color-dark: #138d75', () => {
    expect(code).toMatch(/@brand-color\s*:\s*#16a085\s*;/i);
    expect(code).toMatch(/@brand-color-dark\s*:\s*#138d75\s*;/i);
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

  test('every original rule still compiles (none deleted while replacing colors)', async () => {
    const css = await compile(read('exercise1.less'), 'exercise1.less');
    const selectors = [
      '.header', '.logo', '.nav-link', '.nav-link:hover', '.nav-link.active',
      '.btn', '.btn-primary', '.btn-primary:hover', '.btn-outline', '.btn-outline:hover',
      '.card', '.card-title', '.link', '.link:hover', '.alert-info',
      '.progress-bar', '.progress-fill',
    ];
    for (const selector of selectors) {
      expect([selector, allRules(css, selector)]).not.toEqual([selector, '']);
    }
    // Also require the new color, so the untouched starter file doesn't pass.
    expect(allRules(css, '.header')).toMatch(/background:\s*#16a085/i);
  });

  test('the shades and opacities compile to the right values', async () => {
    const css = await compile(read('exercise1.less'), 'exercise1.less');
    expect(allRules(css, '.nav-link:hover')).toMatch(/background:\s*rgba\(22,\s*160,\s*133,\s*0\.1\)/);
    expect(allRules(css, '.nav-link.active')).toMatch(/box-shadow:[^;]*rgba\(22,\s*160,\s*133,\s*0\.3\)/);
    expect(allRules(css, '.alert-info')).toMatch(/background:\s*rgba\(22,\s*160,\s*133,\s*0\.1\)/);
    expect(allRules(css, '.btn-primary:hover')).toMatch(/background:\s*#138d75/i);
    expect(allRules(css, '.link:hover')).toMatch(/color:\s*#138d75/i);
    expect(allRules(css, '.progress-fill')).toMatch(/linear-gradient\(90deg,\s*#16a085,\s*#138d75\)/i);
  });
});

describe('TASK 1E: Variable Power', () => {
  test('changing the two variables re-colors the whole compiled stylesheet', async () => {
    const css = await compileWithEdits('exercise1.less', {
      'exercise1.less': (src) =>
        stripComments(src)
          .replace(/@brand-color\s*:\s*#16a085/gi, '@brand-color: #e67e22')
          .replace(/@brand-color-dark\s*:\s*#138d75/gi, '@brand-color-dark: #d35400'),
    });
    expect(css).toContain('#e67e22');
    expect(css).toContain('#d35400');
    expect(css).not.toContain('#16a085');
    expect(css).not.toContain('#138d75');
    expect(css).not.toContain('#c0392b');
  });

  test('exercise1.less compiles and the header uses the teal brand color', async () => {
    const css = await compile(read('exercise1.less'), 'exercise1.less');
    expect(css).toMatch(/\.header\s*\{[^}]*background:\s*#16a085/i);
  });
});
