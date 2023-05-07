import { CompProps } from "../types/componentType";
import FormBoxControl from "../designer/formboxcontrol";

const FormBoxComponent: React.FC<CompProps> = ({ component }) => {
  // console.log("component render:", component.name);
  return <FormBoxControl key={component.name} component={component} />;
};

export default FormBoxComponent;
