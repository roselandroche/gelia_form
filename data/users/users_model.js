const bcrypt = require('bcryptjs')
const db = require('../db_config')

function find() {
    return db('users')
        .select('username', 'email')
}

async function add(user) {
    user.password = await bcrypt.hash(user.password, 13)
    return db('users')
        .insert(user)
        .returning('*')
}

function findById(id) {
    return db('users')
        .where({ id })
        .first()
}

function findBy(filter) {
    return db('users')
        .where( filter )
        .first()
}

module.exports = {
    find,
    add,
    findById,
    findBy
}