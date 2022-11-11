import React from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import ErrorPage from "./errorpage";
import FormBox from "./formbox";
import FormBoxAppBar from "./appbar";
import FormDataGridPage from "./formdatagridpage";

import { formBuilderProps } from "../types/componentType";
import testform1 from "../testforms/testform1.json";
import { container } from "../types/componentType";

import "../css/formbuilder.css";

type FormBuilderState = {
  formJSON: container;
  formName: string;
};

type FormBuilderProps = formBuilderProps;

export default class FormBuilder extends React.Component<
  FormBuilderProps,
  FormBuilderState
> {
  constructor(props) {
    super(props);
    this.state = {
      formJSON: testform1,
      formName: "",
    };
  }

  componentDidMount() {
    // console.log("form builder mounted: ", this);
    this.connectToDb();
  }

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

  saveForm = (formName, formJSON) => {
    const body = {
      formName,
      formJSON,
    };
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    fetch("http://localhost:3001/saveForm", requestOptions)
      .then((res) => res.text())
      .then((res) => console.log("result from api: ", res))
      .catch((res) => console.log("error from api: ", res));
  };

  render() {
    // console.log("formbuilder: ", this);
    const router = createBrowserRouter([
      {
        path: "/",
        element: <FormBox completeForm={this.state.formJSON} />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/gridview",
        element: <FormDataGridPage formName={this.state.formName} />,
        errorElement: <ErrorPage />,
      },
    ]);
    return (
      <div className="formBuilderWrapper">
        <FormBoxAppBar
          completeForm={this.state.formJSON}
          formName={this.state.formName}
          onNameChange={this.onNameChange}
          onChange={this.setFormJSON}
          handleSubmit={this.saveForm}
        />
        <div className="formBuilder">
          <React.StrictMode>
            <RouterProvider router={router} />
          </React.StrictMode>
        </div>
      </div>
    );
  }
}
