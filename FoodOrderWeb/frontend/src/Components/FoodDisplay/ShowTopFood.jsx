import React, { useEffect, useState, useContext } from "react";
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDisplay.css";
import { FaBowlFood } from "react-icons/fa6";
import { StoreContext } from "../../Context/StoreContext";

const ShowTopFood = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");

  const { top_food_list } = useContext(StoreContext);
  //   console.log(top_food_list);
  useEffect(() => {
    setCurrentPage(1);
  }, []);

  //Filter the food list based on category and search query
  const filteredFoodList = top_food_list.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // next page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = top_food_list.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(top_food_list.length / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="food-display" id="food-display">
      <h2>
        <FaBowlFood />
        Best saler
      </h2>

      {/* <input
        type="text"
        placeholder="Search for food..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      /> */}

      <div className="food-display-list">
        {currentItems.map((item, index) => {
          const imgPath = "public/" + item.thumbnail + ".jpg";
          return (
            <FoodItem
              key={index}
              id={item.product_id}
              name={item.name}
              price={item.price}
              rate={item.rate}
              image={imgPath}
            />
          );
        })}
      </div>

      <div className="pagination">
        <button
          className="pagination-button"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={handleNext}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ShowTopFood;
