const bcrypt = require('bcryptjs')
const express = require('express');
const usersMod = require('./users_model')
const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets')
const db = require('../db_config')

const router = express.Router();

router.post('/register', (req, res, next) => {
    try {
        const userExists = await usersMod.findBy({ username: req.body.username })
        const emailExists = await usersMod.findBy({ email: req.body.email })
        if(userExists) {
            return res.status(400).json({
                message: 'User already exists'
            })
        }
        if(emailExists) {
            return res.status(400).json({
                message: 'Email already exists'
            })
        }
        const newUser = await usersMod.add(req.body)
        res.status(201).json(newUser)
    }
    catch(err) {
        next(err)
    }
})

// router.post('/login', (req, res, next) => {
//     const { username, password } = req.body
//     const user = await usersMod.findBy({ username })

//     if(!user) {
//         return
//     }
// })

module.exports = router;