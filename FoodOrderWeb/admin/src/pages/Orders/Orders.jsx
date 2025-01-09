import React, { useEffect, useState } from "react";
import "./Orders.css";
import { assets } from "../../assets/assets";
import { showToast } from "../../components/Notification/ToastProvider";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const fetchAllOrders = async () => {
    fetch("http://localhost:8801/api/allOrder")
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message || "Failed to get orders.");
          });
        }
        return response.json();
      })
      .then((data) => {
        setOrders(data);
        // console.log(data);
      })
      .catch((err) => {
        showToast(err.message, "error");
        console.log("ERR: ", err);
      });
  };

  const statusHandler = async (order_status, order_id) => {
    fetch("http://localhost:8801/api/handleOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order_status, order_id }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message || "Failed to handle item ");
          });
        }
        return response.json();
      })
      .then((data) => {
        showToast("Successfully!");
      })
      .catch((err) => {
        showToast(err.message, "error");
        console.log("ERR: ", err);
      });
    await delay(2000);
    await fetchAllOrders();
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.product_name + " x " + item.quantity;
                  } else {
                    return item.product_name + " x " + item.quantity + ", ";
                  }
                })}
              </p>

              <p className="order-item-name">
                Order-
                {order.order_id + ": " + order.full_name + ", "}
              </p>
              <div className="order-item-address">
                <p>{order.address + ","}</p>
                <p>{order.note + ","}</p>
                <p>{order.order_date + ", "}</p>
              </div>
              <p className="order-item-phone">{order.phone_number}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>{order.amount},000vnd</p>
            <select
              onChange={(e) => statusHandler(e.target.value, order.order_id)}
              value={order.status}
              name=""
              id=""
            >
              <option value="In processing">In Processing</option>
              <option value="Accepted">Accepted</option>
              <option value="Shipping">Shipping</option>
              <option value="Successful">Successful</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
