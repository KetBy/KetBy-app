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
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Alert,
} from "@mui/material";
import Link from "next/link";
import dynamic from "next/dynamic";
import theme from "../../themes/default";
import gates, { gatesMap as getGatesMap } from "../../utils/gates";
import Gate from "./Gate";
import PhaseDisk from "./PhaseDisk";
import LatexFigure from "../LatexFigure";
import CustomCircularProgress from "./../custom/CircularProgress";
import CustomLinearProgress from "./../custom/LinearProgress";
import axios from "../../utils/axios";
import { useAppContext } from "../../utils/context";

import Draggable from "react-draggable";

import generateCanvasMatrix from "../../utils/generateCanvasMatrix";
import regenerateCircuit from "../../utils/regenerateCircuit";

import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import RedoRoundedIcon from "@mui/icons-material/RedoRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import ViewModuleOutlinedIcon from "@mui/icons-material/ViewModuleOutlined";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import ForkRightRoundedIcon from "@mui/icons-material/ForkRightRounded";
import TagRoundedIcon from "@mui/icons-material/TagRounded";
import AddRounded from "@mui/icons-material/AddRounded";
import RemoveRounded from "@mui/icons-material/RemoveRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import { LoadingButton } from "@mui/lab";

const ProbabilitiesChart = dynamic(() => import("./ProbabilitiesChart.js"), {
  loading: () => (
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        width: "100%",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          display: "block",
          textAlign: "center",
          flex: 1,
        }}
      >
        Rendering...
      </Typography>
    </Box>
  ),
});
const StatevectorChart = dynamic(() => import("./StatevectorChart.js"), {
  loading: () => (
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        width: "100%",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          display: "block",
          textAlign: "center",
          flex: 1,
        }}
      >
        Rendering...
      </Typography>
    </Box>
  ),
});
const ResultsChart = dynamic(() => import("./ResultsChart.js"), {
  loading: () => (
    <Box>
      <Typography
        variant="body2"
        sx={{
          display: "block",
          textAlign: "center",
          flex: 1,
        }}
      >
        Rendering...
      </Typography>
    </Box>
  ),
});

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

const RowButton = ({ index, circuit, setCircuit, project }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    if (project.permissions < 2) return;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteQubit = (qubit) => {
    let newInstructions = circuit.instructions.slice();
    newInstructions = newInstructions.filter(function (obj) {
      return !obj.qubits.includes(qubit);
    });
    newInstructions.map((instruction, index) => {
      for (let i = 0; i < instruction.qubits.length; i++) {
        if (instruction.qubits[i] > qubit) {
          newInstructions[index].qubits[i] -= 1;
        }
      }
    });
    setCircuit({
      ...circuit,
      instructions: newInstructions,
      meta: {
        ...circuit.meta,
        qubits: circuit.meta.qubits - 1,
      },
    });
    handleClose();
  };

  const handleAddQubitAbove = (qubit) => {
    // Add a qubit above
    let newInstructions = circuit.instructions.slice();
    newInstructions.map((instruction, index) => {
      for (let i = 0; i < instruction.qubits.length; i++) {
        if (instruction.qubits[i] >= qubit) {
          newInstructions[index].qubits[i] += 1;
        }
      }
    });
    setCircuit({
      ...circuit,
      instructions: newInstructions,
      meta: {
        ...circuit.meta,
        qubits: circuit.meta.qubits + 1,
      },
    });
    handleClose();
  };

  const handleAddQubitBelow = (qubit) => {
    // Add a qubit below
    let newInstructions = circuit.instructions.slice();
    newInstructions.map((instruction, index) => {
      for (let i = 0; i < instruction.qubits.length; i++) {
        if (instruction.qubits[i] > qubit) {
          newInstructions[index].qubits[i] += 1;
        }
      }
    });
    setCircuit({
      ...circuit,
      instructions: newInstructions,
      meta: {
        ...circuit.meta,
        qubits: circuit.meta.qubits + 1,
      },
    });
    handleClose();
  };

  return (
    <>
      <Tooltip
        title={
          <>
            Manage qubit Q<sub>{index}</sub>
          </>
        }
        placement="left"
      >
        <Button
          variant="outlined"
          size="small"
          sx={{
            width: theme.spacing(4.25),
            height: theme.spacing(4.25),
            minWidth: 0,
            minHeight: 0,
            borderRadius: 0,
            borderWidth: "2px !important",
            borderColor: `${theme.palette.primary.main} !important`,
            color: theme.palette.darkGrey.main,
          }}
          onClick={handleClick}
          disabled={project.permissions < 2}
        >
          <span>
            Q<sub>{index}</sub>
          </span>
        </Button>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableAutoFocusItem
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          ml: 1,
          "& .ketby-Paper-root": {
            borderTopLeftRadius: "2px",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleAddQubitAbove(index);
          }}
        >
          <ListItemIcon>
            <ArrowUpwardRoundedIcon
              sx={{
                fontSize: "1.25rem",
              }}
            />
          </ListItemIcon>
          <Typography variant="body2">Add qubit above</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleAddQubitBelow(index);
          }}
        >
          <ListItemIcon>
            <ArrowDownwardRoundedIcon
              sx={{
                fontSize: "1.25rem",
              }}
            />
          </ListItemIcon>
          <Typography variant="body2">Add qubit below</Typography>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleDeleteQubit(index);
          }}
          disabled={circuit.meta.qubits === 1}
        >
          <ListItemIcon>
            <DeleteOutlineRoundedIcon
              sx={{
                fontSize: "1.25rem",
                color: theme.palette.error.main,
              }}
            />
          </ListItemIcon>
          <Typography variant="body2" color="error">
            Delete qubit
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

