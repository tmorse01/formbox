import React from "react";
import FormBox from "./formbox";
import FormBoxAppBar from "./appbar";
import "../css/formbuilder.css";

import { formBuilderProps } from "../types/componentType";
import testform1 from "../testforms/testform1.json";
import { container } from "../types/componentType";

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

  saveForm = () => {
    const body = {
      formName: this.state.formName,
      formJSON: this.state.formJSON,
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
    // console.log("formbuilder: ", this.state.formJSON);
    return (
      <div>
        <FormBoxAppBar
          completeForm={this.state.formJSON}
          formName={this.state.formName}
          onNameChange={this.onNameChange}
          onChange={this.setFormJSON}
          handleSubmit={this.saveForm}
        />
        <div className="formBuilder">
          <FormBox completeForm={this.state.formJSON} />
        </div>
      </div>
    );
  }
}
