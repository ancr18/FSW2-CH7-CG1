const request = require('supertest');
const app = require('../app')
const dotenv = require("dotenv");
dotenv.config();

describe("API Login", () => {
    it("success login", async () => {
        const user = {
            email: "fikri@binar.co.id",
            password: "123456"
        }
        const response = await request(app).post('/v1/auth/login').send(user)
        expect(response.statusCode).toBe(201);
    });

    it("failed login : wrong password", async () => {
        const failedUser = {
            email: "fikri@binar.co.id",
            password: "1234656"
        }
        const response = await request(app).post('/v1/auth/login').send(failedUser)
        expect(response.statusCode).toBe(401);
    });
});


describe("API Register", () => {
    it("success register", async () => {
      const user = {
        name: "membertest1",
        email: "membertest1@binar.co.id",
        password: "123456"
      };
      const response = await request(app).post('/v1/auth/register').send(user);
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("accessToken");
    });
  
    it("failed register: email already taken", async () => {
      const existingUser = {
        name: "membertest1",
        email: "membertest1@binar.co.id",
        password: "1234567"
      };
      const response = await request(app).post('/v1/auth/register').send(existingUser);
      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty("message", "Email already taken");
    });
  });
  