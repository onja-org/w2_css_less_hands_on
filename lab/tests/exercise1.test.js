// // lab/tests/exercise1.test.js

// const fs = require('fs');
// const path = require('path');
// const less = require('less');

// const lessContent = fs.readFileSync(
//   path.join(__dirname, '../exercises/exercise1.less'),
//   'utf8'
// );

// describe('TASK 1C: Define Variables', () => {
//   test('define @brand-color and @brand-color-dark', () => {
//     expect(lessContent).toMatch(/@brand-color\s*:\s*#16a085/);
//     expect(lessContent).toMatch(/@brand-color-dark\s*:\s*#138d75/);
//   });
// });

// describe('TASK 1D: Use Variables', () => {
//   test('use @brand-color in ALL 12 places', () => {
//     const count = (lessContent.match(/@brand-color/g) || []).length;
//     expect(count).toBe(12);
//   });

//   test('use @brand-color-dark in 3 places', () => {
//     const count = (lessContent.match(/@brand-color-dark/g) || []).length;
//     expect(count).toBe(3);
//   });

//   test('use fade(@brand-color, 10%) for rgba', () => {
//     expect(lessContent).toContain('fade(@brand-color, 10%)');
//   });

//   test('NO hardcoded colors', () => {
//     const withoutComments = lessContent.replace(/\/\*[\s\S]*?\*\//g, '');
//     expect(withoutComments).not.toContain('#16a085');
//     expect(withoutComments).not.toContain('#138d75');
//   });
// });

// describe('TASK 1E: Variable Power', () => {
//   test('ONE change updates ALL colors', async () => {
//     const orangeLess = lessContent
//       .replace('@brand-color: #16a085', '@brand-color: #e67e22')
//       .replace('@brand-color-dark: #138d75', '@brand-color-dark: #d35400');
    
//     const result = await less.render(orangeLess);
//     expect(result.css).toContain('#e67e22');
//     expect(result.css).not.toContain('#16a085');
//     expect(result.css).toContain('#d35400');
//     expect(result.css).not.toContain('#138d75');
//   });
// });