import FormBoxButton from "../components/button";
import FormBoxTextField from "../components/textfield";
import { componentProps, dispatchType } from "../types/componentType";

type CompProps = componentProps & dispatchType;

function FormBoxControl({
  name,
  title,
  type,
  required,
  value,
  submit,
  icon,
  dispatchFormAction,
}: CompProps) {
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
