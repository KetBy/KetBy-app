import * as React from "react";
import { Typography, Divider, Box } from "@mui/material";
import LatexFigure from "../../components/LatexFigure";
import { GateTitle } from "../../components/Composer/Gate";
import { gatesMap } from "../gates";

const gates = gatesMap();

export default function M(props) {
  return (
    <>
      <Typography variant="body2" align="justify">
        Perform a measurement in the standard basis (a.k.a. the <i>z basis</i>)
        and project the result onto a classical bit. This operation is
        irreversible.
      </Typography>
    </>
  );
}
