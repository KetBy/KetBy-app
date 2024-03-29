import { Roboto } from "@next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const theme = createTheme({
  constants: {
    menuHeight: 64,
  },
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
    unit: "px",
  },
  direction: "ltr",
  components: {
    MuiCssBaseline: {
      defaultProps: {
        enableColorScheme: true,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableTouchRipple: false,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {},
      variants: [
        {
          props: {
            variant: "code",
          },
        },
        {
          props: {
            variant: "link",
          },
        },
      ],
    },
    MuiIconButton: {
      variants: [
        {
          props: {
            color: "primary",
          },
        },
      ],
    },
    MuiMenu: {
      styleOverrides: {
        root: {
          "& .ketby-Paper-root": {
            boxShadow:
              "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
          },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {},
    },
    MuiDivider: {
      styleOverrides: {},
    },
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
      styleOverrides: {},
    },
    MuiChip: {
      styleOverrides: {},
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {},
    },
    MuiSelect: {
      styleOverrides: {
        iconFilled: {
          top: "calc(50% - .25em)",
        },
      },
    },
    MuiTab: {
      defaultProps: {
        disableTouchRipple: true,
      },
    },
    MuiPaper: {
      styleOverrides: {},
    },
    MuiTableCell: {
      styleOverrides: {},
    },
    MuiToggleButtonGroup: {
      styleOverrides: {},
    },
    MuiToggleButton: {
      styleOverrides: {},
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          padding: "5px 9px",
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {},
    },
    MuiPaginationItem: {
      styleOverrides: {},
    },
    MuiAlert: {
      styleOverrides: {
        lineHeight: 1.1,
      },
    },
  },
  palette: {
    mode: "light",
    red: {
      light: "#F78DA7",
      main: "#F13765",
      dark: "#AC0C34",
    },
    yellow: {
      light: "#FBFB9D",
      main: "#F9F871",
      dark: "#D7D709",
    },
    green: {
      light: "#02C28B",
      main: "#008A63",
      dark: "#007A58",
    },
    blue: {
      light: "#5CADFF",
      main: "#007FFF",
      dark: "#00478F",
    },
    purple: {
      light: "#D172E9",
      main: "#BA2BDE",
      dark: "#75168D",
    },
    pink: {
      light: "#FF85C2",
      main: "#FF3399",
      dark: "#B8005C",
    },
    orange: { light: "#FFCB70", main: "#FFB433", dark: "#CC8100" },
    grey: { light: "#E8E9ED", main: "#A2A5B9", dark: "#6C7289" },
    darkGrey: {
      light: "#666980",
      main: "#484A5B",
      dark: "#24252E",
    },
    primary: {
      50: "#F0F7FF",
      100: "#C2E0FF",
      200: "#99CCF3",
      300: "#66B2FF",
      400: "#3399FF",
      500: "#007FFF",
      600: "#0072E5",
      700: "#0059B2",
      800: "#004C99",
      900: "#003A75",
      main: "#007FFF",
      light: "#66B2FF",
      dark: "#0059B2",
      contrastText: "#fff",
    },
    divider: "#E7EBF0",
    primaryDark: {
      50: "#E2EDF8",
      100: "#CEE0F3",
      200: "#91B9E3",
      300: "#5090D3",
      400: "#265D97",
      500: "#1E4976",
      600: "#173A5E",
      700: "#132F4C",
      800: "#001E3C",
      900: "#0A1929",
      main: "#5090D3",
    },
    common: {
      black: "#1D1D1D",
      white: "#fff",
    },
    text: {
      primary: "#1A2027",
      secondary: "#3E5060",
      disabled: "rgba(0, 0, 0, 0.38)",
      primaryChannel: "0 0 0",
      secondaryChannel: "0 0 0",
    },
    grey: {
      50: "#F3F6F9",
      100: "#E7EBF0",
      200: "#E0E3E7",
      300: "#CDD2D7",
      400: "#B2BAC2",
      500: "#A0AAB4",
      600: "#6F7E8C",
      700: "#3E5060",
      800: "#2D3843",
      900: "#1A2027",
      main: "#E7EBF0",
      contrastText: "#6F7E8C",
      A100: "#f5f5f5",
      A200: "#eeeeee",
      A400: "#bdbdbd",
      A700: "#616161",
    },
    error: {
      50: "#FFF0F1",
      100: "#FFDBDE",
      200: "#FFBDC2",
      300: "#FF99A2",
      400: "#FF7A86",
      500: "#FF505F",
      600: "#EB0014",
      700: "#C70011",
      800: "#94000D",
      900: "#570007",
      main: "#EB0014",
      light: "#FF99A2",
      dark: "#C70011",
      contrastText: "#fff",
    },
    success: {
      50: "#E9FBF0",
      100: "#C6F6D9",
      200: "#9AEFBC",
      300: "#6AE79C",
      400: "#3EE07F",
      500: "#21CC66",
      600: "#1DB45A",
      700: "#1AA251",
      800: "#178D46",
      900: "#0F5C2E",
      main: "#1AA251",
      light: "#6AE79C",
      dark: "#1AA251",
      contrastText: "#fff",
    },
    warning: {
      50: "#FFF9EB",
      100: "#FFF3C1",
      200: "#FFECA1",
      300: "#FFDC48",
      400: "#F4C000",
      500: "#DEA500",
      600: "#D18E00",
      700: "#AB6800",
      800: "#8C5800",
      900: "#5A3600",
      main: "#DEA500",
      light: "#FFDC48",
      dark: "#AB6800",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    secondary: {
      main: "#9c27b0",
      light: "#ba68c8",
      dark: "#7b1fa2",
      contrastText: "#fff",
    },
    info: {
      main: "#0288d1",
      light: "#03a9f4",
      dark: "#01579b",
      contrastText: "#fff",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    background: {
      paper: "#fff",
      default: "#fff",
    },
    action: {
      active: "rgba(0, 0, 0, 0.54)",
      hover: "rgba(0, 0, 0, 0.04)",
      hoverOpacity: 0.04,
      selected: "rgba(0, 0, 0, 0.08)",
      selectedOpacity: 0.08,
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(0, 0, 0, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
      activeChannel: "0 0 0",
      selectedChannel: "0 0 0",
    },
    purle: {
      main: "#9f40ff",
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily:
      '"IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    fontFamilyCode: "Menlo,Lucida Console,monospace",
    fontFamilyTagline:
      '"PlusJakartaSans-ExtraBold",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    fontFamilySystem:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    fontWeightSemiBold: 600,
    fontWeightExtraBold: 800,
    h1: {
      fontFamily:
        '"PlusJakartaSans-ExtraBold",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontSize: "clamp(2.625rem, 1.2857rem + 3.5714vw, 4rem)",
      fontWeight: 800,
      lineHeight: 1.1142857142857143,
      color: "#0A1929",
      scrollMarginTop: "calc(var(--MuiDocs-header-height) + 32px)",
    },
    h2: {
      fontFamily:
        '"PlusJakartaSans-ExtraBold",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontSize: "clamp(1.5rem, 0.9643rem + 1.4286vw, 2.25rem)",
      fontWeight: 800,
      lineHeight: 1.2222222222222223,
      color: "#132F4C",
      scrollMarginTop: "calc(var(--MuiDocs-header-height) + 32px)",
    },
    h3: {
      fontFamily:
        '"PlusJakartaSans-Bold",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontSize: "2.25rem",
      lineHeight: 1.2222222222222223,
      letterSpacing: 0.2,
      fontWeight: 400,
      scrollMarginTop: "calc(var(--MuiDocs-header-height) + 32px)",
    },
    h4: {
      fontFamily:
        '"PlusJakartaSans-Bold",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontSize: "1.75rem",
      lineHeight: 1.5,
      letterSpacing: 0.2,
      fontWeight: 400,
      scrollMarginTop: "calc(var(--MuiDocs-header-height) + 32px)",
    },
    h5: {
      fontFamily:
        '"PlusJakartaSans-Bold",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontSize: "1.5rem",
      lineHeight: 1.5,
      letterSpacing: 0.1,
      color: "#007FFF",
      fontWeight: 400,
      scrollMarginTop: "calc(var(--MuiDocs-header-height) + 32px)",
    },
    h6: {
      fontSize: "1.25rem",
      lineHeight: 1.5,
      fontFamily:
        '"IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontWeight: 500,
      scrollMarginTop: "calc(var(--MuiDocs-header-height) + 32px)",
    },
    button: {
      textTransform: "initial",
      fontWeight: 700,
      letterSpacing: 0,
      fontFamily:
        '"IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontSize: "0.875rem",
      lineHeight: 1.75,
      scrollMarginTop: "calc(var(--MuiDocs-header-height) + 32px)",
    },
    subtitle1: {
      fontSize: "1rem",
      lineHeight: 1.3333333333333333,
      letterSpacing: 0,
      fontWeight: 500,
      fontFamily:
        '"IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      scrollMarginTop: "calc(var(--MuiDocs-header-height) + 32px)",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: 0,
      fontFamily:
        '"IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontWeight: 400,
      scrollMarginTop: "calc(var(--MuiDocs-header-height) + 32px)",
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
      letterSpacing: 0,
      fontFamily:
        '"IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontWeight: 400,
      scrollMarginTop: "calc(var(--MuiDocs-header-height) + 32px)",
    },
    code: {
      fontFamily: "monospace",
      background: "#E0E3E7",
      display: "inline-block",
      border: "1px solid #B2BAC2",
      padding: "1px 5px",
      borderRadius: "3px",
      color: "#3E5060",
    },
    caption: {
      display: "inline-block",
      fontSize: "0.75rem",
      lineHeight: 1.5,
      letterSpacing: 0,
      fontWeight: 700,
      fontFamily:
        '"IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      scrollMarginTop: "calc(var(--MuiDocs-header-height) + 32px)",
    },
    allVariants: {
      scrollMarginTop: "calc(var(--MuiDocs-header-height) + 32px)",
    },
    htmlFontSize: 16,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    subtitle2: {
      fontFamily:
        '"IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.57,
      scrollMarginTop: "calc(var(--MuiDocs-header-height) + 32px)",
    },
    overline: {
      fontFamily:
        '"IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 2.66,
      textTransform: "uppercase",
      scrollMarginTop: "calc(var(--MuiDocs-header-height) + 32px)",
    },
    styleOverrides: {
      "&.glued": {
        textJustify: "none",
        display: "inline-block",
      },
    },
  },
  nprogress: {
    color: "#007FFF",
  },
  props: {
    MuiBadge: {
      overlap: "rectangular",
    },
  },
  mixins: {
    toolbar: {
      minHeight: 56,
      "@media (min-width:0px)": {
        "@media (orientation: landscape)": {
          minHeight: 48,
        },
      },
      "@media (min-width:600px)": {
        minHeight: 64,
      },
    },
  },
  shadows: [
    "none",
    "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
    "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
    "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
    "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
    "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
    "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
    "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
    "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
    "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
    "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
    "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
    "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
    "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
    "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
    "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
    "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
    "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
  ],
  shadowsCustom: [
    "none",
    "rgba(0, 0, 0, 0.08) 0px 4px 12px",
    "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
  ],
  transitions: {
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  zIndex: {
    mobileStepper: 1000,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
});

export default theme;
