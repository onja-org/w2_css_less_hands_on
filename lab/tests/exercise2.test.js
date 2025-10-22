// lab/tests/exercise2.test.js

const fs = require('fs');
const path = require('path');
const less = require('less');

const lessContent = fs.readFileSync(
  path.join(__dirname, '../exercises/exercise2.less'),
  'utf8'
);

describe('TASK 2A: Manual Approach', () => {
  test('TASK 2A: update ALL border-radius from 4px to 12px (9 instances)', () => {
    const count = (lessContent.match(/border-radius\s*:\s*12px/g) || []).length;
    expect(count).toBe(9);
    expect(lessContent).not.toContain('border-radius: 4px');
  });
});

describe('TASK 2C: Define Mixins', () => {
  test('TASK 2C: define .button-base mixin with parameters', () => {
    expect(lessContent).toMatch(/\.button-base\s*\(@bg-color[^)]*\)\s*\{/);
    expect(lessContent).toMatch(/\.button-base\s*\{[^}]*border-radius\s*:\s*12px/);
    expect(lessContent).toMatch(/\.button-base\s*\{[^}]*box-shadow\s*:\s*0\s+1px\s+3px\s+rgba\(0,0,0,0\.1\)/);
  });

  test('TASK 2C: define size mixins (.button-small, .button-medium, .button-large)', () => {
    expect(lessContent).toMatch(/\.button-small\s*\(\)\s*\{/);
    expect(lessContent).toMatch(/\.button-medium\s*\(\)\s*\{/);
    expect(lessContent).toMatch(/\.button-large\s*\(\)\s*\{/);
  });
});

describe('TASK 2D: Refactor with Mixins', () => {
  test('TASK 2D: use .button-base and size mixins for all 9 button variations', () => {
    const buttons = [
      'btn-primary-small', 'btn-primary-medium', 'btn-primary-large',
      'btn-secondary-small', 'btn-secondary-medium', 'btn-secondary-large',
      'btn-danger-small', 'btn-danger-medium', 'btn-danger-large'
    ];
    
    buttons.forEach(button => {
      expect(lessContent).toMatch(new RegExp(`\\.${button}\\s*\\{[^}]*\\.button-base\\([^)]*\\);[^}]*\\.[^-]+\\(\\);`));
    });
  });

  test('TASK 2D: NO hardcoded repetitive properties', () => {
    const withoutComments = lessContent.replace(/\/\*[\s\S]*?\*\//g, '');
    expect(withoutComments).not.toMatch(/\.btn-[a-z]+-[a-z]+\s*\{[^}]*border:\s*none/);
    expect(withoutComments).not.toMatch(/\.btn-[a-z]+-[a-z]+\s*\{[^}]*cursor:\s*pointer/);
    expect(withoutComments).not.toMatch(/\.btn-[a-z]+-[a-z]+\s*\{[^}]*transition:\s*all 0\.2s ease/);
  });
});

describe('TASK 2E: Test Mixin Power', () => {
  test('TASK 2E: compiles to valid CSS with correct styles', async () => {
    const result = await less.render(lessContent);
    const css = result.css;
    
    expect(css).toContain('border-radius: 12px');
    expect(css).toContain('box-shadow: 0 1px 3px rgba(0,0,0,0.1)');
    expect(css).toContain('transition: all 0.2s ease');
  });

  test('TASK 2E: changing ONE mixin updates ALL buttons', async () => {
    const updatedLess = lessContent.replace(/border-radius\s*:\s*12px/, 'border-radius: 20px');
    const result = await less.render(updatedLess);
    const css = result.css;
    
    expect(css).toContain('border-radius: 20px');
    expect(css).not.toContain('border-radius: 12px');
    const count = (css.match(/border-radius\s*:\s*20px/g) || []).length;
    expect(count).toBe(9);
  });
});