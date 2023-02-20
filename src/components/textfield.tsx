import TextField from "@mui/material/TextField";
import { dispatchType } from "../types/componentType";

type TextFieldProps = {
  name: string;
  title: string;
  required?: boolean;
  value: string | undefined;
} & dispatchType;

const FormBoxTextField = ({
  name,
  title,
  required,
  dispatchFormAction,
  value,
}: TextFieldProps) => {
  console.log("render text field", name, value);

  const handleChange = (e) => {
    dispatchFormAction({
      type: "update_componentProp",
      payload: { componentName: name, state: { value: e.target.value } },
    });
    // onChange({ name, value: e.target.value });
  };

  return (
    <TextField
      id={name}
      label={title}
      required={required}
      variant="outlined"
      onChange={handleChange}
      value={value}
    />
  );
};

export default FormBoxTextField;
