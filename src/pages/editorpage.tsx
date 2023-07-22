import { useCallback, useContext } from "react";
import { FormBoxContext } from "../formbuilder";
import { FormBoxPage } from ".";
import { EditableComponents } from "../types/componentType";
import { DndContext, DragEndEvent, closestCorners } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

type EditorPageProps = {};

const EditorPage: React.FC<EditorPageProps> = () => {
  const { formState, user, dispatchFormAction, setSnackbar } =
    useContext(FormBoxContext);
  console.log("formState", formState);

  const handleComponentSelect = (component: EditableComponents) => {
    console.log("handleComponentSelect", component);
  };
  const handleDragEnd = useCallback((e: DragEndEvent) => {
    console.log("handleDragEnd: ", e);
    const { active, over } = e;
    if (!over) return;
    const oldFormId = active.data.current?.sortable.containerId;
    const newFormId = over.data.current?.sortable.containerId;
    const formJSON = { ...formState.formJSON };
    if (formJSON.forms === undefined) return;
    const oldForm = formJSON.forms.find((form) => form.name === oldFormId);
    const newForm = formJSON.forms.find((form) => form.name === newFormId);

    const oldIndex = oldForm?.components.findIndex(
      (item) => item.name === active.id
    );
    const newIndex = newForm?.components.findIndex(
      (item) => item.name === over.id
    );
    console.log("condition", oldForm, oldIndex, newIndex);
    if (
      oldForm !== undefined &&
      oldIndex !== undefined &&
      newIndex !== undefined
    ) {
      const newSortedItems = arrayMove(oldForm.components, oldIndex, newIndex);
      console.log("newSortedItems: ", newSortedItems);
      oldForm.components = newSortedItems;
      dispatchFormAction({
        type: "update_formState",
        payload: {
          formState: {
            formJSON: formJSON,
            formName: formState.formName,
          },
        },
      });
    }
  }, []);
  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
      <FormBoxPage formState={formState} editable={true} />
    </DndContext>
  );
};

export default EditorPage;
