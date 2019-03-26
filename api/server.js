const express = require("express");
const Games = require("../helpers/gamesModel");

const server = express();

server.use(express.json());

server.get("/", async (req, res) => {
  res.status(200).send("Sanity check!");
});

server.get("/games", async (req, res) => {
  try {
    const games = await Games.getGames();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: "There was an error retrieving the games" });
  }
});

server.post("/games", async (req, res) => {
  try {
    const { title, genre } = req.body;
    if (!title || !genre) {
      res.status(422).json({ error: "Please provide title and genre" });
    } else {
      let game = await Games.insertGame(req.body);
      res.status(201).json(game);
    }
  } catch (error) {
    res.status(500).json({message: "There was an error adding the game"});
  }
});

server.get("/games/:id", async (req, res) => {
    try {
        const game = await Games.getGameById(req.params.id);
        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({message: "There was an error retrieving the game"})
    }
})

module.exports = server;
