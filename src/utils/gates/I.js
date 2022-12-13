import { Typography } from "@mui/material";
import Latex from "react-latex-next";

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
      <Latex displayMode>
        {"$$I = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$$"}
      </Latex>
    </>
  );
}
