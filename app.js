// Required packages / elements
const db = require("./db/connection");
const express = require("express");
const app = express();
app.use(express.json());
const { getTopicsAPI } = require("./controllers/get-api-topics");

// CODE HERE
app.get("/api/topics", getTopicsAPI);

// EXPORTS
module.exports = { app };
