import React from "react";
import { FormControl, FormHelperText } from "@mui/material";
import FormBoxButton from "../components/button";
import FormBoxTextField from "../components/textfield";
import { componentProps } from "../types/componentType";

type CompState = {
  visible: true;
};

type CompProps = {
  key: number;
  component: componentProps;
  onChange: ({ name, value }) => void;
};

export default class FormBoxComponent extends React.Component<
  CompProps,
  CompState
> {
  onChange = (e: any) => {
    let component = this.props.component;
    let value = e.target.value;
    this.props.onChange({ name: component.name, value: value });
  };

  getComponent = (component: any) => {
    if (component.type === "textfield") {
      return (
        <FormBoxTextField
          name={component.name}
          title={component.title}
          required={component.required}
          onChange={this.onChange}
        />
      );
    } else if (component.type === "button") {
      return (
        <FormBoxButton
          name={component.name}
          title={component.title}
          submit={component.submit}
          icon={component.icon}
        />
      );
    } else {
      return <div>FormBoxComponent</div>;
    }
  };

  formControl = (control: any, component: any) => {
    return (
      <FormControl variant="standard">
        {control}
        <FormHelperText id={component.name + "helptext"}>
          {component.help}
        </FormHelperText>
      </FormControl>
    );
  };

  render() {
    let component = this.props.component;
    // console.log("component:", this);
    let control = this.getComponent(component);
    let formControl = this.formControl(control, component);
    return formControl;
  }
}
