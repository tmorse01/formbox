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

import { logout } from "../helpers/formrequest";
import { FormBoxContext } from "./../formbuilder";
import { useNavigate } from "react-router-dom";

export default function ProfileMenu() {
  const { setSnackbar, dispatchFormAction, user, handleSetUser } =
    useContext(FormBoxContext);
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

  const submitLogout = () => {
    // console.log("submitLogout: ", user);
    logout()
      .then((response) => {
        // console.log("Result from logout: ", response);
        if (!response.ok) throw new Error(response.error);
        setSnackbar({ open: true, type: "success", message: response.message });
        handleSetUser({ username: undefined });
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
        handleSetUser({ username: undefined });
        dispatchFormAction({ type: "reset" });
        handleCloseUserMenu();
        navigate("/");
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
      <LoginModal open={open} handleClose={handleClose} />
    </Box>
  );
}
