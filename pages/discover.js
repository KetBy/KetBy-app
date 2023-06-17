import * as React from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import theme from "../src/themes/default";
import axios from "../src/utils/axios";
import ProjectCard from "../src/components/ProjectCard";
import ArticleCard from "../src/components/ArticleCard";
import articles from "../src/utils/articles";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";

const Projects = ({ projects }) => {
  return (
    <>
      <Box sx={{ py: 3 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            Featured projects
          </Typography>
          <Grid container sx={{ mt: 0 }} spacing={3}>
            {projects.map((project, index) => {
              return (
                <Grid item xs={12} md={6} lg={3} key={index}>
                  <ProjectCard project={project} />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

const Articles = () => {
  return (
    <>
      <Box sx={{ py: 3 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            Textbook articles
          </Typography>
          <Grid container sx={{ mt: 0 }} spacing={3}>
            {articles.map((article, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <ArticleCard article={article} />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default function DiscoverPage({ data }) {
  return (
    <>
      <Head>
        <title>Discover | KetBy</title>
        <meta
          name="og:description"
          value="Free & in-browser quantum composer and quantum computing resources"
        />
      </Head>
      <Articles />
      <Projects projects={data.highlighted} />
      <Container maxWidth="lg" sx={{ pb: 2 }}>
        <Typography variant="body1">
          Do you have anything to share?
          <br />
          Contact us at{" "}
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.primary[600],
              textDecoration: "none",
            }}
            component={Link}
            href="mailto:ketby.com@gmail.com"
            target="_blank"
          >
            ketby.com@gmail.com{" "}
            <ForwardToInboxRoundedIcon sx={{ fontSize: "14px", mb: -0.25 }} />
          </Typography>
        </Typography>
      </Container>
    </>
  );
}

export async function getStaticProps({ req, res }) {
  const result = await axios.get("/page/index");
  const data = result.data;

  return {
    props: {
      data,
    },
    revalidate: 10, // In seconds
  };
}
