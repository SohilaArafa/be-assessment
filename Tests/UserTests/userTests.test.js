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

  // it("Should return a 200 status code for valid credentials", async function () {
  //   this.timeout(5000);

  //   const res = await requestWithSupertest.post("/signIn").send({
  //     email: "example@gmail.com",
  //     password: "example@1234",
  //   });

  //   expect(res.statusCode).equal(200);
  // });
  // it("User sign up", async () => {
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

// describe("User Registration API", () => {
//   let sandbox;

//   before(() => {
//     sandbox = sinon.createSandbox();
//   });

//   after(() => {
//     sandbox.restore();
//   });

//   it("should return a 234 status code if email was already registered", async () => {
//     // Stub the User.findOne() method to simulate an already registered email
//     sandbox.stub(User, "register").resolves({ email: "example@gmail.com" });

//     const response = await request(app)
//       .post("/register")
//       .send({
//         email: "example@gmail.com",
//         password: "123",
//       });

//     expect(response.status).to.equal(234); // Check if the status code is 234
//   });
// });
