import React, { useState } from "react";
import "./Home.css";
import ExploreMenu from "../../Components/ExploreMenu/ExploreMenu";
import Header from "../../Components/Header/Header";
import FoodDisplay from "../../Components/FoodDisplay/FoodDisplay";
import Panel from "../../Components/Panel/Pane";
import ShowTopFood from "../../Components/FoodDisplay/ShowTopFood";

const Home = () => {
  const [category, setCategory] = useState("All");

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <Header />
      <Panel />
      <ShowTopFood />

      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      {/* Nút Go to Top */}
      <button
        className="go-to-top"
        onClick={scrollToTop}
        aria-label="Go to top"
      >
        ↑
      </button>
    </div>
  );
};

export default Home;
