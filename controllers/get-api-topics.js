const db = require("../db/connection.js");
const { fetchTopicsDB } = require("../models/fetch-topics-db.js");

async function getTopicsAPI(request, response) {
  console.log("get Topics - controller");
  try {
    const topics = await fetchTopicsDB();
    console.log(topics);
    response.status(200).send(topics);
  } catch (err) {
    response.status(500).send(err);
  }
}

module.exports = { getTopicsAPI };
