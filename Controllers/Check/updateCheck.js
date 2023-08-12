const Check = require("../../Models/Check");
const { intiateSingleContinousCheck } = require("./checkFunctions");
const { stopSingleContinousCheck } = require("./checkFunctions");

const updateCheck = async (req, res) => {
  const { user_id } = req.user;
  const check = await Check.findOne({
    _id: req.params.checkId,
    user: user_id,
  });
  if (!check) {
    return res.status(400).send("Check not found");
  }
  try {
    stopSingleContinousCheck(check);
    const newData = {};
    // add new data from the body to newData
    if (req.body.name) newData.name = req.body.name;
    if (req.body.url) newData.url = req.body.url;
    if (req.body.protocol) newData.protocol = req.body.protocol;
    if (req.body.path) newData.path = req.body.path;
    if (req.body.port) newData.port = req.body.port;
    if (req.body.webhook) newData.webhook = req.body.webhook;
    if (req.body.timeout) newData.timeout = req.body.timeout;
    if (req.body.interval) newData.interval = req.body.interval * 1000;
    if (req.body.threshold) newData.threshold = req.body.threshold;
    if (req.body.authentication)
      newData.authentication = req.body.authentication;
    if (req.body.httpHeaders) newData.httpHeaders = req.body.httpHeaders;
    if (req.body.assert) newData.assert = req.body.assert;
    if (req.body.tags) newData.tags = req.body.tags;
    if (req.body.ignoreSSL) newData.ignoreSSL = req.body.ignoreSSL;

    await check.updateOne({
      $set: newData,
    });

    res.json({ message: check.name + " updated" });
    intiateSingleContinousCheck(check);
  } catch (err) {
    res.json({ message: err });
  }
};

module.exports = {
  updateCheck,
};
