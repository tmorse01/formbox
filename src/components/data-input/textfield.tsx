import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@mui/material/";
import { TextFieldProps } from "../../types/componentType";
import { useFormContext } from "react-hook-form";

const TextField = (props: TextFieldProps) => {
  // console.log("render text field", name);
  const { name, title, value, help } = props;
  const { register, formState } = useFormContext(); // Access form context
  const error = formState.errors[name];
  return (
    <FormControl>
      <InputLabel id={title}>{title}</InputLabel>
      <OutlinedInput
        id={name}
        value={value}
        label={title}
        {...register(props.name, {
          required: props.required ? props.title + " is required." : false,
        })}
      />
      {error && <FormHelperText error>{error?.message ?? help}</FormHelperText>}
    </FormControl>
  );
};

export default TextField;
