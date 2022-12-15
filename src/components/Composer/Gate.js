import * as React from "react";
import {
  Box,
  Typography,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
  NativeSelect,
  IconButton,
  Grid,
  Button,
} from "@mui/material";
import theme from "../../themes/default";
import gates, { gatesMap as getGatesMap } from "../../utils/gates";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";

import CX_gate_svg from "../../../public/assets/composer/CX_gate.svg";
import Tfl_gate_svg from "../../../public/assets/composer/Tfl_gate.svg";
import SWAP_gate_svg from "../../../public/assets/composer/SWAP_gate.svg";

const gatesMap = getGatesMap();

const formattedName = (name) => {
  let dagger = "†";
  let sqrt = "√";
  let text = <>{name}</>;
  if (name == "Tfl") {
    text = "Toffoli";
  }
  if (name == "T+" || name == "S+") {
    text = (
      <>
        {name.replace("+", "")}
        <sup>{dagger}</sup>
      </>
    );
  }
  if (name == "SX") {
    text = <>{sqrt}X</>;
  }
  if (name == "SX+") {
    text = (
      <>
        {sqrt}X<sup>{dagger}</sup>
      </>
    );
  }
  return text;
};

const NOTGate = (props) => {
  const { gate } = props;

  return (
    <Box
      sx={{
        width: theme.spacing(4),
        height: theme.spacing(4),
        borderRadius: "50%",
        // border: `2px solid ${gate.color.main}`,
        boxShadow: `inset 0 0 0 2px ${gate.color.main}`,
        background: "transparent",
        border: "2px solid transparent",
        position: "relative",
      }}
    >
      {/* Vertical line */}
      <Box
        sx={{
          position: "absolute",
          width: "2px",
          height: "100%",
          left: "calc(50% - 1px)",
          top: 0,
          background: `${gate.color.main}`,
        }}
      />
      {/* Horizontal line */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "2px",
          top: "calc(50% - 0.5px)",
          background: `${gate.color.main}`,
          opacity: props.hideHorizontalLine ? 0 : 1,
        }}
      />
    </Box>
  );
};

const SWAPGate = (props) => {
  const { gate } = props;

  return (
    <Box
      sx={{
        width: theme.spacing(4),
        height: theme.spacing(4),
        background: "transparent",
        border: "2px solid transparent",
        position: "relative",
      }}
    >
      {/* Primary diagonal */}
      <Box
        sx={{
          position: "absolute",
          width: "2px",
          height: theme.spacing(Math.sqrt((5 ^ 2) + (5 ^ 2))),
          background: gate.color.main,
          transform: "rotate(-45deg)",
          left: "calc(50% - 1px)",
          borderRadius: "2px",
        }}
      />
      {/* Secondary diagonal */}
      <Box
        sx={{
          position: "absolute",
          width: "2px",
          height: theme.spacing(Math.sqrt((5 ^ 2) + (5 ^ 2))),
          background: gate.color.main,
          transform: "rotate(45deg)",
          left: "calc(50% - 1px)",
          borderRadius: "2px",
        }}
      />
    </Box>
  );
};

const Representation = (props) => {
  const { gate, preview } = props;

  if (preview) {
    if (gate.name === "CX") {
      return (
        <Box
          sx={{
            width: theme.spacing(4),
            height: theme.spacing(4),
            background: theme.palette.grey[100],
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid white",
          }}
        >
          <img src={CX_gate_svg.src} height="26" />
        </Box>
      );
    } else if (gate.name === "Tfl") {
      return (
        <Box
          sx={{
            width: theme.spacing(4),
            height: theme.spacing(4),
            background: theme.palette.grey[100],
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid white",
          }}
        >
          <img src={Tfl_gate_svg.src} height="26" />
        </Box>
      );
    } else if (gate.name === "SWAP") {
      return (
        <Box
          sx={{
            width: theme.spacing(4),
            height: theme.spacing(4),
            background: theme.palette.grey[100],
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid white",
          }}
        >
          <img src={SWAP_gate_svg.src} height="26" />
        </Box>
      );
    }
  }

  if (["X", "CX", "Tfl"].includes(gate.name)) {
    return <NOTGate gate={gate} hideHorizontalLine={!preview} />;
  } else if (gate.name === "SWAP") {
    return <SWAPGate gate={gate} />;
  }

  let dagger = "†";
  let sqrt = "√";

  let text = formattedName(gate.name);

  return (
    <Box
      sx={{
        width: theme.spacing(4),
        height: theme.spacing(4),
        background: gate.color.main,
        color: gate.contrastColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        border: `2px solid white`,
        fontSize: "0.9rem",
      }}
    >
      {text}
    </Box>
  );
};

