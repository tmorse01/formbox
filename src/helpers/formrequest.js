export function loadForm(form) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return fetch("http://localhost:3001/getForm?form=" + form, requestOptions)
    .then((res) => res.text())
    .then((res) => {
      const response = JSON.parse(res);
      // console.log("result from getForm api: ", response);
      return response.results;
    })
    .catch((res) => {
      console.error("error from getForm api: ", res);
      return undefined;
    });
}
