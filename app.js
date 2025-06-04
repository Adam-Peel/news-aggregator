// Required packages / elements
const db = require("./db/connection");
const request = require("express");
const app = express();
app.use(express.json());

// CODE HERE

// EXPORTS
module.exports = { app };
