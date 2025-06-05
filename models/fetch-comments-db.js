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

async function postSingleCommentDB(request) {
  try {
    const { username, body, articleId } = request;
    if (!username || !body || !articleId) {
      return Promise.reject({
        status: 400,
        message: "At least one parameter missing or incorrect",
      });
    }
    const timestamp = new Date();
    console.log(username, body, articleId, timestamp);
    const { rows } = await db.query(
      `INSERT INTO comments (article_id, body, author, created_at) VALUES ($1, $2, $3, $4) RETURNING body`,
      [articleId, body, username, timestamp]
    );
    return rows[0];
  } catch (err) {
    throw err;
  }
}

module.exports = { fetchSingleCommentsDB, postSingleCommentDB };
