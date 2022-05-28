import React from "react";
import Button from "@mui/material/Button";

type ButtonProps = {
  name: string;
  title: string;
  submit?: boolean;
};

const FormBoxButton = ({ name, title, submit }: ButtonProps) => {
  let buttonType: "submit" | "button" = submit ? "submit" : "button";

  return (
    <Button id={name} type={buttonType} variant="contained">
      {title}
    </Button>
  );
};

export default FormBoxButton;
