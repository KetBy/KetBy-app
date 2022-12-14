import { Box } from "@mui/material";
export default function LatexFigure(props) {
  const { input, inline, ...other } = props;

  return (
    <Box
      component="img"
      src={`https://math.vercel.app/?bgcolor=auto&${
        inline ? "inline" : "from"
      }=${encodeURIComponent(input)}.svg`}
      className={`${inline ? "inline" : "block"}-latex`}
      {...other}
    />
  );
}
