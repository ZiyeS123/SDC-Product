const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const db = require("../db/index.js");

const { getProductList } = require('./controller.js');

app.use(express.json());

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}!`)}
)

//==========================request handlers==================================

app.get('/', (req, res) => {
  res.json("🐳")
})

app.get('/products/list', (req, res) => {
  const page = req.query.page || 1;
  const count = req.query.count || 5;
  getProductList(page, count)
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.log('ERROR IN get products/list', err);
    })
})

app.get('/products/:product_id', (req, res) => {

})

app.get('/products/:product_id/related', (req, res) => {
})

app.get('/products/:product_id/styles', (req, res) => {
})


