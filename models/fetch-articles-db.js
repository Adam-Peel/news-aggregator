const db = require("../db/connection");

async function fetchAllArticlesAPI(request, response) {
  try {
    console.log("fetchAllArticlesAPI - model");
    const { rows } = await db.query(`SELECT * FROM articles`);
    console.log(rows);
    return rows;
    //
  } catch (err) {
    //
    return err;
  }
}

module.exports = { fetchAllArticlesAPI };
