export default function parseInstructionsString(input) {
  input = input.replace(" ", "").replace("\n", "");
  let output = [];
  let instructions = input.split(";");
  for (let index = 0; index < instructions.length; index++) {
    let instruction = instructions[index];
    instruction = instruction.trim().replace(";", "");
    if (instruction.length < 3) {
      continue;
    }
    let gate = instruction.substr(0, instruction.indexOf("["));
    let qubitsStr = instruction.substring(
      instruction.indexOf("[") + 1,
      instruction.lastIndexOf("]")
    );
    let qubits = qubitsStr.split(",");
    qubits.map(function (qubit, index) {
      qubits[index] = parseInt(qubit);
    });
    output.push({
      gate: gate,
      qubits: qubits,
      params: [],
    });
  }
  return output;
}
