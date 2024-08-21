import {
  ButtonBase,
  ButtonProps as MuiButtonProps,
  styled,
} from "@mui/material";
import { ComponentProps } from "react";

type ButtonProps = ComponentProps<typeof ButtonBase> & {
  variant?: "primary" | "soft";
};

export const ButtonInput = styled(ButtonBase)<ButtonProps>(
  ({ variant, theme }) => ({
    borderRadius: 2,
    padding: "10px 24px",
    fontSize: 14,
    fontWeight: 400,
    fontFamily: theme.typography.fontFamily,
    transition: theme.transitions.create(["box-shadow", "background-color"], {
      duration: "0.1s",
    }),

    ...(variant === "primary" && {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.default,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
      ":focus": {
        backgroundColor: theme.palette.primary.dark,
        boxShadow: "0px 0px 0px 4px #9747FF40",
      },
    }),

    ...(variant === "soft" && {
      backgroundColor: theme.palette.grey[400],
      color: theme.palette.grey[100],
      "&:hover": {
        backgroundColor: theme.palette.grey[300],
      },
      ":focus": {
        backgroundColor: theme.palette.grey[300],
        boxShadow: "0px 0px 0px 4px #9747FF40",
      },
    }),
  }),
);

export const Button = ({ variant = "primary", ...props }: ButtonProps) => {
  return <ButtonInput disableRipple variant={variant} {...props} />;
};
