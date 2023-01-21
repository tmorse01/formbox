import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./errorpage";
import FormBox from "./formbox";
import FormBoxAppBar from "./appbar";
import FormDataGridPage from "./formdatagridpage";
import JSONEditorPage from "./jsoneditorpage";

import {
  formBuilderProps,
  formDataProps,
  container,
} from "../types/componentType";

import "../css/formbuilder.css";
import { AlertColor } from "@mui/material/Alert";
import FormBoxSnackbar from "./snackbar";

// css
import "../App.css";

export const FormBoxContext = React.createContext<CurrentFormBoxContext>({
  formJSON: undefined,
  formName: "",
  username: undefined,
  token: undefined,
  listOfForms: [],
});

type CurrentFormBoxContext = {
  formJSON: container | undefined;
  formName: string;
  username: string | null | undefined;
  token: string | null | undefined;
  listOfForms: formDataProps[];
};

type FormBuilderState = CurrentFormBoxContext & {
  snackbar: {
    open: boolean;
    message: string;
    type: AlertColor;
  };
};

type FormBuilderProps = formBuilderProps;

export default class FormBuilder extends React.Component<
  FormBuilderProps,
  FormBuilderState
> {
  constructor(props) {
    super(props);
    this.state = {
      formJSON: undefined,
      formName: "",
      token: this.getToken(),
      username: this.getUsername(),
      snackbar: {
        open: false,
        message: "",
        type: "success",
      },
      listOfForms: [],
    };
  }

  componentDidMount() {
    // console.log("form builder mounted: ", this);
    this.connectToDb();
    if (this.state.username) {
      this.getForms();
    }
    // console.log("token: ", this.state.token);
  }

  connectToDb() {
    fetch("http://localhost:3001/connectToDb")
      .then((res) => res.text())
      .then((res) => console.log("result from connectToDb: ", res))
      .catch((res) => console.log("error from connectToDb: ", res));
  }

  getForms = () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      "http://localhost:3001/getForms?username=" + this.state.username,
      requestOptions
    )
      .then((res) => res.text())
      .then((res) => {
        const response = JSON.parse(res);
        console.log("result from getForms api: ", response);
        this.setState({ listOfForms: response.results });
      })
      .catch((res) => console.log("error from getForms api: ", res));
  };

  setSnackbar = (snackbar) => {
    this.setState({ snackbar });
  };

  setToken = (userToken) => {
    if (userToken === undefined) {
      sessionStorage.removeItem("token");
    } else {
      sessionStorage.setItem("token", userToken);
    }
    this.setState({ token: userToken });
  };

  getToken = () => {
    return sessionStorage.getItem("token") ?? undefined;
  };

  setUsername = (username) => {
    if (username === undefined) {
      sessionStorage.removeItem("username");
    } else {
      sessionStorage.setItem("username", username);
    }
    this.setState({ username: username });
  };

  getUsername = () => {
    return sessionStorage.getItem("username") ?? undefined;
  };

  setFormJSON = (value) => {
    this.setState({ formJSON: value });
  };

  onNameChange = (formName) => {
    this.setState({ formName });
  };

  render() {
    console.log("formbuilder: ", this);
    let completeForm = this.state.formJSON;
    let formName = this.state.formName;
    const router = createBrowserRouter([
      {
        path: "/",
        element: completeForm ? <FormBox completeForm={completeForm} /> : <></>,
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
            onChange={this.setFormJSON}
            onNameChange={this.onNameChange}
            setSnackbar={this.setSnackbar}
            getForms={this.getForms}
          />
        ),
        errorElement: <ErrorPage />,
      },
    ]);
    return (
      <FormBoxContext.Provider
        value={{
          formJSON: this.state.formJSON,
          formName: this.state.formName,
          username: this.state.username,
          token: this.state.token,
          listOfForms: this.state.listOfForms,
        }}
      >
        <div className="formBuilderWrapper">
          <FormBoxAppBar
            onNameChange={this.onNameChange}
            onChange={this.setFormJSON}
            setToken={this.setToken}
            setSnackbar={this.setSnackbar}
            setUsername={this.setUsername}
            getForms={this.getForms}
          />
          <div className="formBuilder">
            <React.StrictMode>
              <RouterProvider router={router} />
            </React.StrictMode>
          </div>
          <FormBoxSnackbar
            snackbar={this.state.snackbar}
            setSnackbar={this.setSnackbar}
          />
        </div>
      </FormBoxContext.Provider>
    );
  }
}
