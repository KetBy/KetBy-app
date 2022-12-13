import { Box } from "@mui/material";
export default function LatexFigure(props) {
  const { input } = props;

  return (
    <Box
      component="img"
      src={`https://math.vercel.app/?bgcolor=auto&from=${encodeURIComponent(
        input
      )}.svg`}
      {...props}
    />
  );
}
