import { Typography } from "@mui/material";
import LatexFigure from "../../components/LatexFigure";

export default function I(props) {
  return (
    <>
      <Typography variant="body2">
        The <i>identity</i> gate (also known as <i>I</i> gate) indicates the
        absence of a gate. It has no effect on a qubit whatsoever.
      </Typography>
      <Typography variant="body2" mt={1}>
        Matrix representation:
      </Typography>
      <LatexFigure
        input="I = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}"
        sx={{ margin: "0.5rem auto", display: "block" }}
      />
    </>
  );
}