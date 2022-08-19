import React, { useState } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FormBoxJSONEditor from "./jsoneditor";
import { Button, TextField } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  gap: 4,
  display: "grid",
};

export default function JSONEditorModal({
  formName,
  value,
  onChange,
  onNameChange,
  handleSubmit,
  handleMenuClose,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    handleSubmit();
    handleMenuClose();
  }

  return (
    <>
      <MenuItem onClick={handleOpen}>Formbox JSON Editor</MenuItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style} noValidate>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Formbox JSON editor
          </Typography>
          <FormBoxJSONEditor
            content={content}
            onChange={handleJSONValueChange}
          />
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
        </Box>
      </Modal>
    </>
  );
}
