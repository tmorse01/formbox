import { memo } from "react";
import { FormControl, FormHelperText } from "@mui/material";
import { componentProps, dispatchType } from "../types/componentType";
import FormBoxControl from "../designer/formboxcontrol";

type CompProps = {
  key: string;
  component: componentProps;
} & dispatchType;

const WrapFormControl = ({ children, name, help }) => (
  <FormControl variant="standard">
    {children}
    <FormHelperText id={name + "helptext"}>{help}</FormHelperText>
  </FormControl>
);

const FormBoxComponent: React.FC<CompProps> = ({
  component,
  dispatchFormAction,
}) => {
  // console.log("component render:", component.name);
  return (
    <WrapFormControl name={component.name} help={component.help}>
      <FormBoxControl
        key={component.name}
        component={component}
        dispatchFormAction={dispatchFormAction}
      />
    </WrapFormControl>
  );
};

const memoizedFormBoxComponent: React.FC<CompProps> = memo(FormBoxComponent);

export default memoizedFormBoxComponent;
