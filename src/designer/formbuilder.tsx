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
import {
  FormBoxContextType,
  formDataProps,
  SnackbarProps,
} from "../types/componentType";

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
  },
  listOfForms: [],
  setListOfForms: () => {},
  formState: { formJSON: undefined, formName: undefined },
  dispatchFormAction: () => {},
  snackbar: { open: false, message: "", type: "success" },
  setSnackbar: () => {},
});

// Global functions

const getUsername = () => {
  return sessionStorage.getItem("username") ?? undefined;
};

const FormBuilder = () => {
  // State
  const [formState, dispatchFormAction] = useFormStateReducer();
  const [user, setUser] = useState({
    username: getUsername(),
  });
  const [snackbar, setSnackbar] = useState<SnackbarProps>({
    open: false,
    message: "",
    type: "success",
  });
  const [listOfForms, setListOfForms] = useState<formDataProps[]>([]);

  // Effects

  useEffect(() => {
    connectToDb().catch((e) =>
      console.error("Error connecting to database", e.message)
    );
    return () => {
      disconnectDb();
    };
  }, []);

  // Setters
  const handleSetUser = (user) => {
    if (user.username === undefined) {
      sessionStorage.removeItem("username");
    } else {
      sessionStorage.setItem("username", user.username);
    }
    setUser(user);
  };

  // Getters
  const getUserFormList = () => {
    getForms()
      .then((response) => {
        // console.log("getUserFormList response: ", response);
        if (response.ok && response.results?.length > 0) {
          setListOfForms(response.results);
        }
      })
      .catch((error) => {
        console.error("getUserFormList error: ", error);
      });
  };

  // Router

  const wrapRoute = (control) => {
    return (
      <div className="formBuilderWrapper">
        <FormBoxAppBar
          formName={formState.formName}
          handleSetUser={handleSetUser}
          getUserFormList={getUserFormList}
        />
        <div className="formBuilder">{control}</div>
        <FormBoxSnackbar />
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
      element: wrapRoute(<FormBox formState={formState} />),
      errorElement: <ErrorPage />,
    },
    {
      path: "/responses/:form",
      element: wrapRoute(<FormDataGridPage formName={formState.formName} />),
      errorElement: <ErrorPage />,
    },
    {
      path: "/jsoneditor/:form",
      element: wrapRoute(
        <JSONEditorPage
          formState={formState}
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
        setListOfForms: setListOfForms,
        formState: formState,
        dispatchFormAction: dispatchFormAction,
        snackbar: snackbar,
        setSnackbar: setSnackbar,
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
