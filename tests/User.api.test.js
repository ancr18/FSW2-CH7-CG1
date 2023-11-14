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
    const request = require("supertest");
    const dotenv = require("dotenv");
    const app = require("../app");

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
        const response = await request(app)
          .post("/v1/auth/login")
          .send(failedUser);
        expect(response.statusCode).toBe(401);
      });
    });

    describe("API Register", () => {
      it("success register", async () => {
        const user = {
          name: "membertest4",
          email: "membertest4@binar.co.id",
          password: "123456",
        };
        const response = await request(app)
          .post("/v1/auth/register")
          .send(user);
        expect(response.statusCode).toBe(201);
      });

      it("failed register: email already taken", async () => {
        const existingUser = {
          name: "membertest4",
          email: "membertest4@binar.co.id",
          password: "1234567",
        };
        const response = await request(app)
          .post("/v1/auth/register")
          .send(existingUser);
        expect(response.statusCode).toBe(500);
      });
    });

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
