import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select as MUISelect,
  MenuItem,
} from "@mui/material";
import { SelectProps } from "../../types/componentType";
import { Controller, useFormContext } from "react-hook-form";

const Select = ({
  name,
  title,
  help,
  required,
  options,
  defaultValue,
}: SelectProps) => {
  const { control, formState } = useFormContext(); // Access form context
  const error = formState.errors[name];

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={{ required: required ? title + " is required." : false }}
      render={({ field }) => (
        <FormControl required={required} error={!!error}>
          <InputLabel id={title}>{title}</InputLabel>
          <MUISelect label={title} {...field}>
            {options?.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </MUISelect>
          <FormHelperText>{error?.message ?? help}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default Select;
