const db = require("../db/connection");
const format = require("pg-format");

async function checkArticleSort(query) {
  let sqlStr = `SELECT
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
articles.article_id`;

  if (!query || query === "") {
    return `${sqlStr} ORDER BY articles.created_at DESC`;
  }
  const columnWhiteList = [
    "author",
    "title",
    "article_id",
    "topic",
    "created_at",
    "votes",
    "article_img_url",
  ];
  const sortWhiteList = ["ASC", "DESC"];
  const check = query.split(":");
  let column = check[0].toLowerCase();
  let order = check[1].toUpperCase();
  if (columnWhiteList.includes(column) && sortWhiteList.includes(order)) {
    return `${sqlStr} ORDER BY articles.${column} ${order}`;
  } else {
    return Promise.reject({ status: 400, message: "Invalid input" });
  }
}

async function fetchAllArticlesDB(request, response) {
  const check = await checkArticleSort(request.query.sort);
  try {
    const { rows } = await db.query(check);
    return { articles: rows };
  } catch (err) {
    throw err;
  }
}

async function fetchSingleArticle(request) {
  let column = Object.keys(request);
  let condition = Object.values(request);
  try {
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
