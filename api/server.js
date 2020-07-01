const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
// any middleware here

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

// routers here

server.get('/', (req, res, next) => {
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