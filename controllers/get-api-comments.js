const { fetchSingleCommentsDB } = require("../models/fetch-comments-db");

async function getSingleCommentsAPI(request, response, next) {
  try {
    const articleId = Object.values(request.params);
    const comments = await fetchSingleCommentsDB(articleId);
    return response.status(200).send({ comments: comments });
  } catch (err) {
    next(err);
  }
}

module.exports = { getSingleCommentsAPI };
