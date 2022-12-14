import { Typography } from "@mui/material";
import LatexFigure from "../../components/LatexFigure";

export default function X(props) {
  return (
    <>
      <Typography variant="body2">
        The <i>NOT</i> gate (also known as <i>Pauli X</i> gate) flips the state{" "}
        <LatexFigure input="\ket{0}" inline /> to{" "}
        <LatexFigure input="\ket{1}" inline /> and vice versa.
      </Typography>
      <Typography variant="body2" mt={1}>
        Matrix representation:
      </Typography>
      <LatexFigure
        input="\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}"
        sx={{ margin: "0.5rem auto", display: "block" }}
      />
    </>
  );
}
