import { FormControl, FormHelperText } from "@mui/material";
import FormBoxButton from "../components/button";
import FormBoxTextField from "../components/textfield";
import { componentProps } from "../types/componentType";

type CompProps = {
  key: number;
  component: componentProps;
  onChange: ({ name, value }) => void;
};

const FormBoxComponent = (props: CompProps) => {
  function onChange(e: any) {
    let component = props.component;
    let value = e.target.value;
    props.onChange({ name: component.name, value: value });
  }

  function getComponent(component: any) {
    if (component.type === "textfield") {
      return (
        <FormBoxTextField
          name={component.name}
          title={component.title}
          required={component.required}
          onChange={onChange}
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
  }

  function getFormControl(control: any, component: any) {
    return (
      <FormControl variant="standard">
        {control}
        <FormHelperText id={component.name + "helptext"}>
          {component.help}
        </FormHelperText>
      </FormControl>
    );
  }

  let component = props.component;
  // console.log("component:", this);
  let control = getComponent(component);
  let componentObject = getFormControl(control, component);
  return componentObject;
};

export default FormBoxComponent;
