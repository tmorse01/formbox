import TextField from "@mui/material/TextField";

type TextFieldProps = {
  name: string;
  title: string;
  required?: boolean;
};

const FormBoxTextField = ({ name, title, required }: TextFieldProps) => {
  return (
    <TextField id={name} label={title} required={required} variant="outlined" />
  );
};

export default FormBoxTextField;
