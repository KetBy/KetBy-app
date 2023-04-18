import * as React from "react";
import { Box, Alert, Button, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import theme from "../../../src/themes/default";
import { PasswordForm2 } from "../../../src/components/auth/PasswordForm";

export default function AuthPasswordPage() {
  const router = useRouter();

  const { token } = router.query;

  return (
    <>
      <Head>
        <title>Reset your password | KetBy</title>
      </Head>
      <Box
        sx={{
          minHeight: {
            xs: `-webkit-fill-available`,
            md: `calc(100vh - ${theme.constants.menuHeight}px)`,
          },
          display: "grid",
          alignItems: "center",
          justifyContent: "center",
          py: 5,
          px: 3,
        }}
      >
        <PasswordForm2 token={token} />
      </Box>
    </>
  );
}