const BitsButton = ({ circuit, setCircuit, project }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const increaseBits = () => {
    if (circuit.meta.bits >= 32) return;
    setCircuit({
      ...circuit,
      meta: { ...circuit.meta, bits: circuit.meta.bits + 1 },
    });
  };

  const decreaseBits = () => {
    if (circuit.meta.bits <= 0) return;
    // Remove all measurements involving the last bit
    let newInstructions = circuit.instructions.slice();
    newInstructions = newInstructions.filter(function (obj) {
      return !obj.bits || !obj.bits.includes(circuit.meta.bits - 1);
    });
    setCircuit({
      ...circuit,
      instructions: newInstructions,
      meta: {
        ...circuit.meta,
        bits: circuit.meta.bits - 1,
      },
    });
  };

  return (
    <>
      <Tooltip title="Manage bits" placement="left">
        <Button
          variant="outlined"
          size="small"
          sx={{
            width: theme.spacing(4.25),
            height: theme.spacing(4.25),
            minWidth: 0,
            minHeight: 0,
            borderRadius: 0,
            borderWidth: "2px !important",
            borderColor: `${theme.palette.primary.main} !important`,
            color: theme.palette.darkGrey.main,
            marginTop: `calc(${theme.spacing(1)} - 2px)`,
          }}
          onClick={handleClick}
        >
          <span>{circuit.meta.bits}</span>
        </Button>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableAutoFocusItem
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          ml: 1,
        }}
      >
        <MenuItem
          onClick={() => {}}
          sx={{ background: "white !important" }}
          disableTouchRipple
        >
          <ListItemIcon>
            <TagRoundedIcon
              sx={{
                fontSize: "1.25rem",
              }}
            />
          </ListItemIcon>
          <Typography variant="body2">
            Number of bits{" "}
            {project.permissions == 2 && (
              <IconButton
                size="small"
                sx={{ mr: 1 }}
                onClick={() => {
                  decreaseBits();
                }}
                disabled={circuit.meta.bits === 0}
              >
                <RemoveRounded />
              </IconButton>
            )}
            <b>{circuit.meta.bits}</b>
            {project.permissions == 2 && (
              <IconButton
                size="small"
                sx={{ ml: 1 }}
                disabled={circuit.meta.bits >= 32}
                onClick={() => {
                  increaseBits();
                }}
              >
                <AddRounded />
              </IconButton>
            )}
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

{
  /** The qubits buttons on the left side of the circuit */
}
const Left = ({ circuit, setCircuit, project }) => {
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
            <Grid container alignItems="center">
              <Grid item xs={12}>
                <RowButton
                  index={i}
                  circuit={circuit}
                  setCircuit={setCircuit}
                  project={project}
                />
              </Grid>
            </Grid>
          </Box>
        );
      })}
      <Grid container>
        <Grid item xs={6}>
          <Tooltip title="Add a new qubit" placement="left">
            <Button
              size="small"
              variant="outlined"
              disabled={project.permissions < 2 || circuit.meta.qubits >= 32}
              onClick={() => {
                if (circuit.meta.qubits >= 32) return;
                setCircuit({
                  ...circuit,
                  meta: {
                    ...circuit.meta,
                    qubits: circuit.meta.qubits + 1,
                  },
                });
              }}
              sx={{
                width: theme.spacing(4.25),
                height: theme.spacing(4.25),
                minWidth: 0,
                minHeight: 0,
                borderRadius: 0,
                borderWidth: "2px !important",
                borderColor: `${theme.palette.primary.main} !important`,
                color: theme.palette.darkGrey.main,
                marginTop: `calc(${theme.spacing(1)} - 5px)`,
              }}
            >
              +
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
      {/* Bits button */}
      <Grid container>
        <Grid item xs={6}>
          <BitsButton
            circuit={circuit}
            setCircuit={setCircuit}
            project={project}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

