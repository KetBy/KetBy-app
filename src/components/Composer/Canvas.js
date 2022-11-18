import * as React from "react";
import { Box, Grid, Typography, ButtonGroup, Button } from "@mui/material";
import { InlineMath } from "react-katex";
import theme from "../../themes/default";
import gates, { gatesMap as getGatesMap } from "../../utils/gates";
import Gate from "./Gate";
import Draggable from "react-draggable";
import generateCanvasMatrix from "../../utils/generateCanvasMatrix";

const gatesMap = getGatesMap();
const rowHeight = 5;

const getInstructionPosition = (row, col) => {
  return {
    x: parseInt(theme.spacing(1)) + col * parseInt(theme.spacing(6)),
    y: parseInt(theme.spacing(0.5)) + row * parseInt(theme.spacing(5)),
  };
};

const Left = ({ circuit, setCircuit }) => {
  return (
    <Box
      sx={{
        width: theme.spacing(12),
        px: 1,
      }}
    >
      {[...Array(circuit.meta.qubits)].map((_, i) => {
        return (
          <Box
            key={`left--row-${i}`}
            sx={{
              height: theme.spacing(rowHeight),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    width: "100%",
                    minWidth: "100%",
                  }}
                >
                  <InlineMath math={`\\mathsf{Q_{${i}}}`} />
                </Button>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  textAlign: "right",
                  color: theme.palette.primary.dark,
                }}
              >
                <InlineMath math={`\\mathsf{\\ket{0}}`} />
              </Grid>
            </Grid>
          </Box>
        );
      })}

      <Grid container>
        <Grid item xs={6}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              setCircuit({
                ...circuit,
                meta: {
                  ...circuit.meta,
                  qubits: circuit.meta.qubits + 1,
                },
              });
            }}
            sx={{
              minWidth: "100%",
              marginTop: "5px",
            }}
          >
            +
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const Circuit = ({ circuit, setCircuit }) => {
  let matrix = generateCanvasMatrix(circuit.instructions);
  console.log(matrix);
  console.log(circuit.instructions);
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      {/* Display the horizontal stripes */}
      {[...Array(circuit.meta.qubits)].map((_, i) => {
        return (
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "2px",
              background: theme.palette.grey[300],
              left: 0,
              top: `calc(${theme.spacing(
                rowHeight / 2
              )} + ${i} * ${theme.spacing(rowHeight)})`,
              zIndex: 0,
            }}
            key={`horizontal-stripe-${i}`}
          />
        );
      })}
      {/* Display the gates */}
      {matrix.map((row, rowIndex) => {
        return row.map((instructionIndex, colIndex) => {
          if (instructionIndex === null || instructionIndex === -1) {
            return null;
          }
          let instruction = circuit.instructions[instructionIndex];
          let instructionPos = getInstructionPosition(rowIndex, colIndex);
          return (
            <Draggable
              key={`instruction--${rowIndex}-${instructionIndex}--wrapper`}
              grid={[parseInt(theme.spacing(6)), parseInt(theme.spacing(5))]}
            >
              <Box
                sx={{
                  position: "absolute",
                  display: "block",
                  top: `${instructionPos.y}px`,
                  left: `${instructionPos.x}px`,
                }}
              >
                <Gate gate={gatesMap[instruction.gate]} />
              </Box>
            </Draggable>
          );
        });
      })}
      {/* Display the vertical striples */}
      {[...Array(matrix[0].length)].map((_, i) => {
        return (
          <Box
            sx={{
              position: "absolute",
              width: "1px",
              height: `calc(${theme.spacing(0.5)} + ${
                circuit.meta.qubits
              } * ${theme.spacing(5)})`,
              background: theme.palette.grey[200],
              top: 0,
              left: `calc(${i + 1} * ${theme.spacing(6)} - 1px)`,
              zIndex: -1,
            }}
            key={`vertical-stripe-${i}`}
          />
        );
      })}
    </Box>
  );
};

const Right = ({ circuit }) => {
  return (
    <Box
      sx={{
        width: theme.spacing(5),
      }}
    >
      right
    </Box>
  );
};

const Canvas = (props) => {
  const { startCircuit } = props;

  const [circuit, setCircuit] = React.useState(startCircuit);

  return (
    <Box>
      <Box
        sx={{
          p: 1,
          borderBottom: `1px solid ${theme.palette.grey[200]}`,
        }}
      >
        <Typography variant="subtitle1">Quantum Circuit</Typography>
      </Box>
      <Grid
        container
        sx={{
          my: 1,
        }}
      >
        <Grid item width="auto">
          <Left circuit={circuit} setCircuit={setCircuit} />
        </Grid>
        <Grid item xs>
          <Circuit circuit={circuit} setCircuit={setCircuit} />
        </Grid>
        <Grid item width="auto">
          <Right circuit={circuit} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Canvas;
