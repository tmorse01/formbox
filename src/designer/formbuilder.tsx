import React from "react";
import FormBox from "./formbox";
import FormBoxAppBar from "./appbar";
import "../css/formbuilder.css";

import testform1 from "../testforms/testform1.json";
// import { formBoxProps } from "../types/componentType";

export default class FormBuilder extends React.Component {
  render() {
    let testform = testform1;
    console.log("testform: ", testform);
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
