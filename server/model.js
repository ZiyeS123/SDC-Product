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
    SELECT array_agg(r.related_id)
    FROM related_products r
    WHERE r.product_id = ${id}
    `
    return pool.connect()
      .then((client) => {
        return client
          .query(query)
          .then((res) => {
            client.release()
            return res.rows[0].array_agg
          })
          .catch((err) => {
            client.release()
            console.log('ERROR IN readRelatedProducts', err);
          })
      })
  },

  readProductStyles: function(id) {
    const query = `
    SELECT row_to_json(z)
    FROM (
      SELECT p.id AS product_id,
      (
        SELECT array_agg(row_to_json(y))
        FROM (
            SELECT s.id as style_id, s.name, s.original_price, s.sale_price, s.default_style AS default,
            (
              SELECT array_to_json(array_agg(row_to_json(d)))
              FROM (
                SELECT p.thumbnail_url, p.url
                FROM photos p
                WHERE p.style_id = s.id
              ) d
            ) AS photos,
           (
             SELECT array_agg(row_to_json(a))
             FROM (
               SELECT i.id, i.quantity, i.size
               FROM inventory i
               WHERE i.style_id = s.id
             ) a
           ) AS skus
            FROM styles s
            WHERE s.product_id = p.id
        ) y
      ) AS results
      FROM products p
      WHERE p.id = ${id}
    ) z`

    return pool.connect()
      .then((client) => {
        return client
          .query(query)
          .then((res) => {
            client.release()
            return res.rows[0].row_to_json;
          })
          .catch((err) => {
            client.release()
            console.log('ERROR IN readRelatedProducts', err);
          })
      })
  }
}
