const request = require("supertest");
const app = require("../app");
const dotenv = require("dotenv");
dotenv.config();

describe("API Login", () => {
  it("success login", async () => {
    const user = {
      email: "fikri@binar.co.id",
      password: "123456",
    };
    const response = await request(app).post("/v1/auth/login").send(user);
    expect(response.statusCode).toBe(201);
  });

  it("failed login : wrong password", async () => {
    const failedUser = {
      email: "fikri@binar.co.id",
      password: "1234656",
    };
    const response = await request(app).post("/v1/auth/login").send(failedUser);
    expect(response.statusCode).toBe(401);
  });
});

// Fajrin
// 2. /v1/auth/whoami: Test Success & Error

describe("API WHOAMI", () => {
  it("success whoami", async () => {
    const user = {
      email: "fikri@binar.co.id",
      password: "123456",
    };
    const check = await request(app).post("/v1/auth/login").send(user);
    const res = JSON.parse(check.text);
    const token = res.accessToken;

    const response = await request(app)
      .get("/v1/auth/whoami")
      .set(`Authorization`, `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });

  it("failed whoami", async () => {
    const failedUser = {
      email: "peter@binar.co.id",
      password: "123456",
    };
    const check = await request(app).post("/v1/auth/login").send(failedUser);
    const res = JSON.parse(check.text);
    const failedToken = res.accessToken;
    const response = await request(app)
      .get("/v1/auth/whoami")
      .set(`Authorization`, `Bearer ${failedToken}`);
    expect(response.statusCode).toBe(401);
  });
});
