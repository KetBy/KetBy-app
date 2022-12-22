import * as React from "react";
import { Tooltip } from "@mui/material";
import LatexFigure from "../../components/LatexFigure";

export default function KetPlus(props) {
  return (
    <Tooltip
      sx={{ background: "primary" }}
      placement="right-start"
      title={
        <React.Fragment>
          <LatexFigure
            input="\ket{+} = \frac{1}{\sqrt{2}}\ket{0} + \frac{1}{\sqrt{2}}\ket{1}"
            bg="transparent"
            color="white"
            inline
          />
        </React.Fragment>
      }
    >
      <span>
        <LatexFigure input="\ket{+}" inline hoverable />
      </span>
    </Tooltip>
  );
}
