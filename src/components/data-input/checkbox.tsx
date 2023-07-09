import {
  Checkbox as MUICheckbox,
  FormHelperText,
  FormControl,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { CheckboxProps } from "../../types/componentType";
import { Controller, useFormContext } from "react-hook-form";

const Checkbox = ({
  name,
  title,
  help,
  required,
  defaultValue,
}: CheckboxProps) => {
  // console.log("render checkbox field", value);
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
          <FormControlLabel
            label={title}
            control={
              <MUICheckbox
                id={name}
                ref={field.ref}
                onChange={field.onChange}
                onBlur={field.onBlur}
                checked={field.value}
              />
            }
          />
          {error && (
            <FormHelperText error>{error?.message ?? help}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default Checkbox;
