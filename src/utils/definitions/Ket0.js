import * as React from "react";
import { Tooltip } from "@mui/material";
import LatexFigure from "../../components/LatexFigure";

export default function Ket0(props) {
  return (
    <Tooltip
      sx={{ background: "primary" }}
      placement="right"
      title={
        <React.Fragment>
          <LatexFigure
            input="\ket{0} = \begin{bmatrix} 1 \\ 0 \end{bmatrix}"
            bg="transparent"
            color="white"
            inline
          />
        </React.Fragment>
      }
    >
      <span>
        <LatexFigure input="\ket{0}" inline hoverable />
      </span>
    </Tooltip>
  );
}
