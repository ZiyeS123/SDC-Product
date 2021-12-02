const { readProductList, readProductInfo, readRelatedProducts, readProductStyles } = require('./model.js')
const redis = require('redis');
const redisClient = redis.createClient();

redisClient.on('err', (err) => {
  console.log('Redis Client Error', err)
});

module.exports = {
  getProductList: function(req, res) {
    const page = req.query.page;
    const count = req.query.count;
    const redisKey = `getProductList:${page}${count}`

    redisClient.get(redisKey, (err, data) => {
      if (err) throw err;
      if (data !== null) {
        res.send(JSON.parse(data))
      } else {
        readProductList(page, count)
          .then((results) => {
            redisClient.setex(redisKey, 3600, JSON.stringify(results));
            res.send(results);
          })
          .catch((err) => {
            console.log('ERROR IN get products/list', err);
            res.status(400).send('Bad Request');
          })
      }
    })
  },

  getProductInfo: function(req, res) {
    const id = req.params.product_id;
    const redisKey = `getProductInfo:${id}`;

    redisClient.get(redisKey, (err, data) => {
      if (err) throw err;
      if (data !== null) {
        res.send(JSON.parse(data))
      } else {
        readProductInfo(id)
          .then((results) => {
            redisClient.setex(redisKey, 3600, JSON.stringify(results));
            res.send(results);
          })
          .catch((err) => {
            console.log('ERROR IN get products/:product_id', err);
            res.status(400).send('Bad Request');
          })
      }
    })
  },

  getRelatedProducts: function(req, res) {
    const id = req.params.product_id;
    const redisKey = `getRelatedProducts:${id}`;

    redisClient.get(redisKey, (err, data) => {
      if (err) throw err;
      if (data !== null) {
        res.send(JSON.parse(data))
      } else {
        readRelatedProducts(id)
          .then((results) => {
            redisClient.setex(redisKey, 3600, JSON.stringify(results));
            res.send(results);
          })
          .catch((err) => {
            console.log('ERROR IN get products/:product_id', err);
            res.status(400).send('Bad Request');
          })
      }
    })
  },

  getProductStyles: function(req, res) {
    const id = req.params.product_id;
    const redisKey = `getRelatedProducts:${id}`;

    redisClient.get(redisKey, (err, data) => {
      if (err) throw err;
      if (data !== null) {
        res.send(JSON.parse(data))
      } else {
        readProductStyles(id)
          .then((results) => {
            redisClient.setex(redisKey, 3600, JSON.stringify(results));
            res.send(results);
          })
          .catch((err) => {
            console.log('ERROR IN get products/:product_id', err);
            res.status(400).send('Bad Request');
          })
      }
    })
  }

}