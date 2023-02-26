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
