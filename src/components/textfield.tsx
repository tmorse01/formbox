import TextField from "@mui/material/TextField";

type TextFieldProps = {
  name: string;
  title: string;
  required?: boolean;
  //onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const FormBoxTextField = ({
  name,
  title,
  required,
}: //onChange,
TextFieldProps) => {
  return (
    <TextField
      id={name}
      label={title}
      required={required}
      variant="outlined"
      //onChange={onChange}
    />
  );
};

export default FormBoxTextField;
