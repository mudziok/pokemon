"use client";

import MuiAutocomplete from "@mui/material/Autocomplete";
import { TextField, TextFieldProps } from "@/components/TextField/TextField";

type Option = {
  value: string;
  label: string;
};

type AutoCompleteProps = TextFieldProps & {
  options: Option[];
  loading: boolean;
  inputValue: string;
  onInputChange: (value: string) => void;
};

export default function Autocomplete(props: AutoCompleteProps) {
  const { options, loading, inputValue, onInputChange, ...inputProps } = props;

  return (
    <MuiAutocomplete
      fullWidth
      loading={loading}
      sx={{
        display: "inline-block",
        "& input": {
          bgcolor: "background.paper",
          color: (theme) =>
            theme.palette.getContrastText(theme.palette.background.paper),
        },
      }}
      options={options}
      filterOptions={(x) => x}
      getOptionLabel={(option) => option.label}
      inputValue={inputValue}
      onInputChange={(_, value) => onInputChange(value)}
      isOptionEqualToValue={(option, value) => option.label === value.label}
      renderInput={(params) => {
        const { InputLabelProps, InputProps, ...rest } = params;
        return (
          <TextField {...InputProps} {...rest} {...inputProps} fullWidth />
        );
      }}
    />
  );
}
