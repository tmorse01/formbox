import React from "react";
import FormBox from "./formbox";
import FormBoxAppBar from "./appbar";
import "../css/formbuilder.css";

import testform1 from "../testforms/testform1.json";
// import { formBoxProps } from "../types/componentType";

export default class FormBuilder extends React.Component {
  componentDidMount() {
    console.log("form builder mounted: ", this);
    this.callAPI();
  }

  callAPI() {
    fetch("http://localhost:3001/api")
      .then((res) => res.text())
      .then((res) => console.log("result from api: ", res))
      .catch((res) => console.log("error from api: ", res));
  }

  render() {
    let testform = testform1;
    // console.log("testform: ", testform);
    return (
      <div>
        <FormBoxAppBar />
        <div className="formBuilder">
          <FormBox completeForm={testform} />
        </div>
      </div>
    );
  }
}
