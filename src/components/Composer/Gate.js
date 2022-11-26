import * as React from "react";
import { Box, Grid, Typography, Divider, Menu, MenuItem } from "@mui/material";
import theme from "../../themes/default";
import Latex from "react-latex-next";
import gates, { gatesMap as getGatesMap } from "../../utils/gates";
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

const Representation = (props) => {
  const { gate } = props;

  if (["X", "CX", "Tfl"].includes(gate.name)) {
    return <NOTGate gate={gate} hideHorizontalLine={!props.preview} />;
  }

  let text = <>{gate.name}</>;
  if (gate.name == "T+" || gate.name == "S+") {
    text = (
      <>
        {gate.name.replace("+", "")}
        <Latex>{`$^\\dagger$`}</Latex>
      </>
    );
  }

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
        border: "2px solid white",
      }}
      className="gate"
    >
      {text}
    </Box>
  );
};

const Gate = (props) => {
  const { gate, qubits, currentQubit } = props;

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
      <Box sx={{ position: "relative" }} onContextMenu={handleRightClick}>
        {/* Border on hover */}
        <Box
          sx={{
            position: "absolute",
            width: theme.spacing(4),
            height: `calc(${
              (Math.max.apply(Math, qubits) -
                Math.min.apply(Math, qubits) +
                1) *
              parseInt(theme.spacing(5))
            }px - ${parseInt(theme.spacing(1))}px)`,
            outline: `2px solid ${open ? gate.color.light : "transparent"}`,
            outlineStyle: `${open ? "solid !important" : "inherit"}`,
            "&:hover": {
              outline: `2px solid ${gate.color.light}`,
              outlineStyle: "dashed",
            },
            "&:active": {
              outline: `2px solid ${gate.color.light}`,
            },
            zIndex: 999,
            cursor: "move",
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
        <Representation gate={gate} preview={props.preview} />
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
        }}
      >
        <MenuItem onClick={handleClose}>
          <Typography variant="body2">Edit</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography variant="body2" color="error">
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Gate;
