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

export default function ArticleCard({ article }) {
  return (
    <Card
      sx={{
        boxShadow: (theme) => theme.shadowsCustom[2],
      }}
    >
      <CardActionArea
        component={Link}
        sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
        href={article.path}
      >
        <CardMedia
          component="img"
          image={article.thumbnail}
          alt={article.title}
        />
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
              fontWeight: 500,
            }}
          >
            {article.title}
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
              mt: 2,
            }}
          >
            {article.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
