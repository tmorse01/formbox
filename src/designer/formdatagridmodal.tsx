import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { formDataProps } from "../types/componentType";
import FormDataGrid from "./formdatagrid";
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
  height: "80vh",
  width: "80vw",
};

export default function FormDataGridModal({ handleMenuClose, formName }) {
  const [selectedDocument, setSelectedDocument] = useState(formName);
  const [selectedDocumentData, setSelectedDocumentData] = useState([]);
  const [listOfForms, setListOfForms] = useState([]);
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
    let documentName = event.target.value;
    setSelectedDocument(documentName as string);
    getFormData(documentName);
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

  const getFormData = (documentName) => {
    console.log("getFormData from client: ", documentName);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ documentName }),
    };
    fetch("http://localhost:3001/getFormData", requestOptions)
      .then((res) => res.text())
      .then((res) => {
        console.log("result from getFormData api: ", res);
        setSelectedDocumentData(JSON.parse(res).results);
      })
      .catch((res) => console.log("error from getForms api: ", res));
  };

  return (
    <>
      <MenuItem onClick={handleOpen}>Data Grid Viewer</MenuItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style} noValidate>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Formbox data grid viewer
          </Typography>
          <FormDataGrid data={selectedDocumentData} />
          <Select
            labelId="formbox-formname-select"
            id="formbox-formname-select"
            value={selectedDocument}
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
