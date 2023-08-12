const Check = require("../../Models/Check");

const getCheckById = async (req, res) => {
  const { user_id } = req.user;
  console.log(user_id);
  console.log(req.params.checkId);
  const check = await Check.findOne({
    _id: req.params.checkId,
    user: user_id,
  });

  if (!check) {
    return res.status(400).send("Check not found");
  }
  res.json(check);
};

const getCheckSByTag = async (req, res) => {
  const { user_id } = req.user;
  result = [];
  const checks = await Check.find({
    user: user_id,
  });
  for (let i = 0; i < checks.length; i++) {
    if (checks[i].tags.includes(req.params.tag)) {
      result.push(checks[i]);
    }
  }
  if (!checks) {
    return res.status(400).send("Check not found");
  }
  res.json(result);
};

const getChecks = async (req, res) => {
  const { user_id } = req.user;
  const checks = await Check.find({
    user: user_id,
  });
  if (!checks) {
    return res.status(400).send("No checks were found");
  }
  return res.json(checks);
};

module.exports = {
  getCheckById,
  getCheckSByTag,
  getChecks,
};
