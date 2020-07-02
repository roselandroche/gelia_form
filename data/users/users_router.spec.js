const supertest = ('supertest');
const server = ('../api/server.js');
const db = require('../db_config');

beforeAll(async () => {
    console.log('Called tests on USERS')
    await db.truncate('users')
    await db.seed.run()
})

describe('users router', () => {
    describe('register', () => {
        it('should register a new user, return 201', async () => {
            const res = await supertest(server).post('/register').send({
                username: 'Sean Johnson',
                password: 'abc',
                email: 's.johnson@company.com'
            })
            expect(res.status).toBe(201)
            expect(res.type).toBe('application/json')
            expect(res.username).toBe('Sean Johnson')
        })
        it('should NOT register duplicate user, return 400', async () => {
            const res = await supertest(server).post('/register').send({
                username: 'Rose Smith',
                password: 'abc',
                email: 'rose.smith@company.com'
            })
            expect(res.status).toBe(400)
            expect(res.type).toBe('application/json')
            expect(res.message).toBe('User already exists')
        })
        it('should NOT register duplicate email, return 400', async () => {
            const res = await supertest(server).post('/register').send({
                username: 'Chrissy Taylor',
                password: '123',
                email: 'r.smith@company.com'
            })
            expect(res.status).toBe(400)
            expect(res.type).toBe('application/json')
            expect(res.message).toBe('Email already exists')
        })
    })
    describe('log in', () => {
        it('should log in pre-existing user, return 200', async () => {
            const res = await supertest(server).post('/login').send({
                username: 'Rose Smith',
                password: 'abc123'
            })
            expect(res.status).toBe(200);
            expect(res.type).toBe('application/json')
        })
        it('should NOT log in non-existing user, return 401', async () => {
            const res = await supertest(server).post('/login').send({
                username: 'Hacker McHackerson',
                password: 'the-hackiest'
            })
            expect(res.status).toBe(401)
            expect(res.type).toBe('application/json')
            expect(res.body.message).toBe('Invalid credentials')
        })
        it('should return a token on successful log in', async () => {
            const res = await supertest(server).post('/login').send({
                username: 'Rose Smith',
                password: 'abc123'
            })
            expect(res.status).toBe(200);
            expect(res.type).toBe('application/json')
            expect(res.body.token).toBeTruthy()
        })
    })
})