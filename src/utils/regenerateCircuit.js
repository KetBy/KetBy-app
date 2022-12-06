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
 * the deltas of the move (difference in number of cells).
 *
 */
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

  newCircuit.meta.oldInstructionIndex = instructionIndex;

  // If row (i.e., qubits) changed
  if (dy != 0) {
    newCircuit.instructions[instructionIndex].qubits.map((qubit, _index) => {
      newCircuit.instructions[instructionIndex].qubits[_index] += dy;
    });
  }

  // If the column changed
  if (dx != 0) {
    let minQubit =
      Math.min.apply(Math, oldCircuit.instructions[instructionIndex].qubits) +
      dy;
    let maxQubit =
      Math.max.apply(Math, oldCircuit.instructions[instructionIndex].qubits) +
      dy;

    // Moved to the left
    if (dx < 0) {
      // Find all instructions that should come AFTER the current instruction
      // (i.e., to be shifted to the right by one position)
      let toBeShifted = [];
      for (let rowIndex = minQubit; rowIndex <= maxQubit; rowIndex++) {
        // Check if there already exists an instruction in the cell where the instruction has been moved
        let overlappedInstruction = oldMatrix[rowIndex][y + dx];
        // If no instruction
        if (overlappedInstruction == null) {
          // Find the first instruction when going to the right from the new position to the old position
          for (let col = y + dx; col < y; col++) {
            if (oldMatrix[rowIndex][col] != null) {
              overlappedInstruction = oldMatrix[rowIndex][col];
              break;
            }
          }
          if (overlappedInstruction == null) {
            // If still no instruction found, skip this row
            continue;
          }
        }
        if (overlappedInstruction < 0) {
          overlappedInstruction *= -1;
        }
        if (!toBeShifted.includes(overlappedInstruction)) {
          toBeShifted.push(overlappedInstruction);
        }
      }
      // console.log("To be shifted: ", toBeShifted);
      // If the delta is negative (i.e., moved to the left):
      // Shift the instruction in the circuit's instructions list so that it comes before all overlapped instructions
      let newInstructionIndex = Math.min.apply(Math, toBeShifted);
      if (newInstructionIndex < 0) {
        newInstructionIndex = 0;
      }
      // console.log("Putting ", instructionIndex, " into ", newInstructionIndex);
      newCircuit.instructions.splice(
        newInstructionIndex /* to */,
        0,
        newCircuit.instructions.splice(instructionIndex /* from */, 1)[0]
      );
      newCircuit.meta.newInstructionIndex = newInstructionIndex;
    }

    // Moved to the right
    if (dx > 0) {
      // Find all instructions that should come BEFORE the current instruction
      // (i.e., to be shifted to the left by one position)
      let toBeShifted = [];
      for (let rowIndex = minQubit; rowIndex <= maxQubit; rowIndex++) {
        // Check if there already exists an instruction in the cell before the cell where the instruction has been moved
        let overlappedInstruction = oldMatrix[rowIndex][y + dx];
        // If no instruction
        if (overlappedInstruction == null) {
          // Find the first instruction when going to the left from the new position to the old position
          for (let col = y + dx; col > y; col--) {
            if (oldMatrix[rowIndex][col] != null) {
              overlappedInstruction = oldMatrix[rowIndex][col];
              break;
            }
          }
          if (overlappedInstruction == null) {
            // If still no instruction found, skip this row
            continue;
          }
        }
        if (overlappedInstruction < 0) {
          overlappedInstruction *= -1;
        }
        if (!toBeShifted.includes(overlappedInstruction)) {
          toBeShifted.push(overlappedInstruction);
        }
      }
      // console.log("To be shifted: ", toBeShifted);
      if (toBeShifted.length > 0) {
        // If the delta is negative (i.e., moved to the left):
        // Shift the instruction in the circuit's instructions list so that it comes before all overlapped instructions
        let newInstructionIndex = Math.max.apply(Math, toBeShifted);
        /*console.log(
          "Putting ",
          instructionIndex,
          " into ",
          newInstructionIndex
        );*/
        newCircuit.instructions.splice(
          newInstructionIndex /* to */,
          0,
          newCircuit.instructions.splice(instructionIndex /* from */, 1)[0]
        );
        newCircuit.meta.newInstructionIndex = newInstructionIndex;
      }
    }
  }

  // console.log(oldCircuit.instructions, newCircuit.instructions);

  return newCircuit;
}
