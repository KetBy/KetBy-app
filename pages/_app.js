import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import theme from "../src/themes/default";
import createEmotionCache from "../src/utils/createEmotionCache";
import "../src/themes/overrides.scss";
import Menu from "../src/components/Menu";
import { AppWrapper } from "../src/utils/context";

const NextNProgress = dynamic(() => import("nextjs-progressbar"), {
  loading: () => null,
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>KetBy</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AppWrapper>
          <NextNProgress
            color={theme.palette.darkGrey.main}
            height={3}
            options={{ showSpinner: false }}
          />
          <Menu dark={router.pathname.startsWith("/auth")} />
          <Box
            sx={{
              bgcolor: (theme) => theme.palette.grey[50],
              minHeight: (theme) =>
                `calc(100vh - ${theme.constants.menuHeight}px)`,
            }}
          >
            <Component {...pageProps} />
          </Box>
        </AppWrapper>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
