const db = require("../db/connection");

async function fetchTopicsDB() {
  try {
    const { rows } = await db.query(`SELECT description, slug FROM topics`);
    return rows;
  } catch (err) {
    return err;
  }
}

module.exports = { fetchTopicsDB };
