function apiRequest(endpoint, requestOptions) {
  return fetch(process.env.REACT_APP_FORMBOX_API + endpoint, requestOptions)
    .then((res) => {
      //handle errors
      if (res.status === 403) {
        throw new Error("Forbidden");
      }
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res;
    })
    .then((res) => {
      console.log("API request", { endpoint, requestOptions, res });
      return res;
    })
    .catch((res) =>
      console.error("API request ERROR", { endpoint, requestOptions, res })
    );
}

export function connectToDb() {
  return apiRequest("/connectToDb", undefined);
  // fetch(process.env.REACT_APP_FORMBOX_API + "/connectToDb")
  //   .then((res) => res.text())
  //   .then((res) => console.log("result from connectToDb: ", res))
  //   .catch((res) => console.log("error from connectToDb: ", res));
}

export function disconnectDb() {
  return apiRequest("/disconnectDb", undefined);
  // fetch(process.env.REACT_APP_FORMBOX_API + "/disconnectDb")
  //   .then((res) => res.text())
  //   .then((res) => console.log("result from disconnectDb: ", res))
  //   .catch((res) => console.log("error from disconnectDb: ", res));
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

export function getForms(token) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "BEARER " + token,
    },
  };
  return fetch(process.env.REACT_APP_FORMBOX_API + "/getForms", requestOptions)
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

export function login(values): Promise<any> {
  const body = {
    username: values.username,
    password: values.password,
  };
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  return apiRequest("/login", requestOptions);
  // return fetch(process.env.REACT_APP_FORMBOX_API + "/login", requestOptions)
  //   .then((res) => res.text())
  //   .then((res) => res)
  //   .catch((res) => console.log("error from login api: ", res));
}
