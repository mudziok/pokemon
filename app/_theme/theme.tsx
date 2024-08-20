"use client";

import { createTheme } from "@mui/material";
import localFont from "next/font/local";

const pixelFont = localFont({
  src: "./ibm_vga_9x16.woff",
});

export const theme = createTheme({
  typography: {
    fontFamily: pixelFont.style.fontFamily,
  },
});
