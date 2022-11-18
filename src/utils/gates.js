import theme from "../themes/default";

const gates = [
  {
    name: "Classical gates",
    color: theme.palette.darkGrey,
    contrastColor: theme.palette.common.white,
    gates: [
      {
        name: "I",
        qubits: 1,
      },
      {
        name: "X",
        qubits: 1,
      },
      {
        name: "CX",
        qubits: 2,
      },
      {
        name: "Tfl",
        qubits: 3,
      },
      {
        name: "SWAP",
        qubits: 2,
      },
    ],
  },
  {
    name: "Hadamard gate",
    color: theme.palette.red,
    contrastColor: theme.palette.common.white,
    gates: [
      {
        name: "H",
        qubits: 1,
      },
    ],
  },
  {
    name: "Phase gates",
    color: theme.palette.blue,
    contrastColor: theme.palette.common.white,
    gates: [
      {
        name: "T",
        qubits: 1,
      },
      {
        name: "S",
        qubits: 1,
      },
      {
        name: "Z",
        qubits: 1,
      },
      {
        name: "T+",
        qubits: 1,
      },
      {
        name: "S+",
        qubits: 1,
      },
      {
        name: "P",
        qubits: 1,
      },
      {
        name: "RZ",
        qubits: 1,
      },
    ],
  },
];

export const gatesMap = () => {
  let res = {};
  gates.map((category, categoryIndex) => {
    category.gates.map((gate, gateIndex) => {
      res[gate.name] = {
        name: gate.name,
        color: category.color,
        contrastColor: category.contrastColor,
        qubits: gate.qubits,
      };
    });
  });
  return res;
};

export default gates;
