import React from "react";
import { Container, Box, Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import Form from "./form";
import { formBoxProps } from "../types/componentType";

type FormBoxProps = formBoxProps;

type FormBoxState = {
  values: {};
};

export default class FormBox extends React.Component<
  FormBoxProps,
  FormBoxState
> {
  constructor(props) {
    super(props);
    this.state = { values: {} };
  }

  onFormChange = ({ formName, componentName, value }) => {
    this.setState({
      values: {
        ...this.state.values,
        ...{
          [formName]: {
            ...this.state.values?.[formName],
            ...{ [componentName]: value },
          },
        },
      },
    });
  };

  onSubmit = () => {
    let formToSubmit = {
      id: uuidv4(),
      documentName: this.props.completeForm.name,
      values: this.state.values,
    };
    console.log("submit", formToSubmit);
    this.submitFormValues(formToSubmit);
  };

  submitFormValues(formToSubmit) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formToSubmit),
    };
    fetch("http://localhost:3001/submitFormValues", requestOptions)
      .then((res) => res.text())
      .then((res) => console.log("result from api: ", res))
      .catch((res) => console.log("error from api: ", res));
  }

  render() {
    // console.log("FORMBOX render :", this.state.values);
    let forms = this.props.completeForm.forms;
    return (
      <div>
        <Container
          maxWidth="sm"
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            this.onSubmit();
            return false;
          }}
        >
          <h2>{this.props.completeForm.title ?? "FormBox"}</h2>
          {forms.map((form, i) => {
            return (
              <Form key={i} form={form} onFormChange={this.onFormChange} />
            );
          })}
          <Box display="flex" justifyContent={"right"} sx={{ p: 2 }}>
            <Button id={"submit"} type={"submit"} variant="contained">
              {"Submit"}
            </Button>
          </Box>
        </Container>
      </div>
    );
  }
}
