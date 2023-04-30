import React, { Suspense } from "react";
import { Typography } from "@mui/material";
import theme from "../themes/default";
import LatexFigure from "../components/LatexFigure";

const InfoI = React.lazy(() => import("./gates/I"));
const InfoX = React.lazy(() => import("./gates/X"));
const InfoCX = React.lazy(() => import("./gates/CX"));
const InfoTfl = React.lazy(() => import("./gates/Tfl"));
const InfoSWAP = React.lazy(() => import("./gates/SWAP"));
const InfoH = React.lazy(() => import("./gates/H"));
const InfoS = React.lazy(() => import("./gates/S"));
const InfoSDagger = React.lazy(() => import("./gates/S+"));
const InfoP = React.lazy(() => import("./gates/P"));
const InfoZ = React.lazy(() => import("./gates/Z"));
const InfoY = React.lazy(() => import("./gates/Y"));
const InfoT = React.lazy(() => import("./gates/T"));
const InfoTDagger = React.lazy(() => import("./gates/T+"));
const InfoU = React.lazy(() => import("./gates/U"));

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
    name: "Basic gates",
    color: theme.palette.darkGrey,
    contrastColor: theme.palette.common.white,
    gates: [
      {
        name: "H",
        qubits: 1,
        title: "Hadamard gate",
        desc: <GateInfoWrapper info={<InfoH />} />,
        color: theme.palette.red,
        contrastColor: theme.palette.common.white,
      },
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
    name: "Phase gates",
    color: theme.palette.blue,
    contrastColor: theme.palette.common.white,
    gates: [
      {
        name: "P",
        qubits: 1,
        title: "Phase gate",
        desc: <GateInfoWrapper info={<InfoP />} />,
        parameters: [
          {
            name: "φ",
            title: "Angle φ",
          },
        ],
      },
      {
        name: "Z",
        qubits: 1,
        title: "Z gate",
        desc: <GateInfoWrapper info={<InfoZ />} />,
      },
      {
        name: "S",
        qubits: 1,
        title: "S gate",
        desc: <GateInfoWrapper info={<InfoS />} />,
      },
      {
        name: "S+",
        qubits: 1,
        title: "S† gate",
        desc: <GateInfoWrapper info={<InfoSDagger />} />,
      },
      {
        name: "T",
        qubits: 1,
        title: "T gate",
        desc: <GateInfoWrapper info={<InfoT />} />,
      },
      {
        name: "T+",
        qubits: 1,
        title: "T† gate",
        desc: <GateInfoWrapper info={<InfoTDagger />} />,
      },
      {
        name: "RZ",
        qubits: 1,
        title: "RZ gate",
        desc: "Lorem ipsum",
        parameters: [
          {
            name: "φ",
            title: "Angle φ",
          },
        ],
      },
    ],
  },
  {
    name: "Quantum gates",
    color: theme.palette.green,
    contrastColor: theme.palette.common.white,
    gates: [
      {
        name: "U",
        qubits: 1,
        title: "U gate",
        desc: <GateInfoWrapper info={<InfoU />} />,
        parameters: [
          {
            name: "θ",
            title: "Angle θ",
          },
          {
            name: "φ",
            title: "Angle φ",
          },
          {
            name: "λ",
            title: "Angle λ",
          },
        ],
      },
      {
        name: "Y",
        qubits: 1,
        title: "Y gate",
        desc: <GateInfoWrapper info={<InfoY />} />,
      },
      {
        name: "RX",
        qubits: 1,
        title: "RX gate",
        desc: "Lorem ipsum",
        parameters: [
          {
            name: "φ",
            title: "Angle φ",
          },
        ],
      },
      {
        name: "RY",
        qubits: 1,
        title: "RY gate",
        desc: "Lorem ipsum",
        parameters: [
          {
            name: "φ",
            title: "Angle φ",
          },
        ],
      },
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
    ],
  },
  {
    name: "Utils",
    color: theme.palette.darkGrey,
    contrastColor: theme.palette.common.grey,
    gates: [
      {
        name: "M",
        qubits: 1,
        bits: 1,
        title: "Measurement",
        desc: <>Lorem ipsum</>,
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
        color: gate.color ? gate.color : category.color,
        contrastColor: gate.contrastColor
          ? gate.contrastColor
          : category.contrastColor,
        qubits: gate.qubits,
        bits: gate.bits ? gate.bits : 0,
        title: gate.title,
        desc: gate.desc,
        qubitsNames: gate.qubitsNames,
        parameters: gate.parameters ? gate.parameters : null,
      };
    });
  });
  return res;
};

export default gates;
