import React, { useEffect, useState } from "react";
import FormBoxJSONEditor from "./jsoneditor";
import { Button, TextField, Box, Typography } from "@mui/material";

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
  formName,
  value,
  onChange,
  onNameChange,
  setSnackbar,
}) {
  useEffect(() => {
    setContent({ json: value, text: undefined });
  }, [value]);

  const [content, setContent] = useState({
    json: value,
    text: undefined,
  });

  function handleJSONValueChange(value) {
    setContent(value);
  }

  function submitJSONChanges() {
    let value = content.json;
    onChange(value);
    saveForm(formName, value);
  }

  function saveForm(formName, formJSON) {
    const body = {
      formName,
      formJSON,
    };
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    fetch("http://localhost:3001/saveForm", requestOptions)
      .then((res) => res.text())
      .then((res) => {
        console.log("result from api: ", res);
        const resObj = JSON.parse(res);
        if (resObj?.error) {
          setSnackbar({ open: true, type: "error", message: resObj.error });
        } else {
          setSnackbar({ open: true, type: "success", message: resObj.message });
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
          value={formName}
          onChange={(e) => {
            onNameChange(e.target.value);
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