{
  /** The circuit canvas */
}
const Circuit = ({ circuit, setCircuit, project }) => {
  let { matrix, colMap } = generateCanvasMatrix(
    circuit.instructions,
    circuit.meta.qubits
  );

  const [renderCount, setRenderCount] = React.useState(1);
  const [previewRenderCount, setPreviewRenderCount] = React.useState(0);
  const defaultInsTransf = [];
  const [insTransf, setInsTransf] = React.useState(defaultInsTransf);
  const [dragging, setDragging] = React.useState(false);
  const [disableDragging, setDisableDragging] = React.useState(
    project.permissions < 2 ? true : false
  );

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
    // let oldInstructionIndex = newCircuit.meta.oldInstructionIndex;
    // let newInstructionIndex = newCircuit.meta.newInstructionIndex;
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
          userSelect: "none",
        }}
        key={`render--${renderCount}`}
      >
        <Grid container>
          <Grid
            item
            sx={{
              width: theme.spacing(4),
            }}
          >
            {/* Display the initial kets */}
            {[...Array(circuit.meta.qubits)].map((_, i) => {
              return (
                <Box
                  key={i}
                  sx={{
                    pl: 1,
                    textAlign: "center",
                    color: theme.palette.darkGrey.main,

                    height: theme.spacing(5),
                    display: "grid",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box>
                    <LatexFigure input="\sf\ket{0}" inline />
                  </Box>
                </Box>
              );
            })}
          </Grid>
          <Grid
            item
            sx={{
              ml: 2,
              position: "relative",
              width: `calc(100% - ${theme.spacing(4)} - ${theme.spacing(2)})`,
            }}
          >
            {/* Display the vertical stripes */}
            {[...Array(Math.max(matrix[0].length - 1, 0))].map((_, i) => {
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
                    zIndex: 0,
                  }}
                  key={`vertical-stripe-${i}`}
                />
              );
            })}
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
            {/* Display the bits stripes */}
            <>
              <Box
                sx={{
                  position: "absolute",
                  width: `calc(${matrix[0].length} * ${theme.spacing(6)})`,
                  minWidth: "100%",
                  height: "2px",
                  display: "block",
                  background: theme.palette.darkGrey.main,
                  left: 0,
                  top: `calc(${theme.spacing(rowHeight / 2)} + ${
                    circuit.meta.qubits + 1
                  } * ${theme.spacing(rowHeight)} - 3px)`,
                  zIndex: 0,
                }}
                key={`bit-stripe-0`}
              />
              <Box
                sx={{
                  position: "absolute",
                  width: `calc(${matrix[0].length} * ${theme.spacing(6)})`,
                  minWidth: "100%",
                  height: "2px",
                  display: "block",
                  background: theme.palette.darkGrey.main,
                  left: 0,
                  top: `calc(${theme.spacing(rowHeight / 2)} + ${
                    circuit.meta.qubits + 1
                  } * ${theme.spacing(rowHeight)} + 1px)`,
                  zIndex: 0,
                }}
                key={`bit-stripe-1`}
              />
            </>
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
                    grid={[
                      parseInt(theme.spacing(6)),
                      parseInt(theme.spacing(5)),
                    ]}
                    onDrag={handleDrag}
                    onStop={handleStop}
                    defaultClassNameDragging="dragging"
                    axis={"both"}
                    disabled={project.permissions < 2 || disableDragging}
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
                        parseInt(theme.spacing(6)) *
                        (matrix[0].length - colIndex),
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
                        bits={instruction.bits}
                        currentQubit={rowIndex}
                        uid={instruction.uid}
                        circuit={circuit}
                        setCircuit={setCircuit}
                        instructionIndex={instructionIndex}
                        setDisableDragging={setDisableDragging}
                        project={project}
                      />
                    </Box>
                  </Draggable>
                );
              });
            })}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