{
  /* Gate menu item responsible for adding a new instruction to the circuit */
}
const AddNewInstruction = (props) => {
  const { circuit, setCircuit, gate, handleClose } = props;
  const [selectedQubits, setSelectedQubits] = React.useState([
    ...Array(gate.qubits),
  ]);

  const handleSelect = (e) => {
    let value = parseInt(e.target.value);
    let qubitIndex = parseInt(e.target.dataset.qubitIndex);
    let newSelectedQubits = selectedQubits.slice(); // copy by value
    newSelectedQubits[qubitIndex] = value;
    // If all qubits set, add new instruction
    if (!newSelectedQubits.includes(undefined)) {
      setCircuit({
        ...circuit,
        instructions: circuit.instructions.concat({
          gate: gate.name,
          qubits: newSelectedQubits,
          params: [],
          uid: Math.max(...circuit.instructions.map((o) => o.uid)) + 1,
        }),
      });
      setSelectedQubits([...Array(gate.qubits)]);
      handleClose();
    } else {
      setSelectedQubits(newSelectedQubits);
    }
  };

  return (
    <Box>
      <Typography variant="body2" sx={{ display: "inline-block" }}>
        Add{" "}
        <Typography
          component="span"
          variant="body2"
          sx={{ color: gate.color.main, fontWeight: 600 }}
        >
          {formattedName(gate.name)}
        </Typography>{" "}
        to{" "}
      </Typography>
      {[...Array(gate.qubits)].map((_, i) => {
        return (
          <NativeSelect
            key={i}
            size="small"
            defaultValue={-1}
            value={selectedQubits[i] !== "undefined" ? selectedQubits[i] : -1}
            sx={{
              ml: 0.5,
              fontSize: "0.95rem",
              mb: -0.6,
              display: "inline-block",
              "& select": {
                width: "auto",
              },
            }}
            onChange={handleSelect}
            inputProps={{
              "data-qubit-index": i,
            }}
          >
            <option disabled value={-1}>
              {gate.qubits > 1 ? gate.qubitsNames[i] : "qubit"}
            </option>
            {[...Array(circuit.meta.qubits)].map((_, index) => {
              return (
                <option
                  value={index}
                  key={index}
                  disabled={selectedQubits.includes(index)}
                >
                  Q{index}
                </option>
              );
            })}
          </NativeSelect>
        );
      })}
    </Box>
  );
};

