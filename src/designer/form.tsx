import React, { useState } from "react";
import Box from "@mui/material/Box";
import FormBoxComponent from "./formboxcomponent";
import { formProps } from "../types/componentType";
import "../css/form.css";

type FormProps = {
  form: formProps;
};

const Form = (props: FormProps) => {
  const [values, setValues] = useState({});
  const [visible, setVisible] = useState(true);

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     visible: true,
  //     values: {},
  //   };
  // }

  // componentDidMount() {
  //   let components = this.props.form.components;
  //   let values = this.state.values;
  //   components.forEach((comp) => {
  //     values[comp.name] = undefined;
  //   });
  //   this.setState({ values });
  // }

  function onChange({ name, value }) {
    setValues({ ...values, ...{ [name]: value } });
  }

  // console.log("form render: ", this.state.values);
  let components = props.form.components;
  return (
    <div className="form">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submit", values);
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
              onChange={onChange}
            />
          );
        })}
      </Box>
    </div>
  );
};

export default Form;
