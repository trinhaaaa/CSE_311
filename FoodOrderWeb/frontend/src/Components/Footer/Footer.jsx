import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.830852800145!2d-122.41941608468297!3d37.774929779759026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064f8e8b2f1%3A0x4f65e9c7b1f1a807!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1699999999999!5m2!1sen!2s"
            title="Company Location"
          ></iframe>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-212-456-7890</li>
            <li>contact@tomato.com</li>
          </ul>
          <div className="footer-social-icons">
            <img src={assets.facebook} alt="Facebook" />
            <img src={assets.twitter} alt="Twitter" />
            <img src={assets.linkedin} alt="LinkedIn" />
          </div>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 © Tomato.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
