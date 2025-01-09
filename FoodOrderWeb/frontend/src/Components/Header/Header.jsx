import React from "react";
import "./Header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Header = () => {
  return (
    <div className="header-container">
      {/* Phần giới thiệu sản phẩm mới */}
      <div className="new-product-section">
        <div className="badge">NEW PRODUCT</div>
        <h2>Top quality seafood from Viet Nam</h2>
        <p className="product-type">Seafood</p>
        <img src="./header2-img.png" alt="Royal Blue Shrimp Packages" />
        <p className="product-name">Mực xào dưa leo</p>
        <p className="price">45,000 VND</p>
        <button className="details-button">Details</button>
      </div>

      {/* Phần sản phẩm nổi bật */}
      <div
        id="carouselExample"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="./header_img.png"
              className="d-block w-100"
              alt="Delicious food"
            />
            <div className="header-contents">
              <h2>Order your favourite food now</h2>
              <p>
                Choose from a diverse menu featuring a delectable array of
                dishes crafted with the finest ingredients and culinary
                expertise. Our mission is to satisfy your cravings and elevate
                your dining experience, one delicious meal at a time.
              </p>
              <button>
                <a href="#explore-menu">View Menu</a>
              </button>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="./header3_img.png"
              className="d-block w-100"
              alt="Tasty meals"
            />
            <div className="header-contents">
              <h2>Order your favourite food now</h2>
              <p>
                Choose from a diverse menu featuring a delectable array of
                dishes crafted with the finest ingredients and culinary
                expertise. Our mission is to satisfy your cravings and elevate
                your dining experience, one delicious meal at a time.
              </p>
              <button>
                <a href="#explore-menu">View Menu</a>
              </button>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="./header4_img.png"
              className="d-block w-100"
              alt="Fresh ingredients"
            />
            <div className="header-contents">
              <h2>Order your favourite food now</h2>
              <p>
                Choose from a diverse menu featuring a delectable array of
                dishes crafted with the finest ingredients and culinary
                expertise. Our mission is to satisfy your cravings and elevate
                your dining experience, one delicious meal at a time.
              </p>
              <button>
                <a href="#explore-menu">View Menu</a>
              </button>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Phần khuyến mãi */}
      <div className="promotions-section">
        <div className="promo">
          <span className="promo-badge">PROMOTION</span>
          <p>#Hot Deal</p>
          <h3>15% discount for all dessert</h3>
          <p>January 30 - February 2025</p>
          <button className="promo-button">
            <a href="#explore-menu ">Shop All </a>
          </button>
        </div>
        <div className="discount">
          <h3>Sign up & save</h3>
          <p>-15%</p>
          <button className="newsletter-button">New User</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
