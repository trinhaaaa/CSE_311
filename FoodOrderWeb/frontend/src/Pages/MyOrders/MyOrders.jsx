import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../Context/StoreContext";
import { showToast } from "../../Components/Notification/ToastProvider";

const MyOrders = () => {
  const user = localStorage["user"];
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8801/api/myOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message || "Failed to login");
          });
        }
        return response.json();
      })
      .then((result) => {
        setData(result);
      })
      .catch((err) => {
        showToast(err.message, "error");
        console.log(err);
      });
  }, []);

  if (data.length > 0) {
    return (
      <div className="my-orders">
        <h2>My Orders</h2>
        <div className="container">
          {data.map((order, index) => {
            return (
              <div key={index} className="my-orders-order">
                <img src="./parcel_icon.png" alt="" />
                <p>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.product_name + " x " + item.quantity;
                    } else {
                      return item.product_name + " x " + item.quantity + ",";
                    }
                  })}
                </p>

                <p>{order.amount},000 VND</p>
                <p>Items: {order.items.length}</p>
                <p>
                  <span>&#x25cf;</span> <b>{order.status}</b>
                </p>
                <button>Track Order</button>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="my-orders">
        <p className="empty-orders">You haven't ordered anything.</p>
      </div>
    );
  }
};
export default MyOrders;
