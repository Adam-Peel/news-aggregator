const { fetchAllArticlesDB } = require("../models/fetch-articles-db");

async function getAllArticlesAPI(request, response) {
  try {
    const articles = await fetchAllArticlesDB();
    //console.log(articles);
    response.status(200).send(articles);
  } catch (err) {
    response.status(500).send(err);
  }
}

module.exports = { getAllArticlesAPI };
