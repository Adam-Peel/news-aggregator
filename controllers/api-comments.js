const {
  fetchSingleCommentsDB,
  postSingleCommentDB,
} = require("../models/fetch-comments-db");
const { fetchSingleArticle } = require("../models/fetch-articles-db");

async function getSingleCommentsAPI(request, response, next) {
  try {
    const articleId = Object.values(request.params);
    const comments = await fetchSingleCommentsDB(articleId);
    response.status(200).send(comments);
  } catch (err) {
    next(err);
  }
}

async function postSingleCommentAPI(request, response, next) {
  try {
    const bodyToSend = structuredClone(request.body);
    const articleId = Object.values(request.params);
    await fetchSingleArticle(articleId);
    bodyToSend.articleId = articleId[0];
    const postedComment = await postSingleCommentDB(bodyToSend);
    response.status(201).send(postedComment);
  } catch (err) {
    next(err);
  }
}

module.exports = { getSingleCommentsAPI, postSingleCommentAPI };
