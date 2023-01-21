import React from "react";
import { Container, Box, Button } from "@mui/material";

import Form from "./form";
import { formBoxProps } from "../types/componentType";
import Typography from "@mui/material/Typography";

import SaveAltIcon from "@mui/icons-material/SaveAlt";

type FormBoxProps = formBoxProps;

type FormBoxState = {
  values: {};
};

const style = {
  bgcolor: "background.paper",
  borderRadius: "8px",
  gap: "12px",
  display: "grid",
  padding: "12px 0 12px 0",
  boxShadow: "4px 4px 12px #e0e0e0",
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

  processValues = (values) => {
    let returnValues = {};
    for (const form in values) {
      let formValues = values[form];
      for (const inputValue in formValues) {
        returnValues[inputValue] = formValues[inputValue];
      }
    }
    return returnValues;
  };

  onSubmit = () => {
    let formToSubmit = {
      documentName: this.props.completeForm.name,
      ...this.processValues(this.state.values),
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
    // console.log("FORMBOX render :", this);
    let forms = this.props.completeForm.forms;
    return (
      <div>
        <Container
          sx={style}
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
          <Typography sx={{ color: "text.primary" }} variant="h2">
            {this.props.completeForm.title ?? "FormBox"}
          </Typography>
          {forms.map((form, i) => {
            return (
              <Form key={i} form={form} onFormChange={this.onFormChange} />
            );
          })}
          <Box display="flex" justifyContent={"right"} sx={{ p: 2 }}>
            <Button
              id={"submit"}
              type={"submit"}
              variant="contained"
              startIcon={<SaveAltIcon />}
            >
              {"Submit"}
            </Button>
          </Box>
        </Container>
      </div>
    );
  }
}
