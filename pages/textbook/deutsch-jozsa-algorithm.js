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
import Link from "next/link";
import { useAppContext } from "../../src/utils/context";
import theme from "../../src/themes/default";
import ProjectCard from "../../src/components/ProjectCard";
import TextbookArticle from "../../src/components/textbook/Article";
import axios from "../../src/utils/axios";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";

export default function DeutschJozsaAlgorithm({ data }) {
  return (
    <>
      <Head>
        <title>The Deutsch-Jozsa quantum algorithm | KetBy</title>
        <meta
          name="og:description"
          value="Free & in-browser quantum composer and quantum computing resources"
        />
      </Head>
      <TextbookArticle title="The Deutsch-Jozsa quantum algorithm">
        <Typography>
          The Deutsch-Jozsa quantum algorithm solves a very specific problem
          which, although has little to no practical use, was among the first to
          show the speedup of quantum computing over classical computing.
        </Typography>
        <Latex>
          {
            "The problem statement is as follows: given a boolean function $f:\\{0,1\\}^n\\rightarrow\\{0,1\\}$, we must find out whether $f$ is constant (i.e., $f(x)=c \\in \\{0,1\\}, \\forall x \\in \\{0,1\\}^n$ ) or balanced (i.e., $f(x)$ produces 1 on exactly half of the inputs $x$)."
          }
        </Latex>
      </TextbookArticle>
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
