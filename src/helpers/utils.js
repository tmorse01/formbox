export function flattenFormJSON(formJSON, arrayOfObjects = []) {
  if (formJSON !== undefined) {
    arrayOfObjects.push(formJSON);
    if (formJSON.forms?.length > 0) {
      formJSON.forms.forEach((form) => flattenFormJSON(form, arrayOfObjects));
    } else if (formJSON.components?.length > 0) {
      formJSON.components.forEach((comp) => arrayOfObjects.push(comp));
    }
  }
  return arrayOfObjects;
}

export function isEmptyValue(value) {
  if (value === "" || value === undefined || value === null) return true;
  else return false;
}

export function processValues(formState) {
  const objects = flattenFormJSON(formState.formJSON);
  const values = {};
  const errors = {};
  objects.forEach((object) => {
    if (object.required === true && isEmptyValue(object.value)) {
      errors[object.name] = {
        message: object.title + " is required.",
      };
    } else if (object.value !== undefined) {
      values[object.name] = object.value;
    }
  });
  return { formName: formState.formName, values, errors };
}
