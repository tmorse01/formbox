import { useReducer } from "react";

function createInitialFormState() {
  return {
    JSON: undefined,
    formName: undefined,
  };
}

function reducer(state, action) {
  switch (action.type) {
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
  JSON: undefined,
  formName: undefined,
};

export const useFormStateReducer = () => {
  return useReducer(reducer, initialState, createInitialFormState);
  //   return [ formState, dispatchFormAction ];
};
