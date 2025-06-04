const { fetchAllTopicsDB } = require("../models/fetch-topics-db.js");

async function getAllTopicsAPI(request, response) {
  try {
    const topics = await fetchAllTopicsDB();
    response.status(200).send({ topics });
  } catch (err) {
    response.status(500).send(err);
  }
}

module.exports = { getAllTopicsAPI };
