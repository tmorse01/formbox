import {
  OutlinedInput,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material/";
import { Controller, useFormContext } from "react-hook-form";
import { TextFieldProps } from "../types/componentType";

const FormBoxTextField = ({
  name,
  title,
  help,
  required,
  defaultValue,
}: TextFieldProps) => {
  // console.log("render text field", name);
  const { control, register, formState } = useFormContext(); // Access form context
  const error = formState.errors[name];
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => {
        return (
          <FormControl required={required} error={!!error}>
            <InputLabel htmlFor={name}>{title}</InputLabel>
            <OutlinedInput
              id={name}
              value={field.value}
              {...register(name, {
                required: title + " is required.",
              })}
              label={title}
            />
            {error && (
              <FormHelperText error>{error?.message ?? help}</FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
};

export default FormBoxTextField;
