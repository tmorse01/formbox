import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
  gap: 4,
  minWidth: "200px",
  display: "grid",
  gridTemplateRows: "min-content auto min-content",
  width: "auto",
};

interface State {
  username: string;
  password: string;
  showPassword: boolean;
}

export default function LoginModal({
  open,
  handleClose,
  submitLogin,
  submitSignup,
}) {
  const [values, setValues] = useState<State>({
    username: "",
    password: "",
    showPassword: false,
  });

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const loginForm = (
    <Box component="form" sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Login
      </Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr" }}>
        <FormControl sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="username">Username</InputLabel>
          <OutlinedInput
            id="username"
            type={"text"}
            value={values.username}
            onChange={handleChange("username")}
            label="Username"
          />
        </FormControl>
        <FormControl sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </Box>
      <Box
        sx={{
          display: "grid",
          gap: 1,
        }}
      >
        <Button variant="contained" onClick={() => submitLogin(values)}>
          Submit
        </Button>
        <Typography variant="subtitle1" align="center">
          Not an existing user?
        </Typography>
        <Button variant="text" onClick={() => submitSignup(values)}>
          Sign up
        </Button>
      </Box>
    </Box>
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {loginForm}
    </Modal>
  );
}
