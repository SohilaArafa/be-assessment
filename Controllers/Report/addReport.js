const Check = require("../../Models/Check");
const { createReport } = require("./createReport");

const reportsByCheckId = async (req, res) => {
  const { user_id } = req.user;
  const checkId = req.params.checkId;

  const check = await Check.findOne({
    _id: checkId,
    user: user_id,
  });

  if (!check) {
    return res.status(400).send("Check not found");
  }

  const result = await createReport(check);
  return res.json(result);
};
const reportsByTag = async (req, res) => {
  const { user_id } = req.user;
  const reports = [];
  const checks = await Check.find({ user: user_id });
  if (!checks) {
    return res.status(400).send("Check not found");
  }
  for (let i = 0; i < checks.length; i++) {
    if (checks[i].tags.includes(req.params.tag)) {
      const result = await createReport(checks[i]);
      reports.push(result);
    }
  }
  return res.json(reports);
};

module.exports = {
  reportsByCheckId,
  reportsByTag,
};
