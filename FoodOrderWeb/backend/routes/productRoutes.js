const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productControllers.js");

router.get("/products", productControllers.getProductList);
router.get("/category", productControllers.getMenuList);
router.get("/topProducts", productControllers.getTopProductList);
router.post("/removeItem", productControllers.removeFoodItem);
module.exports = router;
