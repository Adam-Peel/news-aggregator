const { fetchAllUsersDB } = require("../models/fetch-users-db");

async function getAllUsersAPI(request, response, next) {
  try {
    const users = await fetchAllUsersDB();
    response.status(200).send(users);
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllUsersAPI };
