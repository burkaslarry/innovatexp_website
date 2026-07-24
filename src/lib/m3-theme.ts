import { createTheme, type Theme } from "@mui/material/styles";

type Mode = "light" | "dark";

/**
 * Material 3 interaction + 水木 palette
 * Light: CTA #16A34A / Dark: CTA #1F9D6B
 */
export function createInnovateXpM3Theme(mode: Mode = "light"): Theme {
  const isDark = mode === "dark";
  const primary = isDark ? "#1F9D6B" : "#16A34A";
  const primaryHover = isDark ? "#2ECC71" : "#15803D";
  const secondary = isDark ? "#3B82F6" : "#1E3A8A";
  const canvas = isDark ? "#0B1220" : "#F4F7FA";
  const paper = isDark ? "#121A2B" : "#F2F9F6";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: primary,
        light: isDark ? "#2ECC71" : "#22C55E",
        dark: primaryHover,
        contrastText: "#ffffff",
      },
      secondary: {
        main: secondary,
        light: isDark ? "#0EA5E9" : "#1D4ED8",
        dark: isDark ? "#2563EB" : "#1E3A8A",
        contrastText: "#ffffff",
      },
      background: {
        default: canvas,
        paper,
      },
      text: {
        primary: isDark ? "#E8EEF7" : "#1E293B",
        secondary: isDark ? "#94A3B8" : "#475569",
      },
      divider: isDark ? "rgba(148,163,184,0.16)" : "rgba(71,85,105,0.16)",
    },
    shape: { borderRadius: 16 },
    typography: {
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", "Noto Sans TC", "Helvetica Neue", Arial, sans-serif',
      h1: { fontWeight: 700, letterSpacing: "-0.02em" },
      h2: { fontWeight: 700, letterSpacing: "-0.01em" },
      h3: { fontWeight: 650 },
      button: { textTransform: "none", fontWeight: 700 },
    },
    transitions: {
      duration: {
        shortest: 150,
        shorter: 180,
        short: 220,
        standard: 220,
      },
      easing: {
        easeInOut: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: canvas,
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
            transition: "transform 180ms cubic-bezier(0.25, 0.1, 0.25, 1), background-color 180ms ease, box-shadow 180ms ease",
            "&:active": { transform: "scale(0.96)" },
          },
          contained: {
            boxShadow: isDark ? "none" : "0 1px 2px rgba(22, 163, 74, 0.2)",
          },
          containedPrimary: {
            color: "#ffffff",
            "&:hover": { color: "#ffffff", backgroundColor: primaryHover },
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
              backgroundColor: primary,
              "& .MuiChip-label": { color: "#ffffff" },
              "& .MuiChip-icon": { color: "#ffffff" },
              "&:hover": {
                backgroundColor: primaryHover,
                color: "#ffffff",
                "& .MuiChip-label": { color: "#ffffff" },
              },
            },
          },
          outlined: {
            borderColor: isDark ? "rgba(148,163,184,0.28)" : "rgba(71,85,105,0.28)",
            color: isDark ? "#E8EEF7" : "#1E293B",
            "&:hover": {
              backgroundColor: isDark ? "rgba(31,157,107,0.14)" : "rgba(22,163,74,0.08)",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundColor: paper,
          },
          rounded: {
            borderRadius: 20,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: paper,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
          },
        },
      },
      MuiFab: {
        styleOverrides: {
          root: {
            boxShadow: isDark
              ? "0 6px 22px rgba(31, 157, 107, 0.35)"
              : "0 6px 20px rgba(22, 163, 74, 0.28)",
            transition: "transform 180ms cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 180ms ease",
            "&:active": { transform: "scale(0.96)" },
            "&:focus-visible": {
              outline: `3px solid ${isDark ? "rgba(46,204,113,0.45)" : "rgba(22,163,74,0.35)"}`,
              outlineOffset: 2,
            },
          },
          primary: {
            color: "#ffffff",
            backgroundColor: primary,
            "&:hover": { backgroundColor: primaryHover },
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
              borderRadius: 14,
              overflow: "hidden",
              backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "#E8F0F4",
              "&:hover": {
                backgroundColor: isDark ? "rgba(255,255,255,0.09)" : "#DEE8EE",
              },
              "&.Mui-focused": {
                backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "#DEE8EE",
              },
              "&:before, &:after": { display: "none" },
            },
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(22,163,74,0.12)",
          },
        },
      },
      MuiSpeedDial: {
        styleOverrides: {
          fab: {
            width: 56,
            height: 56,
          },
        },
      },
    },
  });
}

/** @deprecated Prefer createInnovateXpM3Theme(mode) for dark-mode support */
export const innovateXpM3Theme = createInnovateXpM3Theme("light");
