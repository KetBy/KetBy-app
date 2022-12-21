import * as React from "react";
import { Box, Container, Grid, Typography, Paper } from "@mui/material";
import Head from "next/head";
import LoginForm from "../../src/components/auth/LoginForm";
import theme from "../../src/themes/default";

export default function AuthLoginPage() {
  return (
    <>
      <Head>
        <title>Log in to your account | KetBy</title>
      </Head>
      <Grid
        container
        sx={{
          alignItems: "stretch",
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            minHeight: `calc(100vh - ${theme.constants.menuHeight}px)`,
            p: 3,
            display: "grid",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "auto", maxWidth: { xs: "auto", sm: 350 } }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
              Welcome back!
            </Typography>
            <Typography variant="body1" component="h3" sx={{ lineHeight: 1.2 }}>
              Log into your KetBy account to manage your circuits.
            </Typography>
            <Box sx={{ my: 3 }}>
              <LoginForm />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            minHeight: `calc(100vh - ${theme.constants.menuHeight}px)`,
            display: { xs: "none", md: "block" },
            background: theme.palette.primary.main,
            p: 3,
          }}
        >
          <Typography
            variant="h3"
            sx={{ color: theme.palette.primary[50], fontWeight: 800 }}
          >
            We're still working here...
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: theme.palette.primary[50], fontWeight: 500 }}
          >
            You can currently log in, but that's pretty much all. <br />
            Come back later for more :)
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
