import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import Media from "react-media";

import { useAppDispatch } from "../../redux/store";
import { selectFilter } from "../../features/filter/selectors";
import { setCategory, setSortBy } from "../../features/filter/filterSlice";
import {
  categoriesValues,
  OptionObj,
  sortValues,
} from "../../features/filter/types";
import Menu from "./Menu";
import Popup from "./Popup";

export const sortList: OptionObj[] = [
  { name: "rating", value: sortValues.RATING },
  { name: "price", value: sortValues.PRICE },
  { name: "title", value: sortValues.TITLE },
];

export const categoriesList: OptionObj[] = [
  { name: "0", value: categoriesValues.ALL },
  { name: "1", value: categoriesValues.MEAT },
  { name: "2", value: categoriesValues.CHEESE },
  { name: "3", value: categoriesValues.GRILL },
  { name: "4", value: categoriesValues.SPICY },
  { name: "5", value: categoriesValues.VEGGIE },
];

const Filters: React.FC = () => {
  const dispatch = useAppDispatch();

  const { category, sortBy } = useSelector(selectFilter);

  const handleCategoryChange = useCallback(
    (categoryObj: OptionObj) => dispatch(setCategory(categoryObj)),
    []
  );

  const handleSortChange = useCallback(
    (sortObj: OptionObj) => dispatch(setSortBy(sortObj)),
    []
  );

  return (
    <section className="content__top">
      <h2 className="content__title">Choose your pizza</h2>
      <div className="content__filters">
        <Media query="(max-width: 1100px)">
          {(matches) => (
            <>
              {matches ? (
                <Popup
                  title="Category:"
                  activeValue={category}
                  handleClick={handleCategoryChange}
                  valuesList={categoriesList}
                />
              ) : (
                <Menu
                  activeValue={category}
                  handleClick={handleCategoryChange}
                  valuesList={categoriesList}
                />
              )}
            </>
          )}
        </Media>
        <Popup
          title="Sort by:"
          activeValue={sortBy}
          handleClick={handleSortChange}
          valuesList={sortList}
        />
      </div>
    </section>
  );
};

export default Filters;
