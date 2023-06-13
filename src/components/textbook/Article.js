import * as React from "react";
import { Box, Typography, Container, Grid, Button } from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import Link from "next/link";
import theme from "../../themes/default";

export default function TextbookArticle(props) {
  return (
    <Box>
      <Container maxWidth="md" sx={{ py: 2 }}>
        <Grid container>
          <Grid item xs={12}>
            <Button
              variant="inline"
              startIcon={<ChevronLeftRoundedIcon />}
              component={Link}
              href="/discover"
            >
              Back to textbook
            </Button>
            <Typography
              variant="h4"
              component="h1"
              sx={{ fontWeight: 800, mt: 1, mb: 2 }}
            >
              {props.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                background: "white",
                p: 2,
                borderRadius: `${theme.shape.borderRadius}px`,
                boxShadow: theme.shadowsCustom[0],
                "& p": {
                  mb: 1,
                  textAlign: "justify",
                },
              }}
            >
              {props.children}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
