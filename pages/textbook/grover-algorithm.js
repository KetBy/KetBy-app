import * as React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Skeleton,
} from "@mui/material";
import Head from "next/head";
import ProjectCard from "../../src/components/ProjectCard";
import TextbookArticle from "../../src/components/textbook/Article";
import axios from "../../src/utils/axios";
import GroverCircuit from "../../public/assets/textbook/grover-algorithm.png";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { articlesMap } from "../../src/utils/articles";
import LatexFigure from "../../src/components/LatexFigure";

export default function DeutschJozsaAlgorithm({ data }) {
  const article = articlesMap()["ga"];

  return (
    <>
      <Head>
        <title>Grover's algorithm | KetBy</title>
        <meta name="og:description" value={article.description} />
        <meta name="og:image" value={GroverCircuit.src} />
      </Head>
      <TextbookArticle article={article}>
        <Typography>Coming soon.</Typography>
      </TextbookArticle>
    </>
  );
}
