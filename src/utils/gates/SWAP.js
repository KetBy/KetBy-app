import { Typography, Divider } from "@mui/material";
import LatexFigure from "../../components/LatexFigure";
import { GateTitle } from "../../components/Composer/Gate";
import { gatesMap } from "../gates";

const gates = gatesMap();

export default function SWAP(props) {
  return (
    <>
      <Typography variant="body2" align="justify">
        The <GateTitle gate={gates["SWAP"]} /> gate swaps the states of two
        qubits.
      </Typography>
      <Divider sx={{ mt: 1 }} />
      <Typography variant="subtitle2" align="center" mt={1}>
        Matrix representation
      </Typography>
      <LatexFigure
        input="\begin{bmatrix} 1 & 0 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}"
        sx={{ margin: "0.5rem auto", display: "block" }}
      />
    </>
  );
}
