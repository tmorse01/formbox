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
  register,
  error,
}: SelectProps) => {
  const { control } = useFormContext(); // Access form context

  //   console.log("render select", name, control);
  return (
    <FormControl required={required} error={!!error}>
      <InputLabel id={title}>{title}</InputLabel>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => {
          return (
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
          );
        }}
      />

      <FormHelperText>{error?.message ?? help}</FormHelperText>
    </FormControl>
  );
};

export default FormBoxSelect;