{
  /** The phase disks on the right side of the circuit */
}
const Right = ({ circuit, statistics, statisticsLoading }) => {
  return (
    <Box
      sx={{
        width: theme.spacing(1),
      }}
    />
  );
  return (
    <Box
      sx={{
        width: theme.spacing(6),
        px: 1,
        opacity:
          statisticsLoading || !statistics || !statistics.qubits ? 0.5 : 1,
        transitionDuration: "0.2s",
      }}
    >
      {[...Array(circuit.meta.qubits)].map((_, i) => {
        return (
          <Box
            key={`right--row-${i}`}
            sx={{
              height: theme.spacing(rowHeight),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PhaseDisk
              probability={
                statistics && statistics.qubits && statistics.qubits[i]
                  ? statistics.qubits[i].probability_1
                  : 0
              }
              phase={
                statistics && statistics.qubits && statistics.qubits[i]
                  ? statistics.qubits[i].phase
                  : 0
              }
              purity={0}
              key={`phase-disk--${i}`}
            />
          </Box>
        );
      })}
    </Box>
  );
};

const Graph1 = ({
  toggleGraphsMobileOpen,
  project,
  activeFile,
  files,
  updateCount,
  statistics,
  probabilitiesError,
  loading,
}) => {
  return (
    <Grid
      item
      xs={6}
      sx={{
        borderRight: {
          xs: "none",
          md: `1px solid ${theme.palette.grey[200]}`,
        },
        position: "relative",
        maxWidth: {
          xs: "100%",
          md: "50%",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          top: `calc(${theme.spacing(6)} - 1px)`,
          left: 0,
          transitionDuration: "0.2s",
        }}
      >
        {loading && <CustomLinearProgress small={1} />}
      </Box>
      <Grid
        container
        sx={{
          p: 1,
          borderBottom: `1px solid ${theme.palette.grey[200]}`,
          height: theme.spacing(6),
          background: theme.palette.primary[50],
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid item xs={8} md={8}>
          <Typography variant="subtitle1">Probabilities</Typography>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            justifyContent: "end",
            display: "flex",
          }}
        >
          <Typography variant="subtitle1">
            <IconButton
              size="small"
              sx={{
                borderRadius: 0,
                display: {
                  xs: "inline-flex",
                  md: "none",
                },
              }}
              disableTouchRipple
              onClick={() => {
                toggleGraphsMobileOpen();
              }}
            >
              <ClearRoundedIcon />
            </IconButton>
          </Typography>
        </Grid>
      </Grid>
      <Box
        sx={{
          p: 1,
          height: {
            xs: `calc(2.5/5 * (100vh - (${
              theme.constants.menuHeight
            }px + ${theme.spacing(6)} + ${theme.spacing(1.5)} + ${theme.spacing(
              6
            )} + ${theme.spacing(6)})))`,
            md: `calc(2/5 * (100vh - (${
              theme.constants.menuHeight
            }px + ${theme.spacing(6)} + ${theme.spacing(1.5)} + ${theme.spacing(
              6
            )} + ${theme.spacing(6)})))`,
          },
          overflowY: "auto",
        }}
      >
        {statistics &&
        statistics.probabilities &&
        statistics.probabilities.length > 0 &&
        !probabilitiesError ? (
          <ProbabilitiesChart probabilities={statistics.probabilities} />
        ) : (
          <>
            {!loading && (
              <Box
                sx={{
                  textAlign: "center",
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Typography
                  align="center"
                  variant="body2"
                  sx={{
                    color: theme.palette.red.dark,
                    margin: "0 auto",
                    lineHeight: 1,
                    p: 3,
                  }}
                >
                  {probabilitiesError
                    ? probabilitiesError
                    : "Outcome probabilities are computed for circuits that have at least one classical qubit, and up to 5 qubits and 5 classical bits."}
                </Typography>
              </Box>
            )}
          </>
        )}
      </Box>
    </Grid>
  );
};

const Graph2 = ({
  toggleGraphsMobileOpen,
  project,
  activeFile,
  files,
  updateCount,
  statistics,
  statevectorError,
  loading,
}) => {
  const PhasesCircle = (props) => {
    return (
      <Box sx={{ px: 1.5, py: 2 }}>
        <Box
          sx={{
            width: "48px",
            height: "48px",
            borderRadius: "24px",
            backgroundImage: `conic-gradient(${theme.palette.purple.main}, ${theme.palette.primary.main}, ${theme.palette.warning.light}, ${theme.palette.error.main}, ${theme.palette.purple.main})`,
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              zIndex: 1,
              width: "36px",
              height: "36px",
              background: "white",
              top: "6px",
              left: "6px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <Typography
            sx={{
              fontSize: "0.75rem",
              letterSpacing: 0,
              right: 0,
              fontWeight: 600,
              top: "50%",
              position: "absolute",
              transform: `translate(10px, -50%)`,
              color: theme.palette.text.secondary,
            }}
          >
            0
          </Typography>
          <Typography
            sx={{
              fontSize: "0.6rem",
              letterSpacing: 0,
              left: "50%",
              fontWeight: 600,
              top: "-20px",
              position: "absolute",
              color: theme.palette.text.secondary,
              zIndex: 2,
              transform: `translate(-50%, 0)`,
            }}
          >
            <sup>π</sup>/<sub>2</sub>
          </Typography>
          <Typography
            sx={{
              fontSize: "0.75rem",
              letterSpacing: 0,
              left: 0,
              fontWeight: 600,
              top: "50%",
              position: "absolute",
              transform: `translate(-10px, -50%)`,
              color: theme.palette.text.secondary,
            }}
          >
            π
          </Typography>
          <Typography
            sx={{
              fontSize: "0.6rem",
              letterSpacing: 0,
              left: "50%",
              fontWeight: 600,
              bottom: "-20px",
              position: "absolute",
              color: theme.palette.text.secondary,
              zIndex: 2,
              transform: `translate(-50%, 0)`,
            }}
          >
            <sup>3π</sup>/<sub>2</sub>
          </Typography>
          <Typography
            sx={{
              fontSize: "0.6rem",
              letterSpacing: 0,
              left: "50%",
              fontWeight: 600,
              top: "50%",
              position: "absolute",
              color: theme.palette.text.secondary,
              zIndex: 2,
              transform: `translate(-50%, -50%)`,
            }}
          >
            phase
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Grid
      item
      xs={6}
      sx={{
        position: "relative",
        maxWidth: {
          xs: "100%",
          md: "50%",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          top: `calc(${theme.spacing(6)} - 1px)`,
          left: 0,
          transitionDuration: "0.2s",
        }}
      >
        {loading && <CustomLinearProgress small={1} />}
      </Box>
      <Grid
        container
        sx={{
          px: 1,
          borderBottom: `1px solid ${theme.palette.grey[200]}`,
          borderTop: {
            xs: `1px solid ${theme.palette.grey[200]}`,
            md: "none",
          },
          height: theme.spacing(6),
          background: theme.palette.primary[50],
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
          ></Grid>
        </Grid>
      </Grid>
      <Box
        sx={{
          p: 1,
          height: {
            xs: `calc(2.5/5 * (100vh - (${
              theme.constants.menuHeight
            }px + ${theme.spacing(6)} + ${theme.spacing(1.5)} + ${theme.spacing(
              6
            )} + ${theme.spacing(6)})))`,
            md: `calc(2/5 * (100vh - (${
              theme.constants.menuHeight
            }px + ${theme.spacing(6)} + ${theme.spacing(1.5)} + ${theme.spacing(
              6
            )} + ${theme.spacing(6)})))`,
          },
          overflowY: "auto",
        }}
      >
        {statistics && statistics.statevector && !statevectorError ? (
          <>
            <Grid
              container
              spacing={2}
              sx={{
                display: "flex",
                alignItems: "center",
                height: `calc(100% + ${theme.spacing(2)})`,
              }}
            >
              <Grid
                item
                xs
                sx={{
                  width: `calc(100% - 100px)`,
                  height: `100%`,
                }}
              >
                <StatevectorChart statevector={statistics.statevector} />
              </Grid>
              <Grid
                item
                xs="auto"
                sx={{ display: "flex", alignSelf: "center" }}
              >
                <PhasesCircle />
              </Grid>
            </Grid>
            <Box
              sx={{
                background: theme.palette.grey[50],
                color: theme.palette.grey[700],
                p: 2,
                mt: 2,
                borderRadius: `${theme.shape.borderRadius}px`,
                boxShadow: theme.shadowsCustom[2],
              }}
            >
              <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                <Box
                  component="span"
                  sx={{
                    color: theme.palette.darkGrey.main,
                  }}
                >
                  {statistics.statevector.dump}
                </Box>
              </Typography>
            </Box>
          </>
        ) : (
          <>
            {!loading && (
              <Box
                sx={{
                  textAlign: "center",
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Typography
                  align="center"
                  variant="body2"
                  sx={{
                    color: theme.palette.red.dark,
                    margin: "0 auto",
                    lineHeight: 1,
                    p: 3,
                  }}
                >
                  {statevectorError
                    ? statevectorError
                    : "The statevector is computed for circuits with up to 5 qubits and 5 classical bits."}
                </Typography>
              </Box>
            )}
          </>
        )}
      </Box>
    </Grid>
  );
};

const Canvas = (props) => {
  const {
    circuit,
    setCircuit,
    sidebarCollapsed,
    setSidebarCollapsed,
    status,
    project,
    files,
    activeFile,
    setActiveFile,
    setGatesDirectoryOpenMobile,
    setSidebarOpenMobile,
    newFileDrawerOpen,
    toggleFileDrawer,
    updateCount,
    undoList,
    setUndoList,
    redoList,
    setRedoList,
    handleUndo,
  } = props;

  const FileSelector = (props) => {
    const { files, activeFile, project, toggleFileDrawer } = props;

    // console.log(files);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <>
        <Tooltip title="Browse files">
          <Typography
            variant="subtitle2"
            aria-label="files"
            id="file-selector-button"
            aria-controls={open ? "file-selector" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Box
              component="span"
              sx={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                maxWidth: {
                  xs: theme.spacing(6),
                  md: theme.spacing(12),
                },
              }}
            >
              {activeFile.title}
            </Box>
            <KeyboardArrowDownIcon
              sx={{
                fontSize: (theme) => theme.spacing(2),
              }}
            />
          </Typography>
        </Tooltip>
        <Menu
          id="file-selector"
          MenuListProps={{
            "aria-labelledby": "file-selector-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: 200,
              width: 200,
            },
          }}
          sx={{
            "& .ketby-Paper-root": {
              marginTop: theme.spacing(1),
              minWidth: 180,
              color:
                theme.palette.mode === "light"
                  ? "rgb(55, 65, 81)"
                  : theme.palette.grey[300],
              boxShadow:
                "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
              "& .ketby-Menu-list": {
                padding: "4px 0",
              },
              "& .ketby-MenuItem-root": {
                "& .ketby-SvgIcon-root": {
                  fontSize: 18,
                  color: theme.palette.text.secondary,
                  marginRight: theme.spacing(1.5),
                },
              },
            },
          }}
        >
          {project.permissions == 2 && (
            <MenuItem
              key={"new-file"}
              onClick={() => {
                toggleFileDrawer();
                handleClose();
              }}
              sx={{ background: "white !important" }}
            >
              <PostAddOutlinedIcon />
              Create a new file
            </MenuItem>
          )}
          {Object.entries(files).map(([index, file]) => {
            return (
              <MenuItem
                key={index}
                onClick={handleClose}
                component={Link}
                href={`/composer/${project.token}/${file.file_index}`}
                disableRipple
                sx={{
                  background:
                    file.file_index == activeFile.file_index
                      ? `${theme.palette.primary[50]} !important`
                      : "white !important",
                }}
              >
                <ArticleOutlinedIcon />
                {file.title}
              </MenuItem>
            );
          })}
        </Menu>
      </>
    );
  };

  const [graphsMobileOpen, setGraphsMobileOpen] = React.useState(false);

  const toggleGraphsMobileOpen = () => {
    setGraphsMobileOpen(!graphsMobileOpen);
  };

  const [statistics, setStatistics] = React.useState(null);
  const [statisticsLoading, setStatisticsLoading] = React.useState(true);
  const [probabilitiesError, setProbabilitiesError] = React.useState(null);
  const [statevectorError, setStatevectorError] = React.useState(null);

  // Get the statistics (probabilities, phase disks etc)
  React.useEffect(() => {
    if (updateCount < 1) return;
    setStatisticsLoading(true);
    axios
      .get(`/project/${project.token}/${activeFile.file_index}/stats`)
      .then((res) => {
        if (res.data.success) {
          setStatistics({
            probabilities: res.data.results.probabilities,
            qubits: res.data.results.qubits,
            statevector: res.data.results.statevector,
          });
          setProbabilitiesError(null);
          setStatevectorError(null);
        } else {
          setProbabilitiesError(res.data.message);
          setStatevectorError(res.data.message);
          setStatistics(null);
        }
        setStatisticsLoading(false);
      })
      .catch((err) => {
        setProbabilitiesError("Something went wrong. Please try again later.");
        setStatevectorError("Something went wrong. Please try again later.");
        setStatistics(null);
        setStatisticsLoading(false);
      });
  }, [updateCount]);

  const { setForkProjectModal, setForkProjectModalOpen } = useAppContext();

  const handleOpenFork = () => {
    setForkProjectModal(project);
    setForkProjectModalOpen(true);
  };

  const [runModalOpen, setRunModalOpen] = React.useState(false);

  const handleRun = () => {
    setRunModalOpen(true);
  };

  const RunModal = (props) => {
    const [selectedRun, setSelectedRun] = React.useState(null);
    const [runsError, setRunsError] = React.useState(null);

    const [shots, setShots] = React.useState(1000);
    const [running, setRunning] = React.useState(false);

    const [fetchingRuns, setFetchingRuns] = React.useState(true);
    const [runs, setRuns] = React.useState({});

    const [refetchRuns, setRefetchRuns] = React.useState(0);

    React.useEffect(() => {
      if (!runModalOpen) return;
      axios
        .get(`/project/${project.token}/${activeFile.file_index}/run`)
        .then((res) => {
          if (res.data.success) {
            setRuns(res.data.runs);
            setRunsError(null);
          } else {
            setRunsError(res.data.message ?? "Something went wrong.");
          }
          setFetchingRuns(false);
        })
        .catch((err) => {
          setRunsError(
            (err.response && err.response.data && err.response.data.message) ??
              "Something went wrong."
          );
          setFetchingRuns(false);
        });
    }, [refetchRuns]);

    const handleRun = (e) => {
      setRunning(true);
      axios
        .post(`/project/${project.token}/${activeFile.file_index}/run`, {
          shots: shots,
        })
        .then((res) => {
          if (res.data.success) {
            setSelectedRun(res.data.run.run_index);
            setRunsError(null);
          } else {
            setRunsError(res.data.message ?? "Something went wrong.");
          }
          setRunning(false);
        })
        .catch((err) => {
          setRunsError(
            (err.response && err.response.data && err.response.data.message) ??
              "Something went wrong."
          );
          setRunning(false);
        });
    };

    const RunWrapper = (props) => {
      const [run, setRun] = React.useState(null);
      const [fetchingRun, setFetchingRun] = React.useState(true);

      React.useEffect(() => {
        if (!selectedRun) return;
        axios
          .get(
            `/project/${project.token}/${activeFile.file_index}/run/${selectedRun}`
          )
          .then((res) => {
            if (res.data.success) {
              setRun(res.data.run);
              setRunsError(null);
            } else {
              setRunsError(res.data.message ?? "Something went wrong.");
            }
            setFetchingRun(false);
          })
          .catch((err) => {
            setRunsError(
              (err.response &&
                err.response.data &&
                err.response.data.message) ??
                "Something went wrong."
            );
            setFetchingRun(false);
          });
      }, []);

      return (
        <>
          {fetchingRun ? (
            <Box>
              <CustomCircularProgress />
            </Box>
          ) : (
            <>
              <ResultsChart results={run.results} shots={run.shots} />
              <Typography variant="body2" sx={{ mt: 1 }}>
                Simulated <i>{run.created_at_formatted}</i> with {run.shots}{" "}
                shots.
              </Typography>
            </>
          )}
        </>
      );
    };

    return (
      <Dialog
        open={runModalOpen}
        onClose={() => {
          setRunModalOpen(false);
        }}
        aria-labelledby="run-modal-title"
        aria-describedby="run-modal-description"
        maxWidth="xs"
      >
        {selectedRun != null ? (
          <>
            <DialogTitle id="run-modal-title">
              Run #{selectedRun} |{" "}
              <b>
                <i>{activeFile.title}</i>
              </b>
            </DialogTitle>
            <DialogContent sx={{ width: { xs: "80vw", md: "400px" } }}>
              <Grid container spacing={1} rowSpacing={2} alignItems="end">
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSelectedRun(null);
                      setRefetchRuns(refetchRuns + 1);
                      setFetchingRuns(true);
                    }}
                    size="small"
                    startIcon={<KeyboardArrowLeftRoundedIcon />}
                  >
                    Back to runs list
                  </Button>
                </Grid>
                {Boolean(runsError) && (
                  <Grid item xs={12}>
                    <Alert
                      severity="error"
                      sx={{ boxShadow: (theme) => theme.shadowsCustom[2] }}
                    >
                      {runsError}
                    </Alert>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <RunWrapper />
                </Grid>
              </Grid>
            </DialogContent>
          </>
        ) : (
          <>
            <DialogTitle id="run-modal-title">
              Run{" "}
              <b>
                <i>{activeFile.title}</i>
              </b>
            </DialogTitle>
            <DialogContent sx={{ width: { xs: "80vw", md: "400px" } }}>
              <Grid container spacing={1} rowSpacing={2} alignItems="end">
                <Grid item xs={6}>
                  <TextField
                    label="Shots"
                    onChange={(e) => {
                      setShots(e.target.value);
                      setRunsError(null);
                    }}
                    value={shots}
                    placeholder="1 - 10.000"
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <LoadingButton
                    variant="contained"
                    size="large"
                    fullWidth
                    startIcon={<PlayArrowRoundedIcon sx={{ mr: -0.5 }} />}
                    sx={{ maxHeight: "40px" }}
                    loading={running}
                    onClick={handleRun}
                  >
                    Run
                  </LoadingButton>
                </Grid>
                {Boolean(runsError) && (
                  <Grid item xs={12}>
                    <Alert
                      severity="error"
                      sx={{ boxShadow: (theme) => theme.shadowsCustom[2] }}
                    >
                      {runsError}
                    </Alert>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    Previous runs
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {fetchingRuns ? (
                    <Box>
                      <CustomCircularProgress />
                    </Box>
                  ) : (
                    <>
                      {runs.length > 0 ? (
                        <List>
                          {runs.map((run, index) => {
                            return (
                              <ListItem
                                key={run.run_index}
                                disablePadding
                                secondaryAction={
                                  <Typography variant="body2">
                                    {run.created_at}
                                  </Typography>
                                }
                                sx={{
                                  py: 1,
                                  px: 1,
                                  mx: -1,
                                  width: `calc(100% + ${theme.spacing(2)})`,
                                  borderRadius: (theme) =>
                                    `${theme.shape.borderRadius}px`,
                                  transitionDuration: "0.2s",
                                  "&:hover": {
                                    background: (theme) =>
                                      theme.palette.grey[100],
                                  },
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: (theme) =>
                                      theme.palette.primary.main,
                                    cursor: "pointer",
                                    fontWeight: 600,
                                  }}
                                  onClick={() => {
                                    setSelectedRun(run.run_index);
                                    setRunsError(null);
                                  }}
                                >
                                  #{run.run_index} - {run.shots} shots
                                </Typography>
                              </ListItem>
                            );
                          })}
                        </List>
                      ) : (
                        <>
                          <Typography variant="body2">
                            Your runs will appear here.
                          </Typography>
                        </>
                      )}
                    </>
                  )}
                </Grid>
              </Grid>
            </DialogContent>
          </>
        )}

        <DialogActions
          sx={{
            px: 3,
          }}
        >
          <Button
            onClick={() => {
              setRunModalOpen(false);
            }}
            color="darkGrey"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <>
      <RunModal />
      <Box>
        <Grid
          container
          sx={{
            p: 1,
            borderBottom: `1px solid ${theme.palette.grey[200]}`,
            height: theme.spacing(6),
            background: theme.palette.primary[50],
          }}
          alignItems="center"
        >
          <Grid item xs={6.25}>
            <Grid container>
              <Grid item xs={12}>
                <Grid container>
                  {project.permissions == 2 && (
                    <Grid
                      item
                      sx={{
                        display: {
                          md: "none",
                        },
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          setGatesDirectoryOpenMobile(true);
                        }}
                        size="small"
                        sx={{
                          borderRadius: 0,
                        }}
                        disableTouchRipple
                      >
                        <ViewModuleOutlinedIcon />
                      </IconButton>
                    </Grid>
                  )}
                  <Grid
                    item
                    sx={{
                      ml: {
                        xs: project.permissions == 2 ? 1 : 0,
                        md: 0,
                      },
                      mt: -0.5,
                    }}
                  >
                    <Breadcrumbs
                      separator="›"
                      aria-label="breadcrumb"
                      sx={{
                        "& .ketby-Breadcrumbs-separator": {
                          mx: (theme) => theme.spacing(0.5),
                        },
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          maxWidth: {
                            xs: theme.spacing(10),
                            sm: theme.spacing(13),
                            md: theme.spacing(16),
                          },
                        }}
                      >
                        {project.title}
                      </Typography>
                      <FileSelector
                        files={files}
                        activeFile={activeFile}
                        setActiveFile={setActiveFile}
                        project={project}
                        toggleFileDrawer={toggleFileDrawer}
                      />
                    </Breadcrumbs>
                    <Typography
                      variant="body2"
                      sx={{
                        ml: 0,
                        mt: -1,
                        fontStyle: "italic",
                        color: (theme) => theme.palette.grey[500],
                      }}
                    >
                      {status}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={5.75}
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
                onClick={() => {
                  toggleGraphsMobileOpen();
                }}
                size="small"
                sx={{
                  borderRadius: 0,
                  display: {
                    xs: "auto",
                    md: "none",
                  },
                }}
                disableTouchRipple
                aria-label="Open graphs"
              >
                <BarChartRoundedIcon />
              </IconButton>
              {project.permissions == 2 && (
                <Tooltip title="Undo">
                  <IconButton
                    onClick={handleUndo}
                    size="small"
                    sx={{
                      borderRadius: 0,
                      display: "none",
                    }}
                    disableTouchRipple
                    disabled={undoList.length == 0 || false}
                  >
                    <UndoRoundedIcon />
                  </IconButton>
                </Tooltip>
              )}
              {project.permissions == 2 && (
                <Tooltip title="Redo">
                  <IconButton
                    onClick={() => {}}
                    size="small"
                    sx={{
                      borderRadius: 0,
                      display: "none",
                    }}
                    disableTouchRipple
                    disabled={redoList.length == 0}
                  >
                    <RedoRoundedIcon />
                  </IconButton>
                </Tooltip>
              )}
              {project.permissions == 2 && (
                <Tooltip title="Fork">
                  <IconButton
                    onClick={handleOpenFork}
                    size="small"
                    sx={{
                      borderRadius: 0,
                    }}
                    disableTouchRipple
                  >
                    <ForkRightRoundedIcon />
                  </IconButton>
                </Tooltip>
              )}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mx: 0.5,
                }}
              >
                <Tooltip
                  title={
                    project.permissions == 2
                      ? "Run the circuit"
                      : "Fork the project"
                  }
                >
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={
                      project.permissions == 2 ? (
                        <PlayArrowRoundedIcon sx={{ mr: -0.5 }} />
                      ) : (
                        <ForkRightRoundedIcon sx={{ mr: -0.5 }} />
                      )
                    }
                    sx={{
                      display: {
                        xs: "none",
                        md: "inline-flex",
                      },
                    }}
                    onClick={() => {
                      if (project.permissions == 2) {
                        handleRun();
                      } else {
                        handleOpenFork();
                      }
                    }}
                  >
                    {project.permissions == 2 ? "Run" : "Fork to Edit & Run"}
                  </Button>
                </Tooltip>
                <Tooltip
                  title={
                    project.permissions == 2
                      ? "Run the circuit"
                      : "Fork the project"
                  }
                >
                  <IconButton
                    size="small"
                    variant="contained"
                    sx={{
                      color: "white",
                      background: (theme) =>
                        `${theme.palette.primary.main} !important`,
                      display: {
                        md: "none",
                      },
                    }}
                    onClick={() => {
                      if (project.permissions == 2) {
                        handleRun();
                      } else {
                        handleOpenFork();
                      }
                    }}
                  >
                    {project.permissions == 2 ? (
                      <PlayArrowRoundedIcon />
                    ) : (
                      <ForkRightRoundedIcon />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
              <Tooltip title="Toggle sidebar" placement="bottom-end">
                <IconButton
                  onClick={() => {
                    setSidebarCollapsed(!sidebarCollapsed);
                  }}
                  size="small"
                  sx={{
                    borderRadius: 0,
                    display: {
                      xs: "none",
                      md: "inline-flex",
                    },
                  }}
                  disableTouchRipple
                >
                  {sidebarCollapsed ? (
                    <KeyboardDoubleArrowLeftRoundedIcon />
                  ) : (
                    <KeyboardDoubleArrowRightRoundedIcon />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="Toggle sidebar" placement="bottom-end">
                <IconButton
                  onClick={() => {
                    setSidebarOpenMobile(true);
                  }}
                  size="small"
                  sx={{
                    borderRadius: 0,
                    display: {
                      md: "none",
                    },
                  }}
                  disableTouchRipple
                >
                  <MenuRoundedIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
        {/* Container of the canvas, left and right */}
        <Grid
          container
          sx={{
            height: {
              xs: `auto`,
              md: `calc(3/5 * (100vh - (${
                theme.constants.menuHeight
              }px + ${theme.spacing(6)} + ${theme.spacing(1)})))`,
            },
            borderBottom: {
              xs: "none",
              md: `1px solid ${theme.palette.grey[200]}`,
            },
            overflowY: "auto",
            position: "relative",
            py: 1,
          }}
        >
          <Grid item width="auto">
            <Left circuit={circuit} setCircuit={setCircuit} project={project} />
          </Grid>
          <Grid
            item
            xs
            sx={{
              overflowX: "auto",
            }}
          >
            <Circuit
              circuit={circuit}
              setCircuit={setCircuit}
              project={project}
            />
          </Grid>
          <Grid item width="auto">
            <Right
              circuit={circuit}
              statistics={statistics}
              statisticsLoading={statisticsLoading}
            />
          </Grid>
        </Grid>
        {/* Container of the graphical representations */}
        <Grid
          container
          sx={{
            background: "white",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            display: {
              xs: graphsMobileOpen ? "auto" : "none",
              md: "flex",
            },
            position: {
              xs: "fixed",
              md: "relative",
            },
            width: "100%",
            height: {
              xs: `calc(100vh - ${
                theme.constants.menuHeight
              }px - ${theme.spacing(6)})`,
              md: "auto",
            },
            top: {
              xs: `calc(${theme.constants.menuHeight}px + ${theme.spacing(6)})`,
              md: "auto",
            },
            zIndex: 499,
          }}
        >
          <Graph1
            toggleGraphsMobileOpen={toggleGraphsMobileOpen}
            project={project}
            activeFile={activeFile}
            updateCount={updateCount}
            files={files}
            statistics={statistics}
            probabilitiesError={probabilitiesError}
            loading={statisticsLoading}
          />
          <Graph2
            toggleGraphsMobileOpen={toggleGraphsMobileOpen}
            project={project}
            activeFile={activeFile}
            updateCount={updateCount}
            files={files}
            statistics={statistics}
            statevectorError={statevectorError}
            loading={statisticsLoading}
          />
        </Grid>
      </Box>
    </>
  );
};

export default Canvas;
