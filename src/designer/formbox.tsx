import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { FieldValues } from "react-hook-form";

import { loadForm } from "../helpers/formrequest";
import exampleFormJSON from "../exampleforms/jobposition.json";
import { getInitialValues } from "../helpers/utils";

// components
import FormBoxContainer from "./container";

// types
import { FormBoxProps } from "../types/componentType";

const FormBox = ({
  formState,
  dispatchFormAction,
  setSnackbar,
}: FormBoxProps) => {
  const { formJSON } = formState;

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
        if (response.success === true) {
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
    submitFormValues(formToSubmit);
  };

  const onError = (values) => {
    console.error("Form submitted contains errors: ", values);
    setSnackbar({
      open: true,
      message: "Error submitting form. Check form validation.",
      type: "error",
    });
  };

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
