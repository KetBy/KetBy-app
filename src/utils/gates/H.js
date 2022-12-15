import * as React from "react";
import { Typography, Divider } from "@mui/material";
import LatexFigure from "../../components/LatexFigure";
import KetPlus from "../definitions/KetPlus";
import KetMinus from "../definitions/KetMinus";
import Ket0 from "../definitions/Ket0";
import Ket1 from "../definitions/Ket1";

export default function H(props) {
  return (
    <>
      <Typography variant="body2">
        The <i>Hadamard</i> gate (also known as <i>H</i> gate) is used to create
        superpositions. <br />
        It rotates the states <Ket0 />
        {" and "}
        <Ket1 />
        {" to "}
        <KetPlus />
        {" and "}
        <KetMinus />, respectively.
      </Typography>
      <Divider sx={{ mt: 1 }} />
      <Typography variant="subtitle2" align="center" mt={1}>
        Matrix representation
      </Typography>
      <LatexFigure
        input="\frac{1}{\sqrt{2}}\begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}"
        sx={{ margin: "0.5rem auto", display: "block" }}
      />
    </>
  );
}
