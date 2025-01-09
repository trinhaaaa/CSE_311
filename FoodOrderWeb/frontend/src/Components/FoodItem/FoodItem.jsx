import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/assets";

const FoodItem = ({ id, name, price, discription, rate, image }) => {
  // console.log(image);
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  return (
    <div className="food-item-container">
      <div className="food-item-image-wrapper">
        <img className="food-item-image" src={image} alt="" />
      </div>
      {!cartItems[id] ? (
        <p onClick={() => addToCart(id)} className="plus">
          +
        </p>
      ) : (
        <div className="food-item-counter">
          <img onClick={() => removeFromCart(id)} src={assets.remove_icon} />
          <p>{cartItems[id]}</p>
          <img onClick={() => addToCart(id)} src={assets.add_icon} alt="" />
        </div>
      )}
      <div className="food-item-info">
        <h4 className="food-item-name">{name}</h4>
        <img className="food-item-rate" src="public/rate.png" />
        <p className="food-item-price">
          {price},000<i>vnd</i>
        </p>
        {/* <p className="food-item-disc">{discription}</p> */}
      </div>
    </div>
  );
};

export default FoodItem;
