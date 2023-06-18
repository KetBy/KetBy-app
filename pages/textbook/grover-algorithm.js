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
import GroverCircuit from "../../public/assets/textbook/grover-algorithm.png";
import GroverEx1 from "../../public/assets/textbook/grover-algorithm-example-1.png";
import GroverEx1Exp1 from "../../public/assets/textbook/grover-algorithm-example-1-experiment-1.png";
import GroverEx1Exp2 from "../../public/assets/textbook/grover-algorithm-example-1-experiment-2.png";
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
        <Typography>
          Grover's algorithm, also known as the <i>quantum search</i> algorithm,
          solves the unstructured search problem while also providing quadratic
          speedup.
        </Typography>
        <Typography>
          The problem statement is as follows: given{" "}
          <LatexFigure input="n \in \mathbb{Z}^*" inline />,{" "}
          <LatexFigure input="N=2^n" inline /> and a function{" "}
          <LatexFigure input="f:\{0,1,\dots,N-1\}\rightarrow\{0,1\}" inline />{" "}
          which outputs 0 for all but one input value, find the value{" "}
          <LatexFigure input="\omega" inline /> for which{" "}
          <LatexFigure input="f(\omega)=1" inline />. A classical computer could
          solve this problem with a time complexity of{" "}
          <LatexFigure input="\mathcal{O}(N)=\mathcal{O}(2^n)" inline />, as it
          needs to evaluate the function{" "}
          <LatexFigure input="\frac{N}{2}" inline /> times on average. However,
          as we will see in the following paragraphs, Grover's algorithm
          provides quadratic speedup, effectively succeeding in finding{" "}
          <LatexFigure input="\omega" inline /> with a time complexity of{" "}
          <LatexFigure
            input="\mathcal{O}(\sqrt{N}) = \mathcal{O}(\sqrt{2^n})"
            inline
          />
          .
        </Typography>
        <Typography>
          The quantum circuit that implements Grover's algorithm is shown below.
        </Typography>
        <Box
          component="img"
          src={GroverCircuit.src}
          alt="Grover circuit"
          sx={{ width: "300px" }}
        />
        <Typography>
          The quantum circuit is made up of <LatexFigure input="n" inline />
          qubits which initially are all in state{" "}
          <LatexFigure input="\ket{0}" inline />. Let us define{" "}
          <LatexFigure input="\ket{\psi}" inline /> as the state of the quantum
          system after we apply the <LatexFigure input="H" inline /> gate on
          each qubit.
        </Typography>
        <Typography>
          <LatexFigure input="\ket{\psi} = H^{\otimes n}\ket{0}^{\otimes n} = \frac{1}{\sqrt{2^n}}(\ket{0} + \ket{1})^{\otimes n} = \frac{1}{\sqrt{N}}\sum_{x}\ket{x}" />
        </Typography>
        <Typography>
          We will hereafter denote by{" "}
          <LatexFigure input="\sum_{x}\ket{x}" inline /> the superposition of
          all <LatexFigure input="N=2^n" inline /> bitstrings{" "}
          <LatexFigure input="x" inline /> of length{" "}
          <LatexFigure input="n" inline />. Let us not introduce{" "}
          <LatexFigure
            input="\ket{\alpha}=\frac{1}{\sqrt{N-1}}\sum_{x\neq \omega}\ket{x}"
            inline
          />
          . We can rewrite <LatexFigure input="\ket{\psi}" inline /> as
        </Typography>
        <Typography>
          <LatexFigure input="\ket{\psi} = \sin \left(\frac{\theta}{2}\right)\ket{\omega} + \cos\left(\frac{\theta}{2}\right)\ket{\alpha}" />
        </Typography>
        <Typography>
          where{" "}
          <LatexFigure
            input="\sin(\frac{\theta}{2})=\frac{1}{\sqrt{N}}"
            inline
          />{" "}
          [
          <Typography
            component="a"
            href="#ref-1"
            sx={{
              display: "inline !important",
              textDecoration: "none",
              color: (theme) => theme.palette.primary.main,
              fontWeight: 500,
            }}
          >
            1
          </Typography>
          ].
        </Typography>
        <Typography>
          Next, we apply the <LatexFigure input="U_f" inline /> <i>oracle</i>.
          This oracle, also called a subrouting, is defined as{" "}
          <LatexFigure input="U_f = (-1)^{f(x)}\ket{x}" inline />. Hence, we
          obtain
        </Typography>
        <Typography>
          <LatexFigure input="\ket{\psi'} = U_f\ket{\psi} = \cos(\theta)\ket{\alpha} - \sin(\theta)\ket{\omega}" />
        </Typography>
        <Typography>
          The next step of the algorithm is the application of a <i>diffuser</i>{" "}
          <LatexFigure
            input="U_d = 2\ket{\psi}\bra{\psi} - \mathcal{I}_{N}"
            inline
          />
          . Using trigonometric identities, we obtain
        </Typography>
        <Typography>
          <LatexFigure input="\ket{\psi''} = U_d\ket{\psi'} = \sin\left(\frac{3\theta}{2}\right)\ket{\omega} + \cos\left(\frac{3\theta}{2}\right)\ket{\alpha}" />
        </Typography>
        <Typography>
          After applying the successive <LatexFigure input="U_f" inline /> and{" "}
          <LatexFigure input="U_d" inline /> instructions, we reach
        </Typography>
        <Typography>
          <LatexFigure input="\ket{\psi_1} = \ket{\psi''} = \sin\left(\frac{3\theta}{2}\right)\ket{\omega} + \cos\left(\frac{3\theta}{2}\right)\ket{\alpha}" />
        </Typography>
        <Typography>
          Let us apply these two gates <LatexFigure input="t" inline /> times.
          After <LatexFigure input="t" inline /> iterations, we obtain
        </Typography>
        <Typography>
          <LatexFigure input="\ket{\psi_t} = \sin\left(\frac{(2t+1)\theta}{2}\right)\ket{\omega} + \cos\left(\frac{(2t+1)\theta}{2}\right)\ket{\alpha}" />
        </Typography>
        <Typography>
          After <LatexFigure input="t" inline /> iterations, the probability to
          measure
          <LatexFigure input="\ket{\omega}" inline /> is
        </Typography>
        <Typography>
          <LatexFigure input="\mathcal{P}(\ket{\psi_t} = \ket{\omega}) = |\braket{\omega|\psi_t}|^2 = \sin^2\left(\frac{(2t+1)\theta}{2}\right) " />
        </Typography>
        <Typography>
          Supposing that <LatexFigure input="t" inline /> is considerably larger
          than 1, the probability{" "}
          <LatexFigure
            input="\mathcal{P}(\ket{\psi_t} = \ket{\omega})"
            inline
          />{" "}
          can be approximated as{" "}
          <LatexFigure input="\sin^2\left(\frac{\theta t}{2}\right)" inline />.
          When <LatexFigure input="\theta p \approx \frac{\pi}{2}" inline />{" "}
          (i.e.,{" "}
          <LatexFigure input="t \approx \frac{\pi\sqrt{2^n}}{4}" inline />
          ), the probability{" "}
          <LatexFigure
            input="\mathcal{P}(\ket{\psi_t} = \ket{\omega})"
            inline
          />{" "}
          approaches 1. Hence, in order to obtain an answer with a high
          confidence, we must iterate over the{" "}
          <LatexFigure input="U_f" inline /> and{" "}
          <LatexFigure input="U_d" inline /> instructions{" "}
          <LatexFigure
            input="t \approx \left[\frac{\pi\sqrt{2^n}}{4}\right]"
            inline
          />{" "}
          times. This is what actually makes Grover's algorithm have a time
          complexity of <LatexFigure input="\mathcal{O}(\sqrt{2^n})" inline />:
          we evaluate the function <LatexFigure input="f" inline />{" "}
          approximately <LatexFigure input="t" inline /> times using the{" "}
          <LatexFigure input="U_f" inline /> oracle.
        </Typography>
        <Typography>
          It has already been proven that Grover's algorithm's quadratic speedup
          is optimal for the unstructured search problem. This means that we
          cannot solve the problem in polynomial time or faster, even on a
          quantum computer. However, the time complexity of Grover's algorithm,
          which is <LatexFigure input="\mathcal{O}(\sqrt{2^n})" inline />, is
          still much better than the exponential time complexity of{" "}
          <LatexFigure input="\mathcal{O}(2^n)" inline /> for a considerably
          large value of <LatexFigure input="n" inline />.
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Typography>
          The SAT (i.e., <i>boolean satisfiability</i>) problem can be solved
          using this algorithm. Let us consider the following SAT instance [
          <Typography
            component="a"
            href="#ref-2"
            sx={{
              display: "inline !important",
              textDecoration: "none",
              color: (theme) => theme.palette.primary.main,
              fontWeight: 500,
            }}
          >
            2
          </Typography>
          ], and implement it in KetBy.
        </Typography>
        <Typography sx={{ textAlign: "center !important" }}>
          <LatexFigure
            inline
            input="f(x=x_1 x_2 x_3)=x_1 \land x_2 \land \neg x_3"
          />{" "}
          <Button
            variant="text"
            size="small"
            component="a"
            href="https://www.ketby.com/composer/uygprqmfvpxbhz1k"
            target="_blank"
            endIcon={<OpenInNewRoundedIcon />}
          >
            open
          </Button>
        </Typography>
        <Typography>
          By employing ancilla qubits, we can implement Grover's algorithm for{" "}
          <LatexFigure inline input="f" /> as shown in the figure below.
        </Typography>
        <Box
          component="img"
          src={GroverEx1.src}
          alt="Grover circuit example"
          sx={{ width: "500px" }}
        />
        <Typography>
          As we can see, we use two ancilla qubits to implement the oracle{" "}
          <LatexFigure input="U_f" inline />. The second ancilla qubit is
          initially in state <LatexFigure input="\ket{1}" inline /> and we apply
          a <LatexFigure input="H" inline /> gate on it. We use{" "}
          <LatexFigure input="CCX" inline /> gates to compute the conjunctions
          between the literals, effectively mapping{" "}
          <LatexFigure input="\ket{x}" inline /> to{" "}
          <LatexFigure input="(-1)^{f(x)}\ket{x}" inline />. We also <i>undo</i>{" "}
          the first <LatexFigure input="CXX" inline /> gate (i.e.,{" "}
          <i>uncompute</i> the first ancilla qubit). Finally, we apply the
          diffuser{" "}
          <LatexFigure input="U_d = 2\ket{x}\bra{x}-\mathcal{I}_N" inline />.
        </Typography>
        <Typography>
          You can find a implementation of this circuit with{" "}
          <LatexFigure input="t=1" inline /> and{" "}
          <LatexFigure input="t=2" inline /> iterations{" "}
          <Typography
            sx={{
              color: (theme) => theme.palette.primary.main,
              display: "inline !important",
              fontWeight: 500,
              textDecoration: "underline",
            }}
            component="a"
            href="https://www.ketby.com/composer/uygprqmfvpxbhz1k"
            target="_blank"
          >
            here
          </Typography>
          .
        </Typography>
        <Typography>
          According to the previous introduction,{" "}
          <LatexFigure input="\theta" inline /> is defined as{" "}
          <LatexFigure
            input="\sin\left(\frac{\theta}{2}\right)=\frac{1}{\sqrt{2^n}}"
            inline
          />
          . In our case,{" "}
          <LatexFigure
            input="\sin\left(\frac{\theta}{2}\right)=\frac{1}{\sqrt{8}}"
            inline
          />
          , hence <LatexFigure input="\theta \approx 5.56" inline />. After{" "}
          <LatexFigure input="t=1" inline /> iterations over the{" "}
          <LatexFigure input="U_f" inline /> oracle and the{" "}
          <LatexFigure input="U_d" inline /> diffuser, the probability to
          measure <LatexFigure input="\ket{\omega}" inline />, where{" "}
          <LatexFigure input="\omega" inline /> is the bitstring that encodes
          the solution to the SAT problem, is{" "}
          <LatexFigure
            input="\mathcal{P} = \sin^2\left(\frac{(2t+1)\theta}{2}\right) \approx \sin^2\left(\frac{3*5.56}{2}\right) \approx 0.77"
            inline
          />
          . When running a simulation of the circuit with{" "}
          <LatexFigure input="t=1" inline /> iterations of{" "}
          <LatexFigure input="U_f" inline /> and{" "}
          <LatexFigure input="U_d" inline />, we measure{" "}
          <LatexFigure input="\ket{\texttt{011}}" inline /> (where{" "}
          <LatexFigure input="\texttt{011}" inline /> is the solution to the
          problem) in <LatexFigure input="\sim 77\%" inline /> of the cases, as
          shown below.
        </Typography>
        <Box
          component="img"
          src={GroverEx1Exp1.src}
          alt="Grover circuit example with 1 iteration"
          sx={{ width: "250px" }}
        />
        <Typography>
          Let us now perform two iterations over{" "}
          <LatexFigure input="U_f" inline /> and{" "}
          <LatexFigure input="U_d" inline />. In this case, the probability of
          success is{" "}
          <LatexFigure
            input="\mathcal{P} = \sin^2\left(\frac{(2t+1)\theta}{2}\right) \approx \sin^2\left(\frac{5*5.56}{2}\right) \approx 0.94"
            inline
          />
          . Again, the results of the simulation correlate with the
          mathematically expected results, as we measure the state{" "}
          <LatexFigure input="\ket{\texttt{011}}" inline /> in{" "}
          <LatexFigure input="\sim 94\%" inline /> of the cases.
        </Typography>
        <Box
          component="img"
          src={GroverEx1Exp2.src}
          alt="Grover circuit example with 2 iterations"
          sx={{ width: "250px" }}
        />
        <Divider sx={{ my: 3 }} />
        <Typography
          sx={{
            textAlign: "left !important",
          }}
        >
          <b>References</b>
          <Box id="ref-1">
            <code>[1]</code> B. Vermersch,{" "}
            <i>Lecture notes on "Quantum algorithms"</i>, Université Grenoble
            Alpes 2023, URL:{" "}
            <Typography
              sx={{
                color: (theme) => theme.palette.primary.main,
                display: "inline !important",
                fontWeight: 500,
                textDecoration: "underline",
              }}
              component="a"
              href="https://bvermersch.github.io"
              target="_blank"
            >
              https://bvermersch.github.io
            </Typography>
          </Box>
          <Box id="ref-2">
            <code>[2]</code> B. Siegelwax,{" "}
            <i>Grover's Algorithm, an Intuitive Look</i>, Quantum Zeitgeist
            2021, URL:{" "}
            <Typography
              sx={{
                color: (theme) => theme.palette.primary.main,
                display: "inline !important",
                fontWeight: 500,
                textDecoration: "underline",
              }}
              component="a"
              href="https://quantumzeitgeist.com/grovers-algorithm-an-intuitive-look/"
              target="_blank"
            >
              https://quantumzeitgeist.com/grovers-algorithm-an-intuitive-look/
            </Typography>
          </Box>
        </Typography>
      </TextbookArticle>
    </>
  );
}
