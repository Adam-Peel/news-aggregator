const db = require("../connection");
const {
  createUsersTable,
  createTopicsTable,
  createArticlesTable,
  createCommentsTable,
} = require("./create-tables");
const format = require("pg-format");
const { getKeys, formatData, getLookup } = require("./data-formatting");
const comments = require("../data/test-data/comments");

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

  // Get keys for pg-format
  const usersKeys = getKeys(userData);
  const topicsKeys = getKeys(topicData);
  const articlesKeys = getKeys(articleData);
  const commentsKeys = getKeys(commentData);

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

  //Get article_id for comments
  const articleIdLookup = await db.query(`SELECT article_id from articles`);

  const insertCommentsData = format(
    `INSERT INTO comments (%I, article_id) VALUES %L`,
    commentsKeys,
    formattedCommentsData
  );
  // console.log(commentsKeys);
  // console.log(formattedCommentsData);
  // TODO - BUG - Figure out syntax and data structure for comments insertion.

  try {
    await db.query(insertUserData);
    await db.query(insertTopicsData);
    await db.query(insertArticlesData);
  } catch (err) {
    console.log(`Error inserting data:\n${err}`);
  }

  const lookup = await db.query(`SELECT * FROM articles`);
  //console.log(lookup);
  console.log(getLookup(lookup));

  //await db.query(insertCommentsData);
};

module.exports = seed;
