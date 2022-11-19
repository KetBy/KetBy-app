import * as React from "react";
import { Box, Grid, Typography, ButtonGroup, Button } from "@mui/material";
import { InlineMath } from "react-katex";
import theme from "../../themes/default";
import gates, { gatesMap as getGatesMap } from "../../utils/gates";
import Gate from "./Gate";
import Draggable from "react-draggable";
import generateCanvasMatrix from "../../utils/generateCanvasMatrix";
import regenerateCircuit from "../../utils/regenerateCircuit";

const gatesMap = getGatesMap();
const rowHeight = 5;

const getInstructionPosition = (row, col) => {
  return {
    x: parseInt(theme.spacing(1)) + col * parseInt(theme.spacing(6)),
    y: parseInt(theme.spacing(0.5)) + row * parseInt(theme.spacing(5)),
  };
};

const convertDeltaToPos = (x, y) => {
  return {
    x: x / parseInt(theme.spacing(6)),
    y: y / parseInt(theme.spacing(5)),
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
                  color: theme.palette.darkGrey.main,
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

  console.log(circuit.instructions);
  console.log(matrix);

  const handleDrag = (e, ui) => {
    let delta = convertDeltaToPos(ui.x, ui.y);
    console.log(
      "Instruction " +
        ui.node.dataset.instructionIndex +
        ` moving by {${delta.x}, ${delta.y}}`
    );
  };

  const handleStop = (e, ui) => {
    let delta = convertDeltaToPos(ui.x, ui.y);
    let instructionIndex = ui.node.dataset.instructionIndex;
    console.log(
      "Instruction " + instructionIndex + ` moved by {${delta.x}, ${delta.y}}`
    );
    let newCircuit = regenerateCircuit(
      circuit,
      instructionIndex,
      delta.x,
      delta.y
    );
    setCircuit({
      ...circuit,
      instructions: newCircuit.instructions,
    });
  };

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
              background: theme.palette.darkGrey.main,
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

          if (instruction.qubits.length > 1) {
            // If it is a control cell
            if (instruction.qubits[0] !== rowIndex) {
              return null;
            }
          }

          return (
            <Draggable
              key={`instruction--${rowIndex}-${instructionIndex}--wrapper`}
              grid={[parseInt(theme.spacing(6)), parseInt(theme.spacing(5))]}
              onDrag={handleDrag}
              onStop={handleStop}
              defaultClassNameDragging="dragging"
            >
              <Box
                sx={{
                  position: "absolute",
                  display: "block",
                  top: `${instructionPos.y}px`,
                  left: `${instructionPos.x}px`,
                }}
                {...{ "data-instruction-index": instructionIndex }}
              >
                <Gate
                  gate={gatesMap[instruction.gate]}
                  qubits={instruction.qubits}
                  currentQubit={rowIndex}
                />
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
      <Grid
        container
        sx={{
          p: 1,
          borderBottom: `1px solid ${theme.palette.grey[200]}`,
          height: theme.spacing(6),
        }}
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography variant="subtitle1">Quantum Circuit</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          my: 1,
        }}
      >
        <Grid item width="auto">
          <Left circuit={circuit} setCircuit={setCircuit} />
        </Grid>
        <Grid
          item
          xs
          sx={{
            overflow: "auto",
          }}
        >
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
