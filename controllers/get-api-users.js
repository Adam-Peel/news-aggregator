const { fetchAllUsersDB } = require("../models/fetch-users-db");

async function getAllUsersAPI(request, response) {
  try {
    const users = await fetchAllUsersDB();
    console.log(users);
    response.status(200).send(users);
  } catch (err) {
    response.status(500).send(err);
  }
}

module.exports = { getAllUsersAPI };
