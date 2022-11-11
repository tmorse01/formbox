import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { formDataProps } from "../types/componentType";
import FormDataGrid from "./formdatagrid";
type FormData = formDataProps;

const style = {
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  gap: 4,
  display: "grid",
  gridTemplateRows: "min-content 1fr min-content",
};

export default function FormDataGridPage({ formName }) {
  const [selectedDocument, setSelectedDocument] = useState(formName);
  const [selectedDocumentData, setSelectedDocumentData] = useState([]);
  const [listOfForms, setListOfForms] = useState([]);

  useEffect(() => {
    // console.log("component did mount useEffect");
    getForms();
    if (formName) {
      getFormData(formName);
    }
  }, []);

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
  );
}
