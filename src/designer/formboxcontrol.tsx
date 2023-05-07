import FormBoxButton from "../components/formboxbutton";
import FormBoxSelect from "../components/formboxselect";
import FormBoxSwitch from "../components/formboxswitch";
import FormBoxTextField from "../components/formboxtextfield";
import { CompProps } from "../types/componentType";

function FormBoxControl({ component, register, error }: CompProps) {
  const { name, title, help, type, required, defaultValue } = component;

  if (type === "textfield") {
    return (
      <FormBoxTextField
        name={name}
        title={title}
        help={help}
        required={required}
        register={register}
        error={error}
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
  } else if (type === "switch") {
    return (
      <FormBoxSwitch
        name={name}
        title={title}
        help={help}
        required={required}
        register={register}
        error={error}
        defaultValue={defaultValue as boolean}
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
        register={register}
        error={error}
        defaultValue={defaultValue as string}
      />
    );
  } else {
    return <div>FormBoxComponent</div>;
  }
}

export default FormBoxControl;
