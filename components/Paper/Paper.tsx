"use client";

import { PaperProps, Paper as MuiPaper, styled } from "@mui/material";

export const StyledPaper = styled(MuiPaper)(({ theme }) => ({
  borderRadius: 2,
  borderColor: theme.palette.grey[400],
}));

export const Paper = (props: PaperProps) => {
  return <StyledPaper variant="outlined" {...props} />;
};
