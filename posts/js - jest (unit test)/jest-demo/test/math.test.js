const MathJS = require('../src/math');

it('Adds 1 + 1 to equals 2', () => {
    expect(MathJS.sum(1, 1)).toBe(2);
});
