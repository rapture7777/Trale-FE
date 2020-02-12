import axios from 'axios';

export const postReq = (url, user_id, route_id, route_name) => {
  console.log(user_id, route_id, route_name);
  return axios
    .post(url, {
      user_id: user_id,
      routes_id: route_id,
      route_name: route_name
    })
    .then(res => res);
};
