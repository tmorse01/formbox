import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import FormBoxJSONEditor from "./jsoneditor";
import { Button, TextField, Box, Typography } from "@mui/material";
import { FormBoxContext } from "./formbuilder";
import { loadForm } from "../helpers/formrequest";
import exampleFormJSON from "../exampleforms/jobposition.json";

const style = {
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  gap: 4,
  width: "auto",
  display: "grid",
  gridTemplateColumns: "200px 1fr 200px",
};

export default function JSONEditorPage({
  dispatchFormAction,
  setSnackbar,
  getUserFormList,
}) {
  const { formState, user } = useContext(FormBoxContext);
  const { formJSON, formName } = formState;

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

  useEffect(() => {
    setContent({ json: formJSON, text: undefined });
  }, [formJSON]);

  const [content, setContent] = useState({
    json: formJSON,
    text: undefined,
  });

  function handleJSONValueChange(formJSON) {
    setContent(formJSON);
  }

  function submitJSONChanges() {
    let formJSON = content.json;
    dispatchFormAction({ type: "update_JSON", payload: { formJSON } });
    saveForm(formName, formJSON);
  }

  function saveForm(formName, formJSON) {
    const body = {
      formName,
      formJSON,
      username: user.username,
    };
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    fetch(process.env.REACT_APP_FORMBOX_API + "/saveForm", requestOptions)
      .then((res) => res.text())
      .then((res) => {
        // console.log("result from api: ", res);
        const resObj = JSON.parse(res);
        if (resObj?.error) {
          setSnackbar({ open: true, type: "error", message: resObj.error });
        } else {
          setSnackbar({ open: true, type: "success", message: resObj.message });
          getUserFormList();
        }
      })
      .catch((res) => console.log("error from api: ", res));
  }
  return (
    <>
      <Box component="form" sx={style} noValidate>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Formbox JSON editor
        </Typography>
        <TextField
          placeholder="Form Name"
          label="Form Name"
          value={formName || ""}
          onChange={(e) => {
            dispatchFormAction({
              type: "update_formName",
              payload: { formName: e.target.value },
            });
          }}
        />
        <Button variant="text" onClick={submitJSONChanges}>
          Save Form
        </Button>
        <Box sx={{ gridColumn: "1 / 4" }}>
          <FormBoxJSONEditor
            content={content}
            onChange={handleJSONValueChange}
          />
        </Box>
      </Box>
    </>
  );
}
