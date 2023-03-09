import React, { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/pizzaBlock";
import PizzaBlockSkeleton from "../components/pizzaBlock/PizzaBlockSkeleton";
import Pagination from "../components/pagination";
import { sortOptions } from "../components/Sort";

import { useAppDispatch } from "../redux/store";
import { FetchPizzaListArgs, Pizza } from "../features/pizzaList/types";
import {
  setPage,
  setSortBy,
  setCategory,
  setFilters,
} from "../features/filter/filterSlice";
import { selectFilter } from "../features/filter/selectors";
import { fetchPizzaList } from "../features/pizzaList/fetchPizzaList";
import { selectPizzaList } from "../features/pizzaList/selectors";
import { SortObj } from "../features/filter/types";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const isMounted = useRef(false);
  const isSearchParamsDispatched = useRef(false);

  const { category, sortBy, search, page } = useSelector(selectFilter);
  const { items: pizzaItems, status } = useSelector(selectPizzaList);
  const itemsPerPage = 6;

  const getPizzas = async () => {
    const queryParams: FetchPizzaListArgs = {
      sortBy: sortBy.value,
      page,
      limit: itemsPerPage,
    };
    if (category > 0) {
      queryParams.category = category;
    }
    if (search) {
      queryParams.search = search;
    }
    dispatch(fetchPizzaList(queryParams));
  };

  useEffect(() => {
    if (isMounted.current) {
      const searchParams: Record<string, string> = {
        sortBy: sortBy.value,
        category: String(category),
      };
      if (page > 1) {
        searchParams.page = String(page);
      }
      if (search) {
        searchParams.search = search;
      }
      setSearchParams(new URLSearchParams(searchParams));
    }
    isMounted.current = true;
  }, [category, sortBy.value, page, search]);

  useEffect(() => {
    if (searchParams.toString().length) {
      const params = Object.fromEntries([...searchParams]);
      let sortObj = sortOptions.find(
        (sortObj) => sortObj.value === params.sortBy
      );
      dispatch(
        setFilters({
          sortBy: sortObj || sortOptions[0],
          category: category === 0 ? 0 : Number(params.category),
          search: params.search || "",
          page: page === 1 ? 1 : Number(params.number),
        })
      );
      isSearchParamsDispatched.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearchParamsDispatched.current) {
      getPizzas();
    }
    isSearchParamsDispatched.current = false;
  }, [category, sortBy.value, page, search]);

  const handleCategoryChange = useCallback(
    (id: number) => dispatch(setCategory(id)),
    []
  );

  const handleSortChange = useCallback(
    (sortObj: SortObj) => dispatch(setSortBy(sortObj)),
    []
  );

  return (
    <div className="container">
      <Categories
        activeCategory={category}
        handleCategoryChange={handleCategoryChange}
      />
      <div className="content__top">
        {status !== "rejected" && (
          <>
            <h2 className="content__title">Choose your pizza</h2>
            <Sort sortBy={sortBy} handleSortChange={handleSortChange} />
          </>
        )}
      </div>
      {status === "rejected" ? (
        <div className="content__error-info">
          <h2>Oops, an error occured</h2>
          <p>Please try again later</p>
        </div>
      ) : (
        <>
          <div className="content__items">
            {status === "loading"
              ? [...Array(6)].map((_, index) => (
                  <PizzaBlockSkeleton key={index} />
                ))
              : pizzaItems.map((pizzaObj: Pizza) => (
                  <PizzaBlock key={pizzaObj.id} {...pizzaObj} />
                ))}
          </div>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={10}
            currentPage={page}
            onPageChange={(pageNumber: number) => {
              dispatch(setPage(pageNumber));
            }}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
