import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount } = useContext(StoreContext);

  return (
    <div className="navbar">
      <Link to="/">
        <img className="logo" src={assets.logo} alt="" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={`${menu === "home" ? "active" : ""}`}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={`${menu === "menu" ? "active" : ""}`}
        >
          Menu
        </a>

        <a
          href="#Blogs"
          onClick={() => setMenu("Blogs")}
          className={`${menu === "Blogs" ? "active" : ""}`}
        >
          Blogs
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact")}
          className={`${menu === "contact" ? "active" : ""}`}
        >
          About us
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("join")}
          className={`${menu === "join" ? "active" : ""}`}
        >
          Join with us
        </a>
        <Link
          to="/myOrder"
          onClick={() => setMenu("myOrders")}
          className={`${menu === "myOrders" ? "active" : ""}`}
        >
          My Order
        </Link>
      </ul>
      <div className="navbar-right">
        <Link to="/Cart" className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </Link>

        <button onClick={() => setShowLogin(true)}>Sign up</button>

        <Link to="/MyAccount" className="navbar-user-icon">
          <img src={assets.user_icon} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
