import { TextField, Select, Checkbox, RadioGroup } from "../data-input";
import { ComponentProps } from "../../types/componentType";
import { createElement } from "react";

const ComponentTypes = {
  textfield: TextField,
  select: Select,
  checkbox: Checkbox,
  radiogroup: RadioGroup,
};

const Component: React.FC<ComponentProps> = (props) => {
  if (ComponentTypes[props.type] === undefined)
    return <div>Undefined component type</div>;
  const { type, ...componentProps } = props;

  return createElement(ComponentTypes[type], {
    ...componentProps,
  });
};

export default Component;
