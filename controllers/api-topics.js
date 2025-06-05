const { fetchAllTopicsDB } = require("../models/fetch-topics-db.js");

async function getAllTopicsAPI(request, response, next) {
  try {
    const topics = await fetchAllTopicsDB();
    response.status(200).send({ topics });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllTopicsAPI };
