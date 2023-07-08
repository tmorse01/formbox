import { useMemo, useContext } from "react";
import { FieldValues } from "react-hook-form";

// helpers
import { submitFormValues } from "../helpers/formrequest";
import { getInitialValues } from "../helpers/utils";

import { FormBoxContext } from "../formbuilder";
// components
import FormBoxContainer from "../components/formbox/container";

// types
import { FormBoxProps } from "../types/componentType";

const FormBox = ({ formState }: FormBoxProps) => {
  const { formJSON } = formState;
  const { setSnackbar } = useContext(FormBoxContext);

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
      // console.log("submitFormValues response: ", response);
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
