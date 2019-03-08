const db = require('../data/dbConfig');

module.exports = {
    insertGame,
    getGames
}

async function insertGame(game) {
    const [id] = await db("games").insert(game, 'id');

    return db("games").select("title", "genre", "releaseYear").where({id}).first();
}

function getGames() {

}