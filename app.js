// Required packages / elements
const db = require("./db/connection");
const express = require("express");
const app = express();
app.use(express.json());
const { getAllTopicsAPI } = require("./controllers/get-api-topics");
const {
  getAllArticlesAPI,
  getSingleArticleAPI,
} = require("./controllers/get-api-articles");
const { getSingleCommentsAPI } = require("./controllers/get-api-comments");
const { getAllUsersAPI } = require("./controllers/get-api-users");
const { customErrors, genericError } = require("./errors");

// CODE HERE
app.get("/api/topics", getAllTopicsAPI);
app.get("/api/articles", getAllArticlesAPI);
app.get("/api/users", getAllUsersAPI);
app.get("/api/articles/:id", getSingleArticleAPI);
app.get("/api/articles/:id/comments", getSingleCommentsAPI);

// Error Handling
app.use(customErrors);
app.use(genericError);

// EXPORTS
module.exports = { app };
