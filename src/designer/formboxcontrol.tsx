import FormBoxButton from "../components/button";
import FormBoxTextField from "../components/textfield";
import { componentProps, dispatchType } from "../types/componentType";

type CompProps = { component: componentProps } & dispatchType;

function FormBoxControl({ component, dispatchFormAction }: CompProps) {
  const { name, title, type, value, required, submit, icon } = component;
  console.log("FormBoxcontrol: ", name);

  if (type === "textfield") {
    return (
      <FormBoxTextField
        name={name}
        title={title}
        required={required}
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
