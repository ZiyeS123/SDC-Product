const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'ziye',
  host: 'localhost',
  database:  'products',
  password: '',
  port:5432,
})

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  console.log('connecting to database!')
})

module.exports.pool = pool;
module.exports.pool.connect = pool.connect;