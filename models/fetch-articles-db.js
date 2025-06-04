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

module.exports = { fetchAllArticlesDB };
