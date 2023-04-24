import * as React from "react";
import {
  Box,
  Typography,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
  NativeSelect,
  Select,
  IconButton,
  Grid,
  Button,
  TextField,
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
import M_gate_svg from "../../../public/assets/composer/M_gate.svg";
import LatexFigure from "../LatexFigure";

const gatesMap = getGatesMap();

const formattedName = (name) => {
  let dagger = "†";
  let sqrt = "√";
  let text = <>{name}</>;
  if (name == "Tfl") {
    text = "Toffoli";
  }
  if (name == "M") {
    text = "Measurement";
  }
  if (name == "T+" || name == "S+") {
    text = (
      <>
        {name.replace("+", "")}
        {dagger}
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
  if (name == "RX" || name == "RY" || name == "RZ") {
    text = (
      <>
        R<sub>{name[1]}</sub>
      </>
    );
  }
  return text;
};

export const GateTitle = ({ gate, title }) => {
  return (
    <Typography variant="body2" sx={{ display: "inline-block" }}>
      <Typography
        component="span"
        variant="body2"
        sx={{ color: gate.color.main, fontWeight: 600 }}
      >
        {formattedName(title ? title : gate.name)}
      </Typography>
    </Typography>
  );
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

export const Representation = (props) => {
  const { gate, preview } = props;

  if (gate.name === "M") {
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
        <img src={M_gate_svg.src} height="26" />
      </Box>
    );
  }

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
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "block",
          textAlign: "center",
        }}
      >
        {text}
      </Box>
    </Box>
  );
};

