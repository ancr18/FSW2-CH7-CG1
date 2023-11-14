const request = require("supertest");
const app = require("../app");
// const baseURL = "http://localhost:8000"
const dotenv = require("dotenv");
dotenv.config();

// describe("Dog", () => {
//     it("should have name called 'Arnold'", () => {
//         const dog = new Dog("Arnold");

//         expect(dog).toHaveProperty("name", "Arnold");
//     });

//     it("should be able to bark and return 'Woof!'", () => {
//         const dog = new Dog("Arnold");
//         expect(dog.bark()).toEqual("Woof!");
//     });
// });

// describe("API get all cars", () => {
//     it("success get all data cars", (done) => {
//         request(app)
//             .get("/v1/cars")
//             .expect(200, done);
//     });
// });

describe("API get all cars", () => {
  it("success get all data cars", async () => {
    const response = await request(app).get("/v1/cars");
    expect(response.statusCode).toBe(200);
  });
  it("success get all data cars", async () => {
    const response = await request(app).get("/v1/cars");
    expect(response.statusCode).toBe(200);
  });
});

describe("API get car By ID", () => {
  it("success get data car", async () => {
    const response = await request(app).get("/v1/cars/20");
    expect(response.statusCode).toBe(200);
  });
  it("success get data car", async () => {
    const response = await request(app).get("/v1/cars/20");
    expect(response.statusCode).toBe(200);
  });
});
describe("API put car", () => {
  it("success update data car", async () => {
    const admin = {
      email: "john@binar.co.id",
      password: "12345678",
    };
    const check = await request(app).post("/v1/auth/login").send(admin);
    const res = JSON.parse(check.text);
    const token = res.accessToken;
    console.log(token);
    const car = {
      name: "Toyota 1",
      price: 3000000,
      size: "SMALL",
      image: "https://source.unsplash.com/527x527",
    };
    const response = await request(app)
      .put("/v1/cars/195")
      .set(`Authorization`, `Bearer ${token}`)
      .send(car);
    expect(response.statusCode).toBe(200);
  });

  it("failed update data car", async () => {
    const failedAdmin = {
      email: "john@binar.co.id",
      password: "12345675",
    };
    const check = await request(app).post("/v1/auth/login").send(failedAdmin);
    const res = JSON.parse(check.text);
    const failedToken = res.accessToken;
    console.log(failedToken);
    const failedCar = {
      name: "Toyota 1",
      price: 3000000,
      size: "SMALL",
      image: "https://source.unsplash.com/527x527",
    };
    const response = await request(app)
      .put("/v1/cars/198")
      .set(`Authorization`, `Bearer ${failedToken}`)
      .send(failedCar);
    expect(response.statusCode).toBe(401);
  });
});

describe("API insert rental data", () => {
  it("Success insert rental data", async () => {
    const user = {
      email: "fikri@binar.co.id",
      password: "123456",
    };

    const check = await request(app).post("/v1/auth/login").send(user);
    const res = JSON.parse(check.text);
    const token = res.accessToken;

    let date = new Date();

    const userCar = {
      userId: 1,
      carId: 3,
      rentStartedAt: date,
      rentEndedAt: date.setDate(date.getDate() + 3),
    };

    const response = await request(app)
      .post("/v1/cars/2/rent")
      .set(`Authorization`, `Bearer ${token}`)
      .send(userCar);
    expect(response.statusCode).toBe(201);
  });

  it("failed insert car data", async () => {
    const user = {
      email: "fikri@binar.co.id",
      password: "123455",
    };

    const check = await request(app).post("/v1/auth/login").send(user);
    const res = JSON.parse(check.text);
    const token = res.accessToken;

    let date = new Date();

    const userCar = {
      userId: 1,
      carId: 3,
      rentStartedAt: date,
      rentEndedAt: date,
    };

    const response = await request(app)
      .post("/v1/cars/2/rent")
      .set(`Authorization`, `Bearer ${token}`)
      .send(userCar);
    expect(response.statusCode).toBe(401);
  });
});
