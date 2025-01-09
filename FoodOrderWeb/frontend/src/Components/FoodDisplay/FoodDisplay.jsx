import React, { useEffect, useState, useContext } from "react";
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDisplay.css";
import { FaBowlFood } from "react-icons/fa6";
import { StoreContext } from "../../Context/StoreContext";

const FoodDisplay = ({ category }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");

  const { food_list } = useContext(StoreContext);

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  // Filter the food list based on category and search query
  const filteredFoodList = food_list.filter((item) => {
    const matchesCategory = category === "All" || item.category_id === category;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // next page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFoodList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredFoodList.length / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="food-display" id="food-display">
      {/* <h2>
        <FaBowlFood />
        Top food
      </h2> */}

      <input
        type="text"
        placeholder="Search for food..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />

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

export default FoodDisplay;