{
  /* Gate menu item responsible for adding a new instruction to the circuit */
}
const AddNewInstruction = (props) => {
  const {
    circuit,
    setCircuit,
    gate,
    handleClose,
    setGatesDirectoryOpenMobile,
  } = props;
  const [selectedQubits, setSelectedQubits] = React.useState([
    ...Array(gate.qubits),
  ]);
  const [selectedBits, setSelectedBits] = React.useState([...Array(gate.bits)]);

  const handleSelect = (e, qubitIndex) => {
    let value = parseInt(e.target.value);
    let newSelectedQubits = selectedQubits.slice(); // copy by value
    newSelectedQubits[qubitIndex] = value;
    // If all qubits and bits are set, add new instruction
    if (
      !newSelectedQubits.includes(undefined) &&
      !selectedBits.includes(undefined)
    ) {
      setCircuit({
        ...circuit,
        instructions: circuit.instructions.concat({
          gate: gate.name,
          qubits: newSelectedQubits,
          params: gate.parameters ? Array(gate.parameters.length).fill(0) : [],
          uid: isFinite(Math.max(...circuit.instructions.map((o) => o.uid)))
            ? Math.max(...circuit.instructions.map((o) => o.uid)) + 1
            : 0,
          bits: selectedBits,
        }),
      });
      setSelectedQubits([...Array(gate.qubits)]);
      setSelectedBits([...Array(gate.bits)]);
      handleClose();
      setGatesDirectoryOpenMobile(false); // Close gates directory on mobile
    } else {
      setSelectedQubits(newSelectedQubits);
    }
  };

  const handleSelectBit = (e, bitIndex) => {
    let value = parseInt(e.target.value);
    let newSelectedBits = selectedBits.slice(); // copy by value
    newSelectedBits[bitIndex] = value;
    if (
      !newSelectedBits.includes(undefined) &&
      !selectedQubits.includes(undefined)
    ) {
      setCircuit({
        ...circuit,
        instructions: circuit.instructions.concat({
          gate: gate.name,
          qubits: selectedQubits,
          params: gate.parameters ? Array(gate.parameters.length).fill(0) : [],
          uid: isFinite(Math.max(...circuit.instructions.map((o) => o.uid)))
            ? Math.max(...circuit.instructions.map((o) => o.uid)) + 1
            : 0,
          ...{ ...(gate.name == "M" && { bits: newSelectedBits }) },
        }),
      });
      setSelectedQubits([...Array(gate.qubits)]);
      setSelectedBits([...Array(gate.bits)]);
      handleClose();
      setGatesDirectoryOpenMobile(false); // Close gates directory on mobile
    } else {
      setSelectedBits(newSelectedBits);
    }
  };

  return (
    <>
      <Typography variant="body2">
        Add <GateTitle gate={gate} /> to
      </Typography>
      {[...Array(gate.qubits)].map((_, i) => {
        return (
          <Select
            key={i}
            size="small"
            defaultValue={-1}
            value={selectedQubits[i] !== "undefined" ? selectedQubits[i] : -1}
            sx={{
              ml: 0.5,
              fontSize: "0.95rem",
              mb: 0,
              display: "inline-block",
              "& select": {
                width: "auto",
              },
            }}
            onChange={(e) => handleSelect(e, i)}
          >
            <MenuItem disabled value={-1}>
              {gate.qubits > 1 ? gate.qubitsNames[i] : "qubit"}
            </MenuItem>
            {[...Array(circuit.meta.qubits)].map((_, index) => {
              return (
                <MenuItem
                  value={index}
                  key={index}
                  disabled={selectedQubits.includes(index)}
                >
                  Q{index}
                </MenuItem>
              );
            })}
          </Select>
        );
      })}
      {[...Array(gate.bits)].map((_, i) => {
        return (
          <Select
            key={i}
            size="small"
            defaultValue={-1}
            value={selectedBits[i] !== "undefined" ? selectedBits[i] : -1}
            sx={{
              ml: 0.5,
              fontSize: "0.95rem",
              mb: 0,
              display: "inline-block",
              "& select": {
                width: "auto",
              },
            }}
            onChange={(e) => handleSelectBit(e, i)}
          >
            <MenuItem disabled value={-1}>
              {gate.bits > 1 ? gate.bitsNames[i] : "bit"}
            </MenuItem>
            {[...Array(circuit.meta.bits)].map((_, index) => {
              return (
                <MenuItem
                  value={index}
                  key={index}
                  disabled={selectedBits.includes(index)}
                >
                  B{index}
                </MenuItem>
              );
            })}
          </Select>
        );
      })}
    </>
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
    setGatesDirectoryOpenMobile,
    project,
  } = props;

  const [view, setView] = React.useState("default"); // current view (default / gate info / gate settings)

  const initialSelectedQubits =
    typeof instructionIndex !== "undefined"
      ? circuit.instructions[instructionIndex].qubits.slice()
      : [...Array(gate.qubits)];

  const initialSelectedBits =
    typeof instructionIndex !== "undefined" &&
    circuit.instructions[instructionIndex].bits
      ? circuit.instructions[instructionIndex].bits.slice()
      : [...Array(gate.bits)];

  const initialParameters =
    typeof instructionIndex !== "undefined"
      ? circuit.instructions[instructionIndex].params.slice()
      : [];

  const [selectedQubits, setSelectedQubits] = React.useState(
    initialSelectedQubits
  );

  const [selectedBits, setSelectedBits] = React.useState(initialSelectedBits);

  const [parameters, setParameters] = React.useState(initialParameters);

  const [saveError, setSaveError] = React.useState(null);

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

  const handleDelete = () => {
    setCircuit({
      ...circuit,
      instrunctions: circuit.instructions.splice(instructionIndex, 1),
    });
    handleClose();
  };

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
        <AddNewInstruction
          handleClose={handleClose}
          setGatesDirectoryOpenMobile={setGatesDirectoryOpenMobile}
          {...props}
        />
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
        <Typography variant="body2">Settings</Typography>
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
      project.permissions == 2 ? <Divider sx={{ my: -0 }} key={2} /> : null,
      project.permissions == 2 ? (
        <MenuItem key={3} onClick={handleDelete}>
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
        </MenuItem>
      ) : null,
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
    const handleSelect = (e, qubitIndex) => {
      let value = parseInt(e.target.value);
      let newSelectedQubits = selectedQubits.slice(); // copy by value
      newSelectedQubits[qubitIndex] = value;
      setSelectedQubits(newSelectedQubits);
    };

    const handleSelectBit = (e, bitIndex) => {
      let value = parseInt(e.target.value);
      let newSelectedBits = selectedBits.slice(); // copy by value
      newSelectedBits[bitIndex] = value;
      setSelectedBits(newSelectedBits);
    };

    const handleParamInput = (e, paramIndex) => {
      let value = e.target.value;
      let newParameters = parameters.slice(); // copy by value
      newParameters[paramIndex] = value;
      setParameters(newParameters);
    };

    const handleSave = () => {
      if (project.permissions < 2) return;
      // Validate the parameters
      if (parameters.length) {
        for (let i = 0; i < parameters.length; i++) {
          if (parameters[i] === "") {
            setSaveError(
              <>
                Please enter a value for parameter {gate.parameters[i]["name"]}.{" "}
                <br />
                You can use integers,{" "}
                <Typography variant="code" component="code">
                  /
                </Typography>{" "}
                and{" "}
                <Typography variant="code" component="code">
                  pi
                </Typography>
                . You can also enter{" "}
                <Typography variant="code" component="code">
                  0
                </Typography>{" "}
                instead of leaving it empty.
              </>
            );
            return;
          }
          if (!/^\-?(\d+|\d*pi)(\/(\-?(\d+|\d*pi)))?$/.test(parameters[i])) {
            setSaveError(
              <>
                Invalid value for parameter {gate.parameters[i]["name"]}. <br />
                Please only use integers,{" "}
                <Typography variant="code" component="code">
                  /
                </Typography>{" "}
                and{" "}
                <Typography variant="code" component="code">
                  pi
                </Typography>
                .
              </>
            );
            return;
          }
        }
      }
      let newInstructions = circuit.instructions.slice();
      newInstructions[instructionIndex].qubits = selectedQubits;
      if (circuit.instructions[instructionIndex].bits) {
        newInstructions[instructionIndex].bits = selectedBits;
      }
      newInstructions[instructionIndex].params = parameters;
      setCircuit({ ...circuit, instructions: newInstructions });
      handleClose();
    };

    instructionItems = [
      <ViewHeader title="Settings" key={0} />,
      <MenuItem
        disableRipple
        divider
        sx={{
          "&:hover": { background: "transparent" },
          display: "block",
          width: "200px",
          pb: 1.5,
          pt: 1,
        }}
        key={1}
      >
        <Grid
          rowSpacing={2}
          container
          sx={{ display: "flex", mb: 0.5 }}
          alignItems="center"
        >
          {[...Array(gate.qubits)].map((_, i) => {
            return [
              <Grid item xs={6} key={`option-title--${i}`}>
                {gate.qubits == 1 ? (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Qubit
                  </Typography>
                ) : (
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1,
                      "&::first-letter": { textTransform: "capitalize" },
                    }}
                  >
                    {gate.qubitsNames[i]}
                  </Typography>
                )}
              </Grid>,
              <Grid item xs={6} key={`option-value--${i}`} sx={{}}>
                <Select
                  fullWidth
                  key={i}
                  size="small"
                  value={selectedQubits[i]}
                  sx={{
                    mr: 0.5,
                    fontSize: "0.9rem",
                    mb: -1,
                  }}
                  onChange={(e) => handleSelect(e, i)}
                  disabled={project.permissions < 2}
                >
                  {[...Array(circuit.meta.qubits)].map((_, index) => {
                    return (
                      <MenuItem
                        value={index}
                        key={index}
                        disabled={selectedQubits.includes(index)}
                      >
                        Q{index}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Grid>,
            ];
          })}
          {gate.bits
            ? [...Array(gate.bits)].map((_, i) => {
                return [
                  <Grid item xs={6} key={`option-title--${i}-bit`}>
                    {gate.bits == 1 ? (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Bit
                      </Typography>
                    ) : (
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 1,
                          "&::first-letter": { textTransform: "capitalize" },
                        }}
                      >
                        {gate.bitsNames[i]}
                      </Typography>
                    )}
                  </Grid>,
                  <Grid item xs={6} key={`option-value--${i}-bit`} sx={{}}>
                    <Select
                      fullWidth
                      key={i}
                      size="small"
                      value={selectedBits[i]}
                      sx={{
                        mr: 0.5,
                        fontSize: "0.9rem",
                        mb: -1,
                      }}
                      onChange={(e) => handleSelectBit(e, i)}
                      disabled={project.permissions < 2}
                    >
                      {[...Array(circuit.meta.bits)].map((_, index) => {
                        return (
                          <MenuItem
                            value={index}
                            key={index}
                            disabled={selectedBits.includes(index)}
                          >
                            B{index}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Grid>,
                ];
              })
            : null}
          {gate.parameters && (
            <Grid item xs={12}>
              <Divider mb={0} />
            </Grid>
          )}
          {gate.parameters &&
            gate.parameters.map((parameter, index) => {
              return [
                <Grid
                  item
                  xs={6}
                  key={`param-title--${index}`}
                  sx={{
                    "&.ketby-Grid-item": {
                      pt: 1,
                    },
                    mb: index == gate.parameters.length - 1 ? -1 : 0,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      "&::first-letter": { textTransform: "capitalize" },
                    }}
                  >
                    {parameter.title}
                  </Typography>
                </Grid>,
                <Grid
                  item
                  xs={6}
                  key={`param-value--${index}`}
                  sx={{
                    "&.ketby-Grid-item": {
                      pt: 1,
                    },
                    mb: index == gate.parameters.length - 1 ? -1 : 0,
                  }}
                >
                  <TextField
                    size="small"
                    label={parameter.name}
                    sx={{
                      "& .ketby-InputBase-input": {
                        p: theme.spacing(1, 1.5),
                      },
                    }}
                    value={parameters[index]}
                    onChange={(e) => handleParamInput(e, index)}
                    disabled={project.permissions < 2}
                  />
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
          whiteSpace: "normal",
          width: "200px",
        }}
        key={2}
      >
        {project.permissions == 2 ? (
          <>
            <Button
              disableElevation
              variant="contained"
              size="small"
              onClick={() => handleSave()}
              fullWidth
              sx={{ m: theme.spacing(0.5, 0, 0.5, 0) }}
            >
              Save
            </Button>
            {saveError && (
              <Typography
                variant="body2"
                align="left"
                sx={{ lineHeight: 1.2, my: 1, color: theme.palette.red.dark }}
              >
                {saveError}
              </Typography>
            )}
          </>
        ) : (
          <>
            <Typography
              variant="body2"
              sx={{
                textAlign: "justify",
                lineHeight: 1.2,
                my: 1,
              }}
            >
              In order to change these settings, please fork the project first.
            </Typography>
          </>
        )}
      </MenuItem>,
    ];
  }

  return (
    <Menu
      id={`options-menu--${
        typeof instructionIndex !== "undefined" ? instructionIndex : gate.name
      }`}
      aria-labelledby={`options-menu--${
        typeof instructionIndex !== "undefined" ? instructionIndex : gate.name
      }`}
      anchorEl={anchorEl}
      open={open}
      onClose={() => {
        handleClose();
        setTimeout(() => {
          setView("default");
          setParameters(initialParameters);
          setSelectedQubits(initialSelectedQubits);
          setSaveError(null);
        }, 150);
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
        "& .Mui-focusVisible": {
          background: "transparent !important",
        },
        "& .ketby-Paper-root": {
          borderTopLeftRadius: "2px",
        },
      }}
    >
      {preview ? previewItems : instructionItems}
    </Menu>
  );
};

const Gate = (props) => {
  const {
    gate,
    qubits,
    bits,
    currentQubit,
    circuit,
    setCircuit,
    instructionIndex,
    setDisableDragging,
    setGatesDirectoryOpenMobile,
    project,
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
        {/* Measurement gate */}
        {bits instanceof Array && gate.name == "M" && (
          <>
            <Box
              sx={{
                width: "2px",
                height: `calc(${
                  (circuit.meta.qubits - currentQubit + 1.2) *
                  parseInt(theme.spacing(5))
                }px + 2px)`,
                //borderRight: `2px dashed ${theme.palette.grey[200]}`,
                position: "absolute",
                left: "calc(50% - 1px)",
                zIndex: -1,
                top: 0,
                outline: "2px solid white",
                background: "white",
                backgroundImage: `linear-gradient(to bottom, ${theme.palette.grey[200]} 50%, rgba(255,255,255,0) 0%)`,
                backgroundPosition: "top center",
                backgroundSize: "2px 10px",
                backgroundRepeat: "repeat-y",
                borderRightWidth: "2px",
              }}
              className="_hdd"
            />
            <Typography
              sx={{
                fontSize: "0.65rem",
                letterSpacing: "-1px",
                position: "absolute",
                left: "50%",
                display: "flex",
                width: theme.spacing(2.5),
                height: theme.spacing(2.5),
                transform: "translateX(-50%)",
                justifyContent: "center",
                top: `calc(${
                  (circuit.meta.qubits - currentQubit + 1) *
                  parseInt(theme.spacing(5))
                }px - 0.8rem)`,
                fontWeight: 500,
                absolute: "relative",
                "&:after": {
                  position: "absolute",
                  content: "''",
                  width: 0,
                  height: 0,
                  borderLeft: `10px solid transparent`,
                  borderRight: `10px solid transparent`,
                  borderTop: `25px solid ${theme.palette.grey[200]}`,
                  zIndex: -1,
                  top: "0.5px",
                },
              }}
              className="_hdd"
            >
              {bits[0]}
            </Typography>
          </>
        )}
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
        setGatesDirectoryOpenMobile={setGatesDirectoryOpenMobile}
        project={project}
      />
    </>
  );
};

export default Gate;
