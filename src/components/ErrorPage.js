import * as React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import Link from "next/link";
import theme from "../themes/default";
import E403 from "../../public/assets/page/403.svg";
import E404 from "../../public/assets/page/404.svg";
import E500 from "../../public/assets/page/500.svg";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

export default function ErrorPage({ code }) {
  return (
    <Box
      sx={{
        minHeight: {
          xs: "-webkit-fill-available",
          md: `calc(100vh - ${theme.constants.menuHeight}px)`,
        },
        display: "flex",
        alignItems: "center",
        background: "white",
      }}
    >
      <Container maxWidth="md" sx={{ my: 3, textAlign: "center" }}>
        <Box>
          <Box
            component="img"
            src={code == 403 ? E403.src : code == 404 ? E404.src : E500.src}
            sx={{
              height: "250px",
              width: "auto",
              minHeight: "150px",
              maxHeight: "30vh",
            }}
          />
        </Box>
        <Typography
          variant="h4"
          sx={{
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Error {code}
        </Typography>
        <Typography>
          {code == 403 &&
            "We're sorry, you are not allowed to access this page."}
          {code == 404 &&
            "We're sorry, this page does not exist or has been moved."}
          {code != 403 &&
            code != 404 &&
            "The server has encountered an unexpected error. Please come back later."}
        </Typography>
        <Button
          variant="contained"
          component={Link}
          href="/"
          sx={{ mt: 3 }}
          size="large"
          endIcon={<HomeRoundedIcon />}
        >
          Go home
        </Button>
      </Container>
    </Box>
  );
}
