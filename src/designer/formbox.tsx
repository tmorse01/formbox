import { useContext, useState } from "react";
import { Container, Box, Button } from "@mui/material";

import Form from "./form";
import Typography from "@mui/material/Typography";

import SaveAltIcon from "@mui/icons-material/SaveAlt";

import { FormBoxContext } from "./formbuilder";

const style = {
  bgcolor: "background.paper",
  borderRadius: "8px",
  gap: "12px",
  display: "grid",
  padding: "12px 0 12px 0",
  boxShadow: "4px 4px 12px #e0e0e0",
};

export default function FormBox() {
  const [values, setValues] = useState({});
  const { formState } = useContext(FormBoxContext);
  const { formJSON, formName } = formState;

  function onFormChange({ formName, componentName, value }) {
    setValues({
      ...values,
      ...{
        [formName]: {
          ...values?.[formName],
          ...{ [componentName]: value },
        },
      },
    });
  }

  function processValues(values) {
    let returnValues = {};
    for (const form in values) {
      let formValues = values[form];
      for (const inputValue in formValues) {
        returnValues[inputValue] = formValues[inputValue];
      }
    }
    return returnValues;
  }

  function onSubmit() {
    let formToSubmit = {
      documentName: formName,
      ...processValues(values),
    };
    console.log("submit", formToSubmit);
    submitFormValues(formToSubmit);
  }

  function submitFormValues(formToSubmit) {
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

  // console.log("FORMBOX render :", this);
  let forms = formJSON?.forms;
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
          onSubmit();
          return false;
        }}
      >
        <Typography sx={{ color: "text.primary" }} variant="h2">
          {formJSON?.title ?? "FormBox"}
        </Typography>
        {forms?.map((form, i) => {
          return <Form key={i} form={form} onFormChange={onFormChange} />;
        })}
        <Box display="flex" justifyContent={"right"} sx={{ p: 2 }}>
          <Button
            id={"submit"}
            type={"submit"}
            variant="contained"
            color="secondary"
            startIcon={<SaveAltIcon />}
          >
            {"Submit"}
          </Button>
        </Box>
      </Container>
    </div>
  );
}
