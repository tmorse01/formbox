import React, { useReducer, useState, useEffect, useCallback } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./errorpage";
import FormBox from "./formbox";
import FormBoxAppBar from "./appbar";
import FormDataGridPage from "./formdatagridpage";
import JSONEditorPage from "./jsoneditorpage";

import { formDataProps, container } from "../types/componentType";

import "../css/formbuilder.css";
import FormBoxSnackbar from "./snackbar";

// css
import "../App.css";

export const FormBoxContext = React.createContext<CurrentFormBoxContext>({
  formState: {
    formJSON: undefined,
    formName: "",
  },
  user: {
    username: undefined,
    token: undefined,
  },
  listOfForms: [],
});

type CurrentFormBoxContext = {
  formState: {
    formJSON: container | undefined;
    formName: string;
  };
  user: {
    username: string | null | undefined;
    token: string | null | undefined;
  };
  listOfForms: formDataProps[];
};

function createInitialFormState() {
  return {
    JSON: undefined,
    formName: "",
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
  const [formState, dispatchFormAction] = useReducer(
    formStateReducer,
    {
      formJSON: undefined,
      formName: "",
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

  useEffect(() => {
    connectToDb();
    if (user.username) {
      getForms();
    }
    return () => {
      //disconnectDb();
    };
  }, []);

  const connectToDb = () => {
    fetch("http://localhost:3001/connectToDb")
      .then((res) => res.text())
      .then((res) => console.log("result from connectToDb: ", res))
      .catch((res) => console.log("error from connectToDb: ", res));
  };

  const getForms = () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      "http://localhost:3001/getForms?username=" + user.username,
      requestOptions
    )
      .then((res) => res.text())
      .then((res) => {
        const response = JSON.parse(res);
        console.log("result from getForms api: ", response);
        setListOfForms(response.results);
      })
      .catch((res) => console.log("error from getForms api: ", res));
  };

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

  const router = createBrowserRouter([
    {
      path: "/",
      element: formState.formJSON ? <FormBox /> : <></>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/gridview",
      element: <FormDataGridPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/jsoneditor",
      element: (
        <JSONEditorPage
          dispatchFormAction={dispatchFormAction}
          setSnackbar={setSnackbar}
          getForms={getForms}
        />
      ),
      errorElement: <ErrorPage />,
    },
  ]);

  console.log("formbuilder");
  return (
    <FormBoxContext.Provider
      value={{
        formState: formState,
        user: user,
        listOfForms: listOfForms,
      }}
    >
      <div className="formBuilderWrapper">
        <FormBoxAppBar
          dispatchFormAction={dispatchFormAction}
          handleSetUser={handleSetUser}
          setSnackbar={setSnackbar}
          getForms={getForms}
        />
        <div className="formBuilder">
          <React.StrictMode>
            <RouterProvider router={router} />
          </React.StrictMode>
        </div>
        <FormBoxSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
      </div>
    </FormBoxContext.Provider>
  );
};

export default FormBuilder;
