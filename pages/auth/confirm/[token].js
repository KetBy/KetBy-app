import * as React from "react";
import { Box, Alert, Button, Grid, Typography } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "../../../src/utils/axios";
import theme from "../../../src/themes/default";
import CustomCircularProgress from "../../../src/components/custom/CircularProgress";

export default function AuthConfirmPage() {
  const router = useRouter();
  const { token } = router.query;

  const [loaded, setLoaded] = React.useState(false);
  const [data, setData] = React.useState({
    success: null,
    message: null,
  });

  React.useEffect(() => {
    if (!token) {
      return;
    }
    axios
      .post("/auth/confirm", {
        token: token,
      })
      .then((res) => {
        setData(res.data);
        setLoaded(true);
      })
      .catch((err) => {
        setData({
          success: false,
          message: "Something went wrong. Please try again later.",
        });
        setLoaded(true);
      });
  }, [token]);

  return (
    <>
      <Head>
        <title>Confirm your account | KetBy</title>
      </Head>
      <Box
        sx={{
          minHeight: `calc(100vh - ${theme.constants.menuHeight}px)`,
          display: "grid",
          alignItems: "center",
          justifyContent: "center",
          py: 5,
          px: 3,
        }}
      >
        {loaded ? (
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
            <Grid container spacing={2} rowSpacing={2}>
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  fullWidth
                  endIcon={
                    data.success ? <LoginRoundedIcon /> : <PersonRoundedIcon />
                  }
                  component={Link}
                  href={data.success ? "/auth/login" : "/auth/register"}
                  sx={{ display: { xs: "none", sm: "flex" } }}
                >
                  {data.success ? "Log in" : "Register"}
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={
                    data.success ? <LoginRoundedIcon /> : <PersonRoundedIcon />
                  }
                  component={Link}
                  href={data.success ? "/auth/login" : "/auth/register"}
                  sx={{ display: { xs: "default", sm: "none" } }}
                >
                  {data.success ? "Log in" : "Register"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box sx={{ textAlign: "center" }}>
            <CustomCircularProgress />

            <Typography variant="body1">Please wait a second...</Typography>
          </Box>
        )}
      </Box>
    </>
  );
}
