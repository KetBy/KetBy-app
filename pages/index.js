import * as React from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function HomePage() {
  return (
    <Box p={3}>
      <Typography>This website is under construction.</Typography>
      <Typography>
        Check out the soon-to-be-functional{" "}
        <Typography
          sx={{
            display: "inline",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          component={Link}
          href="/composer"
        >
          Quantum Composer
        </Typography>
        .
      </Typography>
    </Box>
  );
}
