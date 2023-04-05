const axios = require("axios");
export function GetApi(path) {
  let token = localStorage.getItem("opad_token");
  let headers = { Authorization: token, "Content-Type": "application/json" };
  const GetApiData = axios
    .get(path, { headers: headers })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response.data.message === "The session has Expired. Please log in again!") {
        localStorage.removeItem("opad_token");
        window.location.href = "/";
      }
      console.log(error);
      return error.response;
    });
  return GetApiData;
}

export function PostApi(path, body) {
  let tokenData;
  if (localStorage.getItem("opad_token")) {
    tokenData = "Bearer " + localStorage.getItem("opad_token");
  } else {
    tokenData = "";
  }
  let headers = { device: "0", Authorization: tokenData };
  const PostApiData = axios
    .post(path, body, { headers: headers })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response.data.message === "The session has Expired. Please log in again!") {
        localStorage.removeItem("opad_token");
        window.location.href = "/";
      }
      return error.response;
    });

  return PostApiData;
}
