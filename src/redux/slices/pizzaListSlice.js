import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzaList = createAsyncThunk(
  "pizzaList/fetchPizzaList",
  async (params) => {
    const { data } = await axios.get(
      "https://63f517193f99f5855dbd4193.mockapi.io/items",
      {
        params: {
          ...params,
        },
      }
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading", // loading | fulfilled | rejected
};

const pizzaListSlice = createSlice({
  name: "pizzaList",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzaList.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchPizzaList.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.items = action.payload;
      })
      .addCase(fetchPizzaList.rejected, (state) => {
        state.status = "rejected";
        state.items = [];
      });
  },
});

export const selectPizzaList = (state) => state.pizzaList;

export default pizzaListSlice.reducer;
