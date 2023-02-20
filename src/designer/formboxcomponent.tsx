import { useEffect } from "react";
import { FormControl, FormHelperText } from "@mui/material";
import { componentProps, dispatchType } from "../types/componentType";
import FormBoxControl from "../designer/formboxcontrol";

type CompProps = {
  key: string;
} & componentProps &
  dispatchType;

const WrapFormControl = ({ children, name, help }) => (
  <FormControl variant="standard">
    {children}
    <FormHelperText id={name + "helptext"}>{help}</FormHelperText>
  </FormControl>
);

const FormBoxComponent: React.FC<CompProps> = ({
  name,
  title,
  help,
  type,
  required,
  value,
  submit,
  icon,
  dispatchFormAction,
}) => {
  console.log("component render:", name);
  return (
    <WrapFormControl name={name} help={help}>
      <FormBoxControl
        key={name}
        name={name}
        title={title}
        help={help}
        type={type}
        required={required}
        value={value}
        icon={icon}
        submit={submit}
        dispatchFormAction={dispatchFormAction}
      />
    </WrapFormControl>
  );
};

// const MemoizedComponent: React.FC<CompProps> = (props) => {
//   return useMemo(() => <FormBoxComponent {...props} />, [props.component]);
// };
export default FormBoxComponent;
