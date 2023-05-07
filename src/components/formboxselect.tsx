import {
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  MenuItem,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { SelectProps } from "../types/componentType";

const FormBoxSelect = ({
  name,
  title,
  help,
  options,
  defaultValue,
  required,
}: SelectProps) => {
  const { control, register, formState } = useFormContext(); // Access form context
  const error = formState.errors[name];
  //   console.log("render select", name, control);
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormControl required={required} error={!!error}>
          <InputLabel id={title}>{title}</InputLabel>
          <Select
            label={title}
            defaultValue={defaultValue}
            {...register(name, {
              required: title + " is required.",
            })}
            value={field.value}
          >
            {options?.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{error?.message ?? help}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FormBoxSelect;
