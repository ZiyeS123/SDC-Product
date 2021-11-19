const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const db = require("../db/index.js");
const router = require('./routes.js');

const { getProductList, getProductInfo, getRelatedProducts } = require('./controller.js');

app.use(express.json());
app.use('/products', router);


app.listen(PORT, function () {
  console.log(`listening on port ${PORT}!`)}
)

//==========================request handlers==================================

app.get('/', (req, res) => {
  res.json("🐳")
})



