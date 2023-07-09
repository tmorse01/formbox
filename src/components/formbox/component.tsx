import { TextField, Select, Checkbox, RadioGroup } from "../data-input";
import { ComponentProps } from "../../types/componentType";
import { createElement } from "react";
import EditableComponent from "./editableComponent";

const ComponentTypes = {
  textfield: TextField,
  select: Select,
  checkbox: Checkbox,
  radiogroup: RadioGroup,
};

const Component: React.FC<ComponentProps> = (props) => {
  if (ComponentTypes[props.type] === undefined)
    return <div>Undefined component type</div>;
  const { type, editable, ...componentProps } = props;

  const control = createElement(ComponentTypes[type], {
    ...componentProps,
  });
  return (
    <EditableComponent
      editable={props.editable}
      component={{ type, ...componentProps }}
    >
      {control}
    </EditableComponent>
  );
};

export default Component;
