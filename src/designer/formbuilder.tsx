import React from "react";
import FormBox from "./formbox";
import FormBoxAppBar from "./appbar";
import "../css/formbuilder.css";

import { formBuilderProps } from "../types/componentType";
import testform1 from "../testforms/testform1.json";
import { container } from "../types/componentType";

type FormBuilderState = {
  formJSON: container;
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
    };
  }

  componentDidMount() {
    console.log("form builder mounted: ", this);
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

  render() {
    console.log("formbuilder: ", this.state.formJSON);
    return (
      <div>
        <FormBoxAppBar
          completeForm={this.state.formJSON}
          onChange={this.setFormJSON}
        />
        <div className="formBuilder">
          <FormBox completeForm={this.state.formJSON} />
        </div>
      </div>
    );
  }
}
