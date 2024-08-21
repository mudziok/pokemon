"use client";

import MuiAutocomplete, {
  AutocompleteProps as MuiAutocompleteProps,
} from "@mui/material/Autocomplete";
import { TextField, TextFieldProps } from "@/components/TextField/TextField";

export type AutocompleteProps<T> = Omit<
  MuiAutocompleteProps<T, false, false, false>,
  "renderInput"
> &
  Pick<TextFieldProps, "label" | "helperText" | "errorText" | "placeholder">;

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
