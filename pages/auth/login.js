import * as React from "react";
import { Box, Container, Grid, Typography, Paper } from "@mui/material";
import Head from "next/head";
import LoginForm from "../../src/components/auth/LoginForm";
import theme from "../../src/themes/default";
import { Illustration } from "../index";
import {
  MouseParallaxContainer,
  MouseParallaxChild,
} from "react-parallax-mouse";

export default function AuthLoginPage() {
  return (
    <>
      <Head>
        <title>Log in to your account | KetBy</title>
      </Head>
      <MouseParallaxContainer globalFactorX={0.1} globalFactorY={0.1}>
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
              minHeight: {
                xs: "-webkit-fill-available",
                md: `calc(100vh - ${theme.constants.menuHeight}px)`,
              },
              p: theme.spacing(0, 3),
              display: "grid",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "white",
            }}
          >
            <Box
              sx={{ my: 3, width: "auto", maxWidth: { xs: "auto", sm: 350 } }}
            >
              <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
                Welcome back!
              </Typography>
              <Typography
                variant="body1"
                component="h3"
                sx={{ lineHeight: 1.2 }}
              >
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
              sx={{
                color: theme.palette.primary[50],
                fontWeight: 800,
                lineHeight: 1,
                maxWidth: "80%",
                mb: 3,
              }}
            >
              You're one step away from quantum computing.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.primary[50],
                fontWeight: 500,
                maxWidth: "75%",
              }}
            >
              Log into your account to create unlimited quantum circuits, share
              them with others, analyze and simulate them!
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Illustration />
            </Box>
          </Grid>
        </Grid>
      </MouseParallaxContainer>
    </>
  );
}
