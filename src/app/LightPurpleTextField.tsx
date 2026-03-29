"use client";

import React, { ChangeEvent, useMemo } from "react";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTheme as useAppTheme } from "./ThemeContext";

/** InnovateXP brand — aligned with Tailwind `brand.primary` / dark CTA teal */
const BRAND = "#1242de";
const BRAND_DARK = "#0e35b5";
const TEAL = "#00b9b3";

interface LightPurpleTextFieldProps {
  formData: { [key: string]: string };
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputName: string;
  placeTxt: string;
  labelTxt: string;
}

export default function LightPurpleTextField({
  formData,
  handleChange,
  inputName,
  placeTxt,
  labelTxt,
}: LightPurpleTextFieldProps) {
  const { theme: appTheme } = useAppTheme();
  const isDark = appTheme === "dark";
  const primary = isDark ? TEAL : BRAND;

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDark ? "dark" : "light",
          primary: { main: primary, dark: isDark ? TEAL : BRAND_DARK },
        },
        components: {
          MuiTextField: {
            styleOverrides: {
              root: {
                "& .MuiInputBase-input": {
                  color: isDark ? "#f1f5f9" : "rgba(0,0,0,0.87)",
                },
                "& .MuiInputLabel-root": {
                  color: isDark ? "#94a3b8" : "rgba(0,0,0,0.6)",
                },
                "& .MuiInput-underline:before": {
                  borderBottomColor: isDark ? "rgba(148,163,184,0.5)" : "rgba(0,0,0,0.42)",
                },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottomColor: isDark ? "#cbd5e1" : "rgba(0,0,0,0.87)",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: primary,
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: primary,
                },
                "& .MuiInputBase-input::placeholder": {
                  color: isDark ? "#64748b" : "rgba(0,0,0,0.45)",
                  opacity: 1,
                },
              },
            },
          },
        },
      }),
    [isDark, primary]
  );

  return (
    <ThemeProvider theme={theme}>
      <TextField
        name={inputName}
        id={inputName}
        required
        placeholder={placeTxt}
        label={labelTxt}
        fullWidth
        variant="standard"
        value={formData[inputName]}
        onChange={handleChange}
        color="primary"
      />
    </ThemeProvider>
  );
}
