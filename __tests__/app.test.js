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
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        body.topics.forEach((element) => {
          const { slug, description } = element;
          expect(typeof slug).toBe("string");
          expect(typeof description).toBe("string");
        });
      });
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

describe("GET /api/articles", () => {
  test.skip("200: Responds with an object listing all articles in desired format", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        body.topics.forEach((element) => {
          const {
            author,
            title,
            article_id,
            topic,
            created_at,
            votes,
            article_img_url,
            comment_count,
          } = element;
          expect(typeof author).toBe("string");
          expect(typeof title).toBe("string");
          expect(typeof article_id).toBe("number");
          expect(typeof topic).toBe("string");
          expect(new Date(created_at)).toBeInstanceOf(Date);
          expect(typeof votes).toBe("number");
          expect(typeof article_img_url).toBe("string");
          expect(typeof comment_count).toBe("string");
        });
      });
  });
});
