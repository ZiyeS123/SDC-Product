const { Pool, Client } = require('pg');
const config = require('../config.js');

const pool = new Pool(config);
//const client = new Client(config);

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

// pool.connect((err, client, done) => {
//   if (err) throw err;
//   console.log('pool connected')
// })

module.exports.pool = pool;