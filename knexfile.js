require('dotenv').config()

const sqlite3 = {
  client: sqlite3,
  useNullAsDefault: true,
  migrations: {
    directory: './database/migrations',
  },
  seeds: {
    directory: './database/seeds',
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run('PRAGMA foreign_keys = ON', done);
    }
  }
}

module.exports = {

  development: {
    ...sqlite3,
    connection: {
      filename: './data/form.db3'
    }
  },

  test: {
    ...sqlite3,
    connection: {
      filename: './data/test_form.db3'
    }
  },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};
