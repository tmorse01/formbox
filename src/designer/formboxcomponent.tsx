import React from "react";
import { FormControl, InputLabel, FormHelperText } from "@mui/material";
import FormBoxButton from "../components/button";
import FormBoxTextField from "../components/textfield";
import { componentProps } from "../types/componentType";

type CompState = {
  visible: true;
};

type CompProps = {
  component: componentProps;
};

export default class FormBoxComponent extends React.Component<
  CompProps,
  CompState
> {
  getComponent = (component: any) => {
    if (component.type === "textfield") {
      return (
        <FormBoxTextField
          name={component.name}
          title={component.title}
          required={component.required}
        />
      );
    } else if (component.type === "button") {
      return (
        <FormBoxButton
          name={component.name}
          title={component.title}
          submit={component.submit}
        />
      );
    } else {
      return <div>FormBoxComponent</div>;
    }
  };

  formControl = (control: any, component: any) => {
    return (
      <FormControl variant="standard">
        {/* <InputLabel htmlFor={component.name + "label"}>
          {component.title}
        </InputLabel> */}
        {control}
        <FormHelperText id={component.name + "helptext"}>
          {component.help}
        </FormHelperText>
      </FormControl>
    );
  };

  render() {
    let component = this.props.component;
    console.log("component:", component);
    let control = this.getComponent(component);
    let formControl = this.formControl(control, component);
    return formControl;
  }
}
