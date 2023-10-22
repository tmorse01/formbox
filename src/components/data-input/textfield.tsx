import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@mui/material/";
import { TextFieldProps } from "../../types/componentType";
import { Controller, useFormContext } from "react-hook-form";

const TextField = (props: TextFieldProps) => {
  // console.log("render text field", name);
  const { name, title, help, defaultValue, required } = props;
  const { control, formState } = useFormContext(); // Access form context
  const error = formState.errors[name];

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={{ required: required ? title + " is required." : false }}
      render={({ field }) => (
        <FormControl>
          <InputLabel id={title}>{title}</InputLabel>
          <OutlinedInput id={name} label={title} {...field} />
          {error && (
            <FormHelperText error>{error?.message ?? help}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default TextField;
