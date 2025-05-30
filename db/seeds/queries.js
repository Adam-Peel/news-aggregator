const db = require("../connection");

async function queries() {
  const allUserNames = await db.query(`SELECT username FROM users`);
  const articlesAboutCoding = await db.query(
    `SELECT title FROM articles WHERE articles.topic = 'coding'`
  );
  const commentsWithZeroVotes = await db.query(
    `SELECT comments.author, articles.title FROM articles JOIN comments ON articles.article_id = comments.article_id WHERE comments.votes < 0`
  );
  const allTopics = await db.query(`SELECT description, slug FROM topics`);
  const grumpy19Articles = await db.query(
    `SELECT title FROM articles WHERE author = 'grumpy19'`
  );
  const commentsWith10PlusVotes = await db.query(
    `SELECT comments.author, articles.title FROM articles JOIN comments ON articles.article_id = comments.article_id WHERE comments.votes > 10`
  );
  console.log(commentsWith10PlusVotes);
}

queries();
