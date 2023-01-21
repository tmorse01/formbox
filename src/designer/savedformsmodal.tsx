import { useEffect, useState, useContext } from "react";
import { FormBoxContext } from "./formbuilder";
// MUI
import { Box, IconButton, Typography, Modal, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { grey } from "@mui/material/colors";

// icons
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import RefreshIcon from "@mui/icons-material/Refresh";

import { formDataProps } from "../types/componentType";
type FormData = formDataProps;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid " + grey[800],
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
  gap: "8px",
  display: "grid",
  gridTemplateColumns: "auto min-content",
  width: "400px",
};

export default function SavedFormsModal({
  onChange,
  onNameChange,
  handleMenuClose,
  getForms,
}) {
  const [open, setOpen] = useState(false);

  const { listOfForms, formName } = useContext(FormBoxContext);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    handleMenuClose();
  };

  const handleSelectForm = (event: SelectChangeEvent) => {
    const documentName = event.target.value;
    const documentJSON = listOfForms.find(
      (form) => form.formName === documentName
    )?.formJSON;
    console.log("documentJSON: ", documentJSON);
    onNameChange(documentName as string);
    onChange(documentJSON);
  };

  return (
    <>
      <IconButton
        key="savedformsmodal"
        color="inherit"
        size="large"
        onClick={handleOpen}
      >
        <FolderOpenIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style} noValidate>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ gridColumn: "1 / 3" }}
          >
            Open a saved form
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="formbox-formname-select-label">
              Form Name
            </InputLabel>
            <Select
              labelId="formbox-formname-select"
              id="formbox-formname-select"
              value={formName}
              label="Form Name"
              onChange={handleSelectForm}
            >
              {listOfForms.map((form: FormData) => {
                return (
                  <MenuItem key={form.formName} value={form.formName}>
                    {form.formName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <IconButton key="refresh" title="refresh" onClick={getForms}>
            <RefreshIcon />
          </IconButton>
        </Box>
      </Modal>
    </>
  );
}
