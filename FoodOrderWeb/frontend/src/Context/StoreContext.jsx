import React, { createContext, useState, useEffect } from "react";
// import { food_list } from "../assets/assets";

export const StoreContext = createContext({});

const StoreContextProvider = (props) => {
  //user context
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser); // Cập nhật state user với dữ liệu đã lưu trong localStorage
        console.log("User loaded from localStorage: ", parsedUser);
      } catch (error) {
        console.error("Error parsing saved user data:", error);
        setUser(null); // Reset nếu có lỗi khi parse
      }
    } else {
      setUser(null);
      console.log("No user in localStorage");
    }
  }, []); // Chỉ chạy một lần khi component mount

  const login = (userData) => {
    setUser(userData); // Cập nhật state user
    localStorage.setItem("user", JSON.stringify(userData)); // Lưu user vào localStorage
    console.log("User logged in, saved to localStorage: ", userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Xóa user khỏi localStorage
    console.log("User logged out and removed from localStorage");
  };

  //product context
  //get menu list
  const [menu_list, setMenuList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8801/api/category")
      .then((res) => res.json())
      .then((data) => {
        setMenuList(data);
        // console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  //get food list
  const [food_list, setFoodList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8801/api/products")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setFoodList(data);
      })
      .catch((err) => console.log(err));
  }, []);

  //get top food list
  const [top_food_list, setTopFoodList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8801/api/topProducts")
      .then((res) => res.json())
      .then((data) => {
        console.log("top food", data);
        setTopFoodList(data);
      })
      .catch((err) => console.log(err));
  }, []);

  //cart
  const [cartItems, setCartItems] = useState({}); // State to keep track of items in the cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  useEffect(() => {
    // console.log(cartItems);
  }, [cartItems]);

  const getTotalCartAmount = () => {
    let total = 0;
    Object.entries(cartItems).forEach((item) => {
      const food = food_list.find((food) => food.product_id == item[0]);
      total += item[1] * food.price;
    });
    return total;
  };

  const contextValue = {
    login,
    logout,
    user,
    food_list,
    cartItems,
    menu_list,
    addToCart,
    setCartItems, // This will allow you to update cartItems directly if needed
    removeFromCart,
    getTotalCartAmount,
    top_food_list,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
