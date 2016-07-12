// Unit tests for Instruction class
import { expect } from 'chai';
import { Instruction } from './all';

describe('Instruction: getCode()', () => {
  const validExpects = [
    { input: [1, 1, 1], output: 21 },
    { input: [0, 0, 0], output: 0 }
  ];

  validExpects.forEach((validExpect) => {
    const instruction = new Instruction(...validExpect.input);
    it(`${instruction} => ${validExpect.output}`, () => {
      expect(instruction.getCode()).to.equal(validExpect.output);
    });
  })

  const invalidExpects = [
    { input: [] },
    { input: [1] },
    { input: [-1, 1, 3] },
    { input: ['1', 'a', '1'] }
  ];

  invalidExpects.forEach((invalidExpect) => {
    it(` ${invalidExpect.input} => ERROR`, () => {
      expect(() => new Instruction(...invalidExpect.input)).to.throw(Error);
    });
  });
});

describe('Instruction: fromCode()', () => {
  const validExpects = [
    { output: [1, 1, 1], input: ['21'] },
    { output: [0, 0, 0], input: ['0'] }
  ];

  validExpects.forEach((validExpect) => {
    const instruction = new Instruction(...validExpect.output);
    it(`${validExpect.input} => ${instruction}`, () => {
      expect(Instruction.fromCode(...validExpect.input)).to.deep.equal(instruction);
    });
  });

  const invalidExpects = [
    { input: ['0'] },
    { input: ['0'] },
    { input: ['0'] },
    { input: ['21'] },
    { input: ['0'] }
  ];

  invalidExpects.forEach((invalidExpect) => {
    it(`${invalidExpect.input} => ERROR`, () => {
      expect(() => new Instruction(...invalidExpect.input)).to.throw(Error);
    });
  });
});

describe('Instruction: equals()', () => {
  const expects = [
    { output: [1, 1, 1], input: [1, 1, 1] },
    { output: [2, 2, 2], input: [2, 2, 2] },
  ];

  const validExpects = expects.map((validExpect) => { 
    return { output: new Instruction (...validExpect.output), input: new Instruction (...validExpect.input) };
  });

  validExpects.forEach((validExpect) => {
    it(` ${validExpect.input} => ${validExpect.output}`, () => {
      expect(validExpect.input.equals(validExpect.output)).to.be.ok;
    });
  });

  const unexpects = [
    { output: [1, 1, 1], input: [1, 2, 1] },
    { output: [2, 2, 3], input: [2, 2, 2] },
  ];

  const invalidExpects = unexpects.map((invalidExpect) => { 
    return { output: new Instruction (...invalidExpect.output), input: new Instruction (...invalidExpect.input) };
  });

  invalidExpects.forEach((invalidExpect) => {
    it(` ${invalidExpect.input} =/> ${invalidExpect.output}`, () => {
      expect(invalidExpect.input.equals(invalidExpect.output)).to.not.be.ok;
    });
  })
});

describe('Instruction: toString()', () => {
  const expects = [
    { input: [1, 1, 1], output: '<1, <1, 1>>' },
    { input: [0, 0, 0], output: '<0, <0, 0>>' },
    { input: [1, 2 ,3], output: '<1, <2, 3>>' },
  ];

  const validExpects = expects.map((validExpect) => { 
    return { output: validExpect.output, input: new Instruction(...validExpect.input) };
  });

  validExpects.forEach((validExpect) => {
    it(` ${validExpect.input} => ${validExpect.output}`, () => {
      expect(validExpect.input.toString()).to.equal(validExpect.output);
    });
  })
});

describe('Instruction: fromString()', () => {
  const expects = [
    { output: [1, 1, 1], input: ['[A1] X1++;'] },
    { output: [0, 0, 0], input: ['Y;'] },
    { output: [1, 3, 2], input: ['[A1] Z1?A1;'] },
    { output: [1, 2, 3], input: ['[A1] X2--;'] },
    { output: [5, 2, 3], input: ['[E1] X2--;'] },
    { output: [6, 2, 3], input: ['[A2] X2--;'] },
    { output: [6, 2, 4], input: ['[A2] Z2--;'] },
    { output: [6, 0, 4], input: ['[A2] Z2;'] },
  ];

  const validExpects = expects.map((validExpect) => { 
    return { input: validExpect.input, output: new Instruction(...validExpect.output) };
  });

  validExpects.forEach((validExpect) => {
    it(` ${validExpect.input} => ${validExpect.output}`, () => {
      expect(Instruction.fromString(...validExpect.input)).to.deep.equal(validExpect.output);
    });
  });
});

describe('Instruction: getString()', () => {
  const expects = [
    { input: [1, 1, 1], output: '[A1] X1++;' },
    { input: [0, 0, 0], output: 'Y;' },
    { input: [1, 3, 2], output: '[A1] Z1?A1;' },
    { input: [1, 2, 3], output: '[A1] X2--;' },
    { input: [5, 2, 3], output: '[E1] X2--;' },
    { input: [6, 2, 3], output: '[A2] X2--;' },
    { input: [6, 2, 4], output: '[A2] Z2--;' },
    { input: [6, 0, 4], output: '[A2] Z2;' },
  ];

  const validExpects = expects.map((validExpect) => { 
    return { output: validExpect.output, input: new Instruction(...validExpect.input) };
  });

  validExpects.forEach((validExpect) => {
    it(` ${validExpect.input} => ${validExpect.output}`, () => {
      expect(validExpect.input.getString()).to.equal(validExpect.output);
    });
  });
});