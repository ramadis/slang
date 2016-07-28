import { Pairing } from './all';

describe('Pairing: direct()', () => {
  const validExpects = [
    { input: [1, 1], output: 5 },
    { input: [0, 0], output: 0 },
    { input: [2, 8], output: 67 },
    { input: [67, 67], output: 19922483599606315745279 }
  ];

  validExpects.forEach((validExpect) => {
    it(`${validExpect.input} => ${validExpect.output}`, () => {
      expect(Pairing.direct(...validExpect.input)).to.equal(validExpect.output);
    });
  })

  const invalidExpects = [
    { input: [-1] },
    { input: [1] },
    { input: [-1, 3] },
    { input: ['1', 'a'] }
  ];

  invalidExpects.forEach((invalidExpect) => {
    it(`${invalidExpect.input} => ERROR`, () => {
      expect(() => Pairing.direct(...invalidExpect.input)).to.throw(Error);
    });
  });
});

describe('Pairing: inverse()', () => {
  const validExpects = [
    { output: [1, 1], input: 5 },
    { output: [0, 0], input: 0 },
    { output: [2, 8], input: 67 },
    { output: [67, 67], input: 19922483599606315745279 }
  ];

  validExpects.forEach((validExpect) => {
    const response = { fst: validExpect.output[0], snd: validExpect.output[1] };
    it(`${validExpect.input} => ${validExpect.output}`, () => {
      expect(Pairing.inverse(validExpect.input)).to.deep.equal(response);
    });
  })

  const invalidExpects = [
    { input: [-1] },
    { input: [0.5] },
    { input: ['a'] }
  ];

  invalidExpects.forEach((invalidExpect) => {
    it(`${invalidExpect.input} => ERROR`, () => {
      expect(() => Pairing.inverse(...invalidExpect.input)).to.throw(Error);
    });
  });
});
