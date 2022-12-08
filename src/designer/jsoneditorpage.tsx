import React, { useState } from "react";
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
  handleSubmit,
}) {
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
    handleSubmit(formName, value);
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
            let formName = e.target.value;
            onNameChange(formName);
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
