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
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

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
                    width: theme.spacing(4),
                    height: theme.spacing(4),
                    minWidth: 0,
                    minHeight: 0,
                    borderRadius: 0,
                    borderWidth: "2px !important",
                    borderColor: `${theme.palette.darkGrey.main} !important`,
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
              width: theme.spacing(4),
              height: theme.spacing(4),
              minWidth: 0,
              minHeight: 0,
              borderRadius: 0,
              borderWidth: "2px !important",
              borderColor: `${theme.palette.darkGrey.main} !important`,
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

{
  /** The circuit canvas */
}
const Circuit = ({ circuit, setCircuit }) => {
  let { matrix, colMap } = generateCanvasMatrix(
    circuit.instructions,
    circuit.meta.qubits
  );
  const [renderCount, setRenderCount] = React.useState(1);
  const [previewRenderCount, setPreviewRenderCount] = React.useState(0);

  const defaultInsTransf = [];
  const [insTransf, setInsTransf] = React.useState(defaultInsTransf);

  const [dragging, setDragging] = React.useState(false);

  // console.log(circuit);
  // console.log(matrix);

  const handleDrag = (e, ui) => {
    let delta = convertPxToGridDelta(ui.x, ui.y);
    let instructionIndex = parseInt(ui.node.dataset.instructionIndex);
    let colIndex = parseInt(ui.node.dataset.columnIndex);
    let rowIndex = parseInt(ui.node.dataset.rowIndex);
    setDragging(circuit.instructions[instructionIndex].uid);
    // Compute the new circuit to simulate the circuit in case the user 'drops' the instruction
    let newCircuit = regenerateCircuit(
      circuit,
      matrix,
      instructionIndex,
      rowIndex,
      colIndex,
      delta.x,
      delta.y
    );
    let oldInstructionIndex = newCircuit.meta.oldInstructionIndex;
    let newInstructionIndex = newCircuit.meta.newInstructionIndex;
    // console.log(oldInstructionIndex, newInstructionIndex);
    // console.log(newCircuit);
    let simulation = generateCanvasMatrix(
      newCircuit.instructions,
      newCircuit.meta.qubits
    );
    let newMatrix = simulation.matrix;
    let newColMap = simulation.colMap;
    let newInsTransf = [];
    for (let i = 0; i < circuit.instructions.length; i++) {
      let uid = circuit.instructions[i].uid;
      if (colMap[uid] !== "undefined" && newColMap[uid] !== "undefined") {
        if (newColMap[uid] != colMap[uid]) {
          newInsTransf.push({
            uid: uid,
            x: (newColMap[uid] - colMap[uid]) * parseInt(theme.spacing(6)),
            y:
              i === instructionIndex ? delta.y * parseInt(theme.spacing(5)) : 0,
          });
        } else {
          newInsTransf.push({
            uid: uid,
            x: 0,
            y:
              i === instructionIndex ? delta.y * parseInt(theme.spacing(5)) : 0,
          });
        }
      }
    }
    setInsTransf(newInsTransf);
    setPreviewRenderCount(previewRenderCount + 1);
  };

  const handleStop = (e, ui) => {
    setDragging(false);
    let delta = convertPxToGridDelta(ui.x, ui.y);
    if (delta.x === 0 && delta.y === 0) {
      return;
    }
    let instructionIndex = parseInt(ui.node.dataset.instructionIndex);
    let colIndex = parseInt(ui.node.dataset.columnIndex);
    let rowIndex = parseInt(ui.node.dataset.rowIndex);
    let newCircuit = regenerateCircuit(
      circuit,
      matrix,
      instructionIndex,
      rowIndex,
      colIndex,
      delta.x,
      delta.y
    );
    setCircuit(newCircuit);
    setRenderCount(renderCount + 1);
    setInsTransf(defaultInsTransf);
  };

  return (
    <>
      <style>
        {insTransf.map((ins, key) => {
          return `.canvas-instruction-wrapper[data-uid="${ins.uid}"]{transform:translate(${ins.x}px, ${ins.y}px)!important}`;
        })}
      </style>
      {dragging !== false && (
        <style>{`.canvas-instruction-wrapper:not([data-uid="${dragging}"]) .gate .border:hover{display:none !important;}`}</style>
      )}
      <Box
        sx={{
          position: "relative",
        }}
        key={`render--${renderCount}`}
      >
        {/* Display the horizontal stripes */}
        {[...Array(circuit.meta.qubits)].map((_, i) => {
          return (
            <Box
              sx={{
                position: "absolute",
                width: `calc(${matrix[0].length} * ${theme.spacing(6)})`,
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
            if (instructionIndex === null || instructionIndex < 0) {
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
                axis="both"
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
                defaultClassName={`canvas-instruction-wrapper`}
              >
                <Box
                  sx={{
                    position: "absolute",
                    display: "block",
                    top: `${instructionPos.y}px`,
                    left: `${instructionPos.x}px`,
                    transitionDuration: "0.1s",
                  }}
                  {...{
                    "data-instruction-index": instructionIndex,
                    "data-uid": instruction.uid,
                    "data-column-index": colIndex,
                    "data-row-index": rowIndex,
                  }}
                >
                  <Gate
                    gate={gatesMap[instruction.gate]}
                    qubits={instruction.qubits}
                    currentQubit={rowIndex}
                    uid={instruction.uid}
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
    </>
  );
};

{
  /** The phase disks on the right side of the circuit */
}
const Right = ({ circuit }) => {
  return (
    <Box
      sx={{
        width: theme.spacing(6),
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mx: 0.5,
              }}
            >
              <Button
                size="small"
                variant="contained"
                startIcon={<PlayArrowRoundedIcon sx={{ mr: -0.5 }} />}
              >
                Run
              </Button>
            </Box>
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
