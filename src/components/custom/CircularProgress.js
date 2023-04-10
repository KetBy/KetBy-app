import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";

// Inspired by the former Facebook spinners.
export default function CustomCircularProgress(props) {
  return (
    <Box sx={{ position: "relative", display: "inline" }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) => theme.palette.grey[200],
        }}
        size={props.small ? 16 : 40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) => theme.palette.primary.main,
          animationDuration: "600ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={props.small ? 16 : 40}
        thickness={4}
        {...props}
      />
    </Box>
  );
}
