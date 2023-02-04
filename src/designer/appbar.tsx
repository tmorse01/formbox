import { useState, useContext } from "react";
import {
  Link,
  Menu,
  MenuItem,
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";

// icons
import MenuIcon from "@mui/icons-material/Menu";

import ShareModal from "./sharemodal";
import SavedFormsModal from "./savedformsmodal";
import LoginModal from "./loginmodal";

import { FormBoxContext } from "./formbuilder";

export default function FormBoxAppBar({
  dispatchFormAction,
  handleSetUser,
  setSnackbar,
  getForms,
}) {
  const { user } = useContext(FormBoxContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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
          <SavedFormsModal
            dispatchFormAction={dispatchFormAction}
            handleMenuClose={handleClose}
            getForms={getForms}
          />
          <ShareModal />
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
            FormBox Form Builder
          </Typography>
          <LoginModal
            user={user}
            setSnackbar={setSnackbar}
            handleSetUser={handleSetUser}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
