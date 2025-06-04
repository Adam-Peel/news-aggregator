const { fetchAllArticlesDB } = require("../models/fetch-articles-db");

async function getAllArticlesAPI(request, response) {
  console.log("getArticlesAPI <- controller");
  try {
    const articles = await fetchAllArticlesDB();
    response.status(200).send(articles);
  } catch (err) {
    response.status(500).send(err);
  }
}

module.exports = { getAllArticlesAPI };
