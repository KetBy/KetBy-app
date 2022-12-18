import * as React from "react";
import { Box, Alert, Button, Grid } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import Link from "next/link";
import axios from "../../../src/utils/axios";
import theme from "../../../src/themes/default";

const isServerReq = (req) => !req.url.startsWith("/_next");

export default function AuthConfirmPage({ data }) {
  return (
    <Box
      sx={{
        minHeight: `calc(100vh - ${theme.constants.menuHeight}px)`,
        display: "grid",
        alignItems: "center",
        justifyContent: "center",
        py: 5,
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
  );
}

export async function getServerSideProps({ query, req }) {
  const { token } = query;

  let data = {};

  if (isServerReq(req)) {
    await axios
      .post("/auth/confirm", {
        token: token,
      })
      .then((res) => {
        data = res.data;
      })
      .catch((err) => {
        data = {
          success: false,
          message: "Something went wrong. Please try again later.",
        };
      });
  } else {
    data = null;
  }

  return {
    props: { data },
  };
}
