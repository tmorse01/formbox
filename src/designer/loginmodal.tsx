import { useEffect, useState } from "react";
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

import PersonIcon from "@mui/icons-material/Person";
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
  display: "grid",
  gridTemplateRows: "min-content auto min-content",
  width: "400px",
};

interface State {
  username: string;
  password: string;
  showPassword: boolean;
}

export default function LoginModal({ setToken, token }) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<State>({
    username: "",
    password: "",
    showPassword: false,
  });

  useEffect(() => {
    // console.log("component did mount useEffect");
  }, []);

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const submitLogin = () => {
    const body = {
      username: values.username,
      password: values.password,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    fetch("http://localhost:3001/login", requestOptions)
      .then((res) => res.text())
      .then((res) => {
        console.log("result from login api: ", res);
        const result = JSON.parse(res);
        setToken(result.token);
      })
      .catch((res) => console.log("error from login api: ", res));
  };

  const submitSignup = () => {
    const body = {
      username: values.username,
      password: values.password,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    fetch("http://localhost:3001/signup", requestOptions)
      .then((res) => res.text())
      .then((res) => {
        console.log("result from signup api: ", res);
      })
      .catch((res) => console.log("error from signup api: ", res));
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
          gridTemplateColumns: "auto auto auto",
          gap: 4,
        }}
      >
        <Button variant="contained" onClick={() => submitLogin()}>
          Submit
        </Button>
        <Typography variant="subtitle1"> Not an existing user?</Typography>
        <Button variant="text" onClick={() => submitSignup()}>
          Sign up
        </Button>
      </Box>
    </Box>
  );

  // check if user is logged in
  if (token === "") {
    return (
      <>
        <Button color="inherit" onClick={handleOpen}>
          Login
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {loginForm}
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <IconButton color="inherit">
          <PersonIcon />
        </IconButton>
      </>
    );
  }
}
