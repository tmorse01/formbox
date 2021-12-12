import { PinDropSharp } from "@mui/icons-material";
import TextField from "@mui/material/TextField";

type TextFieldProps = {
  name: string;
  title: string;
};

const FormBoxTextField = ({ name, title }: TextFieldProps) => {
  return <TextField id={name} label={title} variant="outlined" />;
};

export default FormBoxTextField;
