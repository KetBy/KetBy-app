import { Typography, Divider } from "@mui/material";
import LatexFigure from "../../components/LatexFigure";
import Ket1 from "../definitions/Ket1";
import { GateTitle } from "../../components/Composer/Gate";
import { gatesMap } from "../gates";

const gates = gatesMap();

export default function CX(props) {
  return (
    <>
      <Typography variant="body2" align="justify">
        The <i>Controlled</i> <GateTitle gate={gates["X"]} /> gate (a.k.a.{" "}
        <i>Controlled CNOT</i> or <GateTitle gate={gates["CX"]} />) acts on a
        pair of qubits: a <b>control</b> and a <b>target</b>. <br />
        It performs a <i>NOT</i> operation (also known as{" "}
        <GateTitle gate={gates["X"]} />) on the <b>target</b> qubit if and only
        if the <b>control</b> qubit is in state <Ket1 />.
      </Typography>
      <Divider sx={{ mt: 1 }} />
      <Typography variant="subtitle2" align="center" mt={1}>
        Matrix representation
      </Typography>
      <LatexFigure
        input="\begin{bmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 0 & 1 \\ 0 & 0 & 1 & 0 \end{bmatrix}"
        sx={{ margin: "0.5rem auto", display: "block" }}
      />
    </>
  );
}
