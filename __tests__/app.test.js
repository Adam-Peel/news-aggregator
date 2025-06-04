const endpointsJson = require("../endpoints.json");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const request = require("supertest");
const { app } = require("../app");

/* Set up your beforeEach & afterAll functions here */
beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  db.end();
});

describe("GET /api/topics", () => {
  test("200: Responds with an object listing all topics in desired format", () => {
    return request(app).get("/api/topics").expect(200);
    // // .then(({ body: { endpoints } }) => {
    // //   expect(endpoints).toEqual(endpointsJson);
    // });
  });
  // test("200: Responds with an object detailing the documentation for each endpoint", () => {
  //   return request(app)
  //     .get("/api")
  //     .expect(200)
  //     .then(({ body: { endpoints } }) => {
  //       expect(endpoints).toEqual(endpointsJson);
  //     });
  // });
});
