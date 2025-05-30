const db = require("../connection");
const {
  createUsersTable,
  createTopicsTable,
  createArticlesTable,
  createCommentsTable,
  createEmojisTable,
  createEmojisArticlesUsersTable,
  createUsersTopicsTable,
  createUsersArticlesVotesTable,
  createTopicsArticlesVotesTable,
  createUsersArticlesBookmarkTable,
} = require("./create-tables");
const format = require("pg-format");
const {
  getKeys,
  formatData,
  getLookup,
  replaceObjectEntries,
  removePropertyFromArrayOfObjects,
} = require("./data-formatting");
const {
  emojisArticlesUsersData,
  userTopicsData,
  userArticleVotesData,
} = require("../data/test-data");

// Create db tables
const seed = async ({
  topicData,
  userData,
  articleData,
  commentData,
  emojiData,
}) => {
  try {
    await db.query(`DROP TABLE IF EXISTS users_topics`);
    await db.query(`DROP TABLE IF EXISTS emoji_article_user`);
    await db.query(`DROP TABLE IF EXISTS users_articles_votes`);
    await db.query(`DROP TABLE IF EXISTS comments`);
    await db.query(`DROP TABLE IF EXISTS articles`);
    await db.query(`DROP TABLE IF EXISTS topics`);
    await db.query(`DROP TABLE IF EXISTS users`);
    await db.query(`DROP TABLE IF EXISTS emojis`);
  } catch (err) {
    console.log(`Error dropping tables:\n${err}`);
  }
  await createUsersTable(db);
  await createTopicsTable(db);
  await createArticlesTable(db);
  await createCommentsTable(db);
  await createEmojisTable(db);
  await createEmojisArticlesUsersTable(db);
  await createUsersTopicsTable(db);
  await createUsersArticlesVotesTable(db);

  // TODO
  // await createUsersArticlesBookmarkTable(db)//

  // Format data
  const formattedUsersData = formatData(userData);
  const formattedTopicsData = formatData(topicData);
  const formattedArticlesData = formatData(articleData);
  const formattedEmojiData = formatData(emojiData);
  const formattedEAUData = formatData(emojisArticlesUsersData);
  const formattedUsersTopicsData = formatData(userTopicsData);
  const formattedUsersArticlesVotes = formatData(userArticleVotesData);

  // Get keys for pg-format
  const usersKeys = getKeys(userData);
  const topicsKeys = getKeys(topicData);
  const articlesKeys = getKeys(articleData);
  const emojisKeys = getKeys(emojiData);
  const EAUKeys = getKeys(emojisArticlesUsersData);
  const userTopicsKeys = getKeys(userTopicsData);
  const userArticleVoteKeys = getKeys(userArticleVotesData);

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

  const insertEAUData = format(
    `INSERT INTO emoji_article_user (%I) VALUES %L`,
    EAUKeys,
    formattedEAUData
  );

  const insertUsersTopicsData = format(
    `INSERT INTO users_topics (%I) VALUES %L`,
    userTopicsKeys,
    formattedUsersTopicsData
  );

  const insertUsersArticlesVotesData = format(
    `INSERT INTO users_articles_votes (%I) VALUES %L`,
    userArticleVoteKeys,
    formattedUsersArticlesVotes
  );

  try {
    await db.query(insertUserData);
    await db.query(insertTopicsData);
    await db.query(insertArticlesData);
    await db.query(insertEmojisData);
    await db.query(insertEAUData);
    await db.query(insertUsersTopicsData);
    await db.query(insertUsersArticlesVotesData);
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
