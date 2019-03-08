const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');

afterEach(async () => {
    await db("games").truncate();
})

describe('server.js', () => {

    describe('GET /games', () => {

        it.skip('returns 200 OK', async () => {

        });

        it.skip('always returns an array', async () => {

        });

        it.skip('returns JSON', async () => {

        })
    })

    describe('POST /games', () => {

        it.skip('returns object with required fields', async () => {
        
        });

        it.skip('returns 422 with incomplete request', async () => {

        });

        it('returns 201 Created with complete request', async () => {
            const res = await request(server).post('/games').send({ title: "Pacman", genre: "Arcade" });

            expect(res.status).toBe(201);
        })
    })
})