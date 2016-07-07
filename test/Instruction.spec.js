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

describe('Instruction: equals()', () => {
  const expects = [
    { output: [1, 1, 1], input: [1, 1, 1] },
    { output: [2, 2, 2], input: [2, 2, 2] },
    { output: [-1, -1, 1], input: [0, 0 ,0] }
  ];

  const validExpects = expects.map((expect) => { 
    return { output: new Instruction (...expect.output), input: new Instruction (...expect.input) };
  });

  validExpects.forEach((validExpect) => {
    it(` ${validExpect.input} => ${validExpect.output}`, () => {
      expect(validExpect.input.equals(validExpect.output)).to.be.ok;
    })
  })

  const unexpects = [
    { output: [1, 1, 1], input: [1, 2, 1] },
    { output: [2, 2, 3], input: [2, 2, 2] },
    { output: [-1, -1, 1], input: [1, 0 ,0] }
  ];

  const invalidExpects = unexpects.map((expect) => { 
    return { output: new Instruction (...expect.output), input: new Instruction (...expect.input) };
  });

  invalidExpects.forEach((invalidExpect) => {
    it(` ${invalidExpect.input} =/> ${invalidExpect.output}`, () => {
      expect(invalidExpect.input.equals(invalidExpect.output)).to.not.be.ok;
    })
  })
});

describe('Instruction: toString()', () => {
  const expects = [
    { input: [1, 1, 1], output: '<1, <1, 1>>' },
    { input: [0, 0, 0], output: '<0, <0, 0>>' },
    { input: [], output: '<0, <0, 0>>' },
    { input: [1, 2 ,3], output: '<1, <2, 3>>' },
  ];

  const validExpects = expects.map((expect) => { 
    return { output: expect.output, input: new Instruction(...expect.input) };
  });

  validExpects.forEach((validExpect) => {
    it(` ${validExpect.input} => ${validExpect.output}`, () => {
      expect(validExpect.input.toString()).to.equal(validExpect.output);
    })
  })
});

describe('Instruction: fromString()', () => {
  const expects = [
    { output: [1, 1, 1], input: ['[A1] X1++'] },
    { output: [0, 0, 0], input: ['Y'] },
    { output: [1, 3, 2], input: ['[A1] Z1?A1'] },
    { output: [1, 2, 3], input: ['[A1] X2--'] },
    { output: [5, 2, 3], input: ['[E1] X2--'] },
    { output: [6, 2, 3], input: ['[A2] X2--'] },
    { output: [6, 2, 4], input: ['[A2] Z2--'] },
    { output: [6, 0, 4], input: ['[A2] Z2'] },
  ];

  const validExpects = expects.map((expect) => { 
    return { input: expect.input, output: new Instruction(...expect.output) };
  });

  validExpects.forEach((validExpect) => {
    it(` ${validExpect.input} => ${validExpect.output}`, () => {
      expect(Instruction.fromString(...validExpect.input)).to.deep.equal(validExpect.output);
    })
  })
});