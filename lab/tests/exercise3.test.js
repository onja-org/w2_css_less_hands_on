// lab/tests/exercise3.test.js

const fs = require('fs');
const path = require('path');
const less = require('less');

const lessContent = fs.readFileSync(
  path.join(__dirname, '../exercises/exercise3.less'),
  'utf8'
);

describe('TASK 3A: Manual Search and Update', () => {
  test('TASK 3A: update .card border-radius from 4px to 8px', () => {
    expect(lessContent).toMatch(/\.card\s*\{[^}]*border-radius\s*:\s*8px/);
    expect(lessContent).not.toContain('border-radius: 4px');
  });
});

describe('TASK 3C: Understand Partials', () => {
  test('TASK 3C: imports exercise1.less for variables', () => {
    expect(lessContent).toMatch(/@import\s*['"]exercise1\.less['"]/);
  });

  test('TASK 3C: imports exercise2.less for mixins', () => {
    expect(lessContent).toMatch(/@import\s*['"]exercise2\.less['"]/);
  });
});

describe('TASK 3D: Organize with Partials', () => {
  test('TASK 3D: .card styles remain intact after organization', async () => {
    const result = await less.render(lessContent);
    const css = result.css;

    expect(css).toMatch(/\.card\s*\{[^}]*border-radius:\s*8px/);
    expect(css).toMatch(/\.card\s*\{[^}]*background:\s*white/);
    expect(css).toMatch(/\.card\s*\{[^}]*padding:\s*1\.5rem/);
    expect(css).toMatch(/\.card\s*\{[^}]*box-shadow:\s*0\s+2px\s+10px\s+rgba\(0,0,0,0\.1\)/);
    expect(css).toMatch(/\.card\s*\{[^}]*border:\s*1px\s+solid\s+#e0e0e0/);
  });

  test('TASK 3D: card variants use .card mixin correctly', () => {
    expect(lessContent).toMatch(/\.card-small\s*\{[^}]*\.card;/);
    expect(lessContent).toMatch(/\.card-large\s*\{[^}]*\.card;/);
    expect(lessContent).toMatch(/\.card-featured\s*\{[^}]*\.card;/);
    expect(lessContent).toMatch(/\.card-sale\s*\{[^}]*\.card;/);
  });

  test('TASK 3D: NO hardcoded border-radius in card variants', () => {
    const withoutComments = lessContent.replace(/\/\*[\s\S]*?\*\//g, '');
    expect(withoutComments).not.toMatch(/\.card-(small|large|featured|sale)\s*\{[^}]*border-radius/);
  });
});

describe('TASK 3D: Partials Power', () => {
  test('TASK 3D: compiles with imported partials correctly', async () => {
    const result = await less.render(lessContent);
    const css = result.css;

    // Check for variables from exercise1.less
    expect(css).toContain('#16a085');
    // Check for button styles from exercise2.less
    expect(css).toMatch(/\.btn-primary\s*\{[^}]*background:\s*#16a085/);
    // Check for card styles
    expect(css).toMatch(/\.card\s*\{[^}]*border-radius:\s*8px/);
  });

  test('TASK 3D: changing ONE border-radius updates ALL cards', async () => {
    const updatedLess = lessContent.replace(/border-radius\s*:\s*8px/, 'border-radius: 16px');
    const result = await less.render(updatedLess);
    const css = result.css;

    expect(css).toContain('border-radius: 16px');
    expect(css).not.toContain('border-radius: 8px');
    const count = (css.match(/border-radius\s*:\s*16px/g) || []).length;
    expect(count).toBeGreaterThanOrEqual(5); // Main .card + 4 variants
  });
});