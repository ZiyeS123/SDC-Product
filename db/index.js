const { Pool, Client } = require('pg');
const config = require('../config.js');

const pool = new Pool(config);


pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
})

pool.on('connect', (client) => {
  console.log('db connected')
})


module.exports = pool;
