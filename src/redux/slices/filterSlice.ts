import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum SortValues {
  RATING = "rating",
  TITLE = "title",
  PRICE = "price",
}

export type SortObj = {
  name: string;
  value: SortValues;
};

export interface FilterSliceState {
  category: number;
  sortBy: SortObj;
  search: string;
  page: number;
}

const initialState: FilterSliceState = {
  category: 0,
  sortBy: {
    name: "rating",
    value: SortValues.RATING,
  },
  search: "",
  page: 1,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<number>) {
      state.category = action.payload;
      state.page = 1;
    },
    setSortBy(state, action: PayloadAction<SortObj>) {
      state.sortBy = action.payload;
      state.page = 1;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.category = 0;
      state.page = 1;
      state.search = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.category = action.payload.category;
      state.page = action.payload.page;
      state.sortBy = action.payload.sortBy;
      state.search = action.payload.search;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const { setCategory, setSortBy, setSearch, setPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
