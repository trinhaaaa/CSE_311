import React, { useContext, useEffect, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import { showToast } from "../Notification/ToastProvider.jsx";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useContext(StoreContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length != 0 && email.length != 0) {
      if (currState === "Sign Up") {
        //register
        const data = { name, email, password };
        fetch("http://localhost:8801/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (!response.ok) {
              return response.json().then((error) => {
                throw new Error(error.message || "Failed to register");
              });
            }
            return response.json();
          })
          .then((data) => {
            setCurrState("Login");
            showToast("Created account successfully!");
          })
          .catch((err) => {
            showToast(err.message, "error");
            console.log("ERR: ", err);
          });
      } else {
        //log in
        const userLogin = { email, password };
        fetch("http://localhost:8801/api/login", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(userLogin),
        })
          .then((response) => {
            if (!response.ok) {
              return response.json().then((error) => {
                // Trích xuất thông báo lỗi chi tiết từ phản hồi của server (nếu có)
                throw new Error(error.message || "Failed to login");
              });
            }
            return response.json();
          })
          .then((data) => {
            setShowLogin(false);
            showToast("Login Successful!", "success");
            navigate("/");
            console.log(data.userId);
            login(data);
          })
          .catch((err) => {
            showToast(err.message, "error");
            console.error("ERR: ", err);
          });
      }
    } else {
      alert("Please fill all field.");
    }
  };

  return (
    <form action="">
      <div className="login-popup">
        <div className="login-popup-container">
          <div className="login-popup-title">
            <h2>{currState}</h2>{" "}
            <img
              onClick={() => setShowLogin(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <div className="login-popup-inputs">
            {currState === "Sign Up" ? (
              <input
                //value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                placeholder="Your name"
                required
              />
            ) : (
              <></>
            )}
            <input
              //value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Your email"
              required
            />
            <input
              // value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <button onClick={handleSubmit}>
            {currState === "Login" ? "Login" : "Create account"}
          </button>
          <div className="login-popup-condition">
            <input type="checkbox" name="" id="" />
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
          </div>
          {currState === "Login" ? (
            <p>
              Create a new account?{" "}
              <span onClick={() => setCurrState("Sign Up")}>Click here</span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default LoginPopup;
