const request = require("supertest")
const app = require("../app")
// const baseURL = "http://localhost:8000"
const dotenv = require("dotenv")
dotenv.config()

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
    const response = await request(app).get("/v1/cars")
    expect(response.statusCode).toBe(200)
  })
})

describe("API get car By ID", () => {
  it("success get data car", async () => {
    const response = await request(app).get("/v1/cars/20")
    expect(response.statusCode).toBe(200)
  })
})

// created by R
describe("API Create Car", () => {
  it("success create car", async () => {
    const admin = {
      email: "ancr@binar.co.id",
      password: "123456",
    }
    const check = await request(app).post("/v1/auth/login").send(admin)
    const res = JSON.parse(check.text)
    const token = res.accessToken
    const car = {
      name: "Mustang GT",
      price: 2000,
      size: "SMALL",
      image:
        "https://tse2.mm.bing.net/th?id=OIP.U2iQ7wNK6ZzTW_traW_-PQHaHa&pid=Api&P=0&h=180",
      isCurrentlyRented: false,
    }

    const response = await request(app)
      .post("/v1/cars")
      .set(`Authorization`, `Bearer ${token}`)
      .send(car)

    expect(response.statusCode).toBe(201)
  })

  it("failed create car : Access forbidden", async () => {
    const admin = {
      email: "fikri@binar.co.id",
      password: "123456",
    }
    const check = await request(app).post("/v1/auth/login").send(admin)
    const res = JSON.parse(check.text)
    const token = res.accessToken
    const car = {
      name: "Mustang GT",
      price: 2000,
      size: "SMALL",
      image:
        "https://tse2.mm.bing.net/th?id=OIP.U2iQ7wNK6ZzTW_traW_-PQHaHa&pid=Api&P=0&h=180",
      isCurrentlyRented: false,
    }
    const response = await request(app)
      .post("/v1/cars")
      .set(`Authorization`, `Bearer ${token}`)
      .send(car)

    expect(response.statusCode).toBe(401)
  })
})
