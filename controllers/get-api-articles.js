const {
  fetchAllArticlesDB,
  fetchSingleArticle,
} = require("../models/fetch-articles-db");

async function getAllArticlesAPI(request, response) {
  try {
    const articles = await fetchAllArticlesDB();
    response.status(200).send(articles);
  } catch (err) {
    response.status(500).send(err);
  }
}

async function getSingleArticleAPI(request, response) {
  try {
    const articleId = Object.values(request.params);
    const article = await fetchSingleArticle(articleId);
    response.status(200).send(article);
  } catch (err) {
    response.status(404).send(err);
  }
}

module.exports = { getAllArticlesAPI, getSingleArticleAPI };
