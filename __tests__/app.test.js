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

// describe("GET /api", () => {
//   test("200: Responds with an object detailing the documentation for each endpoint", () => {
//     return request(app)
//       .get("/api")
//       .expect(200)
//       .then(({ body: { endpoints } }) => {
//         expect(endpoints).toEqual(endpointsJson);
//       });
//   });
// });

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
});

describe.only("GET /api/articles/search", () => {
  test("200: Responds with an object listing all articles in desired format", () => {
    return request(app)
      .get("/api/articles/search/mitch")
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
  test("200: Responds with an object listing all articles in desired format where a sorting query is used, but not specified, in this case defaulting to the created_at", () => {
    return request(app)
      .get("/api/articles?sort")
      .expect(200)
      .then(({ body }) => {
        let dateCheck = new Date(body.articles[0].created_at).getTime();
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
          expect(new Date(created_at).getTime()).toBeLessThanOrEqual(dateCheck);
          dateCheck = new Date(created_at).getTime();
        });
      });
  });
  test("200: Responds with an object listing all articles in desired format where a created_at sorting query is used", () => {
    return request(app)
      .get("/api/articles?sort=created_at:asc")
      .expect(200)
      .then(({ body }) => {
        let dateCheck = new Date(body.articles[0].created_at).getTime();
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
          expect(new Date(created_at).getTime()).toBeGreaterThanOrEqual(
            dateCheck
          );
          dateCheck = new Date(created_at).getTime();
        });
      });
  });
  test("200: Responds with an object listing all articles in desired format where a votes sorting query is used", () => {
    return request(app)
      .get("/api/articles?sort=votes:asc")
      .expect(200)
      .then(({ body }) => {
        let voteCheck = body.articles[0].votes;
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
          expect(votes).toBeGreaterThanOrEqual(voteCheck);
          voteCheck = votes;
        });
      });
  });
  test("400: Responds with an error when sort request is not in desired format where a sorting query is used", () => {
    return request(app)
      .get("/api/articles?sort=wrong_input:asc")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toEqual("Invalid input");
      });
  });
  test("400: Responds with an error when sort request is not in desired format where a sorting query is used", () => {
    return request(app)
      .get("/api/articles?sort=created_at:up")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toEqual("Invalid input");
      });
  });
  // TODO
  test("200: Responds with an object listing all articles in desired format where a topic filter is used but no topic specified", () => {
    return request(app)
      .get("/api/articles?topic=")
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
  test("200: Responds with an object listing all articles in desired format where a topic filter is used and specified", () => {
    return request(app)
      .get("/api/articles?topic=cats")
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
          expect(topic).toBe("cats");
          expect(new Date(created_at)).toBeInstanceOf(Date);
          expect(votes).toBeOneOf([expect.any(Number), null]);
          expect(typeof article_img_url).toBe("string");
          expect(typeof comment_count).toBe("string");
        });
      });
  });
  test("404: Responds with a 404 error where a topic filter is used and specified, but is not a valid topic", () => {
    return request(app)
      .get("/api/articles?topic=platypussycats")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toEqual("Item not found");
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
        comment_count,
      } = body.article;
      expect(typeof author).toBe("string");
      expect(typeof title).toBe("string");
      expect(typeof article_id).toBe("number");
      expect(typeof articleBody).toBe("string");
      expect(typeof topic).toBe("string");
      expect(typeof comment_count).toBe("number");
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

describe("POST /api/articles/:article_id/comments", () => {
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

describe("PATCH /api/articles/:article_id", () => {
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
        expect(article_id).toBe(2);
        expect(typeof articleBody).toBe("string");
        expect(typeof topic).toBe("string");
        expect(new Date(created_at)).toBeInstanceOf(Date);
        expect(votes).not.toBeLessThan(1000);
        expect(article_img_url).toBeOneOf([expect.any(String), null]);
      });
  });
  test("Patch the vote count for a single article - /api/articles/:id/comments - 200: Responds with the updated article where the vote count is negative", () => {
    const commentObj = { inc_votes: -1000 };
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
        expect(article_id).toBe(2);
        expect(typeof articleBody).toBe("string");
        expect(typeof topic).toBe("string");
        expect(new Date(created_at)).toBeInstanceOf(Date);
        expect(votes).toBeLessThan(-900);
        expect(article_img_url).toBeOneOf([expect.any(String), null]);
      });
  });
  test("Patch the vote count for a single article - /api/articles/:id/comments - 404: Responds with error where the article does not exist", () => {
    const commentObj = { inc_votes: 1000 };
    return request(app)
      .patch("/api/articles/5675")
      .send(commentObj)
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toEqual("Item not found");
      });
  });
  test("Patch the vote count for a single article - /api/articles/:id/comments - 400: Responds with error where the article request is NaN", () => {
    const commentObj = { inc_votes: 1000 };
    return request(app)
      .patch("/api/articles/def")
      .send(commentObj)
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toEqual("Invalid input");
      });
  });
  test("Patch the vote count for a single article - /api/articles/:id/comments - 400: Responds with error where the vote_count is NaN", () => {
    const commentObj = { inc_votes: "abc" };
    return request(app)
      .patch("/api/articles/2")
      .send(commentObj)
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toEqual("Invalid input");
      });
  });
});

describe("/api/comments", () => {
  test("GET /api/comments - 200: Responds with an object of all comments", () => {
    return request(app)
      .get("/api/comments")
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
          expect(typeof article_id).toBe("number");
        });
      });
  });
  test("DELETE /api/comments/:comment_id - 404: Responds with error where the comment does not exist", () => {
    return request(app)
      .delete("/api/comments/3432")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toEqual("Item not found");
      });
  });
  test("DELETE /api/comments/:comment_id - 400: Responds with error where the parameter is NaN", () => {
    return request(app)
      .delete("/api/comments/qwerty")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toEqual("Invalid input");
      });
  });
  test("DELETE /api/comments/:comment_id - 204: Responds with 204 status where a comment is successfully delete", () => {
    return request(app).delete("/api/comments/3").expect(204);
  });
});
