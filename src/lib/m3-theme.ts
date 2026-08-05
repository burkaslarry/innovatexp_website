import { createTheme, type Theme } from "@mui/material/styles";

type Mode = "light" | "dark";

/**
 * Material 3 interaction + InnovateXP brand
 * Light: Style 3 gradient CTA / Dark: Style B gradient CTA (black label)
 */
export function createInnovateXpM3Theme(mode: Mode = "light"): Theme {
  const isDark = mode === "dark";
  const primary = "#00BFA5";
  const primaryHover = "#009DF2";
  const secondary = isDark ? "#42D8D7" : "#087FC1";
  const canvas = isDark ? "#191919" : "#F7F6F3";
  const paper = isDark ? "#222222" : "#FFFFFF";
  const btnFg = isDark ? "#000000" : "#FFFFFF";
  const ctaGradient = "linear-gradient(90deg, #00BFA5, #009DF2)";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: primary,
        light: isDark ? "#42D8D7" : "#00E998",
        dark: primaryHover,
        contrastText: btnFg,
      },
      secondary: {
        main: secondary,
        light: isDark ? "#00E998" : "#009DF2",
        dark: isDark ? "#00C7C9" : "#087FC1",
        contrastText: "#ffffff",
      },
      background: {
        default: canvas,
        paper,
      },
      text: {
        primary: isDark ? "#FFFFFF" : "#20201F",
        secondary: isDark ? "rgba(255,255,255,0.64)" : "#74716D",
      },
      divider: isDark ? "rgba(255,255,255,0.17)" : "#E4E2DE",
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily:
        'system-ui, -apple-system, BlinkMacSystemFont, "PingFang HK", "PingFang TC", "Hiragino Sans GB", "Noto Sans HK", "Noto Sans TC", "Microsoft JhengHei", "Helvetica Neue", Arial, sans-serif',
      h1: { fontWeight: 700, letterSpacing: "-0.02em" },
      h2: { fontWeight: 700, letterSpacing: "-0.01em" },
      h3: { fontWeight: 650 },
      button: { textTransform: "none", fontWeight: 670 },
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
            borderRadius: 8,
            minHeight: 44,
            paddingInline: 20,
            boxShadow: "none",
            transition:
              "transform 180ms cubic-bezier(0.25, 0.1, 0.25, 1), filter 180ms ease, box-shadow 180ms ease",
            "&:active": { transform: "scale(0.96)" },
          },
          contained: {
            boxShadow: "none",
          },
          containedPrimary: {
            color: btnFg,
            backgroundImage: ctaGradient,
            backgroundColor: "transparent",
            "&:hover": {
              color: btnFg,
              backgroundImage: ctaGradient,
              backgroundColor: "transparent",
              filter: "brightness(1.04)",
            },
            "&.Mui-disabled": {
              color: isDark ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.7)",
            },
            "& .MuiButton-startIcon, & .MuiButton-endIcon, & .MuiSvgIcon-root, & .MuiButton-icon": {
              color: btnFg,
            },
            "&:hover .MuiButton-startIcon, &:hover .MuiButton-endIcon, &:hover .MuiSvgIcon-root, &:hover .MuiButton-icon":
              {
                color: btnFg,
              },
          },
          containedSecondary: {
            color: "#ffffff",
            "& .MuiButton-startIcon, & .MuiButton-endIcon, & .MuiSvgIcon-root, & .MuiButton-icon": {
              color: "#ffffff",
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            height: 40,
            fontWeight: 650,
          },
          filled: {
            "&.MuiChip-colorPrimary": {
              color: isDark ? "#42D8D7" : "#087FC1",
              backgroundColor: isDark ? "rgba(0,199,201,0.13)" : "#E8F6FD",
              "& .MuiChip-label": { color: isDark ? "#42D8D7" : "#087FC1" },
              "& .MuiChip-icon": { color: isDark ? "#42D8D7" : "#087FC1" },
              "&:hover": {
                backgroundColor: isDark ? "rgba(0,199,201,0.2)" : "#D8EFFA",
                color: isDark ? "#42D8D7" : "#087FC1",
                "& .MuiChip-label": { color: isDark ? "#42D8D7" : "#087FC1" },
              },
            },
          },
          outlined: {
            borderColor: isDark ? "rgba(255,255,255,0.17)" : "#E4E2DE",
            color: isDark ? "#FFFFFF" : "#20201F",
            "&:hover": {
              backgroundColor: isDark
                ? "rgba(0,199,201,0.14)"
                : "rgba(0,191,165,0.08)",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundColor: paper,
            borderColor: isDark ? "rgba(255,255,255,0.17)" : "#E4E2DE",
          },
          rounded: {
            borderRadius: 12,
          },
          elevation1: {
            boxShadow: isDark
              ? "none"
              : "0 1px 2px rgba(0,0,0,.04), 0 6px 20px rgba(0,0,0,.035)",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: paper,
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 12,
          },
        },
      },
      MuiFab: {
        styleOverrides: {
          root: {
            color: btnFg,
            backgroundImage: ctaGradient,
            backgroundColor: "transparent",
            boxShadow: "0 6px 20px rgba(0, 157, 242, 0.28)",
            transition:
              "transform 180ms cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 180ms ease, filter 180ms ease",
            "&:active": { transform: "scale(0.96)" },
            "&:hover": {
              backgroundImage: ctaGradient,
              backgroundColor: "transparent",
              filter: "brightness(1.04)",
            },
            "&:focus-visible": {
              outline: `3px solid ${isDark ? "rgba(66,216,215,0.45)" : "rgba(0,191,165,0.35)"}`,
              outlineOffset: 2,
            },
            "& .MuiSvgIcon-root, & .MuiFab-icon": { color: btnFg },
          },
          primary: {
            color: btnFg,
            backgroundImage: ctaGradient,
            backgroundColor: "transparent",
            "&:hover": {
              backgroundImage: ctaGradient,
              backgroundColor: "transparent",
              color: btnFg,
              filter: "brightness(1.04)",
            },
            "& .MuiSvgIcon-root, & .MuiFab-icon": { color: btnFg },
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
              backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "#EEF0F1",
              "&:hover": {
                backgroundColor: isDark ? "rgba(255,255,255,0.09)" : "#E4E2DE",
              },
              "&.Mui-focused": {
                backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "#E4E2DE",
              },
              "&:before, &:after": { display: "none" },
            },
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            backgroundColor: isDark
              ? "rgba(255,255,255,0.08)"
              : "rgba(0,191,165,0.12)",
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
