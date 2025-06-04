const db = require("../db/connection");

async function fetchAllArticlesDB(request, response) {
  try {
    const { rows } = await db.query(`SELECT * FROM articles`);
    return { articles: rows };
  } catch (err) {
    return err;
  }
}

module.exports = { fetchAllArticlesDB };
