import * as React from "react";
import { Box } from "@mui/material";
import Head from "next/head";
import Composer from "../../src/components/Composer/index.js";

export default function ComposerPage() {
  return (
    <>
      <Head>
        <title>Quantum composer | KetBy</title>
      </Head>
      <Composer />
    </>
  );
}
