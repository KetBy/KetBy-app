import * as React from "react";
import { Box, Grid, Typography, Divider } from "@mui/material";
import theme from "../../themes/default";
import { InlineMath } from "react-katex";
import gates, { gatesMap as getGatesMap } from "../../utils/gates";
const gatesMap = getGatesMap();

const Gate = (props) => {
  const { gate } = props;

  let representation = <>{gate.name}</>;
  let rounded = false;

  if (gate.name == "T+" || gate.name == "S+") {
    representation = (
      <>
        {gate.name.replace("+", "")}
        <InlineMath math="^\dagger" />
      </>
    );
  }
  if (gate.name == "X") {
    representation = (
      <Typography
        sx={{
          fontSize: "1.75rem",
          fontWeight: 200,
          marginTop: "-2px",
        }}
      >
        +
      </Typography>
    );
    rounded = true;
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
        cursor: "move",
        position: "relative",
        border: "1.5px solid white",
        outline: "2px solid transparent",
        trnasitionDuration: "0.1s",
        "&:hover": {
          outline: `2px solid ${gate.color.dark}`,
        },
        "&:active": {
          outline: `2px solid ${gate.color.dark}`,
        },
        borderRadius: rounded ? "50%" : 0,
      }}
      className="gate"
    >
      {representation}
    </Box>
  );
};

export default Gate;
