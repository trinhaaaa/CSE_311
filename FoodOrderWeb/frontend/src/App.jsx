import React, { useState, useEffect } from "react";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Cart from "./Pages/Cart/Cart";
import MyAccount from "./Pages/MyAccount/MyAccount";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import MyOrders from "./pages/MyOrders/MyOrders";
import Menu from "./Pages/Menu/Menu";
import MaterialDashboard from './components/MaterialDashboard/MaterialDashboard';





const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/myAccount" element={<MyAccount />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/myOrder" element={<MyOrders />} />
          <Route path="/dashboard" element={<MaterialDashboard />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
