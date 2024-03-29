import * as React from "react";
import { Typography, Divider } from "@mui/material";
import LatexFigure from "../../components/LatexFigure";
import { GateTitle } from "../../components/Composer/Gate";
import { gatesMap } from "../gates";

const gates = gatesMap();

export default function S(props) {
  return (
    <>
      <Typography variant="body2" align="justify">
        The <GateTitle gate={gates["S"]} /> gate (a.k.a.{" "}
        <GateTitle gate={gates["Z"]} title="√Z" />) is a{" "}
        <GateTitle gate={gates["P"]} />
        -gate with <LatexFigure inline input="\phi = \frac{\pi}{2}" />. <br />
        The <GateTitle gate={gates["Z"]} title="√Z" /> name is given by the fact
        that two successive <GateTitle gate={gates["S"]} /> gates have the
        effect of a single <GateTitle gate={gates["Z"]} /> gate:{" "}
        <LatexFigure inline input="S(S\ket{\phi})=Z\ket{\phi}" />.
      </Typography>
      <Divider sx={{ mt: 1 }} />
      <Typography variant="subtitle2" align="center" mt={1}>
        Matrix representation
      </Typography>
      <LatexFigure
        input="\begin{bmatrix} 1 & 0 \\ 0 & e^{\frac{i\pi}{2}} \end{bmatrix}"
        sx={{ margin: "0.5rem auto", display: "block" }}
      />
    </>
  );
}
