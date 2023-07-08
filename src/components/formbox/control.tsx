import { TextField, Select, Checkbox, RadioGroup } from "../data-input";
import { ComponentProps } from "../../types/componentType";
import { createElement } from "react";
import { useFormContext } from "react-hook-form";

const controlTypes = {
  textfield: TextField,
  select: Select,
  checkbox: Checkbox,
  radiogroup: RadioGroup,
};

const Control: React.FC<ComponentProps> = (props) => {
  const { register } = useFormContext(); // Access form context

  if (controlTypes[props.type] === undefined)
    return <div>Undefined component type</div>;
  const { type, ...componentProps } = props;

  return createElement(controlTypes[type], {
    ...componentProps,
  });
};

export default Control;
