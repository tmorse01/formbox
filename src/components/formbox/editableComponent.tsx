import React, { useContext } from "react";
import { EditorContext } from "../../context/EditorContext";
import Paper from "@mui/material/Paper";
import "../../css/editable.css";
const EditableComponent = ({ editable, component, children }) => {
  const { selectedComponent, handleComponentSelect } =
    useContext(EditorContext);

  const handleClick = () => {
    console.log("handleClick", component);
    handleComponentSelect(component);
  };
  console.log("selectedComponent", selectedComponent);
  const isSelected = selectedComponent?.name === component.name;
  const className = isSelected ? "selected-component" : "";
  console.log("className: ", className, isSelected);
  // base case of non editable components
  if (!editable) return children;

  return (
    <Paper className={className} onClick={handleClick}>
      {children}
    </Paper>
  );
};

export default EditableComponent;
