import React from "react";
import Container from "@mui/material/Container";
import Form from "./form";

type FormBoxProps = {
  completeForm: {
    forms: {
      components: {
        name: string;
        title: string;
        type: string;
        required: boolean;
      }[];
      layout: string;
      title: string;
      name: string;
    }[];
    layout: string;
    type: string;
  };
};

type FormBoxState = {
  visible: true;
};

export default class FormBox extends React.Component<
  FormBoxProps,
  FormBoxState
> {
  render() {
    console.log("this.props.form :", this.props);
    let forms = this.props.completeForm.forms;
    return (
      <div>
        <Container maxWidth="sm">
          <h2>FormBox</h2>
          {forms.map((form, i) => {
            return <Form form={form} />;
          })}
        </Container>
      </div>
    );
  }
}
