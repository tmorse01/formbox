import Box from "@mui/material/Box";
import { ComponentTypes, FormProps } from "../../types/componentType";
import "../../css/form.css";
import Typography from "@mui/material/Typography";
import Component from "./component";
import EditableComponent from "./editableComponent";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const style = {
  "& .MuiTextField-root": { mt: 1, mb: 1, width: "25ch" },
  color: "text.secondary",
  border: "1px solid var(--border-color)",
  borderRadius: "4px",
  p: 4,
  m: 2,
};

const Form = ({
  name,
  title,
  layout,
  type,
  components,
  editable,
}: FormProps) => {
  // console.log("form render: ", form.title);
  const { setNodeRef } = useDroppable({
    id: name,
  });
  return (
    <SortableContext
      id={name}
      items={components.map((component) => component.name)}
      strategy={verticalListSortingStrategy}
    >
      <div id={name} ref={setNodeRef}>
        <Box component="div" display="grid" justifyContent="center" sx={style}>
          <Typography
            className="form-header"
            sx={{ color: "text.primary" }}
            variant="h5"
          >
            {title ?? "Form"}
          </Typography>
          {components?.map((child) => (
            <Component
              key={child.name}
              type={child.type}
              editable={editable}
              {...(child as ComponentTypes)}
            />
          ))}
        </Box>
      </div>
    </SortableContext>
  );
};

export default Form;
