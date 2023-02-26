import Box from "@mui/material/Box";
import { form } from "../types/componentType";
import "../css/form.css";
import Typography from "@mui/material/Typography";
import FormBoxComponent from "./formboxcomponent";

import { useForm } from "react-hook-form";

const style = {
  "& .MuiTextField-root": { mt: 1, mb: 1, width: "25ch" },
  color: "text.secondary",
  border: "1px solid var(--border-color)",
  borderRadius: "4px",
  p: 4,
  m: 2,
};

const Form = ({ form }: form) => {
  // console.log("form render: ", name);
  // const formValues = {};
  // components.forEach(comp => {
  //   formValues[comp.name] = comp.defaultValue ?? "";
  // })
  // const { control, setValue } = useForm({
  //   defaultValues: children.,
  //   mode,
  // });
  return (
    <Box component="div" display="grid" justifyContent="center" sx={style}>
      <Typography
        className="form-header"
        sx={{ color: "text.primary" }}
        variant="h5"
      >
        {form.title ?? "Form"}
      </Typography>
      {form.components?.map((component) => (
        <FormBoxComponent key={component.name} component={component} />
      ))}
    </Box>
  );
};

export default Form;
