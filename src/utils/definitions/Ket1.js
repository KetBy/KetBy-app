import * as React from "react";
import { Tooltip } from "@mui/material";
import LatexFigure from "../../components/LatexFigure";

export default function Ket1(props) {
  return (
    <Tooltip
      sx={{ background: "primary" }}
      placement="right-start"
      title={
        <React.Fragment>
          <LatexFigure
            input="\ket{1} = \begin{bmatrix} 0 \\ 1 \end{bmatrix}"
            bg="transparent"
            color="white"
            inline
          />
        </React.Fragment>
      }
    >
      <span>
        <LatexFigure input="\ket{1}" inline hoverable />
      </span>
    </Tooltip>
  );
}
