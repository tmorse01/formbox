export function connectToDb() {
  fetch(process.env.REACT_APP_FORMBOX_API + "/connectToDb")
    .then((res) => res.text())
    .then((res) => console.log("result from connectToDb: ", res))
    .catch((res) => console.log("error from connectToDb: ", res));
}

export function disconnectDb() {
  fetch(process.env.REACT_APP_FORMBOX_API + "/disconnectDb")
    .then((res) => res.text())
    .then((res) => console.log("result from disconnectDb: ", res))
    .catch((res) => console.log("error from disconnectDb: ", res));
}

export function loadForm(form) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return fetch(
    process.env.REACT_APP_FORMBOX_API + "/getForm?form=" + form,
    requestOptions
  )
    .then((res) => res.text())
    .then((res) => {
      const response = JSON.parse(res);
      console.log("result from getForm api: ", response);
      return response;
    })
    .catch((res) => {
      console.error("error from getForm api: ", res);
      return undefined;
    });
}

export function getForms(username) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return fetch(
    process.env.REACT_APP_FORMBOX_API + "/getForms?username=" + username,
    requestOptions
  )
    .then((res) => res.text())
    .then((res) => {
      const response = JSON.parse(res);
      console.log("result from getForms api: ", response);
      return response.results;
    })
    .catch((res) => console.log("error from getForms api: ", res));
}

export function userSignup(values) {
  const body = {
    username: values.username,
    password: values.password,
  };
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  return fetch(process.env.REACT_APP_FORMBOX_API + "/signup", requestOptions)
    .then((res) => res.text())
    .then((res) => {
      console.log("result from signup api: ", res);
      return JSON.parse(res);
    })
    .catch((res) => console.log("error from signup api: ", res));
}
