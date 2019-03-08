const request = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");

afterEach(async () => {
  await db("games").truncate();
});

describe("server.js", () => {
  describe("GET /games", () => {
    it("returns 200 OK", async () => {
      const res = await request(server).get("/games");

      expect(res.status).toBe(200);
    });

    it("always returns an array", async () => {
      const res = await request(server).get("/games");

      const arrWithGame = [
        { title: "Mario 64", genre: "RPG", releaseYear: 1996 }
      ];

      const arrWithMoreGames = [
        { title: "Mario 64", genre: "RPG", releaseYear: 1996 },
        { title: "Starfox64", genre: "Space Shooter", releaseYear: 1997 }
      ];

      expect(res.body).toEqual(expect.arrayContaining([]));
      expect(arrWithMoreGames).toEqual(expect.arrayContaining(arrWithGame));
    });

    it("returns JSON", async () => {
      const res = await request(server).get("/games");

      expect(res.type).toBe("application/json");
    });
  });

  describe("POST /games", () => {
    it("returns object with required fields", async () => {
      const res = await request(server)
        .post("/games")
        .send({ title: "Mario 64", genre: "RPG", releaseYear: 1996 });

      expect(res.body).toEqual({
        title: "Mario 64",
        genre: "RPG",
        releaseYear: 1996
      });
      expect(res.body).toHaveProperty("title");
      expect(res.body).toHaveProperty("genre");
      expect(res.body).not.toHaveProperty("id");
    });

    it("returns JSON", async () => {
      const res = await request(server)
        .post("/games")
        .send({ title: "Mario 64", genre: "RPG", releaseYear: 1996 });

      expect(res.type).toBe("application/json");
    });

    it("returns 422 with incomplete request", async () => {
      const res = await request(server)
        .post("/games")
        .send({ title: "Starfox 64", releaseYear: 1997 });

      expect(res.status).toBe(422);
    });

    it("returns error msg with 422", async () => {
      const res = await request(server)
        .post("/games")
        .send({ title: "Starfox 64", releaseYear: 1997 });

      expect(res.body).toEqual({ error: "Please provide title and genre" });
    });

    it("returns 201 Created with complete request", async () => {
      const res = await request(server)
        .post("/games")
        .send({ title: "Pacman", genre: "Arcade" });

      expect(res.status).toBe(201);
    });
  });

  describe('GET /games/:id', () => {
      it('returns matched game', async () => {
        await request(server).post('/games').send({ title: "Starfox64", genre: "Space Shooter", releaseYear: 1997 });
        const res = await request(server).get("/games/1")

        expect(res.body).toEqual({ id: 1, title: "Starfox64", genre: "Space Shooter", releaseYear: 1997 })
        expect(res.body).not.toEqual({id: 2, title: "Mario 64", genre: "RPG", releaseYear: 1996});
        expect(res.body).toEqual(expect.objectContaining({id: 1}))
      })
  })
});
