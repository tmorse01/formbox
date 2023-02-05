import React, { useContext, useState, useEffect } from "react";
import { Container, Box, Button } from "@mui/material";
import { useParams } from "react-router-dom";

import { loadForm } from "../helpers/formrequest";
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

const FormBox = ({ dispatchFormAction, setSnackbar }) => {
  const [values, setValues] = useState({});
  const { formState } = useContext(FormBoxContext);
  const { formJSON, formName } = formState;

  // handle form loading from url param for share links
  const { form } = useParams();
  useEffect(() => {
    if (form) {
      loadForm(form).then((loadedFormState) => {
        dispatchFormAction({
          type: "update_formState",
          payload: {
            formState: {
              formJSON: loadedFormState.formJSON,
              formName: loadedFormState.formName,
            },
          },
        });
      });
    }
  }, [form, dispatchFormAction]);

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
      formName: formName,
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
    fetch(
      process.env.REACT_APP_FORMBOX_API + "/submitFormValues",
      requestOptions
    )
      .then((res) => res.text())
      .then((res) => {
        console.log("result from submitFormValues: ", res);
        const resObj = JSON.parse(res);
        if (resObj?.error) {
          setSnackbar({ open: true, type: "error", message: resObj.error });
        } else {
          setSnackbar({ open: true, type: "success", message: resObj.message });
        }
      })
      .catch((res) => console.log("error from api: ", res));
  }

  // console.log("FORMBOX render :", this);
  let forms = formJSON?.forms;
  if (formJSON) {
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
            {formJSON?.title}
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
  } else {
    return <></>;
  }
};

export default FormBox;
