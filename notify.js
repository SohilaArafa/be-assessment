const User = require("./Models/User");
const { mail } = require("./Controllers/Notifications/mail");
const { webhook } = require("./Controllers/Notifications/webhook");
const { pushOver } = require("./Controllers/Notifications/pushover");
const notify = async (check) => {
  const user = await User.findOne({ _id: check.user });
  console.log(user.email);
  if (user.email) {
    mail(user, check);
  }
  if (check.webhook) {
    webhook(user, check);
  }
  if (check.pushover) {
    pushOver(user, check);
  }
};

module.exports = notify;
