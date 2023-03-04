import React, { useState, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";

import { setSearch } from "../../redux/slices/filterSlice";

import searchIcon from "../../assets/img/search-icon.svg";
import clearIcon from "../../assets/img/clear-icon.svg";
import styles from "./Search.module.scss";

export default function Search() {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef();

  const updateSearchValue = useCallback(
    debounce((value) => {
      dispatch(setSearch(value));
    }, 1000),
    []
  );

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  const clearInput = () => {
    setInputValue("");
    dispatch(setSearch(""));
    inputRef.current.focus();
  };

  return (
    <form className={styles.form}>
      <img src={searchIcon} alt="search" className={styles.searchIcon} />
      <input
        type="text"
        placeholder="Search..."
        value={inputValue}
        onChange={handleInputChange}
        ref={inputRef}
        className={styles.input}
      />
      {inputValue && (
        <img
          src={clearIcon}
          alt="clear-input"
          className={styles.clearIcon}
          onClick={clearInput}
        />
      )}
    </form>
  );
}
