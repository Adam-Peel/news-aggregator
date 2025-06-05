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

describe("GET /api/users", () => {
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
  test("200: Responds with an object listing all articles in desired format", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        body.articles.forEach((element) => {
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
          expect(votes).toBeOneOf([expect.any(Number), null]);
          expect(typeof article_img_url).toBe("string");
          expect(typeof comment_count).toBe("string");
        });
      });
  });
  test("Get single article - /api/articles/:id - 200: Responds with an object listing an article in desired format, where that article exists", () => {
    return request(app)
      .get("/api/articles/3")
      .expect(200)
      .then(({ body }) => {
        const {
          author,
          title,
          article_id,
          body: articleBody,
          topic,
          created_at,
          votes,
          article_img_url,
        } = body.article;
        expect(typeof author).toBe("string");
        expect(typeof title).toBe("string");
        expect(typeof article_id).toBe("number");
        expect(typeof articleBody).toBe("string");
        expect(typeof topic).toBe("string");
        expect(new Date(created_at)).toBeInstanceOf(Date);
        expect(votes).toBeOneOf([expect.any(Number), null]);
        expect(article_img_url).toBeOneOf([expect.any(String), null]);
      });
  });
  test("Get single article - /api/articles/:id - 404: Responds with error where that article does not exists", () => {
    return request(app)
      .get("/api/articles/3676")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toEqual("Item not found");
      });
  });
  test("Get single article - /api/articles/:id - 400: Responds with error where the input is not a valid 'type'", () => {
    return request(app)
      .get("/api/articles/abc")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toEqual("Invalid input");
      });
  });
});

describe("GET /api/users", () => {
  test("200: Responds with an object listing all users in desired format", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        body.users.forEach((element) => {
          const { username, name, avatar_url } = element;
          expect(typeof username).toBe("string");
          expect(typeof name).toBe("string");
          expect(avatar_url).toBeOneOf([expect.any(String), null]);
        });
      });
  });
});

describe("GET /api/articles/:id/comments", () => {
  test("Get single article comments - /api/articles/:id/comments - 200: Responds with desired output where the article exists", () => {
    return request(app)
      .get("/api/articles/3/comments")
      .expect(200)
      .then(({ body }) => {
        body.comments.forEach((element) => {
          const { comment_id, votes, created_at, author, body, article_id } =
            element;
          expect(typeof comment_id).toBe("number");
          expect(votes).toBeOneOf([expect.any(Number), null]);
          expect(new Date(created_at)).toBeInstanceOf(Date);
          expect(typeof author).toBe("string");
          expect(typeof body).toBe("string");
          expect(article_id).toEqual(3);
        });
      });
  });
  test("Get single article comments - /api/articles/:id/comments - 400: Responds with error where the input is not a valid 'type'", () => {
    return request(app)
      .get("/api/articles/abc/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toEqual("Invalid input");
      });
  });
  test("Get single article comments - /api/articles/:id/comments - 404: Responds with error where the article does not exist", () => {
    return request(app)
      .get("/api/articles/4567/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toEqual("Item not found");
      });
  });
});

describe.only("POST /api/articles/:article_id/comments", () => {
  test("Post single article comments - /api/articles/:id/comments - 201: Responds with desired output where the article and username exists", () => {
    const commentObj = { username: "lurker", body: "This is the comment" };
    return request(app)
      .post("/api/articles/3/comments")
      .send(commentObj)
      .expect(201)
      .then(({ body }) => {
        expect(body.body).toEqual("This is the comment");
      });
  });
  test("Post single article comments - /api/articles/:id/comments - 400: Responds with error where a necessary parameter is not included in the request", () => {
    const commentObj = { username: "lurker" };
    return request(app)
      .post("/api/articles/3/comments")
      .send(commentObj)
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toEqual(
          "At least one parameter missing or incorrect"
        );
      });
  });
  test("Post single article comments - /api/articles/:id/comments - 500: Responds with error where the username is not found", () => {
    const commentObj = {
      username: "laker",
      body: "This is yet another comment",
    };
    return request(app)
      .post("/api/articles/2/comments")
      .send(commentObj)
      .expect(500);
  });
  test("Post single article comments - /api/articles/:id/comments - 500: Responds with error where the article is not found", () => {
    const commentObj = {
      username: "lurker",
      body: "This is yet again another comment",
    };
    return request(app)
      .post("/api/articles/3434/comments")
      .send(commentObj)
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toEqual("Item not found");
      });
  });
});

describe.only("PATCH /api/articles/:article_id", () => {
  test("Patch the vote count for a single article - /api/articles/:id/comments - 200: Responds with the updated article", () => {
    const commentObj = { inc_votes: 1000 };
    return request(app)
      .patch("/api/articles/2")
      .send(commentObj)
      .expect(200)
      .then(({ body }) => {
        const {
          author,
          title,
          article_id,
          body: articleBody,
          topic,
          created_at,
          votes,
          article_img_url,
        } = body.article;
        expect(typeof author).toBe("string");
        expect(typeof title).toBe("string");
        expect(typeof article_id).toBe(2);
        expect(typeof articleBody).toBe("string");
        expect(typeof topic).toBe("string");
        expect(new Date(created_at)).toBeInstanceOf(Date);
        expect(votes).not.toBeLessThan(1000);
        expect(article_img_url).toBeOneOf([expect.any(String), null]);
      });
  });
});
