const { readProductList } = require('./model.js')

module.exports = {
  getProductList: function(page, count) {
    return readProductList(page, count)
  }
}