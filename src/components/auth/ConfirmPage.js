import { Box, Alert, Button, Grid } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import Link from "next/link";
import theme from "../../themes/default";

export default function ConfirmPage({ data }) {
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
