import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setCategoryId } from "../redux/slices/filterSlice";

export default function Categories() {
  const dispatch = useDispatch();

  const selectedCategoryId = useSelector((state) => state.filter.categoryId);

  const categories = [
    { id: 0, name: "All" },
    { id: 1, name: "More meat" },
    { id: 2, name: "More cheese" },
    { id: 3, name: "Grill" },
    { id: 4, name: "Spicy" },
    { id: 5, name: "Veggie" },
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryObj) => (
          <li
            key={categoryObj.id}
            className={categoryObj.id === selectedCategoryId ? "active" : ""}
            onClick={() => dispatch(setCategoryId(categoryObj.id))}
          >
            {categoryObj.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
