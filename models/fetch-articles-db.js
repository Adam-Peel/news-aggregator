const db = require("../db/connection");

async function fetchAllArticlesDB(request, response) {
  try {
    const { rows } = await db.query(
      `SELECT
articles.*,
COUNT(comments.article_id) AS comment_count
FROM
articles
LEFT JOIN
comments ON articles.article_id = comments.article_id
GROUP BY
articles.article_id`
    );
    rows.forEach((article) => {
      delete article["body"];
    });
    console.log(rows);
    return { articles: rows };
  } catch (err) {
    return err;
  }
}

module.exports = { fetchAllArticlesDB };
