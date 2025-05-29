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

module.exports = {
  createUsersTable,
  createTopicsTable,
  createArticlesTable,
  createCommentsTable,
};
