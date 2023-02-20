import Button from "@mui/material/Button";
import { Icon } from "@mui/material";

type ButtonProps = {
  name: string;
  title: string;
  submit?: boolean;
  icon: string | undefined;
};

const FormBoxButton = ({ name, title, submit, icon }: ButtonProps) => {
  let buttonType: "submit" | "button" = submit ? "submit" : "button";
  // TODO
  // figure out how to dynamically pass in icon names to buttons
  return (
    <Button
      id={name}
      type={buttonType}
      variant="contained"
      startIcon={icon ? <Icon>{icon}</Icon> : undefined}
    >
      {title}
    </Button>
  );
};

export default FormBoxButton;
