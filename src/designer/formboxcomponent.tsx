import { memo } from "react";
import { FormControl, FormHelperText } from "@mui/material";
import { CompProps } from "../types/componentType";
import FormBoxControl from "../designer/formboxcontrol";

const WrapFormControl = ({ children, name, help }) => (
  <FormControl variant="standard">
    {children}
    <FormHelperText id={name + "helptext"}>{help}</FormHelperText>
  </FormControl>
);

const FormBoxComponent: React.FC<CompProps> = ({ component }) => {
  // console.log("component render:", component.name);
  return (
    <WrapFormControl name={component.name} help={component.help}>
      <FormBoxControl key={component.name} component={component} />
    </WrapFormControl>
  );
};

const memoizedFormBoxComponent: React.FC<CompProps> = memo(FormBoxComponent);

export default memoizedFormBoxComponent;
