import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import {
  Filters,
  PizzaBlock,
  PizzaBlockSkeleton,
  Pagination,
} from "../components";

import { useAppDispatch } from "../redux/store";
import { categoriesList, sortList } from "../components/filters";

import { FetchPizzaListArgs, Pizza } from "../features/pizzaList/types";
import { setPage, setFilters } from "../features/filter/filterSlice";
import { selectFilter } from "../features/filter/selectors";
import { fetchPizzaList } from "../features/pizzaList/fetchPizzaList";
import { selectPizzaList } from "../features/pizzaList/selectors";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const isSearchParamsDispatched = useRef(false);
  const isMounted = useRef(false);

  const { category, sortBy, search, page } = useSelector(selectFilter);
  const { items: pizzaItems, status } = useSelector(selectPizzaList);
  const itemsPerPage = 6;

  const getPizzas = async () => {
    const queryParams: FetchPizzaListArgs = {
      sortBy: sortBy.name,
      page,
      limit: itemsPerPage,
    };
    if (category.name !== "0") {
      queryParams.category = category.name;
    }
    if (search) {
      queryParams.search = search;
    }
    dispatch(fetchPizzaList(queryParams));
  };

  useEffect(() => {
    if (isMounted.current) {
      const searchParams: Record<string, string> = {
        sortBy: sortBy.name,
        category: category.name,
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
  }, [category, sortBy, page, search]);

  useEffect(() => {
    if (searchParams.toString().length) {
      const params = Object.fromEntries([...searchParams]);
      let sortObj =
        sortList.find((obj) => obj.name === params.sortBy) || sortList[0];
      let categoryObj =
        categoriesList.find((obj) => obj.name === params.category) ||
        categoriesList[0];
      dispatch(
        setFilters({
          sortBy: sortObj,
          category: categoryObj,
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
  }, [category, sortBy, page, search]);

  return (
    <div className="container">
      {status === "rejected" ? (
        <div className="content__error-info">
          <h2>Oops, an error occured</h2>
          <p>Please try again later</p>
        </div>
      ) : (
        <>
          <Filters />
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
