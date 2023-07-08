import {
  Checkbox as MUICheckbox,
  FormHelperText,
  FormControl,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useFormContext, Controller } from "react-hook-form";
import { SwitchProps } from "../../types/componentType";

const Checkbox = ({
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
            <FormControl>
              <FormControlLabel
                label={title}
                control={
                  <MUICheckbox
                    id={name}
                    {...register(name, {
                      required: title + " is required.",
                    })}
                    checked={field.value}
                  />
                }
              />
              {error && (
                <FormHelperText error>{error?.message ?? help}</FormHelperText>
              )}
            </FormControl>
          );
        }}
      />
    </>
  );
};

export default Checkbox;
