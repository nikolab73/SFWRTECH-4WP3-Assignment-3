const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

async function init() {
  try {
    db = await sqlite.open({
      filename: 'database.db',
      driver: sqlite3.Database
    });
  } catch(err) {
      console.error(err);
  }
}

init();

// Return all of the articles
async function getAllArticles()
{
  let results = await db.all("SELECT * FROM Articles");
  return results;
}

// Create a new article given a title, content and username
async function createArticle(article,username)
{
  await db.run("INSERT INTO Articles VALUES (?,?,?)",
         [article.title, username, article.content]);
}

async function deleteArticle(title, username){
  await db.run("DELETE FROM Articles WHERE title = ? AND username = ?", [title, username]);
}

async function deleteByUser(username) {
  await db.run("DELETE FROM Articles WHERE username = ?", [username]);
}

module.exports = {getAllArticles, createArticle, deleteArticle, deleteByUser};
