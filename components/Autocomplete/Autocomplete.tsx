"use client";

import MuiAutocomplete, {
  autocompleteClasses,
  AutocompleteProps as MuiAutocompleteProps,
} from "@mui/material/Autocomplete";
import { TextField, TextFieldProps } from "@/components/TextField/TextField";
import { alpha, Box, styled } from "@mui/material";

export type AutocompleteProps<T> = Omit<
  MuiAutocompleteProps<T, false, false, false>,
  "renderInput"
> &
  Pick<TextFieldProps, "label" | "helperText" | "errorText" | "placeholder">;

const AutoCompleteOption = styled("li")(({ theme }) => ({
  [`&.${autocompleteClasses.option}`]: {
    padding: "8px 12px",
    backgroundColor: theme.palette.background.default,
    '&[aria-selected="true"]': {
      color: theme.palette.primary.main,
    },
    ":hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.25),
    },
  },
}));

export default function Autocomplete<T>(props: AutocompleteProps<T>) {
  const { label, helperText, errorText, placeholder, ...rest } = props;
  return (
    <MuiAutocomplete
      sx={{
        display: "inline-block",
        "& input": {
          bgcolor: "background.paper",
          color: (theme) =>
            theme.palette.getContrastText(theme.palette.background.paper),
        },
      }}
      {...rest}
      value={props.value ?? null}
      filterOptions={(x) => x}
      renderOption={(props, option, state, ownerState) => {
        const { key, ...optionProps } = props;
        return (
          <AutoCompleteOption key={key} {...optionProps}>
            {ownerState.getOptionLabel(option)}
          </AutoCompleteOption>
        );
      }}
      renderInput={(params) => {
        const { InputLabelProps, InputProps, ...rest } = params;
        return (
          <TextField
            {...InputProps}
            {...rest}
            fullWidth
            label={label}
            placeholder={placeholder}
            helperText={helperText}
            errorText={errorText}
          />
        );
      }}
    />
  );
}
