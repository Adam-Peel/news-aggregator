const db = require("../db/connection");

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
    return err;
  }
}

async function fetchSingleArticle(request) {
  try {
    const { rows } = await db.query(
      `SELECT * FROM articles WHERE article_id = $1`,
      request
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

module.exports = { fetchAllArticlesDB, fetchSingleArticle };
