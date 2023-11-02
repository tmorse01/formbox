import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages
import {
  ErrorPage,
  FormBoxPage,
  FormDataGridPage,
  JSONEditorPage,
} from "./pages";

// feature components
import FormBoxSnackbar from "./features/snackbar";
import FormBoxAppBar from "./features/appbar";

// helpers
import {
  getForms,
  connectToDb,
  disconnectDb,
  getUser,
  generateAccessToken,
  setAccessToken,
} from "./helpers/formrequest";
import { useFormStateReducer } from "./hooks/formStateReducer";
import LoadFormData from "./features/loadformdata";

// types
import {
  FormBoxContextType,
  formDataProps,
  SnackbarProps,
  User,
} from "./types/componentType";

// css
import "./App.css";
import "./css/formbuilder.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Hero from "./features/hero";
import HeroImages from "./features/heroimages";

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
  handleSetUser: (user: User) => {},
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
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Effects

  useEffect(() => {
    connectToDb().catch((e) =>
      console.error("Error connecting to database", e.message)
    );
    // Existing user has refresh token, generate access token and sign them back in
    getUser().then((response) => {
      if (response.user) {
        generateAccessToken().then((res) => {
          const newToken = res.token;
          setAccessToken(newToken);
          handleSetUser(response.user);
        });
      }
    });
    return () => {
      disconnectDb();
    };
  }, []);

  // Setters
  const handleSetUser = (user: User) => {
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
      <LoadFormData>
        <div className="formBuilderWrapper">
          <FormBoxAppBar
            formName={formState.formName}
            handleSetUser={handleSetUser}
            getUserFormList={getUserFormList}
            loginModalOpen={loginModalOpen}
            setLoginModalOpen={setLoginModalOpen}
          />
          <div className="formBuilder">{control}</div>
          <FormBoxSnackbar />
        </div>
      </LoadFormData>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: wrapRoute(
        <>
          <Hero setLoginModalOpen={setLoginModalOpen} />
          <HeroImages />
        </>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/form/:form",
      element: wrapRoute(<FormBoxPage formState={formState} />),
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
        handleSetUser: handleSetUser,
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
