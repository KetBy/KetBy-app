import * as React from "react";
import { Typography, Divider, Box } from "@mui/material";
import LatexFigure from "../../components/LatexFigure";
import { GateTitle } from "../../components/Composer/Gate";
import { gatesMap } from "../gates";

const gates = gatesMap();

export default function SX(props) {
  return (
    <>
      <Typography variant="body2" align="justify">
        The name of this gate is due to the fact that two successive{" "}
        <GateTitle gate={gates["SX"]} /> gates have the effect of a single{" "}
        <GateTitle gate={gates["X"]} />:{" "}
        <LatexFigure inline input="\sqrt{X}(\sqrt{X}\ket{\phi})=X\ket{\phi}" />.
      </Typography>
      <Divider sx={{ mt: 1 }} />
      <Typography variant="subtitle2" align="center" mt={1}>
        Matrix representation
      </Typography>
      <LatexFigure
        input="\frac{1}{2} \begin{bmatrix} 1+i & 1-i \\ 1-i & 1+i \end{bmatrix}"
        sx={{ margin: "0.5rem auto", display: "block" }}
      />
    </>
  );
}
