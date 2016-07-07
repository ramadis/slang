// Unit tests for Instruction class
import { expect } from 'chai';
import { Instruction } from './all';

describe('Instruction: getCode()', () => {
  const expects = [
    { input: [1, 1, 1], output: 21 },
    { input: [0, 0, 0], output: 0 },
    { input: [], output: 0 },
    { input: [1], output: 0 },
    { input: [-1, 1, 3], output: 0 },
    { input: ['1', 1, '1'], output: 21 },
    { input: ['1', 'a', '1'], output: 0 }
  ];

  const validExpects = expects.map((expect) => { 
    return { output: expect.output, input: new Instruction(...expect.input) };
  });

  validExpects.forEach((validExpect) => {
    it(` ${validExpect.input} => ${validExpect.output}`, () => {
      expect(validExpect.input.getCode()).to.equal(validExpect.output);
    })
  })
});

describe('Instruction: fromCode()', () => {
  const expects = [
    { output: [1, 1, 1], input: ['21'] },
    { output: [0, 0, 0], input: ['0'] },
    { output: [], input: ['0'] },
    { output: [1], input: ['0'] },
    { output: [-1, 1, 3], input: ['0'] },
    { output: ['1', 1, '1'], input: ['21'] },
    { output: ['1', 'a', '1'], input: ['0'] }
  ];

  const validExpects = expects.map((expect) => { 
    return { output: new Instruction (...expect.output), input: expect.input };
  });

  validExpects.forEach((validExpect) => {
    it(` ${validExpect.input} => ${validExpect.output}`, () => {
      expect(Instruction.fromCode(...validExpect.input)).to.deep.equal(validExpect.output);
    })
  })
});