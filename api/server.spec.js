const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');

afterEach(async () => {
    await db("games").truncate();
})

describe('server.js', () => {

    describe('GET /games', () => {

        it('returns 200 OK', async () => {
            const res = await request(server).get("/games");

            expect(res.status).toBe(200);
        });

        it.skip('always returns an array', async () => {

        });

        it.skip('returns JSON', async () => {

        })
    })

    describe('POST /games', () => {

        it('returns object with required fields', async () => {
            const res = await request(server).post('/games').send({title: "Mario 64", genre: "RPG", releaseYear: 1996});

            expect(res.body).toEqual({title: "Mario 64", genre: "RPG", releaseYear: 1996});
        });

        it('returns 422 with incomplete request', async () => {
            const res = await request(server).post('/games').send({title: "Starfox 64", releaseYear: 1997});

            expect(res.status).toBe(422);
        });

        it('returns 201 Created with complete request', async () => {
            const res = await request(server).post('/games').send({ title: "Pacman", genre: "Arcade" });

            expect(res.status).toBe(201);
        })
    })
})