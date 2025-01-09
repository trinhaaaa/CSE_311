const db = require("../db");

function createUserOrder([
  fullname,
  phone,
  address,
  note,
  orderDate,
  amount,
  status,
  userId,
]) {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO `customer_order`(`full_name`, `phone_number`, `address`, `note`, `order_date`,`amount`, `status`, `user_id`) VALUES (?,?,?,?,?,?,?,?)";
    db.query(
      sql,
      [fullname, phone, address, note, orderDate, amount, status, userId],
      (err, result) => {
        if (err) {
          //sql err
          console.error("SQL Error:", err);
          return reject(err);
        }
        const orderId = result.insertId;
        resolve(orderId);
      }
    );
  });
}

function createOrderDetail(orderId, orderItems) {
  // Tạo danh sách các Promise
  const promises = orderItems.map((item) => {
    return new Promise((resolve, reject) => {
      const product_id = item.product_id;
      const price = item.price;
      const quantity = item.quantity;
      const product_name = item.name;

      const sql =
        "INSERT INTO `order_detail`(`order_id`, `product_id`,`product_name`,`price`, `quantity`) VALUES (?,?,?,?,?)";

      db.query(
        sql,
        [orderId, product_id, product_name, price, quantity],
        (err, result) => {
          if (err) {
            console.error("Fail to create order detail:", err);
            return reject(err);
          }
          resolve(result);
        }
      );
    });
  });

  // Chờ tất cả các Promise hoàn thành
  return Promise.all(promises);
}

function selectOrderByUserId(user) {
  return new Promise((resolve, reject) => {
    const sql =
      "Select * from `customer_order` where `user_id`=? ORDER BY `order_date` DESC";

    db.query(sql, [user], (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
}

function selectOrderDetail(orderId) {
  return new Promise((resolve, reject) => {
    const sql = "Select * from `order_detail` where `order_id`=?";

    db.query(sql, [orderId], (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
}

function selectAllOrders() {
  return new Promise((resolve, reject) => {
    const sql = "Select * from `customer_order` ORDER BY `order_date` DESC";

    db.query(sql, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
}

function changeOrderStatus(order_status, order_id) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE `customer_order` SET `status`= ? WHERE `order_id`= ?";

    db.query(sql, [order_status, order_id], (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
}

module.exports = {
  createUserOrder,
  createOrderDetail,
  selectOrderDetail,
  selectOrderByUserId,
  selectAllOrders,
  changeOrderStatus,
};
