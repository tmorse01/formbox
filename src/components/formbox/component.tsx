import IconButton from "@mui/material/IconButton";
import { TextField, Select, Checkbox, RadioGroup } from "../data-input";
import { ComponentProps } from "../../types/componentType";
import { createElement } from "react";
import EditableComponent from "./editableComponent";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const ComponentTypes = {
  textfield: TextField,
  select: Select,
  checkbox: Checkbox,
  radiogroup: RadioGroup,
};

const Component: React.FC<ComponentProps> = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.name });

  if (ComponentTypes[props.type] === undefined)
    return <div>Undefined component type</div>;
  const { type, editable, ...componentProps } = props;
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  const control = createElement(ComponentTypes[type], {
    ...componentProps,
  });
  return (
    <div ref={setNodeRef} style={style}>
      <IconButton {...listeners} {...attributes}>
        <DragIndicatorIcon />
      </IconButton>
      {control}
    </div>
  );
  // return (
  //   <EditableComponent
  //     editable={props.editable}
  //     component={{ type, ...componentProps }}
  //   >
  //     {control}
  //   </EditableComponent>
  // );
};

export default Component;
