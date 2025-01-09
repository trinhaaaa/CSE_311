const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/orderControllers");

router.post("/order", orderControllers.userOrder);
router.post("/myOrder", orderControllers.getOrderByUser);
router.get("/allOrder", orderControllers.getAllOrders);
router.post("/handleOrder", orderControllers.handleOrder);

module.exports = router;
