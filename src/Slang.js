// Object holding error messages
const ERROR = {
  INVALID_LABEL: { code: 1, msg: 'THE LABEL PROVIDED FOR AN INSTRUCTION IS MALFORMED' },
  INVALID_VAR: { code: 2, msg: 'THE VARIABLE PROVIDED FOR AN INSTRUCTION IS MALFORMED' },
  INVALID_NUM: { code: 3, msg: 'THE NUMBER PROVIDED IS NOT ACTUALLY A NUMBER' }
};


// Represents an instruction, holding its representation in 3 fields.
// See docs for further understanding.
class Instruction {
  constructor (a, b, c) {
    a = Number(a); b = Number(b); c = Number(c);

    const notNumber = Number.isNaN(a) || Number.isNaN(b) || Number.isNaN(c);
    if (notNumber || a < 0 || b < 0 || c < 0) { a = 0; b = 0; c = 0; }
    
    this.a = a;
    this.b = b;
    this.c = c;
  }

  static fromCode (num) {
    num = Number(num);
    if (num !== 0 && !num) throw new Error(ERROR.INVALID_NUM);

    const fstCall = Pairing.inverse(num);
    const sndCall = Pairing.inverse(fstCall.snd);
    
    const a = fstCall.fst;
    const b = sndCall.fst;
    const c = sndCall.snd;

    return new Instruction(a, b, c);
  }

  static fromString (str) {
    if (!str) return null;
    str = str.toLowerCase();

    const instruction = {};
    let [label, operation] = str.split(' ');
    operation = operation ? operation : label;
    if (!operation) return null;
    if (operation === label) label = null;

    instruction.a = InstructionParser.getLabelValue(label);
    instruction.b = InstructionParser.getOperationValue(operation, label);
    instruction.c = InstructionParser.getVariableValue(operation);

    return new Instruction(instruction.a, instruction.b, instruction.c);
  }

  getString () {
    const defaultVar = 'Y';
    const defaultLabel = '';
    const vars = ['X', 'Z'];
    const operations = [';', '++;', '--;', '?'];
    const labels = ['A', 'B', 'C', 'D', 'E'];

    const getItem = (num, arr) =>  `${ arr[(num - 1) % arr.length] }${ Math.ceil(num / arr.length) }`;

    const variable = this.c ? getItem(this.c, vars) : defaultVar;
    const label = this.a ? `[${ getItem(this.a, labels) }]` : defaultLabel;
    
    // ? operations needs more thinking.
    const simpOp = operations.length - 1;
    const operation = this.b < simpOp ? operations[this.b] : operations[simpOp] + getItem(this.b - simpOp + 1, labels) + ';';

    return `${ label } ${ variable }${ operation }`.trim();
  }

  toString () {
    return `<${this.a}, <${this.b}, ${this.c}>>`;
  }

  equals (obj) {
    if (obj && obj instanceof Instruction) {
      return this.a === obj.a && this.b === obj.b && this.c === obj.c;
    }
    return false;
  }

  getCode () {
    return Pairing.direct(this.a, Pairing.direct(this.b, this.c));
  }
};

// Parses string into the values corresponding to an instruction.
class InstructionParser {
  static getLabelValue (label) {
    if (!label) return 0;

    const letter = label.match(/[a-e]/)[0];
    const idx = Number(label.match(/[0-9]+/)[0]) - 1;
    const pos = letter.charCodeAt(0) - 'a'.charCodeAt(0) + 1;

    if (pos <= 0 || Number.isNaN(idx)) throw new Error(ERROR.INVALID_LABEL);
    return pos + ( 5 * idx );
  }

  static getOperationValue (operation, label) {
    // Invalid operations are considered null operations.
    if (operation.includes('++')) return 1;
    if (operation.includes('--')) return 2;
    if (operation.includes('?')) return 2 + this.getLabelValue(operation.split('?')[1]);
    return 0;
  }

  static getVariableValue (operation) {
    let idx = operation.match(/[1-9]+/);

    if (operation.includes('y')) return 0;
    idx = idx ? Number(idx[0]) : null;
    if (operation.includes('z') && idx) return 2 * idx;
    if (operation.includes('x') && idx) return 2 * idx - 1;

    throw new Error(ERROR.INVALID_VAR);
  }
};

// Represents a pairing function, which maps N^2 --> N
class Pairing {
  static _findFactor (num, fact) {
    let aux = 0;
    while (num % fact === 0 && num != 0) {
      aux++;
      num /= fact;
    }
    return aux;
  }

  static direct (fst, snd) {
    return Math.pow(2, fst) * (2 * snd + 1) - 1;
  }

  static inverse (num) {
    const pair = { fst: 0, snd: 0 };

    pair.fst = this._findFactor((num + 1), 2);
    pair.snd = ((num + 1) / (Math.pow(2, pair.fst)) - 1) / 2;

    return pair;
  }
};

// Represents the program. Its the main class.
// Holds an array of instructions.
class Program {
  constructor (instructions) {
    this.instructions = instructions;
  }

  static fromString (str) {
    const instructionsStr = str.toLowerCase().split(';').map((instructionStr) => instructionStr.trim());
    const instructions = instructionsStr.map((instructionStr) => Instruction.fromString(instructionStr))
                                        .filter((instruction) => instruction);
    return new Program(instructions);
  }

  getCode (primeExp = true) {

    let code = '';
    if (!primeExp) {
      code = '[ ';
      this.instructions.forEach((instruction) => code += `${instruction.getCode()} `);
      return code += '] - 1';
    }

    const primes =  [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103,
                    107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223,
                    227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347,
                    349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463,
                    467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607,
                    613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743,
                    751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883,
                    887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013, 1019, 1021, 1031,
                    1033, 1039, 1049, 1051, 1061, 1063, 1069, 1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151,
                    1153, 1163, 1171, 1181, 1187, 1193, 1201, 1213, 1217, 1223, 1229, 1231, 1237, 1249, 1259, 1277, 1279,
                    1283, 1289, 1291, 1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373, 1381, 1399, 1409, 1423,
                    1427, 1429, 1433, 1439, 1447, 1451, 1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499, 1511, 1523,
                    1531, 1543, 1549, 1553, 1559, 1567, 1571, 1579, 1583, 1597, 1601, 1607, 1609, 1613, 1619, 1621, 1627,
                    1637, 1657, 1663, 1667, 1669, 1693, 1697, 1699, 1709, 1721, 1723, 1733, 1741, 1747, 1753, 1759, 1777,
                    1783, 1787, 1789, 1801, 1811, 1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877, 1879, 1889, 1901, 1907];
    this.instructions.forEach((instruction, idx) => code += `${primes[idx]}^${instruction.getCode()} `);
    return code  += "- 1";
  }
};

module.exports = { Program, Instruction, Pairing };