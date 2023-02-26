import { useContext, useEffect } from "react";
import { Container, Box, Button } from "@mui/material";
import { useParams } from "react-router-dom";

import { FormBoxContext } from "./formbuilder";
import { loadForm } from "../helpers/formrequest";
import exampleFormJSON from "../exampleforms/jobposition.json";

import Typography from "@mui/material/Typography";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { flattenFormJSON } from "../helpers/utils";

const style = {
  bgcolor: "background.paper",
  borderRadius: "8px",
  display: "grid",
  padding: "12px 0 12px 0",
  boxShadow: "4px 4px 12px #e0e0e0",
};

const FormBox = ({ dispatchFormAction, setSnackbar, children }) => {
  // const [values, setValues] = useState({});
  const { formState } = useContext(FormBoxContext);
  const { formJSON, formName } = formState;

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

  function processValues() {
    const objects = flattenFormJSON(formJSON);
    const values = {};
    objects.forEach((object) => {
      if (object.value !== undefined) {
        values[object.name] = object.value;
      }
    });
    return values;
  }

  function onSubmit() {
    let formToSubmit = {
      formName: formName,
      ...processValues(),
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

  // console.log("FORMBOX render :", formJSON);
  if (formJSON) {
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
          {formJSON?.title}
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
  } else {
    return <></>;
  }
};

export default FormBox;
