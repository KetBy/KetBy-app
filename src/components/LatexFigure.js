import { Box } from "@mui/material";
import theme from "../themes/default";

export default function LatexFigure(props) {
  const { input, inline, color, bg, hoverable, ...other } = props;

  return (
    <Box
      component="img"
      src={`https://math.vercel.app/?bgcolor=${
        hoverable ? "transparent" : bg ? bg : "transparent"
      }&color=${color ? color : "black"}&${
        inline ? "inline" : "from"
      }=${encodeURIComponent(input)}.svg`}
      className={`${inline ? "inline" : "block"}-latex`}
      sx={{
        border: `${hoverable ? "2px" : "0px"} solid ${
          theme.palette.primaryDark[50]
        }`,
        background: `${
          hoverable ? theme.palette.primaryDark[50] : "transparent"
        }`,
      }}
      {...other}
    />
  );
}
