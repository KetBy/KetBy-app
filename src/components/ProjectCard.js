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
} from "@mui/material";

import { CardActionArea } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ForkRightRoundedIcon from "@mui/icons-material/ForkRightRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";

import Link from "next/link";

export default function ProjectCard({ project }) {
  return (
    <Card
      sx={{
        boxShadow: (theme) => theme.shadowsCustom[2],
      }}
    >
      <CardActionArea component={Link} href={`/composer/${project.token}/0`}>
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
          <Typography variant="body2" color="text.secondary" gutterBottom>
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
            <Tooltip title="Manage access permissions">
              <Button
                size="small"
                color="primary"
                variant="outlined"
                endIcon={<ShareRoundedIcon />}
              >
                Share
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
