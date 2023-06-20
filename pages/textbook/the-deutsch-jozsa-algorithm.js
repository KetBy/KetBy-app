import * as React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Skeleton,
  Divider,
} from "@mui/material";
import Head from "next/head";
import ProjectCard from "../../src/components/ProjectCard";
import TextbookArticle from "../../src/components/textbook/Article";
import axios from "../../src/utils/axios";
import DeutschJozsaCircuit from "../../public/assets/textbook/deutsch-jozsa-algorithm.png";
import DeutschJozsaCircuitEx1 from "../../public/assets/textbook/deutsch-jozsa-algorithm-example-1.png";
import DeutschJozsaCircuitEx2 from "../../public/assets/textbook/deutsch-jozsa-algorithm-example-2.png";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { articlesMap } from "../../src/utils/articles";
import LatexFigure from "../../src/components/LatexFigure";

export default function DeutschJozsaAlgorithm({ data }) {
  const article = articlesMap()["dja"];

  return (
    <>
      <Head>
        <title>The Deutsch-Jozsa algorithm | KetBy</title>
        <meta name="og:description" value={article.description} />
        <meta name="og:image" value={DeutschJozsaCircuit.src} />
      </Head>
      <TextbookArticle article={article}>
        <Typography>
          The Deutsch-Jozsa quantum algorithm solves a very specific problem
          which, although has little to no practical use, was among the first to
          show the speedup of quantum computing over classical computing.
        </Typography>
        <Typography>
          The problem statement is as follows: given a boolean function{" "}
          <LatexFigure input="f:\{0,1\}^n\rightarrow\{0,1\}" inline />, we must
          find out whether it is constant (i.e.,{" "}
          <LatexFigure
            input="f(x)=c \in \{0,1\}, \forall x \in \{0,1\}^n"
            inline
          />
          ) or balanced (i.e., <LatexFigure input="f(x)" inline /> produces 1 on
          exactly half of the inputs <LatexFigure input="x" inline />
          ). We are promised it is either one or the other.
        </Typography>
        <Typography>
          A classical computer would need{" "}
          <LatexFigure input="2^{n-1}+1" inline /> evaluations of{" "}
          <LatexFigure input="f" inline /> to yield a deterministic answer in
          the worst case. However, as we will see, the Deutsch-Jozsa quantum
          algorithm can yield the same answer with just one evaluation of{" "}
          <LatexFigure input="f" inline />.
        </Typography>
        <Typography>
          The quantum circuit on which this algorithm runs requires{" "}
          <LatexFigure input="n+1" inline /> qubits. The key of this algorithm
          is to find a way to implement <LatexFigure input="f" inline /> as a
          quantum oracle <LatexFigure input="U_f" inline /> that maps a state{" "}
          <LatexFigure input="\ket{x_1 ,x_2,\ldots,x_n}\ket{y}" inline /> to{" "}
          <LatexFigure
            input="\ket{x_1 ,x_2,\ldots,x_n}\ket{y \oplus f(x_1 ,x_2,\ldots,x_n)}"
            inline
          />
          , where <LatexFigure input="\oplus" inline /> denotes the bitwise
          exclusive-or (<i>XOR</i>) operator (alternatively, addition modulo 2).
        </Typography>
        <Typography>
          A typical circuit implementing the Deutsch-Jozsa algorithm is shown
          below.
        </Typography>
        <Box
          component="img"
          src={DeutschJozsaCircuit.src}
          alt="Deutsch-Jozsa circuit"
          sx={{ width: "350px" }}
        />
        <Typography>
          The quantum circuit has the initial state{" "}
          <LatexFigure input="\ket{\psi} = \ket{0}^{\otimes n}\ket{1}" inline />
          . Let us apply an <LatexFigure input="H" inline /> gate on each of the{" "}
          <LatexFigure input="n+1" inline /> qubits. This leads us to
        </Typography>
        <Typography>
          <LatexFigure input="\ket{\psi_2} = \frac{1}{\sqrt{2^n}}\sum_{x=0}^{2^n-1}\ket{x}\ket{-} = \frac{1}{\sqrt{2^{n+1}}}\sum_{x=0}^{2^n-1}\ket{x}(\ket{0}-\ket{1})" />
        </Typography>
        <Typography>
          In the equality above, the sum runs over all bitstrings of length{" "}
          <LatexFigure input="n" inline />. We then apply the quantum oracle{" "}
          <LatexFigure input="U_f" inline /> to the circuit, which maps the
          state <LatexFigure input="\ket{x}\ket{y}" inline /> to{" "}
          <LatexFigure input="\ket{x}(\ket{y} \oplus f(x))" inline />. We obtain
        </Typography>
        <LatexFigure input="\ket{\psi_3} = \frac{1}{\sqrt{2^{n+1}}}\sum_{x=0}^{2^n-1}\ket{x}\left(\ket{0\oplus f(x)}-\ket{1\oplus f(x)}\right)," />
        <Typography>
          which tells us that the first <LatexFigure input="n" inline /> qubits
          are still is the same state as in the case of{" "}
          <LatexFigure input="\ket{\psi_2}" inline />, but the qubit on position{" "}
          <LatexFigure input="n+1" inline /> now successfully encodes{" "}
          <LatexFigure input="y \oplus f(x)" inline />.
        </Typography>
        <Typography>
          We notice how, if <LatexFigure input="f(x)=0" inline />, the state of
          the last qubit is{" "}
          <LatexFigure
            input="\ket{0 \oplus 0} - \ket{1 \oplus 0} = \ket{0} - \ket{1}"
            inline
          />
          . Similarly, if <LatexFigure input="f(x)=1" inline />, the state of
          the last qubit is{" "}
          <LatexFigure
            input="\ket{0 \oplus 1} - \ket{1 \oplus 1} = \ket{1} - \ket{0}"
            inline
          />
          . For this reason, we can rewrite{" "}
          <LatexFigure input="\ket{\psi_3}" inline /> as
        </Typography>
        <Typography>
          <LatexFigure input="\ket{\psi_3} = \frac{1}{\sqrt{2^{n+1}}} \sum_{x=0}^{2^n-1} \big( (-1)^{f(x)} \ket{x} \big) (\ket{0}-\ket{1})" />
        </Typography>
        <Typography>
          We may now ignore the last qubit and only focus on the first{" "}
          <LatexFigure input="n" inline /> qubits. We are left with the
          following state:
        </Typography>
        <LatexFigure input="\frac{1}{\sqrt{2^{n}}} \sum_{x=0}^{2^n-1} (-1)^{f(x)} \ket{x}" />
        <Typography>
          Next, we apply the <LatexFigure input="H" inline /> gate on the first{" "}
          <LatexFigure input="n" inline /> qubits again. We obtain
        </Typography>
        <Typography>
          <LatexFigure input="\ket{\psi_4} = H^{\otimes n}\ket{\psi_3} = \frac{1}{\sqrt{2^{n}}} \sum_{x=0}^{2^n-1} \left( (-1)^{f(x)} \left( \frac{1}{\sqrt{2^{n}}} \sum_{y=0}^{2^n-1} (-1)^{x\cdot y} \ket{y} \right) \right)" />
        </Typography>
        <Typography>
          <LatexFigure input="= \frac{1}{2^{n}}\sum_{y=0}^{2^n-1}\sum_{x=0}^{2^n-1} \left( (-1)^{f(x)}  (-1)^{x\cdot y} \ket{y} \right)" />
        </Typography>
        <Typography>
          In the expression above,{" "}
          <LatexFigure
            input="x \cdot y = \bigoplus_{k=0}^{n-1}x_k y_k = x_0 y_0 \oplus x_1 y_1 \oplus \ldots \oplus x_{n-1} y_{n-1}"
            inline
          />{" "}
          is the sum of the bitwise product. Again, the sums in the expression
          of <LatexFigure input="\ket{\psi_4}" inline /> run over all bitstrings
          of length <LatexFigure input="n" inline />.
        </Typography>
        <Typography>
          The last step of the algorithm involves measuring the first{" "}
          <LatexFigure input="n" inline /> qubits. Given the state of{" "}
          <LatexFigure input="\ket{\psi_4}" inline />, the probability of
          measuring <LatexFigure input="\ket{0}^{\otimes n}" inline /> is
        </Typography>
        <Typography>
          <LatexFigure input="\pi = \mathcal{P}\big( \ket{x_0 x_1\ldots x_n} = \ket{00\ldots 0} \big) = \left| \frac{1}{2^n}\sum_{x=0}^{2^n-1} (-1)^{f(x)} \right|^2" />
        </Typography>
        <Typography>
          We notice how, if{" "}
          <LatexFigure input="f(x) = c \in \{0,1\}, \forall x" inline /> (i.e.,{" "}
          <LatexFigure input="f" inline /> is constant),{" "}
          <LatexFigure input="\pi" inline /> will evaluate to
        </Typography>
        <Typography>
          <LatexFigure input="\pi = \left| \frac{1}{2^n} \left( (-1)^c + (-1)^c + \ldots + (-1)^c\right) \right|^2 = \left| \frac{ 2^n(-1)^c}{2^n} \right|^2 = 1" />
        </Typography>
        <Typography>
          In other words, if <LatexFigure input="f" inline /> is constant, the
          probability to measure{" "}
          <LatexFigure input="\ket{0}^{\otimes n}" inline /> is 1. Similarly, if{" "}
          <LatexFigure input="f" inline /> is balanced, then{" "}
          <LatexFigure input="\pi" inline /> evaluates to 0, as any value of{" "}
          <LatexFigure input="(-1)^1" inline /> inside the sum will be canceled
          out by a value of <LatexFigure input="(-1)^0" inline />. Therefore, if{" "}
          <LatexFigure input="f" inline /> is balanced, any state other than{" "}
          <LatexFigure input="\ket{0}^{\otimes n}" inline /> will be measured.
        </Typography>
        <Typography>
          Check out the following examples implemented in KetBy.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography sx={{ textAlign: "center !important" }}>
            <LatexFigure
              input="f_1:\{0,1\}^{2} \rightarrow \{0,1\}, f(x_1,x_2) = x_1 \oplus x_2"
              inline
            />
            <Button
              variant="text"
              size="small"
              component="a"
              href="https://www.ketby.com/composer/mblgerpis3iueuei/2"
              target="_blank"
              endIcon={<OpenInNewRoundedIcon />}
            >
              open
            </Button>
          </Typography>
          <Box
            component="img"
            src={DeutschJozsaCircuitEx1.src}
            alt="Deutsch-Jozsa circuit example 1"
            sx={{ width: "225px" }}
          />
          <Typography sx={{ textAlign: "center !important" }}>
            <LatexFigure input="f_1" inline /> is balanced{" "}
          </Typography>
        </Box>
        <Divider sx={{ my: 3 }} />
        <Box>
          <Typography sx={{ textAlign: "center !important" }}>
            <LatexFigure
              input="f_2:\{0,1\}^{3} \rightarrow \{0,1\}, f_2(x_1,x_2,x_3) = x_1 \vee \neg x_1"
              inline
            />
            <Button
              variant="text"
              size="small"
              component="a"
              href="https://www.ketby.com/composer/mblgerpis3iueuei/4"
              target="_blank"
              endIcon={<OpenInNewRoundedIcon />}
            >
              open
            </Button>
          </Typography>
          <Box
            component="img"
            src={DeutschJozsaCircuitEx2.src}
            alt="Deutsch-Jozsa circuit example 2"
            sx={{ width: "225px" }}
          />
          <Typography sx={{ textAlign: "center !important" }}>
            <LatexFigure input="f_2" inline /> is constant{" "}
          </Typography>
        </Box>
      </TextbookArticle>
    </>
  );
}
