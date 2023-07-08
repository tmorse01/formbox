import {
  Radio,
  RadioGroup as MUIRadioGroup,
  FormControl,
  FormHelperText,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { RadioGroupProps } from "../../types/componentType";
import { useFormContext } from "react-hook-form";

const RadioGroup = ({
  name,
  help,
  required,
  title,
  options,
  value,
}: RadioGroupProps) => {
  // console.log("render text field", name);
  const { register, formState } = useFormContext(); // Access form context
  const error = formState.errors[name];
  return (
    <FormControl>
      <MUIRadioGroup
        id={name}
        value={value}
        {...register(name, {
          required: required ? title + " is required." : false,
        })}
      >
        {options.map((option) => (
          <FormControlLabel
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </MUIRadioGroup>
      {error && <FormHelperText error>{error?.message ?? help}</FormHelperText>}
    </FormControl>
  );
};

export default RadioGroup;
