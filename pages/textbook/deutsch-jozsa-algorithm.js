import * as React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Skeleton,
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
import DeutschJozsaCircuit from "../../public/assets/textbook/deutsch-jozsa-algorithm.png";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { articlesMap } from "../../src/utils/articles";

export default function DeutschJozsaAlgorithm({ data }) {
  const article = articlesMap()["dja"];

  return (
    <>
      <Head>
        <title>{article.title} | KetBy</title>
        <meta
          name="og:description"
          value="Free & in-browser quantum composer and quantum computing resources"
        />
      </Head>
      <TextbookArticle article={article}>
        <Typography component={Latex}>
          {
            "The Deutsch-Jozsa quantum algorithm solves a very specific problem which, although has little to no practical use, was among the first to show the speedup of quantum computing over classical computing."
          }
        </Typography>
        <Typography component={Latex}>
          {
            "The problem statement is as follows: given a boolean function $f:\\{0,1\\}^n\\rightarrow\\{0,1\\}$, we must find out whether $f$ is constant (i.e., $f(x)=c \\in \\{0,1\\}, \\forall x \\in \\{0,1\\}^n$ ) or balanced (i.e., $f(x)$ produces 1 on exactly half of the inputs $x$)."
          }
        </Typography>
        <Typography component={Latex}>
          {
            "A classical computer would need $2^{n-1}+1$ evaluations of $f$ to yield a deterministic answer in the worst case. However, as we will see, the Deutsch-Jozsa quantum algorithm can yield the same answer with just one evaluation of $f$."
          }
        </Typography>
        <Typography component={Latex}>
          {
            "The quantum circuit on which this algorithm runs requires $n+1$ qubits. The key of this algorithm is to find a way to implement $f$ as a quantum oracle $U_f$, that maps a state $\\ket{x_1 ,x_2,\\ldots,x_n}\\ket{y}$ to $\\ket{x_1 ,x_2,\\ldots,x_n}\\ket{y \\oplus f(x_1 ,x_2,\\ldots,x_n)}$, where $\\oplus$ denotes the bitwise <i>exclusive-or</i> ($XOR$) operator (alternatively, addition modulo 2)."
          }
        </Typography>
        <Typography component={Latex}>
          {
            "A typical circuit implementing the Deutsch-Jozsa algorithm is shown below."
          }
        </Typography>
        <Box
          component="img"
          src={DeutschJozsaCircuit.src}
          alt="Deutsch-Jozsa circuit"
          sx={{ height: "100px" }}
        />
        <Typography component={Latex}>
          {
            "The quantum circuit has the initial state $\\ket{\\psi} = \\ket{0}^{\\otimes n}\\ket{1}$. Let us apply a $H$ gate on each of the $n+1$ qubits. This leads us to "
          }
        </Typography>
        <Typography component={Latex}>
          {
            "$$\\ket{\\psi_2} = \\frac{1}{\\sqrt{2^n}}\\sum_{x=0}^{2^n-1}\\ket{x}\\ket{-} = \\frac{1}{\\sqrt{2^{n+1}}}\\sum_{x=0}^{2^n-1}\\ket{x}(\\ket{0}-\\ket{1})$$"
          }
        </Typography>
        <Typography component={Latex}>
          {
            "In the equality above, the sum runs over all bitstrings of length $n$. We then apply the quantum oracle $U_f$ to the circuit, which maps the state $\\ket{x}\\ket{y}$ to $\\ket{x}(\\ket{y} \\oplus f(x))$. In our case, $x$ is a bitstring of length $n$, while $y$ is a bitstring of length 1. We obtain "
          }
        </Typography>
        <Typography component={Latex}>
          {
            "$$\\ket{\\psi_3} = \\frac{1}{\\sqrt{2^{n+1}}}\\sum_{x=0}^{2^n-1}\\ket{x}\\big(\\ket{0\\oplus f(x)}-\\ket{1\\oplus f(x)}\\big),$$"
          }
        </Typography>
        <Typography component={Latex}>
          {
            "which tells us that the first $n$ qubits are still is the same state as in the case of $\\ket{\\psi_2}$, but the qubit on position $n+1$ now successfully encodes $y \\oplus f(x)$. "
          }
        </Typography>
        <Typography component={Latex}>
          {
            "We notice how, if $f(x)=0$, the state of the last qubit is $\\ket{0 \\oplus 0} - \\ket{1 \\oplus 0} = \\ket{0} - \\ket{1}$. Similarly, if $f(x)=1$, the state of the last qubit is $\\ket{0 \\oplus 1} - \\ket{1 \\oplus 1} = \\ket{1} - \\ket{0}$. For this reason, we can rewrite $\\ket{\\psi_3}$ as"
          }
        </Typography>
        <Typography component={Latex}>
          {
            "$$\\ket{\\psi_3} = \\frac{1}{\\sqrt{2^{n+1}}}\\sum_{x=0}^{2^n-1}\\big( (-1)^{f(x)}\\ket{x}\\big)(\\ket{0}-\\ket{1})$$"
          }
        </Typography>
        <Typography component={Latex}>
          {
            "We may now ignore the last qubit and only focus on the first $n$ qubits cite{qiskit_circuits}. We are left with the following state:"
          }
        </Typography>
        <Typography component={Latex}>
          {"$$\\frac{1}{\\sqrt{2^{n}}}\\sum_{x=0}^{2^n-1}(-1)^{f(x)}\\ket{x}$$"}
        </Typography>
        <Typography component={Latex}>
          {
            "Next, we apply the $H$ gate on the first $n$ qubits again. We obtain"
          }
        </Typography>
        <Typography component={Latex}>
          {
            "$$\\ket{\\psi_4} = H^{\\otimes n}\\ket{\\psi_3} = \\frac{1}{\\sqrt{2^{n}}}\\sum_{x=0}^{2^n-1}\\Bigg( (-1)^{f(x)} \\bigg( \\frac{1}{\\sqrt{2^{n}}}\\sum_{y=0}^{2^n-1} (-1)^{x\\cdot y} \\ket{y} \\bigg) \\Bigg)$$"
          }
        </Typography>
        <Typography component={Latex}>
          {
            "$$= \\frac{1}{2^{n}}\\sum_{y=0}^{2^n-1}\\sum_{x=0}^{2^n-1} \\big( (-1)^{f(x)}  (-1)^{x\\cdot y} \\ket{y} \\big)$$"
          }
        </Typography>
        <Typography component={Latex}>
          {
            "In the expression above, $x \\cdot y = \\bigoplus_{k=0}^{n-1}x_k y_k = x_0 y_0 \\oplus x_1 y_1 \\oplus \\ldots \\oplus x_{n-1} y_{n-1}$ is the sum of the bitwise product. Again, the sums in the expression of $\\ket{\\psi_4}$ run over all bitstrings of length $n$. "
          }
        </Typography>
        <Typography component={Latex}>
          {
            "The last step of the algorithm involves measuring the first $n$ qubits. Given the state of $\\ket{\\psi_4}$, the probability of measuring $\\ket{0}^{\\otimes n}$ is"
          }
        </Typography>
        <Typography component={Latex}>
          {
            "$$\\pi = \\mathcal{P}\\big( \\ket{x_0 x_1\\ldots x_n} = \\ket{00\\ldots 0} \\big) = \\Bigg| \\frac{1}{2^n}\\sum_{x=0}^{2^n-1} (-1)^{f(x)} \\Bigg|^2$$"
          }
        </Typography>
        <Typography component={Latex}>
          {
            "We notice how, if $f(x) = c \\in {0,1}, \\forall x$ (i.e., $f$ is constant), $\\pi$ will evaluate to "
          }
        </Typography>
        <Typography component={Latex}>
          {
            "$$\\pi = \\left| \\frac{1}{2^n} \\left( (-1)^c + (-1)^c + \\ldots + (-1)^c\\right) \\right|^2=\\left| \\frac{ 2^n(-1)^c}{2^n} \\right|^2 = 1 $$"
          }
        </Typography>
        <Typography component={Latex}>
          {
            "In other words, if $f$ is constant, the probability to measure $\\ket{0}^{\\otimes n}$ is 1. Similarly, if $f$ is balanced, then $\\pi$ evaluates to 0, as any value of $(-1)^1$ inside the sum will be canceled out by a value of $(-1)^0$. Therefore, if $f$ is balanced, any state other than $\\ket{0}^{\\otimes n}$ will be measured."
          }
        </Typography>
        <Typography>
          Check out the following examples implemented in KetBy.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography component={Latex}>
            {
              "$f_1:\\{0,1\\}^{2} \\rightarrow \\{0,1\\}, f(x_1,x_2) = x_1 \\otimes x_2$"
            }
          </Typography>
          This function is balanced.{" "}
          <Button
            variant="contained"
            size="small"
            component="a"
            href="https://www.ketby.com/composer/mblgerpis3iueuei/2"
            target="_blank"
            endIcon={<OpenInNewRoundedIcon />}
          >
            open
          </Button>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Typography component={Latex} sx={{ mt: 3 }}>
            {
              "$f_2:\\{0,1\\}^{3} \\rightarrow \\{0,1\\}, f_2(x_1,x_2,x_3) = x_1 \\vee \\neg x_1$"
            }
          </Typography>
          This function is constant.{" "}
          <Button
            variant="contained"
            size="small"
            component="a"
            href="https://www.ketby.com/composer/mblgerpis3iueuei/4"
            target="_blank"
            endIcon={<OpenInNewRoundedIcon />}
          >
            open
          </Button>
        </Box>
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
