const { axios } = require("axios");

const webhook = (user, check) => {
  axios
    .post(check.webhook, {
      checkName: check.name,
      checkId: check._id,
      checkUrl: check.url,
    })
    .then((res) => {
      console.log(`statusCode: ${res.statusCode}`);
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
};
module.exports = {
  webhook,
};
