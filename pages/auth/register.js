import * as React from "react";
import Head from "next/head";
import Image from "next/image";

import { Box, Container, Grid, Typography, Paper } from "@mui/material";
import { keyframes } from "@mui/system";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

import RegisterForm from "../../src/components/auth/RegisterForm";
import theme from "../../src/themes/default";

import gradient_bg from "../../public/assets/auth/gradient_bg.svg";
import person_on_phone from "../../public/assets/auth/person_on_phone_2.png";

const emojiBubbleFloating = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(20px);
  }
  100% {
    transform: translateY(0);
  }
`;

const EmojiBubble = (props) => {
  const bubbleFloatingDuration = props.animationDuration
    ? props.animationDuration
    : 5;
  const emojiDuration =
    (props.animationDuration ? props.animationDuration : 5) * 0.75;

  const emojis = ["🧪", "💯", "💻", "⚛️", "⚡", "💡", "👨‍💻", "🔬", "🤔", "🥳"];
  const [emoji, setEmoji] = React.useState(null);

  const getRandomEmoji = () => {
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  const setRandomEmoji = () => {
    setEmoji(getRandomEmoji());
  };

  React.useEffect(() => {
    setRandomEmoji();
    setInterval(() => {
      setRandomEmoji();
    }, emojiDuration * 1000);
  }, []);

  return (
    <Box
      sx={{
        width: "64px",
        height: "64px",
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(5px) saturate(2)",
        borderRadius: "32px",
        animation: `${emojiBubbleFloating} ${bubbleFloatingDuration}s infinite ease`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          fontSize: "2rem",
        }}
      >
        {emoji}
      </Box>
    </Box>
  );
};

const Banner = () => {
  return (
    <Box
      sx={{
        position: "relative",
        background: "rgba(255,255,255,0.25)",
        backdropFilter: "blur(25px) saturate(2)",
        width: "100%",
        maxWidth: "500px",
        margin: "0 auto",
        padding: {
          xs: theme.spacing(5),
          md: theme.spacing(7),
        },
        borderRadius: theme.spacing(3),
        boxShadow: "0 10px 15px rgb(0 0 0 / 5%)",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "50%",
          height: "66%",
          right: 0,
          bottom: 0,
          "& img": {
            width: "auto",
            height: "auto",
            maxHeight: "100%",
            maxWidth: "100%",
            bottom: "-1px",
            position: "absolute",
            right: theme.spacing(1),
          },
        }}
      >
        <Image src={person_on_phone} alt="" placeholder="blur" />
      </Box>
      <Box
        sx={{
          position: "absolute",
          left: 0,
          bottom: "75px",
          transform: "translateX(-50%)",
        }}
      >
        <EmojiBubble animationDuration={5} />
      </Box>
      <Box
        sx={{
          position: "absolute",
          right: 0,
          top: "125px",
          transform: "translateX(50%)",
        }}
      >
        <EmojiBubble animationDuration={6} />
      </Box>
      <Typography
        variant="h2"
        sx={{
          color: theme.palette.common.white,
          fontWeight: 700,
          lineHeight: 1,
          width: {
            sx: "100%",
            md: "90%",
          },
        }}
      >
        A whole quantum world at your fingertips.
      </Typography>
      <Box
        sx={{
          width: "50px",
          height: "2px",
          background: "rgba(255,255,255,0.5)",
          m: theme.spacing(3, 0),
        }}
      />
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.common.white,
          width: "50%",
          lineHeight: 1.1,
        }}
      >
        KetBy provides free resources for those who want to dive into world of
        quantum computers.
      </Typography>

      <Box
        sx={{
          width: "2px",
          height: "30px",
          background: "rgba(255,255,255,0.5)",
          m: theme.spacing(3, 0),
        }}
      />
    </Box>
  );
};

export default function AuthRegisterPage() {
  return (
    <>
      <Head>
        <title>Create a new account | KetBy</title>
      </Head>
      <Grid
        container
        sx={{
          alignItems: "stretch",
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            minHeight: {
              xs: "-webkit-fill-available",
              md: `calc(100vh - ${theme.constants.menuHeight}px)`,
            },
            p: theme.spacing(0, 3),
            display: "grid",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "white",
          }}
          style={{}}
        >
          <Box sx={{ my: 3, width: "auto", maxWidth: { xs: "auto", sm: 350 } }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
              Welcome!
            </Typography>
            <Typography variant="body1" component="h3" sx={{ lineHeight: 1.2 }}>
              Create a new KetBy account and explore all its features.
            </Typography>
            <Box sx={{ my: 3 }}>
              <RegisterForm />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            minHeight: {
              sx: "auto",
              md: `calc(100vh - ${theme.constants.menuHeight}px)`,
            },
            display: {
              xs: "none",
              md: "flex",
            },
            backgroundImage: `url(${gradient_bg.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            p: theme.spacing(6),
            alignItems: "center",
          }}
        >
          <Banner />
        </Grid>
      </Grid>
    </>
  );
}
