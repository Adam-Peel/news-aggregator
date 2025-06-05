const db = require("../db/connection");

async function fetchAllTopicsDB() {
  try {
    const { rows } = await db.query(`SELECT description, slug FROM topics`);
    return rows;
  } catch (err) {
    throw err;
  }
}

module.exports = { fetchAllTopicsDB };