const OptionsMenu = (props) => {
  const {
    anchorEl,
    open,
    handleClose,
    circuit,
    setCircuit,
    preview,
    instructionIndex,
    gate,
  } = props;

  const [view, setView] = React.useState("default"); // current view (default / gate info / gate settings)

  const [selectedQubits, setSelectedQubits] = React.useState(
    instructionIndex
      ? circuit.instructions[instructionIndex].qubits.slice()
      : [...Array(gate.qubits)]
  );

  const ViewHeader = ({ title }) => {
    return (
      <MenuItem
        disableRipple
        key="view-header"
        sx={{ "&:hover": { background: "transparent" } }}
        divider
      >
        <ListItemIcon onClick={() => setView("default")}>
          <IconButton size="small" sx={{ m: -1 }}>
            <KeyboardArrowLeftRoundedIcon
              sx={{
                fontSize: "1.25rem",
              }}
            />
          </IconButton>
        </ListItemIcon>
        <Typography variant="body2">{title}</Typography>
      </MenuItem>
    );
  };

  let previewItems = [];
  let instructionItems = [];

  if (view === "default") {
    previewItems = [
      <MenuItem
        disableRipple
        key="add-instruction"
        sx={{ "&:hover": { background: "transparent" } }}
      >
        <ListItemIcon>
          <AddRoundedIcon
            sx={{
              fontSize: "1.25rem",
            }}
          />
        </ListItemIcon>
        <AddNewInstruction handleClose={handleClose} {...props} />
      </MenuItem>,
      <MenuItem onClick={() => setView("info")} key="view-info">
        <ListItemIcon>
          <InfoOutlinedIcon
            sx={{
              fontSize: "1.25rem",
            }}
          />
        </ListItemIcon>
        <Typography variant="body2">Gate info</Typography>
      </MenuItem>,
    ];

    instructionItems = [
      <MenuItem onClick={() => setView("edit")} key={0}>
        <ListItemIcon>
          <TuneRoundedIcon
            sx={{
              fontSize: "1.25rem",
            }}
          />
        </ListItemIcon>
        <Typography variant="body2">Edit</Typography>
      </MenuItem>,
      <MenuItem onClick={() => setView("info")} key={1}>
        <ListItemIcon>
          <InfoOutlinedIcon
            sx={{
              fontSize: "1.25rem",
            }}
          />
        </ListItemIcon>
        <Typography variant="body2">Gate info</Typography>
      </MenuItem>,
      <Divider sx={{ my: -0 }} key={2} />,
      <MenuItem
        key={3}
        onClick={() => {
          setCircuit({
            ...circuit,
            instrunctions: circuit.instructions.splice(instructionIndex, 1),
          });
          handleClose();
        }}
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
          Delete
        </Typography>
      </MenuItem>,
    ];
  } else if (view === "info") {
    previewItems = [
      <ViewHeader title="Gate info" key="view-header-wrapper" />,
      <MenuItem
        disableRipple
        sx={{
          "&:hover": { background: "transparent" },
          width: "250px",
          whiteSpace: "normal",
          maxHeight: "250px",
          overflowY: "auto",
          display: "block",
        }}
        key="gate-info"
      >
        {gate.desc}
      </MenuItem>,
    ];

    instructionItems = [
      <ViewHeader title="Gate info" key="view-header-wrapper" />,
      <MenuItem
        disableRipple
        sx={{
          "&:hover": { background: "transparent" },
          width: "250px",
          whiteSpace: "normal",
          maxHeight: "250px",
          overflowY: "auto",
          display: "block",
        }}
        key="gate-info"
      >
        {gate.desc}
      </MenuItem>,
    ];
  } else if (view === "edit") {
    const handleSelect = (e) => {
      let value = parseInt(e.target.value);
      let qubitIndex = parseInt(e.target.dataset.qubitIndex);
      let newSelectedQubits = selectedQubits.slice(); // copy by value
      newSelectedQubits[qubitIndex] = value;
      setSelectedQubits(newSelectedQubits);
    };

    const handleSave = () => {
      let newInstructions = circuit.instructions.slice();
      newInstructions[instructionIndex].qubits = selectedQubits;
      setCircuit({ ...circuit, instructions: newInstructions });
      handleClose();
    };

    instructionItems = [
      <ViewHeader title="Edit instruction" key={0} />,
      <MenuItem
        disableRipple
        divider
        sx={{
          "&:hover": { background: "transparent" },
          display: "block",
          width: "200px",
          pb: 1,
        }}
        key={1}
      >
        <Grid
          rowSpacing={2}
          container
          sx={{ display: "flex", alignItems: "end", mb: 0.5 }}
        >
          {[...Array(gate.qubits)].map((_, i) => {
            return [
              <Grid item xs={6} key={`option-title--${i}`}>
                {gate.qubits == 1 ? (
                  <Typography variant="body2">Qubit</Typography>
                ) : (
                  <Typography
                    variant="body2"
                    sx={{
                      "&::first-letter": { textTransform: "capitalize" },
                    }}
                  >
                    {gate.qubitsNames[i]}
                  </Typography>
                )}
              </Grid>,
              <Grid item xs={6} key={`option-value--${i}`} sx={{ pr: 0.5 }}>
                <NativeSelect
                  fullWidth
                  key={i}
                  size="small"
                  value={selectedQubits[i]}
                  sx={{
                    ml: 0.5,
                    fontSize: "0.95rem",
                    mb: -0.6,
                    //display: "inline-block",
                    "& select": {
                      width: "100%",
                    },
                  }}
                  onChange={handleSelect}
                  inputProps={{
                    "data-qubit-index": i,
                  }}
                >
                  {[...Array(circuit.meta.qubits)].map((_, index) => {
                    return (
                      <option
                        value={index}
                        key={index}
                        disabled={selectedQubits.includes(index)}
                      >
                        Q{index}
                      </option>
                    );
                  })}
                </NativeSelect>
              </Grid>,
            ];
          })}
        </Grid>
      </MenuItem>,
      <MenuItem
        disableRipple
        sx={{
          "&:hover": { background: "transparent" },
          textAlign: "right",
          display: "block",
        }}
        key={2}
      >
        <Button
          disableElevation
          variant="contained"
          size="small"
          onClick={() => handleSave()}
        >
          Save
        </Button>
      </MenuItem>,
    ];
  }

  return (
    <Menu
      id={`options-menu--${instructionIndex ? instructionIndex : gate.name}`}
      aria-labelledby={`options-menu--${
        instructionIndex ? instructionIndex : gate.name
      }`}
      anchorEl={anchorEl}
      open={open}
      onClose={() => {
        handleClose();
        setTimeout(() => {
          setView("default");
        }, 250);
      }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      sx={{
        ml: 1,
        borderRadius: 0,
        "& .Mui-focusVisible": {
          background: "transparent",
        },
      }}
      disableAutoFocusItem
    >
      {preview ? previewItems : instructionItems}
    </Menu>
  );
};

const Gate = (props) => {
  const {
    gate,
    qubits,
    currentQubit,
    circuit,
    setCircuit,
    instructionIndex,
    setDisableDragging,
  } = props;
  const preview = props.preview ? true : false;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    if (Boolean(setDisableDragging)) {
      setDisableDragging(true);
    }
  };
  const handleRightClick = (e) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
    if (Boolean(setDisableDragging)) {
      setDisableDragging(true);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
    if (Boolean(setDisableDragging)) {
      setDisableDragging(false);
    }
  };

  return (
    <>
      <Box
        sx={{ position: "relative", cursor: preview ? "pointer" : "move" }}
        onClick={handleClick}
        onContextMenu={handleRightClick}
        className="gate"
      >
        {/* Border on hover */}
        <Box
          className="border"
          sx={{
            position: "absolute",
            width: theme.spacing(4),
            height: `calc(${
              (Math.max.apply(Math, qubits) -
                Math.min.apply(Math, qubits) +
                1) *
              parseInt(theme.spacing(5))
            }px - ${parseInt(theme.spacing(1))}px)`,
            outline: `2px solid ${
              open && !preview ? gate.color.light : "transparent"
            }`,
            outlineStyle: `${open ? "solid !important" : "inherit"}`,
            "&:hover": {
              outline: `2px solid ${gate.color.light}`,
              outlineStyle: "dashed",
            },
            "&:active": {
              outline: `2px solid ${gate.color.light}`,
            },
            zIndex: 999,
            ...{
              top: `-${
                Math.min.apply(Math, qubits) < currentQubit
                  ? (currentQubit - Math.min.apply(Math, qubits)) *
                    parseInt(theme.spacing(5))
                  : 0
              }px`,
            },
          }}
        />
        <Representation gate={gate} preview={preview} />
        {/*props.uid ? props.uid : null*/}
        {qubits instanceof Array &&
          qubits.map((qubit, index) => {
            if (qubit === currentQubit) {
              return null;
            }
            return (
              <Box key={`control-${qubit}`}>
                {/* Control dot */}
                {/* If swap, the second qubit in not a control */}
                {gate.name === "SWAP" && index === 1 ? (
                  <Box
                    sx={{
                      position: "absolute",
                      top: `calc(50% - ${parseInt(theme.spacing(4)) / 2}px)`,
                      transform: `translateY(${
                        qubit > currentQubit ? "+" : "-"
                      }${
                        Math.abs(currentQubit - qubit) *
                        parseInt(theme.spacing(5))
                      }px)`,
                    }}
                  >
                    <SWAPGate gate={gate} />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      width: theme.spacing(1.25),
                      height: theme.spacing(1.25),
                      background: `${gate.color.main}`,
                      borderRadius: "50%",
                      position: "absolute",
                      left: "50%",
                      top: `calc(50% - ${
                        parseInt(theme.spacing(1.25)) / 2
                      }px + 1px)`,
                      transform: `translateX(-50%) translateY(${
                        qubit > currentQubit ? "+" : "-"
                      }${
                        Math.abs(currentQubit - qubit) *
                        parseInt(theme.spacing(5))
                      }px)`,
                    }}
                  />
                )}

                {/* Control vertical bar */}
                <Box
                  sx={{
                    width: "2px",
                    height: `calc(${
                      Math.abs(currentQubit - qubit) *
                      parseInt(theme.spacing(5))
                    }px + 2px)`,
                    background: `${gate.color.main}`,
                    position: "absolute",
                    left: "calc(50% - 1px)",
                    zIndex: -1,
                    ...{
                      ...{
                        [qubit > currentQubit
                          ? "top"
                          : "bottom"]: `calc(50% - ${
                          qubit > currentQubit ? 0 : 2
                        }px)`,
                      },
                    },
                  }}
                />
              </Box>
            );
          })}
      </Box>
      <OptionsMenu
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
        circuit={circuit}
        setCircuit={setCircuit}
        preview={preview}
        instructionIndex={instructionIndex}
        gate={gate}
      />
    </>
  );
};

export default Gate;
