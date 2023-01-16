import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./errorpage";
import FormBox from "./formbox";
import FormBoxAppBar from "./appbar";
import FormDataGridPage from "./formdatagridpage";
import JSONEditorPage from "./jsoneditorpage";

import { formBuilderProps } from "../types/componentType";
import { container } from "../types/componentType";

import "../css/formbuilder.css";
import { AlertColor } from "@mui/material/Alert";
import FormBoxSnackbar from "./snackbar";

type FormBuilderState = {
  formJSON: container | undefined;
  formName: string;
  token: string | null | undefined;
  username: string | null | undefined;
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
    };
  }

  componentDidMount() {
    // console.log("form builder mounted: ", this);
    this.connectToDb();
    // console.log("token: ", this.state.token);
  }

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

  connectToDb() {
    fetch("http://localhost:3001/connectToDb")
      .then((res) => res.text())
      .then((res) => console.log("result from connectToDb: ", res))
      .catch((res) => console.log("error from connectToDb: ", res));
  }

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
        element: <FormDataGridPage formName={formName} />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/jsoneditor",
        element: (
          <JSONEditorPage
            formName={formName}
            value={completeForm}
            onChange={this.setFormJSON}
            onNameChange={this.onNameChange}
            setSnackbar={this.setSnackbar}
            username={this.state.username}
          />
        ),
        errorElement: <ErrorPage />,
      },
    ]);
    return (
      <div className="formBuilderWrapper">
        <FormBoxAppBar
          formName={formName}
          onNameChange={this.onNameChange}
          onChange={this.setFormJSON}
          setToken={this.setToken}
          token={this.state.token}
          setSnackbar={this.setSnackbar}
          setUsername={this.setUsername}
          username={this.state.username}
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
    );
  }
}
