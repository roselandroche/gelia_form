

exports.seed = async (knex) => {
  await knex('users').insert([
    {username: 'Rose Smith', password: 'abc123', email: 'r.smith@company.com'},
    {username: 'Lindsey Jones', password: '123abc', email: 'l.jones@company.com'},
    {username: 'Angelica Williams', password: '123', email: 'a.williams@company.com'}
  ])
};
