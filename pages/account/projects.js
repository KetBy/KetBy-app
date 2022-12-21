import * as React from "react";
import { Box, Container, Typography, Grid, Button } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import { useAppContext } from "../../src/utils/context";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ProjectCard from "../../src/components/ProjectCard";

export default function AccountProjectsPage(props) {
  const { appState } = useAppContext();

  const thumbnails = [
    "/projects/EQdkHgzPO1N94SbD0TPAOyPDKIjySbci-thumbnail.svg",
    ,
    null,
    "/projects/neha-maheen-mahfin-3szSK-40AWM-unsplash.jpg",
  ];

  const titles = [
    "Quantum error correction",
    "Hadamard gates",
    "Shor's algorithm",
  ];

  const descriptions = [
    "Nulla eleifend elit erat, sit amet molestie elit accumsan vel. Nulla facilisi. Donec auctor, odio ac tincidunt egestas, erat nisl mollis nibh, quis feugiat ipsum sem ac quam. Nunc dapibus, turpis id aliquam tincidunt, odio urna iaculis ante, vitae sodales dui felis et magna. Aenean rhoncus, ex et euismod semper, sem elit porttitor sapien, a facilisis odio ligula convallis massa. Integer eleifend dictum congue. Suspendisse potenti.",
    null,
  ];

  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    let newProjects = [];
    for (let i = 0; i < 5; i++) {
      newProjects.push({
        thumbnail: thumbnails[Math.floor(Math.random() * thumbnails.length)],
        title: titles[Math.floor(Math.random() * titles.length)],
        description:
          descriptions[Math.floor(Math.random() * descriptions.length)],
        forks_count: Math.floor(Math.random() * 10),
        stars_count: Math.floor(Math.random() * 100),
        files_count: Math.floor(1 + Math.random() * 10),
      });
    }
    setProjects(newProjects);
  }, []);

  return (
    <Box sx={{ py: 2 }}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h4">Your projects</Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", justifyContent: "end" }}>
            <Button variant="contained" startIcon={<AddRoundedIcon />}>
              New project
            </Button>
          </Grid>
        </Grid>
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
          spacing={2}
          sx={{ mt: 1, width: "auto" }}
        >
          {projects.map((item, index) => {
            return (
              <ProjectCard
                project={{
                  title: item.title,
                  description: item.description,
                  forks_count: item.forks_count,
                  stars_count: item.stars_count,
                  thumbnail_url: item.thumbnail,
                  files_count: item.files_count,
                  date: "21/12/2022",
                }}
                key={index}
              />
            );
          })}
        </Masonry>
      </Container>
    </Box>
  );
}
