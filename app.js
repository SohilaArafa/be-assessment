require("dotenv").config();
const { signIn } = require("./Controllers/User/signIn");
const { register } = require("./Controllers/User/register");
const { verifyUser } = require("./Controllers/User/verfication");
const { postCheck } = require("./Controllers/Check/postCheck");
const { deleteCheck } = require("./Controllers/Check/deleteCheck");
const { updateCheck } = require("./Controllers/Check/updateCheck");
const {
  getCheckById,
  getCheckSByTag,
  getChecks,
} = require("./Controllers/Check/getCheck");
const {
  reportsByCheckId,
  reportsByTag,
} = require("./Controllers/Report/addReport");
const { deleteUser } = require("./Controllers/User/delete");
const {
  intiateContinuousCheck,
} = require("./Controllers/Check/checkFunctions");
const port = process.env.PORT;
const { verfication } = require("./Middleware/auth");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.json());

const databaseUrl = process.env.DATABASE_URL;

mongoose
  .connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
    app.listen(port, () => {
      console.log("server is running");
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

app.post("/register", register);
app.get("/verify/:verificationCode", verifyUser);
app.post("/signIn", signIn);
app.delete("/delete", deleteUser);
app.post("/postCheck", verfication, postCheck);
app.get("/checks", verfication, getChecks);
app.get("/check/:checkId", verfication, getCheckById);
app.delete("/check/:checkId", verfication, deleteCheck);
app.put("/check/:checkId", verfication, updateCheck);
app.get("/report/:checkId", verfication, reportsByCheckId);
app.get("/check/:tag", verfication, getCheckSByTag);
app.get("/reports/:tag", verfication, reportsByTag);

intiateContinuousCheck();


module.exports = app;
