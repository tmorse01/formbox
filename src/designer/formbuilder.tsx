import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages
import ErrorPage from "./errorpage";
import FormBox from "./formbox";
import FormBoxAppBar from "./appbar";
import FormDataGridPage from "./formdatagridpage";
import JSONEditorPage from "./jsoneditorpage";
import FormBoxSnackbar from "./snackbar";

// helpers
import {
  getForms,
  connectToDb,
  disconnectDb,
  generateAccessToken,
} from "../helpers/formrequest";
import { useFormStateReducer } from "../hooks/formStateReducer";
import { FormBoxContextType } from "../types/componentType";

// css
import "../App.css";
import "../css/formbuilder.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#4dabf5",
      main: "#2196f3",
      dark: "#1769aa",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ffa733",
      main: "#ff9100",
      dark: "#b26500",
      contrastText: "#fff",
    },
  },
});

export const FormBoxContext = React.createContext<FormBoxContextType>({
  user: {
    username: undefined,
    token: undefined,
  },
  listOfForms: [],
});

// Global functions

const getToken = () => {
  return sessionStorage.getItem("token") ?? undefined;
};

const getUsername = () => {
  return sessionStorage.getItem("username") ?? undefined;
};

const FormBuilder = () => {
  // State
  const [formState, dispatchFormAction] = useFormStateReducer();

  // console.log("formBuilder", formState);
  const [user, setUser] = useState({
    username: getUsername(),
    token: getToken(),
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [listOfForms, setListOfForms] = useState([]);

  // Effects

  useEffect(() => {
    connectToDb();
    return () => {
      disconnectDb();
    };
  }, []);

  // Setters
  const handleSetUser = (user) => {
    if (user.token === undefined) {
      sessionStorage.removeItem("token");
    } else {
      sessionStorage.setItem("token", user.token);
    }
    if (user.username === undefined) {
      sessionStorage.removeItem("username");
    } else {
      sessionStorage.setItem("username", user.username);
    }
    setUser(user);
  };

  // Getters
  const getUserFormList = () => {
    if (user.token) {
      getForms(user.token)
        .then((response) => {
          if (response.results?.length > 0) {
            setListOfForms(response.results);
          }
        })
        .catch((error) => {
          console.error("getUserFormList error: ", error);
          if (error.message === "Forbidden") {
            generateAccessToken().then((result) => {
              console.log("generateAccess token: ", result);
              // handleSetUser({
              //   token: result.token,
              //   username: user.username,
              // });
              // // TODO try getting forms again
              // getForms(user.token).then((response) => {
              //   if (response.results?.length > 0) {
              //     setListOfForms(response.results);
              //   }
              // });
            });
          }
        });
    }
  };

  // Router

  const wrapRoute = (control) => {
    return (
      <div className="formBuilderWrapper">
        <FormBoxAppBar
          formName={formState.formName}
          handleSetUser={handleSetUser}
          setSnackbar={setSnackbar}
          getUserFormList={getUserFormList}
        />
        <div className="formBuilder">{control}</div>
        <FormBoxSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: wrapRoute(<></>),
      errorElement: <ErrorPage />,
    },
    {
      path: "/form/:form",
      element: wrapRoute(
        <FormBox
          formState={formState}
          dispatchFormAction={dispatchFormAction}
          setSnackbar={setSnackbar}
        />
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/responses/:form",
      element: wrapRoute(
        <FormDataGridPage
          formName={formState.formName}
          dispatchFormAction={dispatchFormAction}
          setSnackbar={setSnackbar}
        />
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/jsoneditor/:form",
      element: wrapRoute(
        <JSONEditorPage
          formState={formState}
          dispatchFormAction={dispatchFormAction}
          setSnackbar={setSnackbar}
          getUserFormList={getUserFormList}
        />
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/jsoneditor/",
      element: wrapRoute(
        <JSONEditorPage
          formState={formState}
          dispatchFormAction={dispatchFormAction}
          setSnackbar={setSnackbar}
          getUserFormList={getUserFormList}
        />
      ),
      errorElement: <ErrorPage />,
    },
  ]);

  // JSX element
  return (
    <FormBoxContext.Provider
      value={{
        user: user,
        listOfForms: listOfForms,
      }}
    >
      <ThemeProvider theme={theme}>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </ThemeProvider>
    </FormBoxContext.Provider>
  );
};

export default FormBuilder;
