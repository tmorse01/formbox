import React from "react";
import FormBoxTextField from "../components/textfield";

type CompState = {
  visible: true;
};

type CompProps = {
  component: {
    name: string;
    title: string;
    type: string;
    required: boolean;
  };
};

export default class FormBoxComponent extends React.Component<
  CompProps,
  CompState
> {
  render() {
    let component = this.props.component;
    console.log("component:", component);
    if (component.type == "textfield") {
      return <FormBoxTextField name={component.name} title={component.title} />;
    } else {
      return <div>FormBoxComponent</div>;
    }
  }
}
