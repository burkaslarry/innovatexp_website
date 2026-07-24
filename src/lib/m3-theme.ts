import { createTheme, type Theme } from "@mui/material/styles";

type Mode = "light" | "dark";

/** Material 3–inspired MUI theme aligned to InnovateXP brand (#1242de). */
export function createInnovateXpM3Theme(mode: Mode = "light"): Theme {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? "#6b8cff" : "#1242de",
        light: isDark ? "#9bb0ff" : "#5b7fff",
        dark: isDark ? "#4a6ef0" : "#0e35b5",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#00B9B3",
        light: "#5ee0db",
        dark: "#008f8a",
        contrastText: isDark ? "#003735" : "#003735",
      },
      background: {
        default: isDark ? "#0b1220" : "#f7f9fc",
        paper: isDark ? "#121a2b" : "#ffffff",
      },
      text: {
        primary: isDark ? "#e8eaed" : "#1a1c1e",
        secondary: isDark ? "#a8adb8" : "#44474e",
      },
      divider: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)",
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
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: isDark ? "#0b1220" : "#f7f9fc",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            minHeight: 48,
            paddingInline: 20,
            boxShadow: "none",
          },
          contained: {
            boxShadow: isDark ? "none" : "0 1px 2px rgba(18, 66, 222, 0.2)",
          },
          containedPrimary: {
            color: "#ffffff",
            "&:hover": { color: "#ffffff" },
            "&.Mui-disabled": { color: "rgba(255,255,255,0.7)" },
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
          filled: {
            "&.MuiChip-colorPrimary": {
              color: "#ffffff",
              backgroundColor: isDark ? "#6b8cff" : "#1242de",
              "& .MuiChip-label": { color: "#ffffff" },
              "& .MuiChip-icon": { color: "#ffffff" },
              "&:hover": {
                backgroundColor: isDark ? "#4a6ef0" : "#0e35b5",
                color: "#ffffff",
                "& .MuiChip-label": { color: "#ffffff" },
              },
            },
          },
          outlined: {
            borderColor: isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.18)",
            color: isDark ? "#e8eaed" : "#1a1c1e",
            "&:hover": {
              backgroundColor: isDark ? "rgba(107,140,255,0.12)" : "rgba(18,66,222,0.06)",
            },
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
            boxShadow: isDark
              ? "0 4px 20px rgba(0, 0, 0, 0.45)"
              : "0 4px 16px rgba(18, 66, 222, 0.35)",
          },
          primary: {
            color: "#ffffff",
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 12,
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
              backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "#eef1f8",
              "&:hover": {
                backgroundColor: isDark ? "rgba(255,255,255,0.09)" : "#e6eaf3",
              },
              "&.Mui-focused": {
                backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "#e6eaf3",
              },
              "&:before, &:after": { display: "none" },
            },
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(18,66,222,0.12)",
          },
        },
      },
    },
  });
}

/** @deprecated Prefer createInnovateXpM3Theme(mode) for dark-mode support */
export const innovateXpM3Theme = createInnovateXpM3Theme("light");
