import {
  Checkbox as MUICheckbox,
  FormHelperText,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { CheckboxProps } from "../../types/componentType";
import { useFormContext } from "react-hook-form";

const Checkbox = ({ name, title, help, required, value }: CheckboxProps) => {
  // console.log("render checkbox field", value);
  const { register, formState } = useFormContext(); // Access form context
  const error = formState.errors[name];

  return (
    <FormControl>
      <FormControlLabel
        label={title}
        control={
          <MUICheckbox
            id={name}
            checked={value}
            {...register(name, {
              required: required ? title + " is required." : false,
            })}
          />
        }
      />
      {error && <FormHelperText error>{error?.message ?? help}</FormHelperText>}
    </FormControl>
  );
};

export default Checkbox;
