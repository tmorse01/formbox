type FetchOptions = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  credentials?: "omit" | "same-origin" | "include";
  headers?: Record<string, string>;
  body?: string | FormData;
};

type apiRequestParams = {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  credentials?: "omit" | "same-origin" | "include";
  data?: object | undefined;
  token?: string | undefined;
};
const maxRetries = 3;
let retryCount = 0;

function apiRequest({
  endpoint,
  method,
  credentials,
  data,
  token,
}: apiRequestParams) {
  const requestOptions: FetchOptions = {
    method,
    credentials,
    headers: {
      "Content-Type": "application/json",
      ...(token !== undefined && { Authorization: "BEARER " + token }), // if auth is needed add auth header token
    },
    ...(data !== undefined && { body: JSON.stringify(data) }), // if request has data / body attached
  };
  console.log("API REQUEST", {
    endpoint,
    method,
    credentials,
    data,
    token,
    requestOptions,
  });
  return fetch(process.env.REACT_APP_FORMBOX_API + endpoint, requestOptions)
    .then((res) => {
      //handle errors
      if (res.status === 403) {
        throw new Error("Forbidden");
      } else if (res.status === 404) {
        throw new Error("Not found");
      }
      if (res.status === 400) {
        return res.json().then((data) => {
          throw new Error(data.error.message);
        });
      }
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      // retryCount = 0;
      return res.json();
    })
    .then((res) => {
      console.log("API request 2nd then", {
        endpoint,
        requestOptions,
        res,
        token,
      });
      // TODO figure out how to set the token returned from the new one generated when a request fails
      // const currentToken = sessionStorage.getItem("token");
      // if (currentToken !== null && currentToken !== token) {
      //   console.log("current token !== token", currentToken, token);
      //   return { results: res.results, token: token };
      // }
      return res;
    })
    .catch((error) => {
      console.error("API request ERROR", { endpoint, requestOptions, error });
      if (error.message === "Forbidden") {
        // invalid token, generate new token and retry request
        if (retryCount < maxRetries) {
          retryCount++;
          return generateAccessToken()
            .then((res) => {
              const newToken = res.token;
              retryCount++;
              return apiRequest({
                endpoint,
                method,
                credentials,
                data,
                token: newToken,
              });
            })
            .catch((e) => {
              console.error("Error generating new access token ", e);
              throw e;
            });
        }
      } else {
        throw error;
      }
    });
}

export function connectToDb() {
  return apiRequest({ endpoint: "/connectToDb", method: "POST" });
}

export function disconnectDb() {
  return apiRequest({ endpoint: "/disconnectDb", method: "POST" });
}

export function generateAccessToken() {
  return apiRequest({
    endpoint: "/generate-access-token",
    method: "POST",
    credentials: "include",
  });
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
  return apiRequest({
    endpoint: "/getForms",
    method: "GET",
    token: token,
  });
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

export function logout() {
  return apiRequest({
    endpoint: "/logout",
    method: "DELETE",
    credentials: "include",
  });
}

export function setRefreshToken(refreshToken) {
  return apiRequest({
    endpoint: "/set-refresh-token",
    method: "POST",
    credentials: "include",
    data: {
      refreshToken,
    },
  });
}
