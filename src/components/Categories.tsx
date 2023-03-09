import React from "react";
import { CategoriesProps, CategoryObj } from "../features/filter/types";

const categories: CategoryObj[] = [
  { id: 0, name: "All" },
  { id: 1, name: "More meat" },
  { id: 2, name: "More cheese" },
  { id: 3, name: "Grill" },
  { id: 4, name: "Spicy" },
  { id: 5, name: "Veggie" },
];

const Categories: React.FC<CategoriesProps> = ({
  activeCategory,
  handleCategoryChange,
}) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((category) => (
          <li
            key={category.id}
            className={category.id === activeCategory ? "active" : ""}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
