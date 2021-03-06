const axios = require('axios');

const ageValidation = value => {
  let dateNow = new Date(value).toISOString();
  let inputInMilliseconds = Date.parse(dateNow);
  const eighteenYearsInMilliseconds = 567993600000;
  let millisecondsNow = Date.now();
  const eighteenYearsAgo = millisecondsNow - eighteenYearsInMilliseconds;

  if (eighteenYearsAgo > inputInMilliseconds) return true;
  else return false;
};

const getTrails = () => {
  return axios
    .get('https://tralebackend.herokuapp.com/api/routes')
    .then(response => {
      return response.data.routes;
    });
};

module.exports = { ageValidation, getTrails };
