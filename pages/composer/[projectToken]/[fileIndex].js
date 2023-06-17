import * as React from "react";
import { Box } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import Composer from "../../../src/components/Composer/index.js";

export default function ComposerPage() {
  const router = useRouter();
  const { projectToken, fileIndex } = router.query;

  return (
    <>
      <Head>
        <title>Quantum composer | KetBy</title>
      </Head>
      <Composer projectToken={projectToken} fileIndex={fileIndex} />
    </>
  );
}
