const db = require("../connection");
const {
  createUsersTable,
  createTopicsTable,
  createArticlesTable,
  createCommentsTable,
} = require("./create-tables");
const format = require("pg-format");
const {
  getKeys,
  formatData,
  getLookup,
  replaceObjectEntries,
  removePropertyFromArrayOfObjects,
} = require("./data-formatting");

// Create db tables
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

  // Get keys for pg-format
  const usersKeys = getKeys(userData);
  const topicsKeys = getKeys(topicData);
  const articlesKeys = getKeys(articleData);

  // Write SQL strings for insertion
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

  try {
    await db.query(insertUserData);
    await db.query(insertTopicsData);
    await db.query(insertArticlesData);
  } catch (err) {
    console.log(`Error inserting data:\n${err}`);
  }

  // Modify comments data and keys before insertion
  const articles = await db.query(`SELECT * FROM articles`);
  const articlesLookup = getLookup(articles, "title", "article_id");
  const commentsWithId = replaceObjectEntries(
    commentData,
    "article_title",
    articlesLookup,
    "article_id"
  );

  const commentsWithoutTitles = removePropertyFromArrayOfObjects(
    commentsWithId,
    "article_title"
  );

  const commentsKeys = getKeys(commentsWithoutTitles);
  const formattedCommentsData = formatData(commentsWithoutTitles);

  const insertCommentsData = format(
    `INSERT INTO comments (%I) VALUES %L`,
    commentsKeys,
    formattedCommentsData
  );

  try {
    await db.query(insertCommentsData);
  } catch (err) {
    console.log(`Error:\n${err}`);
  }
};

module.exports = seed;
