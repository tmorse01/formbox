import { Container, Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";

import Form from "./form";

import Typography from "@mui/material/Typography";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ClearButton from "./clearbutton";

// types
import { ContainerProps } from "../types/componentType";

const style = {
  bgcolor: "background.paper",
  borderRadius: "8px",
  display: "grid",
  padding: "12px 0 12px 0",
  boxShadow: "4px 4px 12px #e0e0e0",
};

const FormBoxContainer = ({
  formState,
  initialValues,
  onSubmit,
  onError,
}: ContainerProps) => {
  const { formJSON } = formState;

  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const handleClear = () => {
    console.log("handleClear ", getValues(), initialValues);
    reset(initialValues);
  };
  //   console.log("container render :", values);

  if (formJSON !== undefined) {
    return (
      <Container
        sx={style}
        maxWidth="sm"
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <Typography sx={{ color: "text.primary", ml: 2 }} variant="h2">
          {formJSON.title}
        </Typography>
        {formJSON?.forms?.map((form) => (
          <Form form={form} register={register} errors={errors} />
        ))}
        <Box
          display="flex"
          justifyContent={"right"}
          sx={{ m: 2, height: "40px", gap: 4 }}
        >
          <ClearButton onClear={handleClear} />
          <Button
            id={"submit"}
            type={"submit"}
            variant="contained"
            color="secondary"
            startIcon={<SaveAltIcon />}
          >
            {"Submit"}
          </Button>
        </Box>
      </Container>
    );
  } else {
    return <></>;
  }
};

export default FormBoxContainer;
