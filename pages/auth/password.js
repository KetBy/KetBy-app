import * as React from "react";
import { Box, Container, Grid, Typography, Paper } from "@mui/material";
import Head from "next/head";
import { PasswordForm1 } from "../../src/components/auth/PasswordForm";
import theme from "../../src/themes/default";

export default function AuthPasswordPage() {
  return (
    <>
      <Head>
        <title>Reset your password | KetBy</title>
      </Head>
      <Grid
        container
        sx={{
          alignItems: "stretch",
          justifyContent: "center",
          minHeight: {
            xs: `-webkit-fill-available`,
            md: `calc(100vh - ${theme.constants.menuHeight}px)`,
          },
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            padding: theme.spacing(3),
            display: "grid",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "white",
          }}
        >
          <Box
            sx={{
              width: "auto",
              maxWidth: { xs: "auto", sm: 350 },
            }}
          >
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
              Reset your password
            </Typography>
            <Typography variant="body1" component="h3" sx={{ lineHeight: 1.2 }}>
              If you forgot your account's password, enter the email associated
              to it in the field below and we'll send you the instructions to
              reset it.
            </Typography>
            <Box
              sx={{
                marginTop: (theme) => theme.spacing(3),
                marginBottom: (theme) => theme.spacing(3),
              }}
            >
              <PasswordForm1 />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
