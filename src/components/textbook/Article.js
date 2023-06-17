import * as React from "react";
import { Box, Typography, Container, Grid, Button } from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import Link from "next/link";
import theme from "../../themes/default";
import articles from "../../utils/articles";
import ArticleCard from "../ArticleCard";

export default function TextbookArticle(props) {
  return (
    <Box>
      <Container maxWidth="md" sx={{ py: 2 }}>
        <Grid container>
          <Grid item xs={12}>
            <Button
              variant="text"
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
              variant="subtitle1"
              component="h3"
              sx={{
                mt: 1,
                mb: 3,
                lineHeight: 1.2,
              }}
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
                boxShadow: theme.shadowsCustom[1],
                "& .ketby-Typography-root": {
                  "&:not(:last-child)": {
                    mb: 1.5,
                  },
                  textAlign: {
                    xs: "left",
                    sm: "justify",
                  },
                  maxWidth: "100%",
                  overflowX: "auto",
                  display: "block",
                  "& img.block-latex": {
                    display: "block",
                    maxWidth: "none !important",
                  },
                },
                "& img:not(.inline-latex)": {
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
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, my: 3 }}>
            Related articles -{" "}
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                display: "inline",
                color: theme.palette.primary.main,
              }}
              component={Link}
              href="/discover "
            >
              see all
            </Typography>
          </Typography>
          <Grid container spacing={3}>
            {articles.map((article, index) => {
              if (index > 3 || props.article.id == article.id) return;
              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <ArticleCard article={article} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
