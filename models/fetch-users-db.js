const db = require("../db/connection");

async function fetchAllUsersDB(request, response) {
  try {
    const { rows } = await db.query(`SELECT * FROM users`);
    return { users: rows };
  } catch (err) {
    return err;
  }
}

module.exports = { fetchAllUsersDB };
