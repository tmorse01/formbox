import { useEffect, useState } from "react";
import { Box, IconButton, Typography, Modal, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

import { formDataProps } from "../types/componentType";
type FormData = formDataProps;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  gap: 4,
  display: "grid",
  gridTemplateRows: "min-content auto min-content",
  width: "400px",
};

export default function SavedFormsModal({
  formName,
  onChange,
  onNameChange,
  handleMenuClose,
}) {
  const [listOfForms, setListOfForms] = useState<
    {
      _id: string;
      formName: string;
      formJSON: object;
    }[]
  >([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // console.log("component did mount useEffect");
    getForms();
  }, []);

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

  const getForms = () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:3001/getForms", requestOptions)
      .then((res) => res.text())
      .then((res) => {
        // console.log("result from getForms api: ", res);
        setListOfForms(JSON.parse(res).results);
      })
      .catch((res) => console.log("error from getForms api: ", res));
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Open a saved form
          </Typography>
          <Select
            labelId="formbox-formname-select"
            id="formbox-formname-select"
            value={formName}
            label="Form Name"
            onChange={handleSelectForm}
          >
            {listOfForms.map((form: FormData) => {
              return <MenuItem value={form.formName}>{form.formName}</MenuItem>;
            })}
          </Select>
        </Box>
      </Modal>
    </>
  );
}
