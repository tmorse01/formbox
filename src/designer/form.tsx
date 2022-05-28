import React, { useState } from "react";
import Box from "@mui/material/Box";
import FormBoxComponent from "./formboxcomponent";
import { formProps } from "../types/componentType";
import "../css/form.css";

type FormState = {
  visible: true;
  values: {};
};

type FormProps = {
  form: formProps;
};

export default class Form extends React.Component<FormProps, FormState> {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      values: {},
    };
  }

  componentDidMount() {
    let components = this.props.form.components;
    let values = this.state.values;
    components.forEach((comp) => {
      values[comp.name] = undefined;
    });
    this.setState({ values });
  }

  onChange = (name: string, value: string) => {
    // console.log("form on change: ", name, value);
    this.setState({ values: { ...this.state.values, ...{ [name]: value } } });
    return;
  };

  render() {
    // console.log("form render: ", this.state.values);
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
                onChange={this.onChange}
              />
            );
          })}
        </Box>
      </div>
    );
  }
}
