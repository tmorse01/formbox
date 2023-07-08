import { TextField, Select, Checkbox } from "../data-input";
import { Button } from "../general";
import { CompProps } from "../../types/componentType";

const Control = ({ component }: CompProps) => {
  const { name, title, help, type, required, defaultValue } = component;

  if (type === "textfield") {
    return (
      <TextField
        name={name}
        title={title}
        help={help}
        required={required}
        defaultValue={defaultValue as string}
      />
    );
  } else if (type === "button") {
    return (
      <Button
        name={name}
        title={title}
        submit={component.submit}
        icon={component.icon}
      />
    );
  } else if (type === "select") {
    return (
      <Select
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
      <Checkbox
        name={name}
        title={title}
        help={help}
        required={required}
        defaultValue={defaultValue as boolean}
      />
    );
  } else {
    return <div>Undefined component type</div>;
  }
};

export default Control;
