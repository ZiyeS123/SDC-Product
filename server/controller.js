const { readProductList, readProductInfo, readRelatedProducts } = require('./model.js')

module.exports = {
  getProductList: function(page, count) {
    return readProductList(page, count)
  },

  getProductInfo: function(id) {
    return readProductInfo(id);
  },

  getRelatedProducts: function(id) {
    return readRelatedProducts(id);
  }

}