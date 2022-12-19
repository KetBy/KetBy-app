import React, { Suspense } from "react";
import { Typography } from "@mui/material";
import theme from "../themes/default";

const InfoI = React.lazy(() => import("./gates/I"));
const InfoX = React.lazy(() => import("./gates/X"));
const InfoCX = React.lazy(() => import("./gates/CX"));
const InfoTfl = React.lazy(() => import("./gates/Tfl"));
const InfoSWAP = React.lazy(() => import("./gates/SWAP"));

const InfoH = React.lazy(() => import("./gates/H"));

const GateInfoWrapper = ({ info }) => {
  return (
    <Suspense
      fallback={
        <Typography variant="body2" sx={{}}>
          Loading...
        </Typography>
      }
    >
      {info}
    </Suspense>
  );
};

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
        desc: <GateInfoWrapper info={<InfoI />} />,
      },
      {
        name: "X",
        qubits: 1,
        title: "NOT gate",
        desc: <GateInfoWrapper info={<InfoX />} />,
      },
      {
        name: "CX",
        qubits: 2,
        title: "Controlled NOT gate",
        desc: <GateInfoWrapper info={<InfoCX />} />,
        qubitsNames: ["target", "control"],
      },
      {
        name: "Tfl",
        qubits: 3,
        title: "Toffoli gate",
        desc: <GateInfoWrapper info={<InfoTfl />} />,
        qubitsNames: ["target", "control 1", "control 2"],
      },
      {
        name: "SWAP",
        qubits: 2,
        title: "SWAP gate",
        desc: <GateInfoWrapper info={<InfoSWAP />} />,
        qubitsNames: ["qubit 1", "qubit 2"],
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
        desc: <GateInfoWrapper info={<InfoH />} />,
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
        qubitsNames: gate.qubitsNames,
      };
    });
  });
  return res;
};

export default gates;
