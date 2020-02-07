import axios from "axios";

export const getReq = url => {
  return axios
    .get(url, {
      headers: { "Content-Type": "application/json" }
    })
    .then(({ data }) => {
      return data;
    });
};
