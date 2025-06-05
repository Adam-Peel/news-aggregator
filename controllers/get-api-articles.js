const {
  fetchAllArticlesDB,
  fetchSingleArticle,
} = require("../models/fetch-articles-db");

async function getAllArticlesAPI(request, response, next) {
  try {
    const articles = await fetchAllArticlesDB();
    response.status(200).send(articles);
  } catch (err) {
    next(err);
  }
}

async function getSingleArticleAPI(request, response, next) {
  try {
    const articleId = Object.values(request.params);
    const article = await fetchSingleArticle(articleId);
    response.status(200).send(article);
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllArticlesAPI, getSingleArticleAPI };
