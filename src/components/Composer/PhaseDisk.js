import { Box } from "@mui/material";
import theme from "../../themes/default";

const PhaseDisk = ({ probability, phase, phaseExpression, purity }) => {
  return (
    <Box
      sx={{
        width: theme.spacing(4),
        height: theme.spacing(4),
        borderRadius: "50%",
        background: theme.palette.grey[100],
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Display the probability */}
      <Box
        sx={{
          width: theme.spacing(4),
          height: `${parseInt(theme.spacing(4)) * (probability / 100)}px`,
          background: theme.palette.primary.light,
          position: "absolute",
          bottom: 0,
          left: 0,
          transitionDuration: "0.2s",
        }}
      />
      {/* Display the purity */}
      <Box
        sx={{
          position: "absolute",
          background: "transparent",
          border: `2px solid ${theme.palette.darkGrey.dark}`,
          width: `${purity * 100}%`,
          height: `${purity * 100}%`,
          top: "50%",
          left: "50%",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          transitionDuration: "0.2s",
        }}
      />
      {/* Display the phase */}
      <Box
        sx={{
          position: "absolute",
          top: "calc(50% - 1px)",
          left: "50%",
          width: "50%",
          height: "2px",
          background: theme.palette.darkGrey.dark,
          transform: `rotate(${-phase}deg)`,
          transformOrigin: "0px 1px",
          borderRadius: "2px 0 0 2px",
          transitionDuration: "0.2s",
        }}
      />
    </Box>
  );
};

export default PhaseDisk;
