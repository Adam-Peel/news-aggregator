// Tables with no dependencies

async function createUsersTable(db) {
  try {
    await db.query(
      `CREATE TABLE users (username VARCHAR(255) UNIQUE PRIMARY KEY, name VARCHAR(255), avatar_url VARCHAR(1000));`
    );
  } catch (err) {
    console.log(`Error creating users table:\n${err}`);
  }
}

async function createEmojisTable(db) {
  try {
    await db.query(
      `CREATE TABLE emojis (emoji_id SERIAL PRIMARY KEY, emoji VARCHAR(255) UNIQUE NOT NULL, emoji_description VARCHAR(255));`
    );
  } catch (err) {
    console.log(`Error creating emojis table:\n${err}`);
  }
}

async function createTopicsTable(db) {
  try {
    await db.query(
      `CREATE TABLE topics (slug VARCHAR(255) UNIQUE PRIMARY KEY, description VARCHAR(255), img_url VARCHAR(1000));`
    );
  } catch (err) {
    console.log(`Error creating topics table:\n${err}`);
  }
}

// Tables with dependencies

async function createArticlesTable(db) {
  try {
    await db.query(
      `CREATE TABLE articles (article_id SERIAL PRIMARY KEY, title VARCHAR(1000), topic VARCHAR(255) REFERENCES topics(slug), author VARCHAR(255) REFERENCES users(username), body TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, votes INT DEFAULT 0, article_img_url VARCHAR(1000));`
    );
  } catch (err) {
    console.log(`Error creating articles table:\n${err}`);
  }
}

async function createCommentsTable(db) {
  try {
    await db.query(
      `CREATE TABLE comments (comment_id SERIAL PRIMARY KEY, article_id INT REFERENCES articles(article_id), body TEXT, votes INT DEFAULT 0, author VARCHAR(255) REFERENCES users(username), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`
    );
  } catch (err) {
    console.log(`Error creating comments table:\n${err}`);
  }
}

async function createUsersTopicsTable(db) {
  try {
    await db.query(
      `CREATE TABLE users_topics (users_topic_id SERIAL PRIMARY KEY, username VARCHAR(255) REFERENCES users(username), topic VARCHAR(255) REFERENCES topics(slug));`
    );
  } catch (err) {
    console.log(`Error creating users_topics table:\n${err}`);
  }
}

// TODO - BUG : Inserting constraint into users_topics causes it to not be created: , CONSTRAINT users_topics UNIQUE (username, topic)

async function createUsersArticlesEngagementTable(db) {
  try {
    await db.query(
      `CREATE TABLE users_articles_engagement (user_articles_engagement_id SERIAL PRIMARY KEY, username VARCHAR(255) REFERENCES users(username), article_id INT REFERENCES articles(article_id), is_article_read BOOLEAN, is_article_bookmarked BOOLEAN, vote_count INT CHECK (vote_count between -1 and 1), emoji_id INT REFERENCES emojis(emoji_id));`
    );
  } catch (err) {
    console.log(`Error creating users_articles_engagement table:\n${err}`);
  }
}

//TODO - BUG - Insert constraint into users_articles_bookmarks: CONSTRAINT users_articles UNIQUE (username, article_id)

module.exports = {
  createUsersTable,
  createTopicsTable,
  createArticlesTable,
  createCommentsTable,
  createEmojisTable,
  createUsersTopicsTable,
  createUsersArticlesEngagementTable,
};
