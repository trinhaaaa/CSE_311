const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const app = express();
const userRoutes = require("./routes/userRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
app.use(cors());
app.use(express.json());

app.use("/api", productRoutes);
app.use("/api", userRoutes);
app.use("/api", orderRoutes);
require('./mqttClient');

// app.get('/profile', (req, res) => {
//   if (req.session.user) {
//     res.render('profile', { user: req.session.user });
//   } else {
//     res.redirect('/login');
//   }
// });

app.listen(8801, () => {
  console.log("listening");
});
