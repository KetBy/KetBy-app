import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CardActions,
  Button,
  Chip,
  Tooltip,
  ButtonGroup,
  IconButton,
} from "@mui/material";

import { CardActionArea } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ForkRightRoundedIcon from "@mui/icons-material/ForkRightRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import theme from "../themes/default";

import Link from "next/link";

export default function ProjectCard(props) {
  const _project = props.project;
  const [project, setProject] = React.useState(_project);
  const [starred, setStarred] = React.useState(false);

  const handleClick = (e) => {
    if (starred) {
      setProject({
        ...project,
        stars_count: project.stars_count - 1,
      });
    } else {
      setProject({
        ...project,
        stars_count: project.stars_count + 1,
      });
    }
    setStarred(!starred);
  };

  return (
    <Card
      sx={{
        boxShadow: (theme) => theme.shadowsCustom[2],
      }}
    >
      <CardActionArea
        component={Link}
        href={`/composer/${project.token}/${project.first_file_index}`}
      >
        {project.thumbnail_url && (
          <CardMedia
            component="img"
            height={150}
            image={`${process.env.NEXT_PUBLIC_CDN_URL}${project.thumbnail_url}`}
            alt={project.title}
          />
        )}
        <CardContent>
          <Typography
            variant="h5"
            sx={{
              lineHeight: 1.1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            {project.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            gutterBottom
            sx={{ mt: 0.5 }}
          >
            {project.date} - {project.files_count}{" "}
            {`file${project.files_count > 1 ? "s" : ""}`}
            <Chip
              size="small"
              label={project.public ? "Public" : "Private"}
              sx={{ ml: 1, display: "inline-flex", alignItself: "center" }}
              color={project.public ? "success" : "default"}
              variant="outlined"
              component="span"
            />
          </Typography>
          {project.author && (
            <Typography
              sx={{
                mt: -0.5,
                mb: 1,
                display: "block",
              }}
              variant="body2"
            >
              by{" "}
              <Typography
                variant="body2"
                color="primary"
                sx={{
                  fontWeight: 600,
                  textDecoration: "none",
                }}
                component={Link}
                href={`/u/${project.author.username}`}
              >
                @{project.author.username}
              </Typography>
            </Typography>
          )}
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            {project.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{ borderTop: (theme) => `1px solid ${theme.palette.grey[200]}` }}
      >
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Box sx={{ display: "inline" }}>
              <Tooltip title="Stars">
                <Chip
                  icon={<StarRoundedIcon color="warning" />}
                  label={project.stars_count}
                  variant="outlined"
                  size="small"
                  sx={{ borderColor: (theme) => theme.palette.grey[300] }}
                />
              </Tooltip>
              <Tooltip title="Forks">
                <Chip
                  icon={<ForkRightRoundedIcon color="primary" />}
                  label={project.forks_count}
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: (theme) => theme.palette.grey[300],
                    ml: 1,
                  }}
                />
              </Tooltip>
            </Box>
          </Grid>
          <Grid item xs={6} sx={{ display: "grid", justifyContent: "end" }}>
            <ButtonGroup>
              <Tooltip
                title={starred ? "Unstar this project" : "Star this project"}
              >
                <Button
                  size="small"
                  disableElevation
                  {...{
                    variant: starred ? "contained" : "outlined",
                    sx: {
                      background: starred
                        ? theme.palette.primary.main
                        : "white",
                      color: starred ? "white" : theme.palette.primary.main,
                    },
                  }}
                  onClick={handleClick}
                >
                  {starred ? (
                    <StarRoundedIcon
                      sx={{
                        fontSize: "1.2rem",
                      }}
                      color="yellow"
                    />
                  ) : (
                    <StarRoundedIcon
                      sx={{
                        fontSize: "1.2rem",
                      }}
                    />
                  )}
                </Button>
              </Tooltip>
              <Tooltip title="Fork this project">
                <Button size="small" color="primary" variant="outlined">
                  <ForkRightRoundedIcon
                    sx={{
                      fontSize: "1.2rem",
                    }}
                  />
                </Button>
              </Tooltip>
              <Tooltip title="Share this project">
                <Button size="small" color="primary" variant="outlined">
                  <ShareRoundedIcon
                    sx={{
                      fontSize: "1.1rem",
                    }}
                  />
                </Button>
              </Tooltip>
            </ButtonGroup>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
