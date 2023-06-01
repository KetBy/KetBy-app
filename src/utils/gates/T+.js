import * as React from "react";
import { Typography, Divider, Box } from "@mui/material";
import LatexFigure from "../../components/LatexFigure";
import { GateTitle } from "../../components/Composer/Gate";
import { gatesMap } from "../gates";

const gates = gatesMap();

export default function TDagger(props) {
  return (
    <>
      <Typography variant="body2" align="justify">
        The <GateTitle gate={gates["T+"]} /> gate (a.k.a.{" "}
        <GateTitle
          gate={gates["Z"]}
          title={
            <>
              <Box component="sup" sx={{ mr: "-5px" }}>
                4
              </Box>
              √Z†
            </>
          }
        />
        ) is a <GateTitle gate={gates["P"]} />
        -gate with <LatexFigure inline input="\phi = -\frac{\pi}{4}" />. <br />
        The{" "}
        <GateTitle
          gate={gates["Z"]}
          title={
            <>
              <Box component="sup" sx={{ mr: "-5px" }}>
                4
              </Box>
              √Z†
            </>
          }
        />{" "}
        name is due to the fact that four successive{" "}
        <GateTitle gate={gates["T+"]} /> gates have the effect of a single{" "}
        <GateTitle gate={gates["Z"]} title="Z†" /> gate:{" "}
        <LatexFigure
          inline
          input="T^{\dagger}(T^{\dagger}(T^{\dagger}(T^{\dagger}\ket{\phi})))=Z^{\dagger}\ket{\phi}"
        />
        .
      </Typography>
      <Divider sx={{ mt: 1 }} />
      <Typography variant="subtitle2" align="center" mt={1}>
        Matrix representation
      </Typography>
      <LatexFigure
        input="\begin{bmatrix} 1 & 0 \\ 0 & e^{-\frac{i\pi}{4}} \end{bmatrix}"
        sx={{ margin: "0.5rem auto", display: "block" }}
      />
    </>
  );
}
