import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
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
    setCategoryId(state, action) {
      state.categoryId = action.payload;
      state.page = 1;
    },
    setSortBy(state, action) {
      state.categoryId = 0;
      state.page = 1;
      state.sortBy = action.payload;
    },
    setSearch(state, action) {
      state.categoryId = 0;
      state.page = 1;
      state.search = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setFilters(state, action) {
      state.categoryId = Number(action.payload.categoryId);
      state.page = Number(action.payload.page);
      state.sortBy = action.payload.sortBy;
      state.search = action.payload.search;
    },
  },
});

export const selectFilter = (state) => state.filter;

export const { setCategoryId, setSortBy, setSearch, setPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
