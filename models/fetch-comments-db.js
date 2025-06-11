const db = require("../db/connection");
const format = require("pg-format");

async function fetchSingleCommentsDB(request) {
  let column = Object.keys(request);
  let condition = Object.values(request);
  try {
    const sqlString = format(
      `SELECT * FROM comments WHERE %I = $1 ORDER BY created_at DESC`,
      column
    );
    const { rows } = await db.query(sqlString, condition);
    if (rows.length > 0) {
      return { comments: rows };
    } else {
      return Promise.reject({ status: 404, message: "Item not found" });
    }
  } catch (err) {
    throw err;
  }
}

async function fetchAllCommentsDB(request) {
  try {
    const { rows } = await db.query(`SELECT * FROM comments`);
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
    const { username, body, article_id } = request;
    if (!username || !body || !article_id) {
      return Promise.reject({
        status: 400,
        message: "At least one parameter missing or incorrect",
      });
    }
    const timestamp = new Date();
    const { rows } = await db.query(
      `INSERT INTO comments (article_id, body, author, created_at) VALUES ($1, $2, $3, $4) RETURNING body`,
      [article_id, body, username, timestamp]
    );
    if (rows.length > 0) {
      return rows[0];
    } else {
      return Promise.reject({ status: 404, message: "Item not found" });
    }
  } catch (err) {
    throw err;
  }
}

async function deleteSingleCommentDB(request) {
  let column = Object.keys(request);
  let condition = Object.values(request);
  try {
    const sqlString = format(
      `DELETE FROM comments WHERE %I = $1 RETURNING *`,
      column
    );
    const { rows } = await db.query(sqlString, condition);
    if (rows.length > 0) {
      return rows[0];
    } else {
      return Promise.reject({ status: 404, message: "Item not found" });
    }
  } catch (err) {
    throw err;
  }
}

module.exports = {
  fetchAllCommentsDB,
  fetchSingleCommentsDB,
  postSingleCommentDB,
  deleteSingleCommentDB,
};
