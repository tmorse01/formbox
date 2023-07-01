import { useEffect, useMemo, useContext } from "react";
import { useParams } from "react-router-dom";
import { FieldValues } from "react-hook-form";

import { loadForm, submitFormValues } from "../helpers/formrequest";
import exampleFormJSON from "../exampleforms/jobposition.json";
import { getInitialValues } from "../helpers/utils";

import { FormBoxContext } from "./formbuilder";
// components
import FormBoxContainer from "./container";

// types
import { FormBoxProps } from "../types/componentType";

const FormBox = ({ formState }: FormBoxProps) => {
  const { formJSON } = formState;
  const { dispatchFormAction, setSnackbar } = useContext(FormBoxContext);

  // handle form loading from url param for share links
  const { form } = useParams();
  useEffect(() => {
    if (form === "formBoxExample") {
      dispatchFormAction({
        type: "update_formState",
        payload: {
          formState: {
            formJSON: exampleFormJSON,
            formName: exampleFormJSON.name,
          },
        },
      });
    } else if (form) {
      loadForm(form).then((response) => {
        if (response.ok === true) {
          var results = response.results;
          dispatchFormAction({
            type: "update_formState",
            payload: {
              formState: {
                formJSON: results.formJSON,
                formName: results.formName,
              },
            },
          });
        } else {
          setSnackbar({
            open: true,
            message: response.error.message,
            type: "error",
          });
        }
      });
    }
  }, [form, dispatchFormAction, setSnackbar]);

  const initialValues: FieldValues = useMemo(() => {
    const values = getInitialValues(formState.formJSON);
    return values;
  }, [formState.formJSON]);

  const onSubmit = (values, e) => {
    e.preventDefault();
    const formToSubmit = { formName: formState.formName, ...values };
    console.log("Form submitted: ", formToSubmit);
    handleSubmit(formToSubmit);
  };

  const onError = (values) => {
    console.error("Form submitted contains errors: ", values);
    setSnackbar({
      open: true,
      message: "Error submitting form. Check form validation.",
      type: "error",
    });
  };

  function handleSubmit(formToSubmit) {
    submitFormValues(formToSubmit).then((response) => {
      console.log("submitFormValues response: ", response);
      if (response.ok === true) {
        setSnackbar({
          open: true,
          message: response.message,
          type: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: response.error.message,
          type: "error",
        });
      }
    });
  }

  // console.log("FORMBOX render :", formJSON);

  if (formJSON !== undefined) {
    return (
      <FormBoxContainer
        formState={formState}
        initialValues={initialValues}
        onSubmit={onSubmit}
        onError={onError}
      />
    );
  } else {
    return <></>;
  }
};

export default FormBox;
