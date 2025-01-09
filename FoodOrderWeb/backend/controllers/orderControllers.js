const orderModel = require("../models/orderModels");

async function userOrder(req, res) {
  try {
    const { userId, amount, orderInfo, orderItems } = req.body;

    //shipping = 0; shipped = 1;
    const status = "In proccessing";
    const now = new Date();
    const orderDate = now.toISOString().slice(0, 19).replace("T", " ");

    if (userId != null && userId != undefined) {
      const result = await orderModel.createUserOrder([
        orderInfo.fullname,
        orderInfo.phone,
        orderInfo.address,
        orderInfo.note,
        orderDate,
        amount,
        status,
        userId,
      ]);

      if (!result) {
        console.log("Failed to insert order:", result);
        return res
          .status(400)
          .json({ sucess: false, message: "Failed to create order" });
      }

      const orderId = result;

      //create order detail
      const orderDetail = orderModel.createOrderDetail(orderId, orderItems);

      console.log("Order placed successfully:", result);
      return res
        .status(200)
        .json({ sucess: true, message: "Created order successfully" });
    }
  } catch (err) {
    console.error("Error in userOrder:", err);
    res
      .status(500)
      .json({ sucess: false, message: "Something wrong in create order", err });
  }
}

async function getOrderByUser(req, res) {
  try {
    const { user } = req.body;

    const getOrder = await orderModel.selectOrderByUserId(user);

    if (getOrder.length === 0) {
      return res.json({
        sucess: false,
        message: "You haven't ordered anything.",
      });
    } else {
      const listOrderPromises = getOrder.map(async (order) => {
        let eachOrder = order;
        const orderDetail = await orderModel.selectOrderDetail(order.order_id);
        eachOrder["items"] = orderDetail;
        console.log(eachOrder);
        return eachOrder;
      });

      const listOrder = await Promise.all(listOrderPromises);

      return res.status(200).json(listOrder); // Trả về listOrder sau khi hoàn thành
    }
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Something wrong in getting order." });
  }
}

async function getAllOrders(req, res) {
  try {
    const getAllOrder = await orderModel.selectAllOrders();

    if (getAllOrder.length === 0) {
      return res.json({
        sucess: false,
        message: "There aren't any orders.",
      });
    } else {
      const listOrderPromises = getAllOrder.map(async (order) => {
        let eachOrder = order;
        const orderDetail = await orderModel.selectOrderDetail(order.order_id);
        eachOrder["items"] = orderDetail;
        // console.log(eachOrder);
        return eachOrder;
      });

      const listOrder = await Promise.all(listOrderPromises);

      return res.status(200).json(listOrder);
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something wrong in getting all orders.",
    });
  }
}

async function handleOrder(req, res) {
  const { order_status, order_id } = req.body;
  try {
    // console.log(order_status);
    const result = orderModel.changeOrderStatus(order_status, order_id);
    if (result) {
      res
        .status(200)
        .json({ sucess: true, message: "Handle Order Successfully" });
    } else {
      res.json({ success: fasle, message: "Failed to handle order." });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Something wrong in handle order." });
  }
}

module.exports = { userOrder, getOrderByUser, getAllOrders, handleOrder };
