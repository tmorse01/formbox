import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Avatar,
} from "@mui/material";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import LoginModal from "./loginmodal";

import { userSignup } from "../helpers/formrequest";

export default function ProfileMenu({ user, handleSetUser, setSnackbar }) {
  const [open, setOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    // console.log("component did mount useEffect");
  }, []);

  const handleOpen = () => {
    handleCloseUserMenu();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const submitLogin = (values) => {
    const body = {
      username: values.username,
      password: values.password,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    fetch(process.env.REACT_APP_FORMBOX_API + "/login", requestOptions)
      .then((res) => res.text())
      .then((res) => {
        const result = JSON.parse(res);
        // console.log("result from login api: ", result);
        if (result.token !== undefined) {
          handleSetUser({ token: result.token, username: result.username });
          handleClose();
          setSnackbar({ open: true, type: "success", message: result.message });
        } else {
          setSnackbar({ open: true, type: "error", message: result.message });
        }
      })
      .catch((res) => console.log("error from login api: ", res));
  };

  const submitSignup = (values) => {
    userSignup(values).then((result) => {
      console.log("Result from sign up", result);
      if (result.success === true) {
        setSnackbar({ open: true, type: "success", message: result.message });
      } else {
        setSnackbar({
          open: true,
          type: "error",
          message: result.error.message,
        });
      }
    });
  };

  const submitLogout = () => {
    handleSetUser({ token: undefined, username: undefined });
    handleCloseUserMenu();
  };

  const profileMenuItems = [
    {
      key: "login",
      icon: <LoginIcon />,
      onClick: handleOpen,
      title: "Login",
      disabled: user.token !== undefined,
    },
    {
      key: "profile",
      icon: <PersonIcon />,
      onClick: undefined,
      title: "Profile",
      disabled: user.token === undefined,
    },
    {
      key: "logout",
      icon: <LogoutIcon />,
      onClick: submitLogout,
      title: "Logout",
      disabled: user.token === undefined,
    },
  ];
  return (
    <Box>
      <Tooltip title="User Profile">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={user.username ?? undefined}>{user.username?.[0]}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {profileMenuItems.map((item) => {
          return (
            <MenuItem
              key={item.key}
              onClick={item.onClick}
              disabled={item.disabled === true}
            >
              <Box sx={{ display: "flex" }}>
                {item.icon}
                <Typography textAlign="center">{item.title}</Typography>
              </Box>
            </MenuItem>
          );
        })}
      </Menu>
      <LoginModal
        open={open}
        handleClose={handleClose}
        submitLogin={submitLogin}
        submitSignup={submitSignup}
      />
    </Box>
  );
}
