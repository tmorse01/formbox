import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

import FormDataGrid from "./formdatagrid";
import { loadForm } from "../helpers/formrequest";

const style = {
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  gap: 4,
  display: "grid",
  gridTemplateRows: "min-content 1fr min-content",
};

export default function FormDataGridPage({
  formName,
  dispatchFormAction,
  setSnackbar,
}) {
  const [selectedDocumentData, setSelectedDocumentData] = useState([]);

  const { form } = useParams();
  useEffect(() => {
    if (form) {
      if (form) {
        loadForm(form).then((response) => {
          if (response.success === true) {
            var results = response.results;
            dispatchFormAction({
              type: "update_formState",
              payload: {
                formState: {
                  formJSON: results.formJSON,
                  formName: results.formName,
                },
              },
            });
          } else {
            setSnackbar({
              open: true,
              message: response.error.message,
              type: "error",
            });
          }
        });
      }
    }
  }, [form, dispatchFormAction, setSnackbar]);

  useEffect(() => {
    // console.log("component did mount useEffect");
    if (formName) {
      getFormData(formName);
    }
  }, [formName]);

  const getFormData = (formName) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formName }),
    };
    fetch(process.env.REACT_APP_FORMBOX_API + "/getFormData", requestOptions)
      .then((res) => res.text())
      .then((res) => {
        // console.log("result from getFormData api: ", res);
        setSelectedDocumentData(JSON.parse(res).results);
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
