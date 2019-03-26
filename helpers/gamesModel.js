const db = require("../data/dbConfig");

module.exports = {
  insertGame,
  getGames,
  getGameById
};

async function insertGame(game) {
  const [id] = await db("games").insert(game, "id");

  return db("games")
    .select("title", "genre", "releaseYear")
    .where({ id })
    .first();
}

async function getGames() {
  return await db("games");
}

async function getGameById(id) {
    return db("games").where({id}).first();
}
