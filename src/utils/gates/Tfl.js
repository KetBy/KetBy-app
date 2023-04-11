import { Typography, Divider } from "@mui/material";
import LatexFigure from "../../components/LatexFigure";
import Ket1 from "../definitions/Ket1";
import { GateTitle } from "../../components/Composer/Gate";
import { gatesMap } from "../gates";

const gates = gatesMap();

export default function Tfl(props) {
  return (
    <>
      <Typography variant="body2" align="justify">
        The <GateTitle gate={gates["Tfl"]} /> gate (also known as <i>Tfl</i> or{" "}
        <i>CCX</i>) acts on three qubits: two <b>controls</b> and one{" "}
        <b>target</b>. <br />
        It performs a <i>NOT</i> operation (also known as{" "}
        <GateTitle gate={gates["X"]} />) on the <b>target</b> qubit if and only
        if both <b>control</b> qubits are in state <Ket1 />.
      </Typography>
      <Divider sx={{ mt: 1 }} />
      <Typography variant="subtitle2" align="center" mt={1}>
        Matrix representation
      </Typography>
      <LatexFigure
        input="\begin{bmatrix} 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 \\ 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0  \\ 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 \\ 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 \\ 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 \end{bmatrix}"
        sx={{ margin: "0.5rem auto", display: "block" }}
      />
    </>
  );
}
