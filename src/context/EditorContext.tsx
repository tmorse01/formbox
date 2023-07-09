import React, { createContext, useState } from "react";
import { EditableComponents } from "../types/componentType";

type SelectedComponentContext = {
  selectedComponent: EditableComponents | null;
  handleComponentSelect: (component: EditableComponents) => void;
};

type EditableComponent = EditableComponents | null;

// Create the context
export const EditorContext = createContext<SelectedComponentContext>({
  selectedComponent: null,
  handleComponentSelect: () => {},
});

// Create a provider component
export const EditorProvider = ({ children }) => {
  const [selectedComponent, setSelectedComponent] =
    useState<EditableComponent>(null);

  return (
    <EditorContext.Provider
      value={{
        selectedComponent: selectedComponent,
        handleComponentSelect: setSelectedComponent,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
