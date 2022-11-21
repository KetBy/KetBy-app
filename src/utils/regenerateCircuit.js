import { gatesMap } from "./gates";

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
export default function regenerateCircuit(oldCircuit, index, dx, dy) {
  let newCircuit = oldCircuit;
  if (dx == 0) {
    // Only shift the qubits
    newCircuit.instructions[index].qubits.map((qubit, index) => {
      newCircuit.instructions[index].qubits[index] += dy;
    });
  }
  return newCircuit;
}
