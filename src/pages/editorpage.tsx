import { useContext } from "react";
import { FormBoxContext } from "../formbuilder";
import { FormBoxPage } from ".";
import { EditableComponents } from "../types/componentType";

type EditorPageProps = {};

const EditorPage: React.FC<EditorPageProps> = () => {
  const { formState, user, dispatchFormAction, setSnackbar } =
    useContext(FormBoxContext);
  console.log("formState", formState);

  const handleComponentSelect = (component: EditableComponents) => {
    console.log("handleComponentSelect", component);
  };
  return (
    <>
      <FormBoxPage formState={formState} editable={true} />
    </>
  );
};

export default EditorPage;
