import { Typography, Divider } from "@mui/material";
import LatexFigure from "../../components/LatexFigure";
import { GateTitle } from "../../components/Composer/Gate";
import { gatesMap } from "../gates";

const gates = gatesMap();

export default function I(props) {
  return (
    <>
      <Typography variant="body2" align="justify">
        The <i>identity</i> gate (a.k.a. <GateTitle gate={gates["I"]} /> gate)
        is used to indicate the absence of a gate. It has no effect on a qubit
        whatsoever.
      </Typography>
      <Divider sx={{ mt: 1 }} />
      <Typography variant="subtitle2" align="center" mt={1}>
        Matrix representation
      </Typography>
      <LatexFigure
        input="\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}"
        sx={{ margin: "0.5rem auto", display: "block" }}
      />
    </>
  );
}
