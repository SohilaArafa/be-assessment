const { describe, it, beforeEach, after } = require("mocha");
const sinon = require("sinon");
const { expect } = require("chai");
const User = require("../../Models/User");
const verify = require("../../Models/verify");
const transporter = require("../../nodemailer");
const { register } = require("../../Controllers/User/register");
const request = require("supertest");
const app = require("../../app");
const requestWithSupertest = request(app);

describe("User Registeration", () => {
  it("Should return a 400 status code for missing email or password", async () => {
    const res = await requestWithSupertest.post("/register").send({
      email: "example@gmail.com",
      password: "",
    });
    expect(res.statusCode).equal(400);
  });
});

describe("User SignIn", () => {
  it("Should return a 400 status code for missing email or password", async () => {
    const res = await requestWithSupertest.post("/signIn").send({
      email: "example@gmail.com",
      password: "",
    });
    expect(res.statusCode).equal(400);
  });

  // it("User Registeration", async () => {
  //   this.timeout(5000);

  //   const res = await requestWithSupertest.delete("/delete").send({
  //     email: "sohila@gmail.com",
  //     password: "sohila",
  //   });
  //   const res2 = await requestWithSupertest.post("/register").send({
  //     email: "sohila@gmail.com",
  //     password: "sohila",
  //   });
  //   expect(res2.statusCode).equal(200);
  // });
});
