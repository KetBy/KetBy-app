import { Typography } from "@mui/material";
import LatexFigure from "../../components/LatexFigure";

export default function SWAP(props) {
  return (
    <>
      <Typography variant="body2">
        The <i>SWAP</i> gate swaps the states of two qubits.
      </Typography>
      <Typography variant="body2" mt={1}>
        Matrix representation:
      </Typography>
      <LatexFigure
        input="\begin{bmatrix} 1 & 0 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \end{bmatrix}"
        sx={{ margin: "0.5rem auto", display: "block" }}
      />
    </>
  );
}
