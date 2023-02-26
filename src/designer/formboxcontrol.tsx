import FormBoxButton from "../components/button";
import FormBoxTextField from "../components/textfield";
import { CompProps } from "../types/componentType";

function FormBoxControl({ component }: CompProps) {
  const { name, title, type, value, required, submit, icon } = component;

  if (type === "textfield") {
    return (
      <FormBoxTextField
        name={name}
        title={title}
        required={required}
        value={value}
      />
    );
  } else if (type === "button") {
    return (
      <FormBoxButton name={name} title={title} submit={submit} icon={icon} />
    );
  } else {
    return <div>FormBoxComponent</div>;
  }
}

export default FormBoxControl;
