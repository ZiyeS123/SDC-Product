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
  },

  readProductInfo: function (id) {
    const query = `
    SELECT row_to_json(t)
    FROM (
      SELECT p.*,
      (
        SELECT array_to_json(array_agg(row_to_json(d)))
        FROM (
          SELECT f.feature, f.value
          FROM features f
          WHERE p.id = product_id
        ) d
      ) as features
    FROM products p
    WHERE p.id = ${id}
    ) t`;

    return pool.connect()
      .then((client) => {
        return client
          .query(query)
          .then((res) => {
            client.release()
            return res.rows[0].row_to_json;
            //console.log(res.rows[0].row_to_json);
          })
          .catch((err) => {
            client.release()
            console.log('ERROR IN readProductInfo', err);
          })
      })
  },

  readRelatedProducts: function(id) {
    const query = `
    SELECT row_to_json(t)
    FROM (
      SELECT array_agg(json_build_array(related_id)) d
      FROM (
        SELECT related_id
        FROM related_products
        WHERE product_id = ${id}
      ) d
    ) t`

    return pool.connect()
      .then((client) => {
        return client
          .query(query)
          .then((res) => {
            client.release()
            const resArr = res.rows[0].row_to_json.d;
            let relatedId = [];
            resArr.forEach((item) => {
              relatedId.push(item[0]);
            })
            return relatedId;
          })
          .catch((err) => {
            client.release()
            console.log('ERROR IN readRelatedProducts', err);
          })
      })

  }
}

