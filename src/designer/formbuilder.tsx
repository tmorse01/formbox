import React, { useReducer, useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./errorpage";
import FormBox from "./formbox";
import FormBoxAppBar from "./appbar";
import FormDataGridPage from "./formdatagridpage";
import JSONEditorPage from "./jsoneditorpage";

import { getForms, connectToDb, disconnectDb } from "../helpers/formrequest";

import { FormBoxContextType } from "../types/componentType";

import "../css/formbuilder.css";
import FormBoxSnackbar from "./snackbar";

// css
import "../App.css";

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
  formState: {
    formJSON: undefined,
    formName: undefined,
  },
  user: {
    username: undefined,
    token: undefined,
  },
  listOfForms: [],
});

// Global functions
function createInitialFormState() {
  return {
    JSON: undefined,
    formName: undefined,
  };
}

function formStateReducer(state, action) {
  switch (action.type) {
    case "update_formName": {
      return {
        ...state,
        formName: action.payload.formName,
      };
    }
    case "update_JSON": {
      return {
        ...state,
        formJSON: action.payload.formJSON,
      };
    }
    case "update_formState": {
      return {
        ...state,
        ...action.payload.formState,
      };
    }
    default: {
      console.error("Unknown action:", action);
      throw Error("Unknown action: " + action.type);
    }
  }
}

const getToken = () => {
  return sessionStorage.getItem("token") ?? undefined;
};

const getUsername = () => {
  return sessionStorage.getItem("username") ?? undefined;
};

const FormBuilder = () => {
  // State
  const [formState, dispatchFormAction] = useReducer(
    formStateReducer,
    {
      formJSON: undefined,
      formName: undefined,
    },
    createInitialFormState
  );

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
    if (user.username) {
      getForms(user.username).then((forms) => {
        setListOfForms(forms);
      });
    }
  };

  // Router

  const wrapRoute = (control) => {
    return (
      <div className="formBuilderWrapper">
        <FormBoxAppBar
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
        formState: formState,
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
