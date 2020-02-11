import axios from "axios";

export const postReq = (url, user_id, route_id) => {
  axios
    .post(url, {
      user_id,
      route_id,
      route_name
    })
    .then(res => res);
};
