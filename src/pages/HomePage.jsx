import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/pizzaBlock";
import PizzaBlockSkeleton from "../components/pizzaBlock/PizzaBlockSkeleton";
import Pagination from "../components/pagination";
import { sortOptions } from "../components/Sort";

import { setPage, setFilters, selectFilter } from "../redux/slices/filterSlice";
import {
  fetchPizzaList,
  selectPizzaList,
} from "../redux/slices/pizzaListSlice";

export default function HomePage() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const isMounted = useRef();
  const isSearchParamsDispatched = useRef();

  const { categoryId, sortBy, search, page } = useSelector(selectFilter);
  const { items: pizzaItems, status } = useSelector(selectPizzaList);
  const itemsPerPage = 6;

  const getPizzas = async () => {
    const queryParams = {
      sortBy: sortBy.value,
      page,
      limit: itemsPerPage,
    };
    if (categoryId > 0) {
      queryParams.category = categoryId;
    }
    if (search) {
      queryParams.search = search;
    }
    dispatch(fetchPizzaList(queryParams));
  };

  // Set isMounted = true after first render, in case of uptades in filter, searchParams will be overwritten
  useEffect(() => {
    if (isMounted.current) {
      const params = {
        sortBy: sortBy.value,
        categoryId,
        page,
      };
      if (search) {
        params.search = search;
      }
      setSearchParams(params);
    }
    isMounted.current = true;
  }, [categoryId, sortBy.value, page, search]);

  // save searchParams to redux if they changed after first render
  useEffect(() => {
    if (searchParams.toString().length) {
      const params = Object.fromEntries([...searchParams]);
      const sortObj = sortOptions.find(
        (sortObj) => sortObj.value === params.sortBy
      );
      if (categoryId === 0) {
        params.categoryId = 0;
      }
      dispatch(setFilters({ ...params, sortBy: sortObj }));
      isSearchParamsDispatched.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearchParamsDispatched.current) {
      getPizzas();
    }
    isSearchParamsDispatched.current = false;
  }, [categoryId, sortBy.value, page, search]);

  return (
    <div className="container">
      <Categories />
      <div className="content__top">
        {status !== "rejected" && (
          <>
            <h2 className="content__title">Choose your pizza</h2>
            <Sort />
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
              : pizzaItems.map((pizzaObj) => (
                  <PizzaBlock key={pizzaObj.id} {...pizzaObj} />
                ))}
          </div>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={10}
            currentPage={page}
            onPageChange={(pageNumber) => {
              dispatch(setPage(pageNumber));
            }}
          />
        </>
      )}
    </div>
  );
}
