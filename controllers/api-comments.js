const {
  fetchSingleCommentsDB,
  fetchAllCommentsDB,
  postSingleCommentDB,
  deleteSingleCommentDB,
} = require("../models/fetch-comments-db");
const { fetchSingleArticle } = require("../models/fetch-articles-db");
const { isStringANumber } = require("../app-utils.js");

async function getAllCommentsAPI(request, response, next) {
  try {
    const comments = await fetchAllCommentsDB();
    console.log(comments);
    response.status(200).send(comments);
  } catch (err) {
    next(err);
  }
}

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

async function deleteCommentAPI(request, response, next) {
  try {
    await isStringANumber(request.params.comment_id);
  } catch (err) {
    next(err);
  }
  try {
    await deleteSingleCommentDB(request.params);
    response.sendStatus(204);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getSingleCommentsAPI,
  postSingleCommentAPI,
  deleteCommentAPI,
  getAllCommentsAPI,
};
