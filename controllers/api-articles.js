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
    const articleId = Object.values(request.params);
    const article = await fetchSingleArticle(articleId);
    response.status(200).send(article);
  } catch (err) {
    next(err);
  }
}

async function patchArticleAPI(request, response, next) {
  try {
    const bodyToSend = structuredClone(request.body);
    const articleID = Object.values(request.params);
    bodyToSend.article_id = articleID[0];
    const patchedArticle = await patchArticleDB(bodyToSend);
    response.status(200).send(patchedArticle);
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllArticlesAPI, getSingleArticleAPI, patchArticleAPI };
