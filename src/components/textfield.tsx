import TextField from "@mui/material/TextField";
import { dispatchType, Error } from "../types/componentType";

type TextFieldProps = {
  name: string;
  title: string;
  required?: boolean;
  value: string | undefined;
  error: Error;
} & dispatchType;

const FormBoxTextField = ({
  name,
  title,
  required,
  error,
  dispatchFormAction,
  value,
}: TextFieldProps) => {
  // console.log("render text field", name, value);

  const handleChange = (e) => {
    dispatchFormAction({
      type: "update_componentProp",
      payload: { name: name, state: { value: e.target.value } },
    });
  };

  return (
    <TextField
      id={name}
      label={title}
      required={required}
      variant="outlined"
      onChange={handleChange}
      value={value ?? ""}
      error={!!error}
      helperText={error?.message}
    />
  );
};

export default FormBoxTextField;
