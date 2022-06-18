import React from "react";
import Box from "@mui/material/Box";
import FormBoxComponent from "./formboxcomponent";
import { formProps } from "../types/componentType";
import "../css/form.css";

type FormProps = {
  form: formProps;
  onFormChange: ({ formName, componentName, value }) => void;
};

const Form = (props: FormProps) => {
  function onChange({ name, value }) {
    props.onFormChange({
      formName: props.form.name,
      componentName: name,
      value: value,
    });
  }

  // console.log("form render: ", this.state.values);
  let components = props.form.components;
  return (
    <div className="form">
      <Box
        component="div"
        display="grid"
        justifyContent="center"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
      >
        <h3 className="form-header">{props.form.title ?? "Form"}</h3>
        {components.map((component, i) => {
          return (
            <FormBoxComponent
              key={i}
              component={component}
              onChange={onChange}
            />
          );
        })}
      </Box>
    </div>
  );
};

export default Form;
