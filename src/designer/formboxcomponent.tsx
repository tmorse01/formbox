import { FormControl, FormHelperText } from "@mui/material";
import { CompProps } from "../types/componentType";
import FormBoxControl from "../designer/formboxcontrol";

const FormBoxComponent: React.FC<CompProps> = ({
  component,
  register,
  error,
}) => {
  // console.log("component render:", component.name);
  return (
    <FormBoxControl
      key={component.name}
      component={component}
      register={register}
      error={error}
    />
  );
};

export default FormBoxComponent;
