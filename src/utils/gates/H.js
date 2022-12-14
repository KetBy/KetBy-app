import * as React from "react";
import { Typography, Tooltip, Box } from "@mui/material";
import LatexFigure from "../../components/LatexFigure";

export default function H(props) {
  return (
    <>
      <Typography variant="body2">
        The <i>Hadamard</i> gate (also known as <i>H</i> gate) is used to create
        superpositions. <br />
        It rotates the states <LatexFigure input="\ket{0}" inline /> and{" "}
        <LatexFigure input="\ket{1}" inline /> to{" "}
        <Tooltip
          sx={{ background: "primary" }}
          placement="top"
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
        </Tooltip>{" "}
        and{" "}
        <Tooltip
          sx={{ background: "primary" }}
          placement="top"
          title={
            <React.Fragment>
              <LatexFigure
                input="\ket{+} = \frac{1}{\sqrt{2}}\ket{0} - \frac{1}{\sqrt{2}}\ket{1}"
                bg="transparent"
                color="white"
                inline
              />
            </React.Fragment>
          }
        >
          <span>
            <LatexFigure input="\ket{-}" inline hoverable />
          </span>
        </Tooltip>{" "}
        , respectively.
      </Typography>

      <Typography variant="body2" mt={1}>
        Matrix representation:
      </Typography>
      <LatexFigure
        input="\frac{1}{\sqrt{2}}\begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}"
        sx={{ margin: "0.5rem auto", display: "block" }}
      />
    </>
  );
}
