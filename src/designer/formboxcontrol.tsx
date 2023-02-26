import FormBoxButton from "../components/button";
import FormBoxTextField from "../components/textfield";
import {
  CompProps,
  componentProps,
  dispatchType,
} from "../types/componentType";

function FormBoxControl({ component, error, dispatchFormAction }: CompProps) {
  const { name, title, type, value, required, submit, icon } = component;

  if (type === "textfield") {
    return (
      <FormBoxTextField
        name={name}
        title={title}
        required={required}
        error={error}
        dispatchFormAction={dispatchFormAction}
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
