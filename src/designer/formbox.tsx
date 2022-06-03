import React from "react";
import { Container, Box, Button } from "@mui/material";
import Form from "./form";
import { formBoxProps } from "../types/componentType";

type FormBoxProps = formBoxProps;

type FormBoxState = {
  visible: true;
  values: {};
};

export default class FormBox extends React.Component<
  FormBoxProps,
  FormBoxState
> {
  constructor(props) {
    super(props);
    this.state = { values: {}, visible: true };
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
    console.log("submit", this.state.values);
    this.submitFormValues(this.state.values);
  };

  submitFormValues(values) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
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
