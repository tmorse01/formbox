import { Container, Box, Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

import Form from "./form";

import Typography from "@mui/material/Typography";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ClearButton from "../../features/clearbutton";

// types
import { ContainerProps, FormProps } from "../../types/componentType";

const style = {
  bgcolor: "background.paper",
  borderRadius: "8px",
  display: "grid",
  gridTemplateRows: "min-content auto",
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

  const methods = useForm({
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const { handleSubmit, reset } = methods;

  const handleClear = () => {
    reset(initialValues);
  };
  //   console.log("container render :", values);
  const forms = formJSON?.forms;
  if (formJSON !== undefined) {
    return (
      <FormProvider {...methods}>
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
          {forms?.map((formProps, index) => (
            <Form key={index} {...(formProps as FormProps)} />
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
      </FormProvider>
    );
  } else {
    return <></>;
  }
};

export default FormBoxContainer;
