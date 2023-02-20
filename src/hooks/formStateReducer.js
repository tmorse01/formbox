import { useReducer } from "react";

function createInitialFormState() {
  return {
    formJSON: undefined,
    formName: undefined,
  };
}

function updateComponentByName({ formJSON, name, state }) {
  console.log("updateComponentByName", { formJSON, name, state });
  if (formJSON.name === name) {
    return { ...formJSON, ...state };
  } else if (formJSON.forms?.length > 0) {
    var forms = formJSON.forms;
    for (var i = 0; i < forms.length; i++) {
      var form = forms[i];
      if (form.name === name) {
        forms[i] = { ...form, ...state };
        return;
      } else {
        updateComponentByName({ formJSON: form, name, state });
      }
    }
  } else if (formJSON.components?.length > 0) {
    var components = formJSON.components;
    for (var i = 0; i < components.length; i++) {
      var comp = components[i];
      if (comp.name === name) {
        components[i] = { ...comp, ...state };
        console.log("found component :", components[i]);
        return;
      }
    }
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "update_componentProp": {
      var formJSON = state.formJSON;
      updateComponentByName({
        formJSON: formJSON,
        name: action.payload.name,
        state: action.payload.state,
      });
      console.log("after comp update:", formJSON);
      return { ...state, formJSON: formJSON };
    }
    case "update_formName": {
      return {
        ...state,
        formName: action.payload.formName,
      };
    }
    case "update_JSON": {
      return {
        ...state,
        formJSON: action.payload.formJSON,
      };
    }
    case "update_formState": {
      return {
        ...state,
        ...action.payload.formState,
      };
    }
    default: {
      console.error("Unknown action:", action);
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialState = {
  formJSON: undefined,
  formName: undefined,
};

export const useFormStateReducer = () => {
  return useReducer(reducer, initialState, createInitialFormState);
};
