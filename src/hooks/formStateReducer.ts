import { useReducer } from "react";

function createInitialFormState() {
  return {
    formJSON: undefined,
    formName: undefined,
  };
}

function updateComponentByName({ formJSON, name, state }) {
  // console.log("updateComponentByName", { formJSON, name, state });
  if (formJSON.name === name) {
    return { ...formJSON, ...state };
  } else if (formJSON.forms?.length > 0) {
    formJSON.forms.forEach((form, i) => {
      if (form.name === name) {
        formJSON.forms[i] = { ...form, ...state };
        return;
      } else {
        updateComponentByName({ formJSON: form, name, state });
      }
    });
  } else if (formJSON.components?.length > 0) {
    formJSON.components.forEach((comp, j) => {
      if (comp.name === name) {
        formJSON.components[j] = { ...comp, ...state };
        return;
      }
    });
  }
}

function reducer(state, action) {
  // console.log("reducer: ", state, action);
  switch (action.type) {
    case "update_componentProp": {
      var formJSON = state.formJSON;
      updateComponentByName({
        formJSON: formJSON,
        name: action.payload.name,
        state: action.payload.state,
      });
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
    case "reset": {
      return {
        ...state,
        ...initialState,
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
