const {
  fetchAllArticlesDB,
  fetchSingleArticle,
  patchArticleDB,
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
    const article = await fetchSingleArticle(request.params);
    response.status(200).send(article);
  } catch (err) {
    next(err);
  }
}

async function patchArticleAPI(request, response, next) {
  try {
    const bodyToSend = structuredClone(request.body);
    bodyToSend.article_id = request.params.article_id;
    const patchedArticle = await patchArticleDB(bodyToSend);
    response.status(200).send(patchedArticle);
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllArticlesAPI, getSingleArticleAPI, patchArticleAPI };
