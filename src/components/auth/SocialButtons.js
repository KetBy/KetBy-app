import * as React from "react";
import { Box, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/FacebookTwoTone";

export default function SocialButtons(props) {
  return (
    <Box sx={{ textAlign: "center" }}>
      <IconButton sx={{ mx: 1 }} size="large" color="darkGrey">
        <GitHubIcon />
      </IconButton>
      <IconButton sx={{ mx: 1 }} size="large" color="darkGrey">
        <GoogleIcon />
      </IconButton>
      <IconButton sx={{ mx: 1 }} size="large" color="darkGrey">
        <FacebookIcon />
      </IconButton>
    </Box>
  );
}
