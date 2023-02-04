import Box from "@mui/material/Box";
import FormBoxComponent from "./formboxcomponent";
import { formProps } from "../types/componentType";
import "../css/form.css";
import Typography from "@mui/material/Typography";

const style = {
  "& .MuiTextField-root": { mt: 1, mb: 1, width: "25ch" },
  color: "text.secondary",
};

type FormProps = {
  form: formProps;
  onFormChange: ({ formName, componentName, value }) => void;
};

const Form = (props: FormProps) => {
  function onChange({ name, value }) {
    props.onFormChange({
      formName: props.form.name,
      componentName: name,
      value: value,
    });
  }

  // console.log("form render: ", this.state.values);
  let components = props.form.components;
  return (
    <div className="form">
      <Box component="div" display="grid" justifyContent="center" sx={style}>
        <Typography
          className="form-header"
          sx={{ color: "text.primary" }}
          variant="h5"
        >
          {props.form.title ?? "Form"}
        </Typography>
        {components.map((component, i) => {
          return (
            <FormBoxComponent
              key={i}
              component={component}
              onChange={onChange}
            />
          );
        })}
      </Box>
    </div>
  );
};

export default Form;
