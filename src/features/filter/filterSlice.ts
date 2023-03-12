import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  FilterSliceState,
  OptionObj,
  sortValues,
  categoriesValues,
} from "./types";

const initialState: FilterSliceState = {
  category: { name: "0", value: categoriesValues.ALL },
  sortBy: {
    name: "rating",
    value: sortValues.RATING,
  },
  search: "",
  page: 1,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<OptionObj>) {
      state.category = action.payload;
      state.page = 1;
    },
    setSortBy(state, action: PayloadAction<OptionObj>) {
      state.sortBy = action.payload;
      state.page = 1;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.page = 1;
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

export const { setCategory, setSortBy, setSearch, setPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
