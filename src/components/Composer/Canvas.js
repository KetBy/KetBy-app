import * as React from "react";
import {
  Box,
  Grid,
  Typography,
  ButtonGroup,
  Button,
  Breadcrumbs,
  Chip,
  IconButton,
} from "@mui/material";
import Latex from "react-latex-next";
import theme from "../../themes/default";
import gates, { gatesMap as getGatesMap } from "../../utils/gates";
import Gate from "./Gate";
import PhaseDisk from "./PhaseDisk";

import Draggable from "react-draggable";

import generateCanvasMatrix from "../../utils/generateCanvasMatrix";
import regenerateCircuit from "../../utils/regenerateCircuit";

import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import RedoRoundedIcon from "@mui/icons-material/RedoRounded";

const gatesMap = getGatesMap();
const rowHeight = 5;

{
  /**
   * Given the row and column of the first qubit of an instruction
   * find the coordinates of the instruction in terms of canvas cells
   */
}
const getInstructionPosition = (row, col) => {
  return {
    x: parseInt(theme.spacing(1)) + col * parseInt(theme.spacing(6)),
    y: parseInt(theme.spacing(0.5)) + row * parseInt(theme.spacing(5)),
  };
};

{
  /**
   * Given the amount of pixels (x, y) by which a gate has been moved,
   * find out by how many cells the gate has been moved
   */
}
const convertPxToGridDelta = (x, y) => {
  return {
    x: x / parseInt(theme.spacing(6)),
    y: y / parseInt(theme.spacing(5)),
  };
};

{
  /** The qubits buttons on the left side of the circuit */
}
const Left = ({ circuit, setCircuit }) => {
  return (
    <Box
      sx={{
        width: theme.spacing(11),
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
                    borderRadius: 0,
                  }}
                >
                  <Latex>{`$\\sf{Q_{${i}}}$`}</Latex>
                </Button>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  pl: 1,
                  textAlign: "center",
                  color: theme.palette.darkGrey.main,
                }}
              >
                <Latex>{`$\\mathsf{\\ket{0}}$`}</Latex>
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
              borderRadius: 0,
            }}
          >
            +
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

