import { useCallback } from "react";
import Box from "@mui/material/Box";
import FormBoxComponent from "./formboxcomponent";
import { dispatchType, formProps } from "../types/componentType";
import "../css/form.css";
import Typography from "@mui/material/Typography";

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
} & dispatchType;

const Form = (props: FormProps) => {
  console.log("form render: ", props.form);
  let components = props.form.components;
  const dispatchFormAction = useCallback(props.dispatchFormAction, []);
  return (
    <Box component="div" display="grid" justifyContent="center" sx={style}>
      <Typography
        className="form-header"
        sx={{ color: "text.primary" }}
        variant="h5"
      >
        {props.form.title ?? "Form"}
      </Typography>
      {components.map((component) => {
        return (
          <FormBoxComponent
            key={component.name}
            name={component.name}
            title={component.title}
            help={component.help}
            type={component.type}
            required={component.required}
            value={component.value}
            icon={component.icon}
            submit={component.submit}
            dispatchFormAction={dispatchFormAction}
          />
        );
      })}
    </Box>
  );
};

export default Form;
