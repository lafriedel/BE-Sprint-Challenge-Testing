const db = require('../data/dbConfig');

module.exports = {
    insertGame,
    getGames
}

async function insertGame(game) {
    const [id] = await db("games").insert(game, 'id');

    return db("games").where({id}).first();
}

function getGames() {
    
}