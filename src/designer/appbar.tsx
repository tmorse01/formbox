import React, { Fragment, useContext } from "react";
import {
  Button,
  Container,
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// icons
import TableRowsIcon from "@mui/icons-material/TableRows";
import DataArrayIcon from "@mui/icons-material/DataArray";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import MenuIcon from "@mui/icons-material/Menu";

import ShareModal from "./sharemodal";
import SavedFormsModal from "./savedformsmodal";
import ProfileMenu from "./profilemenu";

import { FormBoxContext } from "./formbuilder";
import "../App.css";

export default function FormBoxAppBar({
  handleSetUser,
  setSnackbar,
  getUserFormList,
}) {
  const { user, formState } = useContext(FormBoxContext);

  var isRespDisabled =
    formState.formName === undefined || user.username === undefined;

  const pages = [
    {
      key: "form",
      title: "Form",
      path: "/form/" + formState.formName,
      disabled: formState.formName === undefined,
      icon: <DynamicFormIcon />,
    },
    {
      key: "responses",
      title: "Responses",
      path: "/responses/" + formState.formName,
      disabled: formState.formName === undefined || user.username === undefined,
      tooltip: isRespDisabled
        ? "Please sign in to view your forms responses."
        : undefined,
      icon: <TableRowsIcon />,
    },
    {
      key: "jsoneditor",
      title: "Editor",
      path: formState.formName
        ? "/jsoneditor/" + formState.formName
        : "/jsoneditor/",
      disabled: formState.formName === undefined,

      icon: <DataArrayIcon />,
    },
  ];

  const navigate = useNavigate();
  const navigateToPath = (path) => {
    navigate(path);
  };

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleExample = () => {
    console.log("handleExample");
    navigateToPath("/form/formBoxExample");
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <a href="/">
            <img
              alt="LogoHomeIcon"
              style={{ height: "40px" }}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADgklEQVR4nO2aXUhTYRjHD3nWjnSVhKYsPxBCc1MvgiCoboIUM7ILleoiuu+qOwvtPjDc0vkxFa3UhhWS5LYzS4lCJDO3mZBffa1t+a1J7pzlE+9S0eTMuXPOdo7n/OF3NXh4nt/e9+V92TBMjhw5cuTIkSNHzr+AGYulyagGmsS/0yQ+GxArPksNKX+vTBCrQsY7RvioEWKMeo+fxAIFXmGHaRJ3+aw47Aa6XwHeSQK8X6KFzTjxx9uvUDMKoEm8ZbfDb0joUQBlJ8D7WQCDBuIjMckswIrPhypgQ0QvDvSQErwTwlwRaEswCvCxHH4L3TjQbxVADyqBGiGAGhfO6ti1gKmmVJhuTuVMjO+lglemmtf6Zfh81wKc+mw/nK4QHtmpX1kAU3zyCsAlvgXIqA97X0DUIKMAKMP2wWvs4DrrhRipzlwVA5tnQjNiwca5kwCREPTA/yfSjQteAG1RigLeBPgEcOAFQ/gFkAqYN8aDx5AOrloNK1CNBWO8v6ZoBCwYEzjfx/OPE8QjwF2XwbkAVFM0Aly1as4FoJqiETDXeoRzAaimaATQlv0w15IIP2o0rAdHNVAtVFNwAuggTmbKrGRFqEOHRQDFUYN8w5uAlRcHpC1guSNG2gIWWFxO9oSAn41HpS3AWZ0FlClawgL02bDQHidtAW50R2fxUhO9AKc+G5aeHpKegGZDKVyoskGuzgF5lcNwrfMTXDeNhp2bpjdgJ0+FX8D5SgfkVNg3yG8YhaKuqYhwwzQQfgE5m4Zfp6Dta8QkRFxAqfUE3LaoQdt/DAx2/rn7rlhYAsqs2VBi1sAtiwaqBlKgaVjFK7rBs8ISkKMdhAJ99xo9UNQ+DFfN47xRZPIITEDFdtDBWNjpkdAZQGq2UWpVQ3lfhnTOgBIG7nRnwL2+VGiwJUrhDOhm5KK+Fy41DkBhqw2Kn43A5c5RuNI1Jr4zIO/+1osQW3K1DsjVDYdEvt4R8NclXgRoDeX+azCXEkISp3OAzlAe8K0SuoDqzICFv+mPg63mXERBPQR8rFVnMv8xcqe469OWg30RChVPfdovLNTMPEp+HukB2DL9MKkjZAHzRlWMqy7NG+khQsVtSF9BM2BssmhUnXHXpYtOAup5sU11GuMiS0/iYmceJFuQUac+K+LDMZPl/9ZRr6hnjI9AYxIxZ4xLESKoN16GliNHDrZX8xdMT8YK3D27rAAAAABJRU5ErkJggg=="
            />
          </a>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            FormBox
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => {
                return (
                  <MenuItem
                    key={page.key}
                    disabled={page.disabled}
                    onClick={() => navigateToPath(page.path)}
                  >
                    <Typography textAlign="center">
                      {page.icon}
                      {page.title}
                    </Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => {
              return (
                <Fragment key={page.key}>
                  <Typography>
                    <Button
                      onClick={() => navigateToPath(page.path)}
                      color="inherit"
                      disabled={page.disabled}
                    >
                      {page.icon}
                      {page.title}
                    </Button>
                  </Typography>
                </Fragment>
              );
            })}
          </Box>
          <Button color="inherit" key="example" onClick={handleExample}>
            Example
          </Button>
          <SavedFormsModal getUserFormList={getUserFormList} />
          <ShareModal setSnackbar={setSnackbar} />
          <Box sx={{ flexGrow: 0 }}>
            <ProfileMenu
              user={user}
              setSnackbar={setSnackbar}
              handleSetUser={handleSetUser}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
