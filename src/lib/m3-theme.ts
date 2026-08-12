import { createTheme, type Theme } from "@mui/material/styles";
import { FONT_STACK } from "@/lib/fonts";

type Mode = "light" | "dark";

/**
 * Material 3 interaction + InnovateXP brand
 * Consultancy palette with restrained navy / teal surfaces.
 */
export function createInnovateXpM3Theme(mode: Mode = "light"): Theme {
  const isDark = mode === "dark";
  const primary = isDark ? "#F5F7FB" : "#0F2A47";
  const primaryHover = isDark ? "#DCE6F0" : "#17395D";
  const secondary = isDark ? "#8EB8A6" : "#1F5B4F";
  const canvas = isDark ? "#091623" : "#F8F7F3";
  const paper = isDark ? "#102131" : "#FFFFFF";
  const btnFg = isDark ? "#0F2A47" : "#FFFFFF";
  const ctaGradient = isDark
    ? "linear-gradient(180deg, #F5F7FB 0%, #DCE6F0 100%)"
    : "linear-gradient(180deg, #17395D 0%, #0F2A47 100%)";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: primary,
        light: isDark ? "#FFFFFF" : "#24486F",
        dark: primaryHover,
        contrastText: btnFg,
      },
      secondary: {
        main: secondary,
        light: isDark ? "#A3CAB9" : "#2F7A69",
        dark: isDark ? "#75A18E" : "#194A40",
        contrastText: "#ffffff",
      },
      background: {
        default: canvas,
        paper,
      },
      text: {
        primary: isDark ? "#F5F7FB" : "#0F2A47",
        secondary: isDark ? "#B4C4D6" : "#43607C",
      },
      divider: isDark ? "rgba(245,247,251,0.12)" : "rgba(15,42,71,0.1)",
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily: FONT_STACK,
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
            fontFamily: FONT_STACK,
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
              color: isDark ? "#8EB8A6" : "#1F5B4F",
              backgroundColor: isDark ? "rgba(142,184,166,0.16)" : "rgba(31,91,79,0.08)",
              "& .MuiChip-label": { color: isDark ? "#8EB8A6" : "#1F5B4F" },
              "& .MuiChip-icon": { color: isDark ? "#8EB8A6" : "#1F5B4F" },
              "&:hover": {
                backgroundColor: isDark ? "rgba(142,184,166,0.22)" : "rgba(31,91,79,0.12)",
                color: isDark ? "#8EB8A6" : "#1F5B4F",
                "& .MuiChip-label": { color: isDark ? "#8EB8A6" : "#1F5B4F" },
              },
            },
          },
          outlined: {
            borderColor: isDark ? "rgba(245,247,251,0.12)" : "rgba(15,42,71,0.1)",
            color: isDark ? "#F5F7FB" : "#0F2A47",
            "&:hover": {
              backgroundColor: isDark ? "rgba(245,247,251,0.08)" : "rgba(15,42,71,0.04)",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundColor: paper,
            borderColor: isDark ? "rgba(245,247,251,0.12)" : "rgba(15,42,71,0.1)",
          },
          rounded: {
            borderRadius: 12,
          },
          elevation1: {
            boxShadow: isDark
              ? "0 1px 2px rgba(0,0,0,.22)"
              : "0 1px 2px rgba(15,42,71,.04), 0 12px 28px rgba(15,42,71,.05)",
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
            boxShadow: isDark ? "0 12px 30px rgba(0,0,0,0.35)" : "0 12px 28px rgba(15,42,71,0.18)",
            transition:
              "transform 180ms cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 180ms ease, filter 180ms ease",
            "&:active": { transform: "scale(0.96)" },
            "&:hover": {
              backgroundImage: ctaGradient,
              backgroundColor: "transparent",
              filter: "brightness(1.04)",
            },
            "&:focus-visible": {
              outline: `3px solid ${isDark ? "rgba(245,247,251,0.35)" : "rgba(15,42,71,0.18)"}`,
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
              backgroundColor: isDark ? "rgba(245,247,251,0.08)" : "#F2EFE7",
              "&:hover": {
                backgroundColor: isDark ? "rgba(245,247,251,0.1)" : "#ECE7DD",
              },
              "&.Mui-focused": {
                backgroundColor: isDark ? "rgba(245,247,251,0.12)" : "#ECE7DD",
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
              ? "rgba(245,247,251,0.12)"
              : "rgba(15,42,71,0.1)",
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
