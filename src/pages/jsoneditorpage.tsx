import { useEffect, useState, useContext } from "react";
import FormBoxJSONEditor from "../features/jsoneditor";
import { Button, TextField, Box, Typography } from "@mui/material";
import { saveForm } from "../helpers/formrequest";
import { FormBoxContext } from "../formbuilder";

const style = {
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  gap: 4,
  width: "auto",
  display: "grid",
  gridTemplateColumns: "200px 1fr 200px",
  gridTemplateRows: "min-content auto",
};

export default function JSONEditorPage({ formState, getUserFormList }) {
  const { user, dispatchFormAction, setSnackbar } = useContext(FormBoxContext);
  const { formJSON, formName } = formState;

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
    let formJSON;
    if (content.json) {
      formJSON = content.json;
    } else if (content.text) {
      formJSON = JSON.parse(content.text);
    } else {
      throw new Error("Invalid JSON");
    }
    dispatchFormAction({ type: "update_JSON", payload: { formJSON } });
    handleSaveForm(formName, formJSON, user.username);
  }

  function handleSaveForm(formName, formJSON, username) {
    saveForm(formName, formJSON, username).then((response) => {
      if (response?.error) {
        setSnackbar({ open: true, type: "error", message: response.error });
      } else {
        setSnackbar({ open: true, type: "success", message: response.message });
        getUserFormList();
      }
    });
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
