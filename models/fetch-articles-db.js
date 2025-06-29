const db = require("../db/connection");
const format = require("pg-format");
const fetchAllTopicsDB = require("./fetch-topics-db");

async function checkArticleQuery(request) {
  let sqlStr = `SELECT
articles.author,
articles.title,
articles.article_id,
articles.topic,
articles.created_at,
articles.votes,
articles.article_img_url,
COUNT(comments.article_id) :: INT AS comment_count
FROM
articles
LEFT JOIN
comments ON articles.article_id = comments.article_id`;

  if (Object.keys(request.query).length === 0) {
    return `${sqlStr} GROUP BY articles.article_id ORDER BY articles.created_at DESC`;
  }
  //Check topic
  if (!request.query.topic || request.query.topic === "") {
    // Do nothing
  } else {
    let topic = request.query.topic.toLowerCase();
    const { rows } = await db.query(`SELECT slug FROM topics`);
    let topics = [];
    rows.forEach((topic) => {
      topics.push(topic.slug);
    });
    if (topics.includes(topic)) {
      sqlStr += ` WHERE topic = '${topic}'`;
    } else {
      return Promise.reject({ status: 404, message: "Item not found" });
    }
  }
  sqlStr += ` GROUP BY articles.article_id`;
  //Check sort
  if (!request.query.sort || request.query.sort === "") {
    sqlStr += ` ORDER BY articles.created_at DESC`;
  } else {
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
    const check = request.query.sort.split(":");
    let column = check[0].toLowerCase();
    let order = check[1].toUpperCase();
    if (columnWhiteList.includes(column) && sortWhiteList.includes(order)) {
      sqlStr += ` ORDER BY articles.${column} ${order}`;
    } else if (column === "comment_count") {
      sqlStr += ` ORDER BY COUNT (comments.comment_id)`;
    } else {
      return Promise.reject({ status: 400, message: "Invalid input" });
    }
  }

  return sqlStr;
}

async function fetchAllArticlesDB(request, response) {
  const check = await checkArticleQuery(request);
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
    const sqlString = format(
      `SELECT articles.*, 
COUNT(comments.article_id) AS comment_count
FROM
articles
LEFT JOIN 
comments ON articles.article_id = comments.article_id 
WHERE articles.%I = $1 
GROUP BY articles.article_id`,
      column
    );
    const { rows } = await db.query(sqlString, condition);
    if (rows.length > 0) {
      rows[0].comment_count = Number(rows[0].comment_count);
      return { article: rows[0] };
    } else {
      return Promise.reject({ status: 404, message: "Item not found" });
    }
  } catch (err) {
    throw err;
  }
}

async function fetchAllArticlesByKeywordsDB(request) {
  const keywords = request.split(" ").map((word) => `%${word}%`);
  try {
    const { rows } = await db.query(
      `SELECT * FROM articles 
       WHERE title ILIKE ANY ($1::text[]) 
          AND body ILIKE ANY ($1::text[])`,
      [keywords]
    );
    if (rows.length > 0) {
      return { articles: rows };
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

module.exports = {
  fetchAllArticlesDB,
  fetchSingleArticle,
  patchArticleDB,
  fetchAllArticlesByKeywordsDB,
};
