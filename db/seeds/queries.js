const { db } = require("../connection");

async function queries(db) {
  try {
    const allUsers = await db.query(`SELECT * FROM users`);
    console.log(allUsers);
  } catch (err) {
    console.log(`Error:\n${err}`);
  }
}

queries(db);
