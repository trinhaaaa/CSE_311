const db = require("../db");

function getUserByEmail(email) {
  console.log(email);
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM user WHERE email = ?";
    db.query(sql, email, (err, results) => {
      if (err) {
        return reject(err);
      }
      // console.log(results);
      resolve(results);
    });
  });
}

function addNewUser([name, email, hashedPassword]) {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO user(full_name ,email ,password, role_id, deleted) value (?,?,?,3,0)";
    db.query(sql, [name, email, hashedPassword], (err, results) => {
      if (err) {
        return reject(err);
      } else {
        console.log("success");
        resolve(results);
      }
    });
  });
}

function getUserById(userId) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM user WHERE user_id = ?";
    db.query(sql, [userId], (err, res) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(res);
      }
    });
  });
}

function editUserAccount(company, email, fullname, phone) {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE `user` SET `full_name`= ?,`phone_number`=?,`company`=? WHERE `email`=?";

    db.query(sql, [fullname, phone, company, email], (err, res) => {
      if (err) {
        return reject(err);
      } else {
        console.log("Edit successfully.");
        resolve(res);
      }
    });
  });
}

module.exports = { getUserByEmail, addNewUser, editUserAccount, getUserById };
