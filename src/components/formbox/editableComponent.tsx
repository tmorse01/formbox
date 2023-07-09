import { useContext } from "react";
import { EditorContext } from "../../context/EditorContext";
import Paper from "@mui/material/Paper";
import "../../css/editable.css";
import Container from "./container";
import Form from "./form";
import { Checkbox, Select, TextField, RadioGroup } from "../data-input";

const EditableComponents = {
  formbox: Container,
  form: Form,
  textfield: TextField,
  select: Select,
  checkbox: Checkbox,
  radiogroup: RadioGroup,
};

const EditableComponent = ({ editable, component, children }) => {
  const { selectedComponent, handleComponentSelect } =
    useContext(EditorContext);

  const handleClick = (e) => {
    console.log("handleClick: ", component);
    e.stopPropagation();
    handleComponentSelect(component);
  };
  const isSelected = selectedComponent?.name === component.name;
  const className = isSelected ? "selected-component" : "";
  // base case of non editable components
  if (!editable) return children;
  const type = component.type;
  console.log("type: ", type);
  return (
    <Paper className={className} onClick={handleClick}>
      {children}
    </Paper>
  );
};

export default EditableComponent;
