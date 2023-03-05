import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/pizzaBlock";
import PizzaBlockSkeleton from "../components/pizzaBlock/PizzaBlockSkeleton";
import Pagination from "../components/pagination";
import { sortOptions } from "../components/Sort";

import {
  setPage,
  setCategory,
  setFilters,
  selectFilter,
} from "../redux/slices/filterSlice";
import {
  fetchPizzaList,
  selectPizzaList,
} from "../redux/slices/pizzaListSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const isMounted = useRef(false);
  const isSearchParamsDispatched = useRef(false);

  const { category, sortBy, search, page } = useSelector(selectFilter);
  const { items: pizzaItems, status } = useSelector(selectPizzaList);
  const itemsPerPage = 6;

  type QueryParamsType = {
    sortBy: string;
    category?: number;
    search?: string;
    page: number;
    limit?: number;
  };

  type SearchStringParams = {
    sortBy: string;
    page: number;
    category: number;
    search?: string;
  };

  const getPizzas = async () => {
    const queryParams: QueryParamsType = {
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
    dispatch(
      // @ts-ignore
      fetchPizzaList(queryParams)
    );
  };

  // Set isMounted = true after first render, in case of uptades in filter, searchParams will be overwritten
  useEffect(() => {
    if (isMounted.current) {
      const params: SearchStringParams = {
        sortBy: sortBy.value,
        category,
        page,
      };
      if (search) {
        params.search = search;
      }
      // @ts-ignore
      setSearchParams(params);
    }
    isMounted.current = true;
  }, [category, sortBy.value, page, search]);

  useEffect(() => {
    if (searchParams.toString().length) {
      const params = Object.fromEntries([...searchParams]);
      const sortObj = sortOptions.find(
        (sortObj) => sortObj.value === params.sortBy
      );
      if (category === 0) {
        params.category = "0";
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
  }, [category, sortBy.value, page, search]);

  return (
    <div className="container">
      <Categories
        activeCategory={category}
        handleCategoryChange={(id: number) => {
          dispatch(setCategory(id));
        }}
      />
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
              : pizzaItems.map((pizzaObj: any) => (
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
