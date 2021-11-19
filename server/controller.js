const { readProductList, readProductInfo, readRelatedProducts, readProductStyles } = require('./model.js')

module.exports = {
  getProductList: function(req, res) {
    const page = req.query.page;
    const count = req.query.count;
    readProductList(page, count)
      .then((results) => {
        res.send(results);
      })
      .catch((err) => {
        console.log('ERROR IN get products/list', err);
      })
  },

  getProductInfo: function(req, res) {
    const id = req.params.product_id;
    readProductInfo(id)
      .then((results) => {
        res.send(results);
      })
      .catch((err) => {
        console.log('ERROR IN get products/:product_id', err);
      })
  },

  getRelatedProducts: function(req, res) {
    const id = req.params.product_id;
    readRelatedProducts(id)
      .then((results) => {
        res.send(results);
      })
      .catch((err) => {
        console.log('ERROR IN get products/:product_id', err);
      })
  },

  getProductStyles: function(req, res) {

  }

}