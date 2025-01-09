import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../Components/Notification/ToastProvider";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { getTotalCartAmount, cartItems, setCartItems, food_list } =
    useContext(StoreContext);
  const { user } = useContext(StoreContext);
  const [orderInfo, setOrderInfo] = useState({
    fullname: "",
    phone: "",
    address: "",
    note: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = user;
    if (userId) {
      if (cartItems && Object.keys(cartItems).length > 0) {
        let orderItems = [];

        food_list.map((item) => {
          if (cartItems[item.product_id] > 0) {
            let itemInfo = item;
            itemInfo["quantity"] = cartItems[item.product_id];
            orderItems.push(itemInfo);
          }
        });
        const amount = getTotalCartAmount();

        const data = { userId, amount, orderInfo, orderItems };

        console.log("order infor: ", data);

        //order
        fetch("http://localhost:8801/api/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (!response.ok) {
              return response.json().then((error) => {
                throw new Error(error.message || "Failed to order");
              });
            }
            return response.json();
          })
          .then((data) => {
            showToast("ordered successfully", "success");
            setCartItems({});
            navigate("/myOrder");
          })
          .catch((err) => {
            showToast(err.message, "error");
            console.log("ERR: ", err);
          });
      } else {
        alert("Your cart is empty");
      }
    } else {
      alert("Please login");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <input
          onChange={(e) => {
            setOrderInfo((prev) => ({ ...prev, fullname: e.target.value }));
          }}
          type="text"
          name="fullname"
          placeholder="Full name"
          required
        />
        {/* <input
          onChange={(e) => {
            setOrderInfo((prev) => ({ ...prev, email: e.target.value }));
          }}
          type="email"
          name="email"
          placeholder="Email address"
          required
        /> */}
        <input
          onChange={(e) => {
            setOrderInfo((prev) => ({ ...prev, address: e.target.value }));
          }}
          type="text"
          name="detail_address"
          placeholder="Detail address"
          required
        />

        <input
          onChange={(e) => {
            setOrderInfo((prev) => ({ ...prev, phone: e.target.value }));
          }}
          type="text"
          name="phone"
          placeholder="Phone"
          required
        />
        <textarea
          onChange={(e) => {
            setOrderInfo((prev) => ({ ...prev, note: e.target.value }));
          }}
          type="text"
          name="note"
          placeholder="Note for the order"
          id=""
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal: {getTotalCartAmount()},000</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee: 30,000</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Discount: 0vnd</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total: {getTotalCartAmount() + 30},000</b>
            </div>
          </div>
          <button className="place-order-submit" type="submit">
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
