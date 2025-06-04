const db = require("../db/connection.js");
const { fetchTopicsDB } = require("../models/index.js");

async function getTopicsAPI(request, response) {
  console.log("get Topics - controller");
  // await fetchTopicsDB(request);
}

module.exports = { getTopicsAPI };
