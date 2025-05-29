const db = require("../connection");
const {
  createUsersTable,
  createTopicsTable,
  createArticlesTable,
  createCommentsTable,
} = require("./create-tables");
const format = require("pg-format");

function formatData(data) {
  const placeHolderArray = [];
  let index = 0;
  data.map((element) => {
    const valuesArray = [];
    for (const [key, value] of Object.entries(element)) {
      valuesArray.push(value);
    }
    placeHolderArray.push(valuesArray);
    index++;
  });
  //console.log(placeHolderArray);
  return placeHolderArray;
}

function getKeys(data) {
  const keyReference = data[0];
  let placeholder = [];
  for (const [key] of Object.entries(keyReference)) {
    placeholder.push(key);
  }
  //console.log(placeholder);
  return placeholder;
}

const seed = async ({ topicData, userData, articleData, commentData }) => {
  try {
    await db.query(`DROP TABLE IF EXISTS comments`);
    await db.query(`DROP TABLE IF EXISTS articles`);
    await db.query(`DROP TABLE IF EXISTS topics`);
    await db.query(`DROP TABLE IF EXISTS users`);
  } catch (err) {
    console.log(`Error dropping tables:\n${err}`);
  }
  await createUsersTable(db);
  await createTopicsTable(db);
  await createArticlesTable(db);
  await createCommentsTable(db);
  // Format data
  const formattedUsersData = formatData(userData);
  const formattedTopicsData = formatData(topicData);
  const formattedArticlesData = formatData(articleData);
  const formattedCommentsData = formatData(commentData);
  // console.log(formattedUsersData);
  // Get keys for pg-format
  const usersKeys = getKeys(userData);
  const topicsKeys = getKeys(topicData);
  const articlesKeys = getKeys(articleData);
  const commentsKeys = getKeys(commentData);
  //console.log(usersKeys); TODO - Figure how to automatically insert this into pg-format

  const insertUserData = format(
    `INSERT INTO users (%I) VALUES %L`,
    usersKeys,
    formattedUsersData
  );

  const insertTopicsData = format(
    `INSERT INTO topics (%I) VALUES %L`,
    topicsKeys,
    formattedTopicsData
  );

  const insertArticlesData = format(
    `INSERT INTO articles (%I) VALUES %L`,
    articlesKeys,
    formattedArticlesData
  );

  const insertCommentsData = format(
    `INSERT INTO comments (%I) VALUES %L`,
    commentsKeys,
    formattedCommentsData
  );

  console.log(insertUserData);
  try {
    await db.query(insertUserData);
    await db.query(insertTopicsData);
    await db.query(insertArticlesData);
    await db.query(insertCommentsData);
  } catch (err) {
    console.log(`Error inserting data:\n${err}`);
  }
};

module.exports = seed;

//<< write your first query in here.

/* DROP TABLES IF EXIST
    1. comments
    2. articles
    3. topics
    4. username
  */

/* CREATE TABLES
    1. username
    2. topics
    3. articles
    4. comments
  */

// FORMAT DATA

// INSERT DATA
