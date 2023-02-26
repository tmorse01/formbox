import TextField from "@mui/material/TextField";

type TextFieldProps = {
  name: string;
  title: string;
  required?: boolean;
  value: string | undefined;
};

const FormBoxTextField = ({ name, title, required, value }: TextFieldProps) => {
  // console.log("render text field", name, value);

  const handleChange = (e) => {};

  return (
    <TextField
      id={name}
      label={title}
      required={required}
      variant="outlined"
      onChange={handleChange}
      value={value ?? ""}
      // error={!!error}
      // helperText={!error?.message}
    />
  );
};

export default FormBoxTextField;
