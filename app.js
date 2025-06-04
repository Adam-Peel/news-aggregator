// Required packages / elements
const db = require("./db/connection");
const express = require("express");
const app = express();
app.use(express.json());
const { getAllTopicsAPI } = require("./controllers/get-api-topics");
const { getAllArticlesAPI } = require("./controllers/get-api-articles");

// CODE HERE
app.get("/api/topics", getAllTopicsAPI);
app.get("/api/articles", getAllArticlesAPI);

// EXPORTS
module.exports = { app };
