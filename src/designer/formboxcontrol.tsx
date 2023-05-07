import {
  FormBoxTextField,
  FormBoxButton,
  FormBoxSelect,
  FormBoxCheckbox,
} from "../components";
import { CompProps } from "../types/componentType";

function FormBoxControl({ component }: CompProps) {
  const { name, title, help, type, required, defaultValue } = component;

  if (type === "textfield") {
    return (
      <FormBoxTextField
        name={name}
        title={title}
        help={help}
        required={required}
        defaultValue={defaultValue as string}
      />
    );
  } else if (type === "button") {
    return (
      <FormBoxButton
        name={name}
        title={title}
        submit={component.submit}
        icon={component.icon}
      />
    );
  } else if (type === "select") {
    return (
      <FormBoxSelect
        name={name}
        title={title}
        help={help}
        options={component.options}
        required={required}
        defaultValue={defaultValue as string}
      />
    );
  } else if (type === "checkbox") {
    return (
      <FormBoxCheckbox
        name={name}
        title={title}
        help={help}
        required={required}
        defaultValue={defaultValue as boolean}
      />
    );
  } else {
    return <div>FormBoxComponent</div>;
  }
}

export default FormBoxControl;
