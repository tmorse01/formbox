import { useContext, useState } from "react";
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

import {
  login,
  setAccessToken,
  setRefreshToken,
  userSignup,
} from "../helpers/formrequest";
import { FormBoxContext } from "./../formbuilder";

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

export default function LoginModal({ open, handleClose }) {
  const { setSnackbar, handleSetUser } = useContext(FormBoxContext);

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

  const submitLogin = (values) => {
    login(values)
      .then((result) => {
        if (
          result.ok === true &&
          result.token.accessToken !== undefined &&
          result.token.refreshToken !== undefined
        ) {
          setAccessToken(result.token.accessToken)
            .then((result) => console.log("set access token", result))
            .catch((e) => {
              throw new Error(e.message);
            });

          setRefreshToken(result.token.refreshToken)
            .then((result) => console.log("set refresh token", result))
            .catch((e) => {
              throw new Error(e.message);
            });
          handleSetUser({ username: result.username });
          handleClose();
          setSnackbar({ open: true, type: "success", message: result.message });
        } else {
          throw new Error("Failed creating access tokens.");
        }
      })
      .catch((error) => {
        console.error(error);
        setSnackbar({
          open: true,
          type: "error",
          message: error.message,
        });
      });
  };

  const submitSignup = async (values) => {
    try {
      const result = await userSignup(values);
      // console.log("Sign up result:", result);
      if (!result.ok) throw new Error(result.error);
      setSnackbar({ open: true, type: "success", message: result.message });
    } catch (e: any) {
      setSnackbar({
        open: true,
        type: "error",
        message: e.message,
      });
    }
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
