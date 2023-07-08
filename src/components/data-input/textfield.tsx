import TextField from "@mui/material/TextField";
import { TextFieldProps } from "../../types/componentType";

const FormBoxTextField = ({
  name,
  title,
  help,
  required,
  register,
  error,
}: TextFieldProps) => {
  // console.log("render text field", name);
  return (
    <TextField
      id={name}
      label={title}
      required={required}
      variant="outlined"
      {...register(name, {
        required: title + " is required.",
      })}
      error={!!error}
      helperText={error?.message ?? help}
    />
  );
};

export default FormBoxTextField;
