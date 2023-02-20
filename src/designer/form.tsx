import { useCallback } from "react";
import Box from "@mui/material/Box";
import FormBoxComponent from "./formboxcomponent";
import { dispatchType, formProps } from "../types/componentType";
import "../css/form.css";
import Typography from "@mui/material/Typography";
import { JsxElement } from "typescript";

const style = {
  "& .MuiTextField-root": { mt: 1, mb: 1, width: "25ch" },
  color: "text.secondary",
  border: "1px solid var(--border-color)",
  borderRadius: "4px",
  p: 4,
  m: 2,
};

type FormProps = {
  form: formProps;
  children: JSX.Element[];
};

const Form = ({ form, children }: FormProps) => {
  console.log("form render: ", form);
  return (
    <Box component="div" display="grid" justifyContent="center" sx={style}>
      <Typography
        className="form-header"
        sx={{ color: "text.primary" }}
        variant="h5"
      >
        {form.title ?? "Form"}
      </Typography>
      {children}
    </Box>
  );
};

export default Form;
