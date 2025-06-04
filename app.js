// Required packages / elements
const db = require("./db/connection");
const express = require("express");
const app = express();
app.use(express.json());
const { getTopicsAPI } = require("./controllers/get-api-topics");

// CODE HERE
// app.get("/api/topics", async (request, response) => {
//   try {
//     const { rows } = await db.query(`SELECT * FROM topics`);
//     console.log(rows);
//     response.status(200).send(rows);
//   } catch (err) {
//     response.status(500).send(err);
//   }
// });

app.get("/api/topics", getTopicsAPI);

// EXPORTS
module.exports = { app };
