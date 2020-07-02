const express = require('express')
const usersRouter = require('../data/users/users_router')

const cors = require('cors')
const helmet = require('helmet')
// any middleware here

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

server.use('/', usersRouter)

server.get('/', (req, res) => {
    res.json({
        message: 'Sanity check'
    });
});

server.use((err, req, res, next) => {
    console.log('Error;', err);
    res.status(500).json({
        message: 'Something went wrong'
    });
});

module.exports = server;