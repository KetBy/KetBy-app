import { gatesMap } from "./gates";
import generateCanvasMatrix from "./generateCanvasMatrix";

/*
Example:

0     1     2       3     4         5     6           7     8     9     10    11    12
S[0]; H[1]; T+[2];  I[2]; CX[1,2];  X[1]; Tfl[0,1,3]; X[2]; I[0]; I[1]; I[1]; X[0]; S+[0];

0   | 0               6   8   11  12
1   | 1       4   5   6   9   10
2   | 2   3   4   7   -1
3   |                 6
*/
/*
 * Regenerate a canvas matrix given the circuit, the index of the instruction that has been moved,
 * the deltas of the move (diffirence in number of cells).
 *
 */
export function regenerateCircuit_0(oldCircuit, oldMatrix, index, dx, dy) {
  let newCircuit = oldCircuit;
  if (dx == 0) {
    // Shift the qubits
    newCircuit.instructions[index].qubits.map((qubit, _index) => {
      newCircuit.instructions[index].qubits[_index] += dy;
    });
    // If there had already been some instructions in the cells where the instruction has been moved,
    // make sure that the moved instruction comes before the other ones in the instructions array
    // First, get overlapped instructions
    let overlapped = [];
  }
  return newCircuit;
}

export default function regenerateCircuit(
  oldCircuit, // old circuit
  oldMatrix, // old canvas matrix
  instructionIndex, // the instruction that has been moved
  x, // x coordinate of the instruction in the old canvas matrix
  y, // y coordinate of the instruction in the old canvas matrix
  dx, // delta of x coordinate (no. of columns shifted)
  dy // delta of y coordinate (no. of rows shifted)
) {
  // let newCircuit = Object.create(oldCircuit);
  let newCircuit = JSON.parse(JSON.stringify(oldCircuit));

  // If row (i.e., qubits) changed
  if (dy != 0) {
    newCircuit.instructions[instructionIndex].qubits.map((qubit, _index) => {
      newCircuit.instructions[instructionIndex].qubits[_index] += dy;
    });
  }

  // console.log(x, y);

  // If column changed
  // Find the overlapped instructions
  if (dx != 0) {
    let minQubit =
      Math.min.apply(Math, oldCircuit.instructions[instructionIndex].qubits) +
      dy;
    let maxQubit =
      Math.max.apply(Math, oldCircuit.instructions[instructionIndex].qubits) +
      dy;

    let overlapped = [];
    for (let rowIndex = minQubit; rowIndex <= maxQubit; rowIndex++) {
      let instruction = oldMatrix[rowIndex][y + dx];
      if (instruction == null) {
        continue;
      }
      if (instruction < 0) {
        instruction *= -1;
      }
      if (!overlapped.includes(instruction)) {
        overlapped.push(instruction);
      }
    }
    console.log("Overlapped: ", overlapped);
    // If the delta is negative (i.e., moved to the left):
    // Shift the instruction in the circuit's instructions list so that it comes before all overlapped instructions
    let newInstructionIndex = Math.min.apply(Math, overlapped);
    if (newInstructionIndex < 0) {
      newInstructionIndex = 0;
    }
    console.log("Putting ", instructionIndex, " into ", newInstructionIndex);
    newCircuit.instructions.splice(
      newInstructionIndex /* to */,
      0,
      newCircuit.instructions.splice(instructionIndex /* from */, 1)[0]
    );
  }

  // If the delta is positive (i.e., moved to the right):
  // Shift the instruction in the circuit's instructions list so that it comes right after all the overlapped instructions

  console.log(oldCircuit.instructions, newCircuit.instructions);

  return newCircuit;
}
