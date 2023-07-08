import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import FormDataGrid from "../features/formdatagrid";
import { getFormData } from "../helpers/formrequest";

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
  const [selectedDocumentData, setSelectedDocumentData] = useState([]);

  useEffect(() => {
    // console.log("component did mount useEffect", formName);
    if (formName) {
      fetchFormData(formName);
    }
  }, [formName]);

  const fetchFormData = (formName) => {
    getFormData(formName)
      .then((res) => {
        setSelectedDocumentData(res.results);
      })
      .catch((res) => console.log("error from getFormData api: ", res));
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
