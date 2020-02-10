import axios from "axios";

export const getReq = (url, body) => {
  if (!body) {
    return axios
      .get(url, {
        headers: { "Content-Type": "application/json" }
      })
      .then(({ data }) => {
        return data;
      });
  } else {
    return axios.patch(url, body).then(req => req);
  }
};
