function apiRequest({ endpoint, method, data = {} }) {
  const requestOptions = {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(process.env.REACT_APP_FORMBOX_API + endpoint, requestOptions)
    .then((res) => {
      console.log("fetch response: ", res);
      //handle errors
      if (res.status === 403) {
        throw new Error("Forbidden");
      }
      if (res.status === 400) {
        return res.json().then((data) => {
          throw new Error(data.error.message);
        });
      }
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((res) => {
      console.log("API request", { endpoint, requestOptions, res });
      return res;
    })
    .catch((error) => {
      console.error("API request ERROR", { endpoint, requestOptions, error });
      throw error;
    });
}

export function connectToDb() {
  return apiRequest({ endpoint: "/connectToDb", method: "POST" });
}

export function disconnectDb() {
  return apiRequest({ endpoint: "/disconnectDb", method: "POST" });
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

export async function userSignup(values) {
  try {
    const response = await apiRequest({
      endpoint: "/signup",
      method: "POST",
      data: {
        username: values.username,
        password: values.password,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export function login(values) {
  return apiRequest({
    endpoint: "/login",
    method: "POST",
    data: {
      username: values.username,
      password: values.password,
    },
  });
}

export function logout(username, refreshToken) {
  return apiRequest({
    endpoint: "/logout",
    method: "DELETE",
    data: {
      username: username,
      refreshToken: refreshToken,
    },
  });
}
