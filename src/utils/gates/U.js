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
        The <GateTitle gate={gates["U"]} /> gate is the most general
        single-qubit quantum gate. All other single-qubit quantum gates are
        instances of <GateTitle gate={gates["U"]} />. For example,{" "}
        <LatexFigure inline input="H=U(\frac{\pi}{2},0,\pi)" />
        . <br />
        It takes in 3 parameters: <LatexFigure inline input="\theta" /> ,{" "}
        <LatexFigure inline input="\phi" /> and{" "}
        <LatexFigure inline input="\lambda" />.
      </Typography>
      <Divider sx={{ mt: 1 }} />
      <Typography variant="subtitle2" align="center" mt={1}>
        Matrix representation
      </Typography>
      <LatexFigure
        input="U(\theta, \phi, \lambda) = \begin{bmatrix} \cos{(\frac{\theta}{2})} & -e^{i\lambda}\sin{(\frac{\theta}{2})} \\ e^{i\phi}\sin{(\frac{\theta}{2})} & e^{(i\phi+\lambda)}\cos{(\frac{\theta}{2})} \end{bmatrix}"
        sx={{ margin: "0.5rem auto", display: "block", width: "100%" }}
      />
    </>
  );
}
