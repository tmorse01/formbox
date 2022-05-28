import React from "react";
import Box from "@mui/material/Box";
import FormBoxComponent from "./formboxcomponent";
import { formProps } from "../types/componentType";
import "../css/form.css";

type FormState = {
  visible: true;
};

type FormProps = {
  form: formProps;
};

export default class Form extends React.Component<FormProps, FormState> {
  // onChange = (e: unknown) => {
  //   console.log("form on change: ", e);
  // };

  render() {
    console.log("form render: ", this.props);
    let components = this.props.form.components;
    return (
      <div className="form">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          onSubmit={(e) => {
            e.preventDefault();
            console.log("submit", e);
            return false;
          }}
          noValidate
          autoComplete="off"
        >
          <h3>Form</h3>
          {components.map((component, i) => {
            return (
              <FormBoxComponent
                key={i}
                component={component}
                //onChange={this.onChange}
              />
            );
          })}
        </Box>
      </div>
    );
  }
}
