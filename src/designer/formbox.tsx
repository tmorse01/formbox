import { useEffect } from "react";
import { Container, Box, Button } from "@mui/material";
import { useParams } from "react-router-dom";

import { loadForm } from "../helpers/formrequest";
import exampleFormJSON from "../exampleforms/jobposition.json";

import Typography from "@mui/material/Typography";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

const style = {
  bgcolor: "background.paper",
  borderRadius: "8px",
  display: "grid",
  padding: "12px 0 12px 0",
  boxShadow: "4px 4px 12px #e0e0e0",
};

const FormBox = ({
  title,
  dispatchFormAction,
  setSnackbar,
  getFormToSubmit,
  children,
}) => {
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

  function onSubmit() {
    const formToSubmit = getFormToSubmit();
    const hasErrors = Object.keys(formToSubmit.errors).length !== 0;
    if (!hasErrors) {
      console.log("submit", formToSubmit);
      submitFormValues(formToSubmit);
    } else {
      const errors = formToSubmit.errors;
      console.error("Form submitted contains errors: ", errors);

      setSnackbar({
        open: true,
        message: "Error submitting form. Check form validation.",
        type: "error",
      });
    }
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

  // console.log("FORMBOX render :", formJSON);

  return (
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
      <Typography sx={{ color: "text.primary", ml: 2 }} variant="h2">
        {title}
      </Typography>
      {children}
      <Box
        display="flex"
        justifyContent={"right"}
        sx={{ m: 2, height: "40px" }}
      >
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
  );
};

export default FormBox;
