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
              sx={{ fontWeight: 800, mt: 1, mb: 2, lineHeight: 1.2 }}
            >
              {props.article.title}
            </Typography>
            <Typography
              variant="body1"
              component="h3"
              sx={{ mt: 1, mb: 3, lineHeight: 1.2 }}
            >
              {props.article.description}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                background: "white",
                px: 3,
                py: 4,
                borderRadius: `${theme.shape.borderRadius}px`,
                boxShadow: theme.shadowsCustom[0],
                "& span.__Latex__": {
                  mb: 1,
                  textAlign: "justify",
                  display: "block",
                  maxWidth: "100%",
                  overflowX: "auto",
                  overflowY: "hidden",
                },
                "& img": {
                  maxWidth: "100%",
                  display: "block",
                  margin: "0 auto",
                  mb: 1,
                },
                "& .table .ketby-TableCell-root": {
                  border: "1px solid black",
                  "& span.__Latex__": {
                    textAlign: "center",
                  },
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
