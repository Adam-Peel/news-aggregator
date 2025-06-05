const db = require("../db/connection");

async function fetchSingleCommentsDB(request, response) {
  try {
    const articleId = request;
    const { rows } = await db.query(
      `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`,
      articleId
    );
    if (rows.length > 0) {
      return rows;
    } else {
      return Promise.reject({ status: 404, message: "Item not found" });
    }
  } catch (err) {
    throw err;
  }
}

module.exports = { fetchSingleCommentsDB };
