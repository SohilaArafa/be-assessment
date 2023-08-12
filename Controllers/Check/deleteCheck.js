const Check = require("../../Models/Check");
const Report = require("../../Models/Report");
const { stopSingleContinousCheck } = require("./checkFunctions");

const deleteCheck = async (req, res) => {
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
    //delete reports for this check
    await Report.deleteMany({
      check: check._id,
    });
    await check.deleteOne();
    res.status(200).send("Deleted successfully");
  } catch (err) {
    res.json({ message: "error" + err });
  }
};

module.exports = {
  deleteCheck,
};
