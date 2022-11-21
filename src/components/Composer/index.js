import * as React from "react";
import { Box, Grid } from "@mui/material";
import "katex/dist/katex.min.css";
import Canvas from "./Canvas";
import GatesDirectory from "./GatesDirectory";
import Sidebar from "./Sidebar";
import parseInstructionsString from "../../utils/parseInstructionsString";
import generateCanvasMatrix from "../../utils/generateCanvasMatrix";
import theme from "../../themes/default";

export default function Composer() {
  const startCircuit = {
    meta: {
      qubits: 4,
      bits: 0,
    },
    instructions: parseInstructionsString(
      "S[0]; H[1]; T+[2]; I[2]; CX[0,2]; X[1]; Tfl[1,0,3]; X[2]; I[0]; I[1]; I[1]; X[0]; S+[0]; CX[2,0]"
    ),
  };

  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  return (
    <Box
      sx={{
        userSelect: "none",
      }}
    >
      <Grid
        container
        sx={{
          height: `calc(100vh - ${theme.constants.menuHeight}px) !important`,
          display: "flex",
          alignItems: "stretch",
        }}
      >
        <Grid item width="auto">
          <GatesDirectory />
        </Grid>
        <Grid item xs>
          <Canvas
            startCircuit={startCircuit}
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
          />
        </Grid>
        <Grid item width="auto">
          <Sidebar collapsed={sidebarCollapsed} />
        </Grid>
      </Grid>
    </Box>
  );
}
