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
        title: "Identity gate",
        desc: "Identity matrix",
      },
      {
        name: "X",
        qubits: 1,
        title: "NOT gate",
        desc: "Lorem ipsum",
      },
      {
        name: "CX",
        qubits: 2,
        title: "Controlled NOT gate",
        desc: "Lorem ipsum",
      },
      {
        name: "Tfl",
        qubits: 3,
        title: "Toffoli gate",
        desc: "Lorem ipsum",
      },
      {
        name: "SWAP",
        qubits: 2,
        title: "SWAP gate",
        desc: "Lorem ipsum",
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
        title: "Hadamard gate",
        desc: "Lorem ipsum",
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
        title: "Lorem ipsum",
        desc: "Lorem ipsum",
      },
      {
        name: "S",
        qubits: 1,
        title: "Lorem ipsum",
        desc: "Lorem ipsum",
      },
      {
        name: "Z",
        qubits: 1,
        title: "Lorem ipsum",
        desc: "Lorem ipsum",
      },
      {
        name: "T+",
        qubits: 1,
        title: "Lorem ipsum",
        desc: "Lorem ipsum",
      },
      {
        name: "S+",
        qubits: 1,
        title: "Lorem ipsum",
        desc: "Lorem ipsum",
      },
      {
        name: "P",
        qubits: 1,
        title: "Lorem ipsum",
        desc: "Lorem ipsum",
      },
      {
        name: "RZ",
        qubits: 1,
        title: "Lorem ipsum",
        desc: "Lorem ipsum",
      },
    ],
  },
  {
    name: "Quantum gates",
    color: theme.palette.green,
    contrastColor: theme.palette.common.white,
    gates: [
      {
        name: "SX",
        qubits: 1,
        title: "Lorem ipsum",
        desc: "Lorem ipsum",
      },
      {
        name: "SX+",
        qubits: 1,
        title: "Lorem ipsum",
        desc: "Lorem ipsum",
      },
      {
        name: "Y",
        qubits: 1,
        title: "Lorem ipsum",
        desc: "Lorem ipsum",
      },
      {
        name: "RX",
        qubits: 1,
        title: "Lorem ipsum",
        desc: "Lorem ipsum",
      },
      {
        name: "RY",
        qubits: 1,
        title: "Lorem ipsum",
        desc: "Lorem ipsum",
      },
      {
        name: "U",
        qubits: 1,
        title: "Lorem ipsum",
        desc: "Lorem ipsum",
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
        title: gate.title,
        desc: gate.desc,
      };
    });
  });
  return res;
};

export default gates;
