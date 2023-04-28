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
  Avatar,
  Stack,
} from "@mui/material";

import { CardActionArea } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ForkRightRoundedIcon from "@mui/icons-material/ForkRightRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import theme from "../themes/default";

import Link from "next/link";
import { useRouter } from "next/router";
import { useAppContext } from "../utils/context";

export default function ProjectCard(props) {
  const { setShareProjectModal, setShareProjectModalOpen } = useAppContext();
  const _project = props.project;
  const [project, setProject] = React.useState(_project);
  const router = useRouter();

  return (
    <Card
      sx={{
        boxShadow: (theme) => theme.shadowsCustom[2],
      }}
    >
      <CardActionArea
        component={Link}
        sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
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
            component="div"
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
            component="div"
          >
            {project.date} - {project.files_count}{" "}
            {`file${project.files_count > 1 ? "s" : ""}`}
            <Chip
              size="small"
              label={project.public ? "public" : "private"}
              sx={{ ml: 1, display: "inline-flex", alignItself: "center" }}
              color={project.public ? "success" : "default"}
              variant="outlined"
              component="span"
            />
          </Typography>

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
            {project.author && !props.hideAuthor && (
              <Stack
                direction="horizontal"
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  alt={project.author.username}
                  src={project.author.avatar_url}
                  sx={{
                    width: 32,
                    height: 32,
                    mr: 1,
                    ml: 1,
                    boxShadow: theme.shadowsCustom[2],
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    textDecoration: "none",
                    color: theme.palette.primary.dark,
                  }}
                  component={Link}
                  href={`/u/${project.author.username}`}
                >
                  @{project.author.username}
                </Typography>
              </Stack>
            )}
          </Grid>
          <Grid item xs={6} sx={{ display: "grid", justifyContent: "end" }}>
            <ButtonGroup>
              <Tooltip title="Fork this project">
                <Button
                  size="small"
                  color="primary"
                  variant="outlined"
                  endIcon={<ForkRightRoundedIcon />}
                >
                  {project.forks_count}
                </Button>
              </Tooltip>
              <Tooltip title="Share this project">
                <Button
                  size="small"
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    setShareProjectModal(project);
                    setShareProjectModalOpen(true);
                  }}
                >
                  <ShareRoundedIcon
                    sx={{
                      fontSize: "1rem",
                      ml: -0.5,
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
