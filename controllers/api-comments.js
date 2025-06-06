const {
  fetchSingleCommentsDB,
  postSingleCommentDB,
} = require("../models/fetch-comments-db");
const { fetchSingleArticle } = require("../models/fetch-articles-db");
const { isStringANumber } = require("../app-utils.js");

async function getSingleCommentsAPI(request, response, next) {
  try {
    await isStringANumber(request.params.article_id);
  } catch (err) {
    next(err);
  }
  try {
    const comments = await fetchSingleCommentsDB(request.params);
    response.status(200).send(comments);
  } catch (err) {
    next(err);
  }
}

async function postSingleCommentAPI(request, response, next) {
  try {
    await isStringANumber(request.params.article_id);
  } catch (err) {
    next(err);
  }
  try {
    const bodyToSend = structuredClone(request.body);
    await fetchSingleArticle(request.params);
    bodyToSend.article_id = request.params.article_id;
    const postedComment = await postSingleCommentDB(bodyToSend);
    response.status(201).send(postedComment);
  } catch (err) {
    next(err);
  }
}

module.exports = { getSingleCommentsAPI, postSingleCommentAPI };
