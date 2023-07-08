import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select as MUISelect,
  MenuItem,
} from "@mui/material";
import { SelectProps } from "../../types/componentType";
import { useFormContext } from "react-hook-form";

const Select = ({
  name,
  title,
  help,
  required,
  options,
  value,
}: SelectProps) => {
  const { register, formState } = useFormContext(); // Access form context
  const error = formState.errors[name];

  return (
    <FormControl required={required} error={!!error}>
      <InputLabel id={title}>{title}</InputLabel>
      <MUISelect
        label={title}
        value={value}
        {...register(name, {
          required: required ? title + " is required." : false,
        })}
      >
        {options?.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MUISelect>
      <FormHelperText>{error?.message ?? help}</FormHelperText>
    </FormControl>
  );
};

export default Select;
