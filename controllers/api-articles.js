const {
  fetchAllArticlesDB,
  fetchSingleArticle,
  patchArticleDB,
} = require("../models/fetch-articles-db");
const { isStringANumber } = require("../app-utils.js");

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
    await isStringANumber(request.params.article_id);
  } catch (err) {
    next(err);
  }
  try {
    const article = await fetchSingleArticle(request.params);
    response.status(200).send(article);
  } catch (err) {
    next(err);
  }
}

async function patchArticleAPI(request, response, next) {
  try {
    await isStringANumber(request.params.article_id);
  } catch (err) {
    next(err);
  }
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
