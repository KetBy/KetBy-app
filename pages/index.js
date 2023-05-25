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
import { useAppContext } from "../src/utils/context";
import theme from "../src/themes/default";
import { keyframes } from "@mui/system";
import {
  MouseParallaxContainer,
  MouseParallaxChild,
} from "react-parallax-mouse";
import HeroBg from "../public/assets/page/home_hero_bg.svg";
import axios from "../src/utils/axios";
import ProjectCard from "../src/components/ProjectCard";

export const Illustration = (props) => {
  const flash = keyframes`
      0% {
        width: 0;
        left: 0;
      }
      30% {
        width: 0;
        left: 0;
      }
      32.5% {
        width: 20%;
        left: 25%;
      }
      35% {
        width: 20%;
        left: 50%;
      }
      37.5% {
        width: 20%;
        left: 75%;
      }
      40% {
        width: 0;
        left: 100%;
      }
      40.01% {
        width: 0;
        left: 0;
      }
      100% {
        width: 0;
        left: 0;
      }
    `;

  return (
    <Box
      sx={{
        height: {
          xs: 200,
          md: 400,
        },
        width: {
          xs: 225,
          md: 450,
        },
        position: "relative",
      }}
    >
      <Box
        sx={{
          height: 5,
          position: "absolute",
          width: "100%",
          bottom: `${(50 / 400) * 100}%`,
          background: theme.palette.darkGrey.main,
          zIndex: 1,
          "&:after": {
            content: "''",
            width: 0,
            height: 3,
            background: theme.palette.yellow.dark,
            opacity: 0.9,
            left: 0,
            top: 1,
            position: "absolute",
            borderRadius: 2,
            boxShadow: "rgba(255, 255, 255, 0.5) 4px 4px 12px",
            animation: `${flash} 5s infinite linear`,
            animationDelay: "0.25s",
          },
        }}
      />
      <Box
        sx={{
          height: 5,
          position: "absolute",
          width: "100%",
          top: `${(150 / 400) * 100}%`,
          background: theme.palette.darkGrey.main,
          zIndex: 0,
          "&:after": {
            content: "''",
            width: 0,
            height: 3,
            background: theme.palette.yellow.dark,
            opacity: 0.9,
            left: 0,
            top: 1,
            position: "absolute",
            borderRadius: 2,
            boxShadow: "rgba(255, 255, 255, 0.5) 4px 4px 12px",
            animation: `${flash} 5s infinite linear`,
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 5,
          background: theme.palette.darkGrey.main,
          height: `${(275 / 400) * 100}%`,
          top: `${(75 / 400) * 100}%`,
          left: `calc(${(125 / 450) * 100}% - 2.5px)`,
          zIndex: 3,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: `${(150 / 450) * 100}%`,
          height: `${(150 / 400) * 100}%`,
          top: `${(150 / 400) * 100}%`,
          left: `${(50 / 450) * 100}%`,
          borderRadius: "50%",
          transform: "translate(0, -50%)",
          border: `5px solid ${theme.palette.darkGrey.main}`,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: `${(25 / 450) * 100}%`,
          height: `${(25 / 400) * 100}%`,
          bottom: `calc(${(50 / 400) * 100}% + 2.5px)`,
          left: `${(100 / 450) * 100}%`,
          borderRadius: "50%",
          background: theme.palette.darkGrey.main,
          transform: "translate(50%, 50%)",
          zIndex: 6,
        }}
      />
      <MouseParallaxChild factorX={0.3} factorY={0.5}>
        <Box
          sx={{
            position: "absolute",
            width: {
              xs: 75,
              md: 150,
            },
            height: {
              xs: 75,
              md: 150,
            },
            background: "rgba(0, 138, 99, 0.9)",
            top: {
              xs: 75 / 2,
              md: 75,
            },
            left: {
              xs: 166 / 2 + 2.5,
              md: 166 + 2.5,
            },
            zIndex: 7,
            backdropFilter: "saturate(25) blur(4px)",
            border: `5px solid ${theme.palette.grey[50]}`,
            color: "white",
            fontSize: {
              xs: "3rem",
              md: "6rem",
            },
            fontWeight: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: theme.shadowsCustom[1],
          }}
        >
          Y
        </Box>
      </MouseParallaxChild>
      <MouseParallaxChild factorX={0.6} factorY={1}>
        <Box
          sx={{
            position: "absolute",

            width: {
              xs: 75,
              md: 150,
            },
            height: {
              xs: 75,
              md: 150,
            },
            top: {
              xs: 75 / 2,
              md: 75,
            },
            left: {
              xs: 275 / 2 + 2.5,
              md: 275 + 2.5,
            },
            background: "rgba(241, 55, 101, 0.9)",
            zIndex: 8,
            backdropFilter: "saturate(25) blur(4px)",
            border: `5px solid ${theme.palette.grey[50]}`,
            color: "white",
            fontSize: {
              xs: "3rem",
              md: "6rem",
            },
            fontWeight: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: theme.shadowsCustom[1],
          }}
        >
          H
        </Box>
      </MouseParallaxChild>
    </Box>
  );
};

const Hero = (props) => {
  const { appState } = useAppContext();

  const Superposition = (props) => {
    const swing_before = keyframes`
      0% {
        top: 0%;
        opacity: 1;
        filter: blur(0);
        transform: scale(1);
      }
      50% {
        top: -100%;
        opacity: 0;
        filter: blur(10px);
        transform: scale(0.5);
      }
      100% {
        top: 0%;
        opacity: 1;
        filter: blur(0);
        transform: scale(1);
      }
    `;
    const swing_after = keyframes`
      0% {
        top: 100%;
        opacity: 0;
        filter: blur(10px);
        transform: scale(0.5);
      }
      50% {
        top: -5%;
        opacity: 1;
        filter: blur(0);
        transform: scale(1);
      }
      100% {
        top: 100%;
        opacity: 0;
        filter: blur(10px);
        transform: scale(0.5);
      }
    `;
    return (
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          background: theme.palette.darkGrey.dark,
          padding: theme.spacing(0, 1),
          width: theme.typography.h1.fontSize,
          height: theme.typography.h1.fontSize,
          overflow: "hidden",
          textAlign: "center",
          mr: 1,
          position: "relative",
          "&:before": {
            content: "'0'",
            color: "white",
            width: "100%",
            height: "100%",
            position: "absolute",
            left: 0,
            animation: `${swing_before} 1.25s infinite ease-in-out`,
            transform: "translate(50%, 0)",
          },
          "&:after": {
            content: "'1'",
            color: "white",
            width: "100%",
            height: "100%",
            position: "absolute",
            left: 0,
            animation: `${swing_after} 1.25s infinite ease-in-out`,
          },
        }}
      />
    );
  };

  return (
    <MouseParallaxContainer globalFactorX={0.1} globalFactorY={0.1}>
      <Box
        sx={{
          background: theme.palette.secondary[200],
          backgroundImage: `url(${HeroBg.src})`,
          backgroundPosition: "bottom center",
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 50%",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: {
              xs: 0,
              md: "50%",
            },
            height: "100%",
            right: 0,
            backdropFilter: "blur(12px)",
          }}
        />
        <Container maxWidth="lg">
          <Grid
            container
            sx={{
              py: {
                xs: 8,
                md: 10,
                lg: 12,
                xl: 14,
              },
            }}
            spacing={3}
            alignItems="stretch"
          >
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                py: 2,
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  lineHeight: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Superposition /> seconds.
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  mt: 2,
                  lineHeight: 1,
                }}
              >
                that's all it takes to build a quantum circuit.
              </Typography>
              <Typography
                component="h3"
                variant="body1"
                sx={{
                  mt: 5,
                  mb: 5,
                }}
              >
                <b>Wanna know for sure?</b> <br />
                <b>KetBy</b> allows you to build quantum circuits visually and
                provides various tools to analyze, simulate and share them with
                others.
                <br /> <br />
                Whether you're interested in exploring the cutting-edge of
                quantum computing or pushing the boundaries of what's possible,
                KetBy is the perfect tool to help you unleash your creativity
                and unlock the potential of superposition.
              </Typography>
              <Box
                sx={{
                  display: {
                    xs: "flex",
                    sm: "block",
                  },
                  flexDirection: "column",
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  href={
                    appState.user
                      ? `/u/${appState.user.username}?tab=projects`
                      : `/auth/register`
                  }
                >
                  {appState.user ? `Manage your projects` : `Join for free`}
                </Button>
                <Button
                  variant="inline"
                  sx={{
                    ml: {
                      xs: 0,
                      sm: 1,
                    },
                    mt: {
                      xs: 2,
                      sm: 0,
                    },
                  }}
                  size="large"
                  component={Link}
                  href="/discover"
                >
                  Discover more
                </Button>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
                justifyContent: {
                  xs: "center",
                  md: "end",
                },
                alignItems: "center",
              }}
            >
              <Illustration />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </MouseParallaxContainer>
  );
};

const Featured = ({ highlightedProjects }) => {
  return (
    <>
      <Box sx={{ py: 3 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            Get inspired.
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            Here are some projects for you to explore.
          </Typography>
          <Grid container sx={{ mt: 0 }} spacing={3}>
            {highlightedProjects.map((project, index) => {
              return (
                <Grid item xs={12} md={6} lg={3} key={index}>
                  <ProjectCard project={project} />
                </Grid>
              );
            })}
          </Grid>
          <Button
            variant="contained"
            component={Link}
            href="/discover"
            sx={{ mt: 3 }}
          >
            Discover more projects
          </Button>
        </Container>
      </Box>
    </>
  );
};

export default function HomePage({ data }) {
  return (
    <>
      <Head>
        <title>KetBy</title>
        <meta
          name="og:description"
          value="Free & in-browser quantum composer and quantum computing resources"
        />
      </Head>
      <Hero />
      <Featured highlightedProjects={data.highlighted} />
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
