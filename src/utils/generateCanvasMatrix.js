import { gatesMap } from "./gates";
const _gatesMap = gatesMap();

/*
Example:

0     1     2       3     4         5     6           7     8     9     10    11    12
S[0]; H[1]; T+[2];  I[2]; CX[1,2];  X[1]; Tfl[0,1,3]; X[2]; I[0]; I[1]; I[1]; X[0]; S+[0];

0   | 0               6   8   11  12
1   | 1       4   5   6   9   10
2   | 2   3   4   7  -6
3   |                 6
*/
export default function generateCanvasMatrix(input, def_no_rows = false) {
  // Initialize an empty map which will point each instruction index to its column
  let colMap = [];
  // Find number of needed rows
  let no_rows = 0;
  if (def_no_rows !== false) {
    no_rows = def_no_rows;
  } else {
    input.map((_instruction) => {
      let max = Math.max.apply(Math, _instruction["qubits"]);
      if (max + 1 > no_rows) {
        no_rows = max + 1;
      }
    });
  }
  // Generate matrix of size no_rows x 0
  let matrix = [];
  for (let i = 0; i < no_rows; i++) {
    matrix.push([]);
  }
  // Parse instructions
  input.map((_instruction, instructionIndex) => {
    let gate = _gatesMap[_instruction["gate"]];
    let start_row = Math.min.apply(Math, _instruction["qubits"]);
    let end_row = Math.max.apply(Math, _instruction["qubits"]);
    if (gate.name == "M") {
      end_row = no_rows - 1;
      start_row = 0;
    }
    // Find column that is empty from row start_row to row end_row
    let column = -1;
    // Find first column that can fit the instruction (i.e., contains only null values from start_row to end_row)
    // such that all succeeding values are either null (or negative NOT ANYMORE)
    for (let col = 0; col < matrix[0].length; col++) {
      // Check if the current column can fit the instruction
      let fit = true;
      for (let row = start_row; row <= end_row; row++) {
        let last_possible_col = matrix[0].length;
        for (let i = matrix[0].length - 1; i >= 0; i--) {
          if (matrix[row][i] !== null /*&& matrix[row][i] >= 0*/) {
            break;
          }
          last_possible_col = i;
        }
        if (last_possible_col == matrix[0].length || col < last_possible_col) {
          fit = false;
          break;
        }
        if (matrix[row][col] !== null) {
          fit = false;
          break;
        }
      }
      if (fit) {
        column = col;
        break;
      }
    }
    if (column == -1) {
      // We need to expand the matrix by one column to the right
      for (let i = 0; i < no_rows; i++) {
        matrix[i].push(null);
      }
      column = matrix[0].length - 1;
    }
    for (let i = start_row; i <= end_row; i++) {
      matrix[i][column] = _instruction["qubits"].includes(i)
        ? instructionIndex
        : instructionIndex == 0
        ? -0.5
        : -instructionIndex;
    }
    colMap[input[instructionIndex].uid] = column;
  });

  return { matrix, colMap };
}
