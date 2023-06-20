import * as React from "react";
import { Typography, Divider, Box } from "@mui/material";
import LatexFigure from "../../components/LatexFigure";
import { GateTitle } from "../../components/Composer/Gate";
import { gatesMap } from "../gates";

const gates = gatesMap();

export default function SXDagger(props) {
  return (
    <>
      <Typography variant="subtitle2" align="center" mt={1}>
        Matrix representation
      </Typography>
      <LatexFigure
        input="\frac{1}{2} \begin{bmatrix} 1-i & 1+i \\ 1+i & 1-i \end{bmatrix}"
        sx={{ margin: "0.5rem auto", display: "block" }}
      />
    </>
  );
}
