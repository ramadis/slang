import { Program } from './all';

describe('Program: getString()', () => {
  const instructions = [];

  // 15 randomly generated instructions
  for (let j = 0; j < 15; j++) instructions.push(Instruction.fromCode(Math.round(Math.random() * 100)));

  for (let i = 0; i < 7; i++) {
    const shuffledInsts = instructions.sort(() => 0.5 - Math.random());
    const program = new Program(shuffledInsts);
    it(`Should shout the same string`, () => {
      expect(program.getString()).to.equal(shuffledInsts.map((inst) => inst.getString()).join('\n'));
    });
  }
});

describe('Program: fromString()', () => {
  const instructions = [];

  // 15 randomly generated instructions
  for (let j = 0; j < 15; j++) instructions.push(Instruction.fromCode(Math.round(Math.random() * 100)));

  for (let i = 0; i < 7; i++) {
    it(`Should shout the same program`, () => {
      const shuffledInsts = instructions.sort(() => 0.5 - Math.random());
      const programString = shuffledInsts.map((inst) => inst.getString()).join('\n');

      expect(Program.fromString(programString)).to.deep.equal(new Program(shuffledInsts));
    });
  }
});

describe('Program: getCode(Program.codeModes.PRIMES)', () => {
  const primes = Program.primes.slice(0, 15);
  const instructions = [];

  // 15 randomly generated instructions
  for (let j = 0; j < 15; j++) instructions.push(Instruction.fromCode(Math.round(Math.random() * 100)));

  for (let i = 0; i < 7; i++) {
    it(`Should shout the same code`, () => {
      const shuffledInsts = instructions.sort(() => 0.5 - Math.random());
      const program = new Program(shuffledInsts);
      const response = primes.map((prime, idx) => `${prime}^${shuffledInsts[idx].getCode()}`).join(' ') + " - 1";

      expect(program.getCode(Program.codeModes.PRIMES)).to.equal(response);
    });
  }
});

describe('Program: getCode(Program.codeModes.GODEL)', () => {
  const primes = Program.primes.slice(0, 15);
  const instructions = [];

  // 15 randomly generated instructions
  for (let j = 0; j < 15; j++) instructions.push(Instruction.fromCode(Math.round(Math.random() * 100)));

  for (let i = 0; i < 7; i++) {
    it(`Should shout the same code`, () => {
      const shuffledInsts = instructions.sort(() => 0.5 - Math.random());
      const program = new Program(shuffledInsts);
      const response = "[ " + primes.map((prime, idx) => `${shuffledInsts[idx].getCode()}`).join(' ') + " ] - 1";

      expect(program.getCode(Program.codeModes.GODEL)).to.equal(response);
    });
  }
});

describe('Program: getCode(Program.codeModes.NUMBER)', () => {
  const primes = Program.primes.slice(0, 15);
  const instructions = [];

  // 15 randomly generated instructions
  for (let j = 0; j < 15; j++) instructions.push(Instruction.fromCode(Math.round(Math.random() * 100)));

  for (let i = 0; i < 7; i++) {
    it(`Should shout the same code`, () => {
      const shuffledInsts = instructions.sort(() => 0.5 - Math.random());
      const program = new Program(shuffledInsts);
      let code = 0;
      primes.forEach((prime, idx) => code += Math.pow(prime, shuffledInsts[idx].getCode()));

      expect(program.getCode(Program.codeModes.NUMBER)).to.equal(code - 1);
    });
  }
});

describe('Program: equals()', () => {
  const instructions = [];

  // 15 randomly generated instructions
  for (let j = 0; j < 15; j++) instructions.push(Instruction.fromCode(Math.round(Math.random() * 100)));

  for (let i = 0; i < 7; i++) {
    it(`Should prove programs are equal`, () => {
      const shuffledInsts = instructions.sort(() => 0.5 - Math.random());
      expect(new Program(shuffledInsts)).to.deep.equal(new Program(shuffledInsts));
    });
  }

  const invalidExpects = [
    { input: null },
    { input: 1 },
    { input: new Instruction(0, 0, 0) },
    { input: new Program([new Instruction(0, 0, 0)]) }
  ];

  const program = new Program(instructions);
  invalidExpects.forEach((invalidExpect) => {
    it(`${invalidExpect.input} =/> ${program}`, () => {
      expect(program.equals(invalidExpect.input)).to.not.be.ok;
    });
  });
});

describe('Program: fromCode()', () => {
  const instructions = [];

  const invalidExpects = [
    { input: '()adsf' },
    { input: 1 },
    { input: new Instruction(0, 0, 0) },
    { input: new Program([new Instruction(0, 0, 0)]) },
    { input: '[a a]' },
    { input: '[]' },
    { input: '^^^' },
    { input: 'a^' },
    { input: 'a^ -1' }
  ];

  invalidExpects.forEach((invalidExpect) => {
    it(`${invalidExpect.input} => ERROR`, () => {
      expect(() => Program.fromCode(invalidExpect.input)).to.throw(Error);
    });
  });

});


describe('Program: fromCode(Program.codeModes.PRIME)', () => {
  const instructions = [];

  // 15 randomly generated instructions
  for (let j = 0; j < 15; j++) instructions.push(Instruction.fromCode(Math.round(Math.random() * 100)));

  for (let i = 0; i < 7; i++) {
    it(`Should get correct Program from code`, () => {
      const shuffledInsts = instructions.sort(() => 0.5 - Math.random());
      expect(Program.fromCode(new Program(shuffledInsts).getCode())).to.deep.equal(new Program(shuffledInsts));
    });
  }
});

describe('Program: fromCode(Program.codeModes.GODEL)', () => {
  const instructions = [];

  // 15 randomly generated instructions
  for (let j = 0; j < 15; j++) instructions.push(Instruction.fromCode(Math.round(Math.random() * 100)));

  for (let i = 0; i < 7; i++) {
    it(`Should get correct Program from code`, () => {
      const shuffledInsts = instructions.sort(() => 0.5 - Math.random());
      expect(Program.fromCode(new Program(shuffledInsts).getCode())).to.deep.equal(new Program(shuffledInsts));
    });
  }
});
