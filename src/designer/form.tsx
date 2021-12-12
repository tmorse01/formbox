import React from "react";
import Box from "@mui/material/Box";
import FormBoxComponent from "./formboxcomponent";
import "../css/form.css";

type FormState = {
  visible: true;
};

type FormProps = {
  form: {
    components: {
      name: string;
      title: string;
      type: string;
      required: boolean;
    }[];
    layout: string;
    title: string;
    name: string;
  };
};

export default class Form extends React.Component<FormProps, FormState> {
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
          noValidate
          autoComplete="off"
        >
          <h3>Form</h3>
          {components.map((component, i) => {
            return <FormBoxComponent component={component} />;
          })}
        </Box>
      </div>
    );
  }
}
