const db = require("../connection");
const {
  createUsersTable,
  createTopicsTable,
  createArticlesTable,
  createCommentsTable,
  createEmojisTable,
  createUsersTopicsTable,
  createUsersArticlesEngagementTable,
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
const seed = async ({
  topicData,
  userData,
  articleData,
  commentData,
  emojiData,
  userTopicsData,
  usersArticlesEngagementData,
}) => {
  try {
    await db.query(`DROP TABLE IF EXISTS users_articles_Engagement cascade`);
  } catch (err) {
    console.log(`${err}`);
  }
  try {
    await db.query(`DROP TABLE IF EXISTS users_topics cascade`);
  } catch (err) {
    console.log(`${err}`);
  }
  try {
    await db.query(`DROP TABLE IF EXISTS comments cascade`);
  } catch (err) {
    console.log(`${err}`);
  }
  try {
    await db.query(`DROP TABLE IF EXISTS articles cascade`);
  } catch (err) {
    console.log(`${err}`);
  }
  try {
    await db.query(`DROP TABLE IF EXISTS topics`);
  } catch (err) {
    console.log(`${err}`);
  }
  try {
    await db.query(`DROP TABLE IF EXISTS users`);
  } catch (err) {
    console.log(`${err}`);
  }
  try {
    await db.query(`DROP TABLE IF EXISTS emojis`);
  } catch (err) {
    console.log(`${err}`);
  }

  await createUsersTable(db);
  await createTopicsTable(db);
  await createArticlesTable(db);
  await createCommentsTable(db);
  await createEmojisTable(db);
  await createUsersTopicsTable(db);
  await createUsersArticlesEngagementTable(db); //

  // Format data
  const formattedUsersData = formatData(userData);
  const formattedTopicsData = formatData(topicData);
  const formattedArticlesData = formatData(articleData);
  const formattedEmojiData = formatData(emojiData);
  const formattedUsersTopicsData = formatData(userTopicsData);
  const formattedUsersArticlesEngagement = formatData(
    usersArticlesEngagementData
  );

  // Get keys for pg-format
  const usersKeys = getKeys(userData);
  const topicsKeys = getKeys(topicData);
  const articlesKeys = getKeys(articleData);
  const emojisKeys = getKeys(emojiData);
  const userTopicsKeys = getKeys(userTopicsData);
  const userArticlesEngagementKeys = getKeys(usersArticlesEngagementData);

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

  const insertEmojisData = format(
    `INSERT INTO emojis (%I) VALUES %L`,
    emojisKeys,
    formattedEmojiData
  );

  const insertUsersTopicsData = format(
    `INSERT INTO users_topics (%I) VALUES %L`,
    userTopicsKeys,
    formattedUsersTopicsData
  );

  const insertUsersArticlesEngagementData = format(
    `INSERT INTO users_articles_Engagement (%I) VALUES %L`,
    userArticlesEngagementKeys,
    formattedUsersArticlesEngagement
  );

  try {
    await db.query(insertUserData);
    await db.query(insertTopicsData);
    await db.query(insertArticlesData);
    await db.query(insertEmojisData);
    await db.query(insertUsersTopicsData);
    await db.query(insertUsersArticlesEngagementData);
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
