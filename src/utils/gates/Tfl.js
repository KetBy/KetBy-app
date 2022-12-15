import { Typography, Divider } from "@mui/material";
import LatexFigure from "../../components/LatexFigure";
import Ket1 from "../definitions/Ket1";

export default function Tfl(props) {
  return (
    <>
      <Typography variant="body2" className="inline-latex-wrapper">
        The <i>Toffoli</i> gate (also known as <i>Tfl</i> or <i>CCX</i>) acts on
        three qubits: two <b>controls</b> and one <b>target</b>. <br />
        It performs a <i>NOT</i> operation (also known as <i>X</i>) on the{" "}
        <b>target</b> qubit if and only if both <b>control</b> qubits are in
        state <Ket1 />.
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
