import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzaById = createAsyncThunk(
  "pizzaItem/fetchPizzaById",
  async ({ id }) => {
    const { data } = await axios.get(
      `https://63f517193f99f5855dbd4193.mockapi.io/items/${id}`
    );
    return data;
  }
);

const initialState = {
  pizzaData: {},
  status: "loading", // loading | fulfilled | rejected
};

const pizzaItemSlice = createSlice({
  name: "pizzaItem",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzaById.pending, (state) => {
        state.status = "loading";
        state.pizzaData = {};
      })
      .addCase(fetchPizzaById.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.pizzaData = action.payload;
      })
      .addCase(fetchPizzaById.rejected, (state) => {
        state.status = "rejected";
        state.pizzaData = {};
      });
  },
});

export const selectPizza = (state) => state.pizzaItem;

export default pizzaItemSlice.reducer;
