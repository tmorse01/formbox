import * as React from "react";
import {
  Divider,
  Link,
  Menu,
  MenuItem,
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";

// icons
import MenuIcon from "@mui/icons-material/Menu";

import SavedFormsModal from "./savedformsmodal";
import LoginModal from "./loginmodal";

export default function FormBoxAppBar({
  formName,
  onChange,
  onNameChange,
  setToken,
  token,
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openJSONEditor = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1, gap: 8 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openJSONEditor}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem key={"home"} onClick={handleClose}>
              <Typography>
                <Link href={"/"} color="inherit" underline="none">
                  {"Designer Home"}
                </Link>
              </Typography>
            </MenuItem>
            <MenuItem key={"gridview"} onClick={handleClose}>
              <Typography>
                <Link href={"/gridview"} color="inherit" underline="none">
                  {"View Form Responses"}
                </Link>
              </Typography>
            </MenuItem>
            <MenuItem key="jsoneditor" onClick={handleClose}>
              <Typography>
                <Link href={"/jsoneditor"} color="inherit" underline="none">
                  {"Form JSON Editor"}
                </Link>
              </Typography>
            </MenuItem>
          </Menu>
          <SavedFormsModal
            formName={formName}
            onChange={onChange}
            onNameChange={onNameChange}
            handleMenuClose={handleClose}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
            FormBox Form Builder
          </Typography>
          <LoginModal setToken={setToken} token={token} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
