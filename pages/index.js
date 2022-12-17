import * as React from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function HomePage() {
  return (
    <Box p={3}>
      <Typography variant="h6">This website is under construction.</Typography>
      <Typography>
        You can explore our <Link href="/composer">quantum composer</Link>
        {" or "}
        <Link href="/auth/register">create a new account</Link>.
      </Typography>
    </Box>
  );
}
