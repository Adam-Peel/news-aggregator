// Required packages / elements
const db = require("./db/connection");
const express = require("express");
const app = express();
app.use(express.json());
const { getAllTopicsAPI } = require("./controllers/api-topics");
const {
  getAllArticlesAPI,
  getSingleArticleAPI,
  patchArticleAPI,
} = require("./controllers/api-articles");
const {
  getSingleCommentsAPI,
  postSingleCommentAPI,
} = require("./controllers/api-comments");
const { getAllUsersAPI } = require("./controllers/api-users");
const { customErrors, genericError } = require("./errors");

// CODE HERE
app.get("/api/topics", getAllTopicsAPI);
app.get("/api/articles", getAllArticlesAPI);
app.get("/api/users", getAllUsersAPI);
app.get("/api/articles/:article_id", getSingleArticleAPI);
app.get("/api/articles/:article_id/comments", getSingleCommentsAPI);
app.post("/api/articles/:article_id/comments", postSingleCommentAPI);
app.patch("/api/articles/:article_id", patchArticleAPI);

// Error Handling
app.use(customErrors);
app.use(genericError);

// EXPORTS
module.exports = { app };
