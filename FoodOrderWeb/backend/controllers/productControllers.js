const productModel = require("../models/productModels.js");

const getProductList = async (req, res) => {
  try {
    const products = await productModel.getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to get product list!" });
  }
};

const getMenuList = async (red, res) => {
  try {
    const menuList = await productModel.getAllMenuList();
    res.status(200).json(menuList);
  } catch {
    res
      .status(500)
      .json({ success: false, message: "Failed to get menu list!" });
  }
};

const getTopProductList = async (req, res) => {
  try {
    const topList = await productModel.getAllTopFoodList();
    res.status(200).json(topList);
  } catch {
    res
      .status(500)
      .json({ success: false, message: "Failed to get top food list!" });
  }
};

const removeFoodItem = async (req, res) => {
  try {
    const { product_id } = req.body;
    const result = productModel.removeFoodItemFromList(product_id);
    if (result) {
      res.status(200).json({
        success: true,
        message: "remove " + [product_id] + "sucessfully",
      });
    }
  } catch {
    res
      .status(500)
      .json({ success: false, message: "Failed to remove!" + product_id });
  }
};

module.exports = {
  getProductList,
  getMenuList,
  getTopProductList,
  removeFoodItem,
};
