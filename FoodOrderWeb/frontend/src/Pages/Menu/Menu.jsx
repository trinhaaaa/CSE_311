import React, { useContext } from "react";
// import { menu_list } from "../../assets/assets";
import ExploreMenu from "../../Components/ExploreMenu/ExploreMenu";
import { StoreContext } from "../../Context/StoreContext";

const Menu = () => {
  const { menu_list } = useContext(StoreContext);

  return (
    <div>
      <ExploreMenu category={"All"} />
    </div>
  );
};

export default Menu;
