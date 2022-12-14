import { Box } from "@mui/material";
export default function LatexFigure(props) {
  const { input, inline, color, bg, hoverable, ...other } = props;

  return (
    <Box
      component="img"
      src={`https://math.vercel.app/?bgcolor=${
        hoverable ? "Lavender" : bg ? bg : "transparent"
      }&color=${color ? color : "black"}&${
        inline ? "inline" : "from"
      }=${encodeURIComponent(input)}.svg`}
      className={`${inline ? "inline" : "block"}-latex`}
      sx={{
        border: `${hoverable ? "2px" : "0px"} solid Lavender`,
      }}
      {...other}
    />
  );
}
