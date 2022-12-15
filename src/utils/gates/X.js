import { Typography, Divider } from "@mui/material";
import LatexFigure from "../../components/LatexFigure";
import Ket0 from "../definitions/Ket0";
import Ket1 from "../definitions/Ket1";

export default function X(props) {
  return (
    <>
      <Typography variant="body2">
        The <i>NOT</i> gate (also known as <i>Pauli X</i> gate) flips the state{" "}
        <Ket0 /> to <Ket1 /> and vice versa.
      </Typography>
      <Divider sx={{ mt: 1 }} />
      <Typography variant="subtitle2" align="center" mt={1}>
        Matrix representation
      </Typography>
      <LatexFigure
        input="\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}"
        sx={{ margin: "0.5rem auto", display: "block" }}
      />
    </>
  );
}
