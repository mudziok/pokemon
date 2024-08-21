"use client";

import {
  FormControl,
  FormHelperText,
  InputBase,
  InputBaseProps,
  InputLabel,
  styled,
} from "@mui/material";
import { forwardRef } from "react";

export const TextFieldInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(2),
  },
  "&": {
    borderRadius: 2,
    backgroundColor: theme.palette.background.default,
    border: "1px solid",
    borderColor: theme.palette.grey[400],
    fontSize: 14,
    width: "auto",
    padding: "14px 10px",
    transition: theme.transitions.create(["border-color", "box-shadow"], {
      duration: "0.1s",
    }),

    "&::placeholder": {
      color: theme.palette.grey[200],
      opacity: 1,
    },

    ":hover": {
      borderColor: theme.palette.primary.main,
    },

    ":focus-within": {
      borderColor: theme.palette.primary.main,
      boxShadow: "0px 0px 0px 4px #9747FF40",
    },
  },
}));

export type TextFieldProps = InputBaseProps & {
  label?: string;
  helperText?: string;
  errorText?: string;
};

export const TextField = forwardRef(function TextField(
  props: TextFieldProps,
  ref
) {
  const { label, helperText, errorText, ...rest } = props;
  const isFormHelperTextVisible = Boolean(helperText || errorText);

  return (
    <FormControl variant="standard" fullWidth={props.fullWidth}>
      {label && (
        <InputLabel shrink htmlFor={props.id}>
          {label}
        </InputLabel>
      )}
      <TextFieldInput ref={ref} {...rest} value={rest.value ?? ""} />
      {isFormHelperTextVisible && (
        <FormHelperText error={!!errorText}>
          {errorText ?? helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
});
