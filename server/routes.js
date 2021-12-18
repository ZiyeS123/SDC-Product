const router = require("express").Router();
const { getProductList, getProductInfo, getRelatedProducts, getProductStyles } = require('./controller.js');

router.get("/list", getProductList);

router.get("/:product_id", getProductInfo);

router.get("/:product_id/styles", getProductStyles);

router.get("/:product_id/related", getRelatedProducts);

module.exports = router;