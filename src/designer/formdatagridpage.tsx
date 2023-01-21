import { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import FormDataGrid from "./formdatagrid";
import { FormBoxContext } from "./formbuilder";

const style = {
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  gap: 4,
  display: "grid",
  gridTemplateRows: "min-content 1fr min-content",
};

export default function FormDataGridPage() {
  const [selectedDocumentData, setSelectedDocumentData] = useState([]);

  const { formName } = useContext(FormBoxContext);

  useEffect(() => {
    // console.log("component did mount useEffect");
    if (formName) {
      getFormData(formName);
    }
  }, [formName]);

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
    </Box>
  );
}
