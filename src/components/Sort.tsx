import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  setSortBy,
  selectFilter,
  SortObj,
  SortValues,
} from "../redux/slices/filterSlice";

type PopupEvent = MouseEvent & {
  composedPath: Node[];
};

export const sortOptions: SortObj[] = [
  { name: "rating", value: SortValues.RATING },
  { name: "price", value: SortValues.PRICE },
  { name: "title", value: SortValues.TITLE },
];

const Sort: React.FC = () => {
  const dispatch = useDispatch();

  const [openSortOptions, setOpenSortOptions] = useState(false);

  const { sortBy } = useSelector(selectFilter);

  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupEvent;
      if (sortRef.current && !_event.composedPath().includes(sortRef.current)) {
        setOpenSortOptions(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSortClick = (sortObj: SortObj) => {
    dispatch(setSortBy(sortObj));
    setOpenSortOptions(false);
  };

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          className={openSortOptions ? "opened" : "closed"}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Sort by:</b>
        <span onClick={() => setOpenSortOptions(!openSortOptions)}>
          {sortBy.name}
        </span>
      </div>
      {openSortOptions && (
        <div className="sort__popup">
          <ul>
            {sortOptions.map((sortObj) => (
              <li
                key={sortObj.value}
                className={sortObj.value === sortBy.value ? "active" : ""}
                onClick={() => handleSortClick(sortObj)}
              >
                {sortObj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
