import { Typography, Divider } from "@mui/material";
import LatexFigure from "../../components/LatexFigure";
import { GateTitle } from "../../components/Composer/Gate";
import { gatesMap } from "../gates";

const gates = gatesMap();

export default function Z(props) {
  return (
    <>
      <Typography variant="body2" align="justify">
        The <GateTitle gate={gates["Z"]} /> gate (a.k.a. <i>Pauli</i>{" "}
        <GateTitle gate={gates["Z"]} /> gate) performs a rotation of{" "}
        <LatexFigure inline input="\pi" /> radians around the Z axis.
        Alternatively, <LatexFigure inline input="Z = P(\pi)" />.
      </Typography>
      <Divider sx={{ mt: 1 }} />
      <Typography variant="subtitle2" align="center" mt={1}>
        Matrix representation
      </Typography>
      <LatexFigure
        input="\begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix}"
        sx={{ margin: "0.5rem auto", display: "block" }}
      />
    </>
  );
}
