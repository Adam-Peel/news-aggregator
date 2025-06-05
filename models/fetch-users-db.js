const db = require("../db/connection");

async function fetchAllUsersDB(request, response) {
  try {
    const { rows } = await db.query(`SELECT * FROM users`);
    return { users: rows };
  } catch (err) {
    return err;
  }
}

async function checkUserExists(request) {
  try {
    const { rows } = await db.query(
      `SELECT * FROM users WHERE username = $1`,
      request
    );
    if (rows.length > 0) {
      return Promise.resolve();
    }
  } catch (err) {
    throw err;
  }
}

module.exports = { fetchAllUsersDB, checkUserExists };
