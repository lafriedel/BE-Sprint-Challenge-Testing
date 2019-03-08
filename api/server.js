const express = require('express');
const Games = require('../helpers/gamesModel');

const server = express();

server.use(express.json());

server.get("/", async (req, res) => {
    res.status(200).send("Sanity check!");
})

server.post('/games', async (req, res) => {
    try {
        let game = await Games.insertGame(req.body);
        res.status(201).json(game);
    } catch(err) {
        res.status(500).json(err);
    }
})

module.exports = server;