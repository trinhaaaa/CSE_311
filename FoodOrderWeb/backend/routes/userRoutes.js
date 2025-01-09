const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers.js");

router.post("/login", userController.loginUser);
router.post("/register", userController.registerUser);
router.post("/myaccount", userController.userAccountInfo);
router.post("/editAccount", userController.editAccount);

module.exports = router;
