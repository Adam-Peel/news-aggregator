async function createUsersTable(db) {
  try {
    await db.query(
      `CREATE TABLE users (username VARCHAR(255) UNIQUE PRIMARY KEY, name VARCHAR(255), avatar_url VARCHAR(1000));`
    );
  } catch (err) {
    console.log(`Error creating users table:\n${err}`);
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

async function createEmojisTable(db) {
  try {
    await db.query(
      `CREATE TABLE emojis (emoji_id SERIAL PRIMARY KEY, emoji VARCHAR(255) UNIQUE NOT NULL, emoji_description VARCHAR(255));`
    );
  } catch (err) {
    console.log(`Error creating emojis table:\n${err}`);
  }
}

async function createEmojisArticlesUsersTable(db) {
  try {
    await db.query(
      `CREATE TABLE emoji_article_user (emoji_article_user_id SERIAL PRIMARY KEY, emoji_id INT REFERENCES emojis(emoji_id), username VARCHAR(255) REFERENCES users(username), article_id INT REFERENCES articles(article_id), CONSTRAINT users_articles_reactions UNIQUE (username, article_id));`
    );
  } catch (err) {
    console.log(`Error creating emoji_articles_users table:\n${err}`);
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

async function createUsersArticlesVotesTable(db) {
  try {
    await db.query(
      `CREATE TABLE users_articles_votes (user_article_votes_id SERIAL PRIMARY KEY, username VARCHAR(255) REFERENCES users(username), article_id INT REFERENCES articles(article_id), vote_count INT NOT NULL CHECK (vote_count between -1 and 1), CONSTRAINT users_articles UNIQUE (username, article_id));`
    );
  } catch (err) {
    console.log(`Error creating users_articles_votes table:\n${err}`);
  }
}

async function createUsersArticlesBookmarkTable(db) {
  try {
    await db.query(
      `CREATE TABLE users_articles_bookmark (user_article_bookmark_id SERIAL PRIMARY KEY, username VARCHAR(255) REFERENCES users(username), article_id INT REFERENCES articles(article_id), bookmarked_article BOOLEAN, CONSTRAINT users_articles UNIQUE (username, article_id));`
    );
  } catch (err) {
    console.log(`Error creating users_articles_votes table:\n${err}`);
  }
}

async function createTopicsArticlesVotesTable(db) {
  try {
    await db.query(
      `CREATE TABLE topics_articles_votes (topics_article_votes_id SERIAL PRIMARY KEY, topic VARCHAR(255) REFERENCES topics(slug), article_id INT REFERENCES articles(article_id), vote_count INT NOT NULL);`
    );
  } catch (err) {
    console.log(`Error creating topics_articles_votes table:\n${err}`);
  }
}

module.exports = {
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
};

/* Create data and test for:
  createEmojisArticlesUsersTable,
  createUsersTopicsTable,
  createUsersArticlesVotesTable,
  createTopicsArticlesVotesTable,
*/
