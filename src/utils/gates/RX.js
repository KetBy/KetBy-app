import * as React from "react";
import { Typography, Divider, Box } from "@mui/material";
import LatexFigure from "../../components/LatexFigure";
import { GateTitle } from "../../components/Composer/Gate";
import { gatesMap } from "../gates";

const gates = gatesMap();

export default function RX(props) {
  return (
    <>
      <Typography variant="body2" align="justify">
        The <GateTitle gate={gates["RX"]} /> gate is a parameterised
        single-qubit gate that performs a rotation of{" "}
        <LatexFigure inline input="\theta" /> around the X axis of the Bloch
        sphere.
      </Typography>
      <Divider sx={{ mt: 1 }} />
      <Typography variant="subtitle2" align="center" mt={1}>
        Matrix representation
      </Typography>
      <LatexFigure
        input="\textbf{R}_\textbf{x}(\theta) = \begin{bmatrix} \cos\frac{\theta}{2} & -i\sin\frac{\theta}{2} \\ -i\sin\frac{\theta}{2} & \cos\frac{\theta}{2} \end{bmatrix}"
        sx={{ margin: "0.5rem auto", display: "block", width: "100%" }}
      />
    </>
  );
}
