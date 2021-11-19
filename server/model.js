const pool = require('../db/index.js')


module.exports = {
  readProductList: function (page = 1, count = 5) {
    const max = page * count;
    const min = (page-1)* count;
    //console.log('max', max, 'min', min);
    const query = `SELECT * FROM products WHERE id <= ${max} AND id > ${min}`
    return pool.connect()
      .then((client) => {
        return client
          .query(query)
          .then((res) => {
            client.release()
            return res.rows;
            //console.log('res in model', res.rows)
          })
          .catch((err) => {
            client.release()
            console.log('ERROR IN readProductList', err);
          })
      })
  }
}

