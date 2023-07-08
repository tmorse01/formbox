import FormBoxButton from "../../components/general/button";
import FormBoxTextField from "../../components/data-input/textfield";
import { CompProps } from "../../types/componentType";

function FormBoxControl({ component, register, error }: CompProps) {
  const { name, title, help, type, required, submit, icon } = component;

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
      <FormBoxButton name={name} title={title} submit={submit} icon={icon} />
    );
  } else {
    return <div>FormBoxComponent</div>;
  }
}

export default FormBoxControl;
