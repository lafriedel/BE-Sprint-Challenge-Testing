const express = require('express');
const Games = require('../helpers/gamesModel');

const server = express();

server.use(express.json());

server.get("/", async (req, res) => {
    res.status(200).send("Sanity check!");
})

server.post('/games', async (req, res) => {
    try {
        const { title, genre } = req.body;
        if (!title || !genre) {
            res.status(422).json({error: "Please provide title and genre"})
        } else {
            let game = await Games.insertGame(req.body);
            res.status(201).json(game);
        }
    } catch(error) {
        res.status(500).json(error);
    }
})

module.exports = server;