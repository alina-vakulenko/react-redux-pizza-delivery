import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: 0,
  sortBy: {
    name: "rating",
    value: "rating",
  },
  search: "",
  page: 1,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
      state.page = 1;
    },
    setSortBy(state, action) {
      state.category = 0;
      state.page = 1;
      state.sortBy = action.payload;
    },
    setSearch(state, action) {
      state.category = 0;
      state.page = 1;
      state.search = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setFilters(state, action) {
      state.category = Number(action.payload.category);
      state.page = Number(action.payload.page);
      state.sortBy = action.payload.sortBy;
      state.search = action.payload.search;
    },
  },
});

export const selectFilter = (state) => state.filter;

export const { setCategory, setSortBy, setSearch, setPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
