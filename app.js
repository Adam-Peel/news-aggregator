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
const { getAllUsersAPI } = require("./controllers/get-api-users");

// CODE HERE
app.get("/api/topics", getAllTopicsAPI);
app.get("/api/articles", getAllArticlesAPI);
app.get("/api/users", getAllUsersAPI);
app.get("/api/articles/:id", getSingleArticleAPI);

// Error Handling
app.use((err, request, response, next) => {
  if (err.status) {
    response.status(err.status).send({ message: err.message });
  } else {
    next(err);
  }
});

app.use((err, request, response, next) => {
  console.error(err);
  response.status(500).send({ message: "Unclassified error" });
});

// EXPORTS
module.exports = { app };
