import * as React from "react";
import { Box, Alert, Button, Grid } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import Head from "next/head";
import Link from "next/link";
import axios from "../../../src/utils/axios";
import theme from "../../../src/themes/default";

export default function AuthConfirmPage({ data }) {
  return (
    <>
      <Head>
        <title>Confirm your account | KetBy</title>
      </Head>
      <Box
        sx={{
          width: "auto",
          maxWidth: { xs: "auto", md: "300px" },
          minHeight: `calc(100vh - ${theme.constants.menuHeight}px)`,
          display: "grid",
          alignItems: "center",
          justifyContent: "center",
          py: 5,
          px: 3,
        }}
      >
        <Box
          sx={{
            width: "auto",
            maxWidth: { xs: "auto", md: "300px" },
            minWidth: { md: "300px" },
          }}
        >
          <Alert
            severity={data.success ? "success" : "warning"}
            sx={{ mb: 2, border: `1px solid ${theme.palette.grey.main}` }}
          >
            {data.message}
          </Alert>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<HomeRoundedIcon />}
                component={Link}
                href="/"
              >
                Back home
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                fullWidth
                endIcon={
                  data.success ? <LoginRoundedIcon /> : <PersonRoundedIcon />
                }
                component={Link}
                href={data.success ? "/auth/login" : "/auth/register"}
              >
                {data.success ? "Log in" : "Register"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  const { token } = context.query;

  const res = await axios.post("/auth/confirm", {
    token: token,
  });

  const data = res.data;

  return {
    props: { data },
  };
}
