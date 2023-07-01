import { useContext, useEffect, useState } from "react";
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

import {
  login,
  logout,
  setAccessToken,
  setRefreshToken,
  userSignup,
} from "../helpers/formrequest";
import { FormBoxContext } from "./formbuilder";
import { useNavigate } from "react-router-dom";

export default function ProfileMenu({ user, handleSetUser }) {
  const { setSnackbar, dispatchFormAction } = useContext(FormBoxContext);
  const [open, setOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();

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
    login(values).then((result) => {
      if (result.ok === true) {
        console.log("result from login api: ", result);
        setAccessToken(result.token.accessToken)
          .then((result) => console.log("set access token", result))
          .catch((e) =>
            console.error("error setting access token: ", e.message)
          );

        setRefreshToken(result.token.refreshToken)
          .then((result) => console.log("set refresh token", result))
          .catch((e) =>
            console.error("error setting refresh token: ", e.message)
          );
        handleSetUser({ username: result.username });
        handleClose();
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

  const submitSignup = async (values) => {
    try {
      const result = await userSignup(values);
      // console.log("Sign up result:", result);
      if (!result.ok) throw new Error(result.error);
      setSnackbar({ open: true, type: "success", message: result.message });
      handleCloseUserMenu();
    } catch (e: any) {
      setSnackbar({
        open: true,
        type: "error",
        message: e.message,
      });
    }
  };

  const submitLogout = () => {
    console.log("submitLogout: ", user);
    logout()
      .then((response) => {
        console.log("Result from logout: ", response);
        if (!response.ok) throw new Error(response.error);
        setSnackbar({ open: true, type: "success", message: response.message });
        handleSetUser({ token: undefined, username: undefined });
        dispatchFormAction({ type: "reset" });
        handleCloseUserMenu();
        navigate("/");
      })
      .catch((e) => {
        setSnackbar({
          open: true,
          type: "error",
          message: e.message,
        });
      });
  };

  const profileMenuItems = [
    {
      key: "login",
      icon: <LoginIcon />,
      onClick: handleOpen,
      title: "Login",
      disabled: user.username !== undefined,
    },
    {
      key: "profile",
      icon: <PersonIcon />,
      onClick: undefined,
      title: "Profile",
      disabled: user.username === undefined,
    },
    {
      key: "logout",
      icon: <LogoutIcon />,
      onClick: submitLogout,
      title: "Logout",
      disabled: user.username === undefined,
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
