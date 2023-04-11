import * as React from "react";
import { Typography, Divider } from "@mui/material";
import LatexFigure from "../../components/LatexFigure";
import { GateTitle } from "../../components/Composer/Gate";
import { gatesMap } from "../gates";

const gates = gatesMap();

export default function P(props) {
  return (
    <>
      <Typography variant="body2" align="justify">
        The <GateTitle gate={gates["P"]} /> gate is a parametrised gate that
        takes in a value <LatexFigure inline input="\phi" /> and performs a
        rotation of <LatexFigure inline input="\phi" /> around the Z axis.
      </Typography>
      <Divider sx={{ mt: 1 }} />
      <Typography variant="subtitle2" align="center" mt={1}>
        Matrix representation
      </Typography>
      <LatexFigure
        input="P(\phi) = \begin{bmatrix} 1 & 0 \\ 0 & e^{i\phi} \end{bmatrix}"
        sx={{ margin: "0.5rem auto", display: "block" }}
      />
    </>
  );
}
