"use client";

import { createTheme } from "@mui/material";
import localFont from "next/font/local";

const pixelFont = localFont({
  src: "./ibm_vga_9x16.woff",
});

export const theme = createTheme({
  palette: {
    primary: {
      main: "#9747FF",
      dark: "#7135BF",
      light: "#b96eff3F",
    },
    grey: {
      100: "#2A2A2A",
      200: "#7F7F7F",
      300: "#E4E4E4",
      400: "#EEEEEE",
    },
    error: {
      main: "#FF4E4E",
    },
    background: {
      default: "#FFFFFF",
    },
    text: {
      primary: "#2A2A2A",
      secondary: "#2A2A2A",
    },
  },
  typography: {
    fontFamily: pixelFont.style.fontFamily,
  },
});
