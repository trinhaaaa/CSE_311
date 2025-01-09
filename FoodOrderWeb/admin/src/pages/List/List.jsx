import React, { useEffect, useState } from "react";
import "./List.css";
import { showToast } from "../../components/Notification/ToastProvider";

const List = () => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const [food_list, setFoodList] = useState([]);
  const fetchList = async () => {
    try {
      const res = await fetch("http://localhost:8801/api/products");
      if (!res.ok) {
        throw new Error("Failed to fetch product list.");
      }
      const data = await res.json();
      setFoodList(data);
    } catch (err) {
      console.error("Error fetching product list:", err.message);
    }
  };

  const removeFood = async (product_id) => {
    try {
      const response = await fetch("http://localhost:8801/api/removeItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Failed to remove item ${product_id}`);
      }

      await response.json();
      showToast("Deleted successfully!");

      // Chờ 2 giây trước khi fetch danh sách mới
      await delay(2000);

      // Fetch updated product list after deletion
      await fetchList();
    } catch (err) {
      showToast(err.message, "error");
      console.error("Error removing item:", err.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <table className="list-table">
        <thead className="thead-dark">
          <th scope="col">#</th>
          <th scope="col">Image</th>
          <th scope="col">Product ID</th>
          <th scope="col">Name</th>

          <th scope="col">Category ID</th>
          <th scope="col">Category Name</th>
          <th scope="col">Price</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
        </thead>
        <tbody>
          {food_list.map((item, index) => {
            const imgPath = "public/" + item.thumbnail + ".jpg";

            return (
              // <div key={index} className="list-table-format">
              <tr key={index} className="list-table-format">
                <td scope="row">{index + 1}</td>
                <td>
                  <img src={imgPath} alt="" />
                </td>
                <td>{item.product_id}</td>
                <td>{item.name}</td>
                <td>{item.category_id}</td>
                <td>on upload</td>
                <td>{item.price},000 vnd</td>
                {/*<td>{item.description}</td> */}
                <td>{item.deleted}</td>
                <td
                  className="cursor"
                  onClick={() => removeFood(item.product_id)}
                >
                  x
                </td>
              </tr>
              // </div>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default List;
