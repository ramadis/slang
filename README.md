# slang

Slang is a javascript library used to get the natural representation of a program from theoretical `L` (or `S`) language, from [Martin Davis' Computability, Complexity and Languages](https://www.amazon.com/Computability-Complexity-Languages-Second-Fundamentals/dp/0122063821).

## Installation
Just run `npm install` to install every dependency. We depend mostly on `gulp`, `babel`, and `mocha`.

## Run
To compile and use it, just run `npm start` from the terminal.

## Test
To run the tests, just run `npm test` from the terminal.

## Example
A valid example of the `S` language is as follows
```
[A1] X1++;
     X1--;
     X1?A1;
```
To get the encoding for said program, store it into a variable and pass it to `program = Program.fromString(programString)`. Then, just call `program.getCode()` to obtain what you were looking for: `"2^703 3^22 5^1534 - 1"`.

For further understanding, keep reading the theory.

## Instructions
To encode an instruction we use a (bijective) pairing function (Mapping from N^2 --> N) with the form `<x,y> = 2^x(2y+1)-1`.
We divide the syntax in 3 disjoint groups and generate the code for an instruction using `<a,<b,c>>`.

### Labels (encoded as `a`)
Starting in 0, the labels are `[A1, B1, C1, D1, E1, A2, ...]`. They are optional in a given line.

### Operations (encoded as `b`)
Starting in 0, the possible operations inside the `S` languague are
- `V` Does nothing
- `V++` Increments the variable V in 1
- `V--` Decrements the variable V in 1
- `V?#L` If V is not zero, go to label L

### Variables (encoded as `c`)
Starting in 0, tha variables are `Y, X1, Z1, X2, Z2, X3, Z3, ...`. Being `Y` the outuput variable. the `X`s the input variables and the `Z`s the auxiliary variables.

## Program encoding
We encode programs using [Gödel numbering](https://en.wikipedia.org/wiki/G%C3%B6del_numbering). So a program is finally encoded as `[#I1, #I2, #I3, ...] - 1` being `#Ij` the code for the `jth` instruction, and `[]` the syntax using for the given Gödel number.

## Documentation
**Program Class**: Represents the program by holding an array of Instructions
```
static fromCode: returns a Program from a given program code.
static fromString: returns a Program from a valid S language program string.

getString: returns the Program's string representation.
getCode(Program.codeModes): returns the code for the given Program.

equals: returns true or false, depending on the equality between Programs.

static codeModes = {
  GODEL: represent a Gödel formed program string => [..] - 1,
  NUMBER: represent the program code as a Number => 31,
  PRIMES: represent a prime formed program string => 2^.. - 1
}
```
**Instruction Class**: Represents an instruction, with its encoding representation.
```
static fromString: returns an Instruction from a valid S language instruction string.
static fromCode: returns an Instruction from a valid instruction code.

getCode: returns the code for an Instruction
getString: returns a valid S language instruction string from a given Instruction.

equals: returns true or false, depending on the equality between Instructions.
toString: returns a String representation from the instruction using the Pairing Function syntax.
```
## Notes
Every encoding step can be proved, showing that exists a bijectivity between natural numbers and the `S` language programs. Further proving, that there are functions which can not be computed.