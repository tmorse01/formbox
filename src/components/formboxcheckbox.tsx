import { Checkbox, FormHelperText } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useFormContext, Controller } from "react-hook-form";
import { SwitchProps } from "../types/componentType";

const FormBoxCheckBox = ({
  name,
  title,
  help,
  required,
  defaultValue,
}: SwitchProps) => {
  // console.log("render text field", name);
  const { control, register, formState } = useFormContext(); // Access form context
  const error = formState.errors[name];
  return (
    <>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => {
          return (
            <FormControlLabel
              control={
                <Checkbox
                  id={name}
                  required={required}
                  {...register(name, {
                    required: title + " is required.",
                  })}
                  checked={field.value}
                />
              }
              label={title}
            />
          );
        }}
      />
      {error && <FormHelperText error>{error?.message ?? help}</FormHelperText>}
    </>
  );
};

export default FormBoxCheckBox;
