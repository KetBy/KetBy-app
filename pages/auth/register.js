import * as React from "react";
import { Box, Container, Grid, Typography, Paper } from "@mui/material";
import RegisterForm from "../../src/components/auth/RegisterForm";
import theme from "../../src/themes/default";

export default function AuthRegisterPage() {
  return (
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
            Welcome!
          </Typography>
          <Typography variant="body1" component="h3" sx={{ lineHeight: 1.2 }}>
            Create a new KetBy account and explore all its features.
          </Typography>
          <Box sx={{ my: 3 }}>
            <RegisterForm />
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
          You can register for now, but come back soon for more :)
        </Typography>
      </Grid>
    </Grid>
  );
}
