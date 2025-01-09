import React, { useContext, useEffect, useState } from "react";
import "./ExploreMenu.css";
import { StoreContext } from "../../Context/StoreContext";
//import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  const { menu_list } = useContext(StoreContext);
  // console.log(menu_list);
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="menu-text">
        Celebration of flavors & aromas carefully curate to tantalize your taste
        buds
      </p>

      <div className="menu-list">
        {menu_list.map((item, index) => {
          const menuPath = item.thumbnail + ".jpg";
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.category_id ? "All" : item.category_id
                )
              }
              key={index}
              className="menu-item"
            >
              <div className="menu-img-container">
                <img
                  className={category === item.category_id ? "active" : ""}
                  src={menuPath}
                  alt=""
                />
              </div>

              <p className="menu-name">{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMenu;
