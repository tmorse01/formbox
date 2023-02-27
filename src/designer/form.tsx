import Box from "@mui/material/Box";
import { FormProps } from "../types/componentType";
import "../css/form.css";
import Typography from "@mui/material/Typography";
import FormBoxComponent from "./formboxcomponent";

const style = {
  "& .MuiTextField-root": { mt: 1, mb: 1, width: "25ch" },
  color: "text.secondary",
  border: "1px solid var(--border-color)",
  borderRadius: "4px",
  p: 4,
  m: 2,
};

const Form = ({ form, register, errors }: FormProps) => {
  // console.log("form render: ", form.title);

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
        <FormBoxComponent
          key={component.name}
          component={component}
          register={register}
          error={errors[component.name]}
        />
      ))}
    </Box>
  );
};

export default Form;
