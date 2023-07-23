import { TextField, Select, Checkbox, RadioGroup } from "../data-input";
import { ComponentProps } from "../../types/componentType";
import { createElement } from "react";

const ComponentTypes = {
  textfield: TextField,
  select: Select,
  checkbox: Checkbox,
  radiogroup: RadioGroup,
};

const Component: React.FC<ComponentProps> = ({ type, ...props }) => {
  if (ComponentTypes[type] === undefined)
    return <div>Undefined component type</div>;

  return createElement(ComponentTypes[type], {
    ...props,
  });
};

export default Component;
