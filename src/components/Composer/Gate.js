import * as React from "react";
import {
  Box,
  Grid,
  Typography,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
  TextField,
  Select,
  NativeSelect,
} from "@mui/material";
import theme from "../../themes/default";
import gates, { gatesMap as getGatesMap } from "../../utils/gates";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const gatesMap = getGatesMap();

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

const formattedName = (name) => {
  let dagger = "†";
  let sqrt = "√";
  let text = <>{name}</>;
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
const Representation = (props) => {
  const { gate, preview } = props;

  if (["X", "CX", "Tfl"].includes(gate.name)) {
    return <NOTGate gate={gate} hideHorizontalLine={!preview} />;
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

const Gate = (props) => {
  const { gate, qubits, currentQubit, circuit, setCircuit, instructionIndex } =
    props;
  const preview = props.preview ? true : false;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleRightClick = (e) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        sx={{ position: "relative", cursor: preview ? "pointer" : "move" }}
        onClick={handleRightClick}
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
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
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
        }}
      >
        {preview
          ? [
              <MenuItem disableRipple key={0}>
                <ListItemIcon>
                  <AddRoundedIcon
                    sx={{
                      fontSize: "1.25rem",
                    }}
                  />
                </ListItemIcon>
                <Box
                  sx={{
                    display: "block",
                  }}
                >
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
                  <NativeSelect
                    label="Age"
                    size="small"
                    defaultValue={-1}
                    sx={{
                      ml: 0.5,
                      fontSize: "0.9rem",
                      mb: -0.6,
                      display: "inline-block",
                    }}
                    onChange={(e) => {
                      setCircuit({
                        ...circuit,
                        instructions: circuit.instructions.concat({
                          gate: gate.name,
                          qubits: [parseInt(e.target.value)],
                          params: [],
                          uid:
                            Math.max(
                              ...circuit.instructions.map((o) => o.uid)
                            ) + 1,
                        }),
                      });
                      handleClose();
                    }}
                  >
                    <option disabled value={-1}>
                      qubit
                    </option>
                    {[...Array(circuit.meta.qubits)].map((_, index) => {
                      return (
                        <option value={index} key={index}>
                          Q{index}
                        </option>
                      );
                    })}
                  </NativeSelect>
                </Box>
              </MenuItem>,
              <MenuItem onClick={handleClose} key={1}>
                <ListItemIcon>
                  <InfoOutlinedIcon
                    sx={{
                      fontSize: "1.25rem",
                    }}
                  />
                </ListItemIcon>
                <Typography variant="body2">Gate info</Typography>
              </MenuItem>,
            ]
          : [
              <MenuItem onClick={handleClose} key={0}>
                <ListItemIcon>
                  <TuneRoundedIcon
                    sx={{
                      fontSize: "1.25rem",
                    }}
                  />
                </ListItemIcon>
                <Typography variant="body2">Edit</Typography>
              </MenuItem>,
              <MenuItem onClick={handleClose} key={1}>
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
                    instrunctions: circuit.instructions.splice(
                      instructionIndex,
                      1
                    ),
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
            ]}
      </Menu>
    </>
  );
};

export default Gate;
