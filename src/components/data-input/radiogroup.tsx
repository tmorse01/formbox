import {
  Radio,
  RadioGroup as MUIRadioGroup,
  FormControl,
  FormHelperText,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { RadioGroupProps } from "../../types/componentType";
import { Controller, useFormContext } from "react-hook-form";

const RadioGroup = ({
  name,
  help,
  required,
  title,
  options,
  defaultValue,
}: RadioGroupProps) => {
  // console.log("render radigroup field", name);
  const { formState, control } = useFormContext();
  const error = formState.errors[name];
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={{ required: required ? title + " is required." : false }}
      render={({ field }) => (
        <FormControl>
          <MUIRadioGroup id={name} {...field}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </MUIRadioGroup>
          {error && (
            <FormHelperText error>{error?.message ?? help}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default RadioGroup;
