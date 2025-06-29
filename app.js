// Required packages / elements
const db = require("./db/connection");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
const { getAllTopicsAPI } = require("./controllers/api-topics");
const {
  getAllArticlesAPI,
  getSingleArticleAPI,
  patchArticleAPI,
  searchAllArticlesAPI,
} = require("./controllers/api-articles");
const { getEndpoints } = require("./controllers/api-endpoints");
const {
  getAllCommentsAPI,
  getSingleCommentsAPI,
  postSingleCommentAPI,
  deleteCommentAPI,
} = require("./controllers/api-comments");
const { getAllUsersAPI } = require("./controllers/api-users");
const { customErrors, genericError } = require("./errors");

// CODE HERE
app.get("/api", (request, response) => {
  response.status(200).sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/api/articles/search/:keywords", searchAllArticlesAPI);
app.get("/api/topics", getAllTopicsAPI);
app.get("/api/articles", getAllArticlesAPI);
app.get("/api/users", getAllUsersAPI);
app.get("/api/comments", getAllCommentsAPI);
app.get("/api/articles/:article_id", getSingleArticleAPI);
app.get("/api/articles/:article_id/comments", getSingleCommentsAPI);
app.post("/api/articles/:article_id/comments", postSingleCommentAPI);
app.patch("/api/articles/:article_id", patchArticleAPI);
app.delete("/api/comments/:comment_id", deleteCommentAPI);

// Error Handling
app.use(customErrors);
app.use(genericError);

// EXPORTS
module.exports = { app };
