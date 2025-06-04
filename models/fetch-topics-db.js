const db = require("../db/connection");

async function fetchTopicsDB() {
  console.log("fetchTopics <- Model");
  try {
    const { rows } = await db.query(`SELECT * FROM topics`);
    return rows;
  } catch (err) {
    // DEAL WITH ERROR
  }
}

module.exports = { fetchTopicsDB };
