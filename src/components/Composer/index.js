import * as React from "react";
import { Box, Grid } from "@mui/material";
import "katex/dist/katex.min.css";
import Canvas from "./Canvas";
import GatesDirectory from "./GatesDirectory";
import parseInstructionsString from "../../utils/parseInstructionsString";
import generateCanvasMatrix from "../../utils/generateCanvasMatrix";

export default function Composer() {
  const startCircuit = {
    meta: {
      qubits: 4,
      bits: 0,
    },
    instructions: parseInstructionsString(
      "S[0]; H[1]; T+[2]; I[2]; CX[1,2]; X[1]; Tfl[1,0,3]; X[2]; I[0]; I[1]; I[1]; X[0]; S+[0];"
    ),
  };

  return (
    <Box sx={{ userSelect: "none" }}>
      <Grid container>
        <Grid item width="auto">
          <GatesDirectory />
        </Grid>
        <Grid item xs>
          <Canvas startCircuit={startCircuit} />
        </Grid>
      </Grid>
    </Box>
  );
}
