import {
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  OutlinedInput,
} from "@mui/material/";
import { TextFieldProps } from "../../types/componentType";
import { Controller, useFormContext } from "react-hook-form";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useSortable } from "@dnd-kit/sortable";
import "../../css/editable.css";

export type Ref = any;

const TextField = (props: TextFieldProps) => {
  const { name, title, help, defaultValue, required, editable } = props;
  console.log("render text field", name, editable);

  const { control, formState } = useFormContext(); // Access form context
  const error = formState.errors[name];

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.name });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={{ required: required ? title + " is required." : false }}
      render={({ field }) => (
        <FormControl
          ref={setNodeRef}
          style={style}
          className="draggable-component"
        >
          <InputLabel id={title}>{title}</InputLabel>
          <OutlinedInput
            id={name}
            name={field.name}
            label={title}
            ref={field.ref}
            onChange={field.onChange}
            onBlur={field.onBlur}
            value={field.value}
          />
          {error && (
            <FormHelperText error>{error?.message ?? help}</FormHelperText>
          )}
          {editable && (
            <IconButton className="drag-handler" {...listeners} {...attributes}>
              <DragIndicatorIcon />
            </IconButton>
          )}
        </FormControl>
      )}
    />
  );
};

export default TextField;
