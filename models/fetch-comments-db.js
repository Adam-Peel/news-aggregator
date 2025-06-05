const db = require("../db/connection");

async function fetchSingleCommentsDB(request) {
  try {
    const { rows } = await db.query(
      `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`,
      request
    );
    if (rows.length > 0) {
      return { comments: rows };
    } else {
      return Promise.reject({ status: 404, message: "Item not found" });
    }
  } catch (err) {
    throw err;
  }
}

module.exports = { fetchSingleCommentsDB };
