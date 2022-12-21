import * as React from "react";
import { Box, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useAppContext } from "../src/utils/context";

export default function HomePage() {
  const appState = useAppContext();

  return (
    <>
      <Head>
        <title>KetBy</title>
        <meta
          name="og:description"
          value="Free & in-browser quantum composer and quantum computing resources"
        />
      </Head>
      <Box p={3}>
        <Typography variant="h6">
          This website is under construction.
        </Typography>
        <Typography>
          You can explore our <Link href="/composer">quantum composer</Link>
          {" or "}
          <Link href="/auth/register">create a new account</Link>.
        </Typography>
      </Box>
    </>
  );
}