{
  /** The circuit canvas */
}
const Circuit = ({ circuit, setCircuit }) => {
  let matrix = generateCanvasMatrix(circuit.instructions);

  console.log(circuit.instructions);
  console.log(matrix);

  const handleDrag = (e, ui) => {
    let delta = convertPxToGridDelta(ui.x, ui.y);
    console.log(
      "Instruction " +
        ui.node.dataset.instructionIndex +
        ` moving by {${delta.x}, ${delta.y}}`
    );
  };

  const handleStop = (e, ui) => {
    let delta = convertPxToGridDelta(ui.x, ui.y);
    let instructionIndex = ui.node.dataset.instructionIndex;
    console.log(
      "Instruction " + instructionIndex + ` moved by {${delta.x}, ${delta.y}}`
    );
    /*
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
    */
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: `calc(${theme.spacing(0.5)} + ${
          circuit.meta.qubits
        } * ${theme.spacing(5)})`,
        padding: theme.spacing(0.5, 1, 2),
      }}
    >
      {/* Display the horizontal stripes */}
      {[...Array(circuit.meta.qubits)].map((_, i) => {
        return (
          <Box
            sx={{
              position: "absolute",
              minWidth: "100%",
              height: "2px",
              display: "block",
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
              axis={instruction.qubits.length == 1 ? "both" : "y"}
              bounds={{
                top:
                  -parseInt(theme.spacing(5)) *
                  Math.min.apply(Math, instruction.qubits),
                bottom:
                  parseInt(theme.spacing(5)) *
                  (circuit.meta.qubits -
                    Math.max.apply(Math, instruction.qubits) -
                    1),
                right:
                  parseInt(theme.spacing(6)) * (matrix[0].length - colIndex),
                left: -parseInt(theme.spacing(6)) * colIndex,
              }}
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
      {[...Array(matrix[0].length - 1)].map((_, i) => {
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

{
  /** The phase disks on the right side of the circuit */
}
const Right = ({ circuit }) => {
  return (
    <Box
      sx={{
        width: theme.spacing(7),
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
            <PhaseDisk
              probability={(i * 0.25) % 1}
              phase={(i * 60) % 360}
              purity={0.5 + ((i * 0.25) % 0.75)}
            />
          </Box>
        );
      })}
    </Box>
  );
};

const Graph1 = (props) => {
  return (
    <Grid
      item
      xs={6}
      sx={{
        borderRight: `1px solid ${theme.palette.grey[200]}`,
      }}
    >
      <Grid
        container
        sx={{
          p: 1,
          borderBottom: `1px solid ${theme.palette.grey[200]}`,
          height: theme.spacing(6),
        }}
        alignItems="center"
      >
        <Grid item xs={8}>
          <Grid container>
            <Typography variant="subtitle1">Statevector</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "right",
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "stretch",
              justifyContent: "right",
            }}
          >
            buttons
          </Grid>
        </Grid>
      </Grid>
      <Box
        sx={{
          p: 1,
          height: `calc(2/5 * (100vh - (${
            theme.constants.menuHeight
          }px + ${theme.spacing(6)} + ${theme.spacing(1.5)} + ${theme.spacing(
            6
          )} + ${theme.spacing(6)})))`,
          overflowY: "auto",
        }}
      >
        {[...Array(20)].map((_, __) => {
          return <Box key={__}>Lorem ipsum</Box>;
        })}
      </Box>
    </Grid>
  );
};

const Graph2 = (props) => {
  return (
    <Grid item xs={6}>
      <Grid
        container
        sx={{
          p: 1,
          borderBottom: `1px solid ${theme.palette.grey[200]}`,
          height: theme.spacing(6),
        }}
        alignItems="center"
      >
        <Grid item xs={8}>
          <Grid container>
            <Typography variant="subtitle1">Bloch sphere</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "right",
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "stretch",
              justifyContent: "right",
            }}
          >
            buttons
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Canvas = (props) => {
  const { startCircuit, sidebarCollapsed, setSidebarCollapsed } = props;

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
        <Grid item xs={8}>
          <Grid container>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <Typography variant="subtitle1">New Quantum Project</Typography>
              <Typography variant="subtitle2">My circuit #1</Typography>
            </Breadcrumbs>
            <Chip
              label="Log in to save"
              size="small"
              variant="outlined"
              sx={{ ml: 2 }}
            />
          </Grid>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "right",
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "stretch",
              justifyContent: "right",
            }}
          >
            <IconButton
              onClick={() => {}}
              size="small"
              sx={{
                borderRadius: 0,
              }}
              disableTouchRipple
            >
              <UndoRoundedIcon />
            </IconButton>
            <IconButton
              onClick={() => {}}
              size="small"
              sx={{
                borderRadius: 0,
              }}
              disableTouchRipple
              disabled
            >
              <RedoRoundedIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                setSidebarCollapsed(!sidebarCollapsed);
              }}
              size="small"
              sx={{
                borderRadius: 0,
              }}
              disableTouchRipple
            >
              {sidebarCollapsed ? (
                <KeyboardDoubleArrowLeftRoundedIcon />
              ) : (
                <KeyboardDoubleArrowRightRoundedIcon />
              )}
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      {/* Container of the canvas, left and right */}
      <Grid
        container
        sx={{
          height: `calc(3/5 * (100vh - (${
            theme.constants.menuHeight
          }px + ${theme.spacing(6)} + ${theme.spacing(1)})))`,
          borderBottom: `1px solid ${theme.palette.grey[200]}`,
          overflowY: "auto",
          position: "relative",
          py: 1,
        }}
      >
        <Grid item width="auto">
          <Left circuit={circuit} setCircuit={setCircuit} />
        </Grid>
        <Grid
          item
          xs
          sx={{
            overflowX: "auto",
          }}
        >
          <Circuit circuit={circuit} setCircuit={setCircuit} />
        </Grid>
        <Grid item width="auto">
          <Right circuit={circuit} />
        </Grid>
      </Grid>
      {/* Container of the graphical representations */}
      <Grid container>
        <Graph1 />
        <Graph2 />
      </Grid>
    </Box>
  );
};

export default Canvas;
