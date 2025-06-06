const db = require("../db/connection");
const format = require("pg-format");

async function fetchAllArticlesDB(request, response) {
  try {
    const { rows } = await db.query(
      `SELECT
articles.author,
articles.title,
articles.article_id,
articles.topic,
articles.created_at,
articles.votes,
articles.article_img_url,
COUNT(comments.article_id) AS comment_count
FROM
articles
LEFT JOIN
comments ON articles.article_id = comments.article_id
GROUP BY
articles.article_id
ORDER BY
articles.created_at DESC;`
    );
    return { articles: rows };
  } catch (err) {
    throw err;
  }
}

async function fetchSingleArticle(request) {
  try {
    column = Object.keys(request);
    condition = Object.values(request);
    const sqlString = format(`SELECT * FROM articles WHERE %I = $1`, column);
    const { rows } = await db.query(sqlString, condition);
    if (rows.length > 0) {
      return { article: rows[0] };
    } else {
      return Promise.reject({ status: 404, message: "Item not found" });
    }
  } catch (err) {
    throw err;
  }
}

async function patchArticleDB(request) {
  const { inc_votes, article_id } = request;
  try {
    const { rows } = await db.query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`,
      [inc_votes, article_id]
    );
    if (rows.length > 0) {
      return { article: rows[0] };
    } else {
      return Promise.reject({ status: 404, message: "Item not found" });
    }
  } catch (err) {
    throw err;
  }
}

module.exports = { fetchAllArticlesDB, fetchSingleArticle, patchArticleDB };
