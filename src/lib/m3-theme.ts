import { createTheme } from "@mui/material/styles";

/** Material 3–inspired MUI theme aligned to InnovateXP brand (#1242de). */
export const innovateXpM3Theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1242de",
      light: "#5b7fff",
      dark: "#0e35b5",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#00B9B3",
      light: "#5ee0db",
      dark: "#008f8a",
      contrastText: "#003735",
    },
    background: {
      default: "#f7f9fc",
      paper: "#ffffff",
    },
    text: {
      primary: "#1a1c1e",
      secondary: "#44474e",
    },
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: 'var(--font-geist-sans), "Noto Sans TC", "Helvetica Neue", Arial, sans-serif',
    h1: { fontWeight: 800, letterSpacing: "-0.02em" },
    h2: { fontWeight: 700, letterSpacing: "-0.01em" },
    h3: { fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 700 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          minHeight: 48,
          paddingInline: 20,
          boxShadow: "none",
        },
        contained: {
          boxShadow: "0 1px 2px rgba(18, 66, 222, 0.2)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          height: 40,
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        rounded: {
          borderRadius: 24,
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 16px rgba(18, 66, 222, 0.35)",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "filled",
      },
      styleOverrides: {
        root: {
          "& .MuiFilledInput-root": {
            borderRadius: 12,
            overflow: "hidden",
            backgroundColor: "#eef1f8",
            "&:before, &:after": { display: "none" },
          },
        },
      },
    },
  },
});
