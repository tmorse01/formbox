import { Button as MUIButton } from "@mui/material";
import { Icon } from "@mui/material";

type ButtonProps = {
  name: string;
  title: string;
  submit?: boolean;
  icon: string | undefined;
};

const Button = ({ name, title, submit, icon }: ButtonProps) => {
  let buttonType: "submit" | "button" = submit ? "submit" : "button";
  // TODO
  // figure out how to dynamically pass in icon names to buttons
  return (
    <MUIButton
      id={name}
      type={buttonType}
      variant="contained"
      startIcon={icon ? <Icon>{icon}</Icon> : undefined}
    >
      {title}
    </MUIButton>
  );
};

export default Button;
