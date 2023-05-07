import { Switch, FormHelperText } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useFormContext, Controller } from "react-hook-form";
import { SwitchProps } from "../types/componentType";

const FormBoxSwitch = ({
  name,
  title,
  help,
  required,
  register,
  error,
  defaultValue,
}: SwitchProps) => {
  // console.log("render text field", name);
  const { control } = useFormContext(); // Access form context

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
                <Switch
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

export default FormBoxSwitch;
