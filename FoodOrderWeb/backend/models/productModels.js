const db = require("../db");

function getAllProducts() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * from product";
    db.query(sql, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
}

function getAllMenuList() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM category";
    db.query(sql, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

function getAllTopFoodList() {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT p.*, SUM(od.quantity) AS total_quantity_sold  FROM `order_detail` od JOIN `product` p ON od.product_id = p.product_id GROUP BY p.product_id ORDER BY total_quantity_sold DESC LIMIT 100";
    db.query(sql, (err, results) => {
      if (err) return reject(err);
      // console.log(results);
      resolve(results);
    });
  });
}

function removeFoodItemFromList(product_id) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE `product` SET `deleted`='1' WHERE `product_id`=?";
    db.query(sql, [product_id], (err, res) => {
      if (err) return reject(err);
      return resolve(true);
    });
  });
}

module.exports = {
  getAllProducts,
  getAllMenuList,
  getAllTopFoodList,
  removeFoodItemFromList,
};
