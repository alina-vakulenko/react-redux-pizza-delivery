import { createSlice } from "@reduxjs/toolkit";

import { fetchPizzaList } from "./fetchPizzaList";
import { PizzaSliceState, Status } from "./types";

const initialState: PizzaSliceState = {
  items: [],
  status: Status.IDLE,
};

const pizzaListSlice = createSlice({
  name: "pizzaList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzaList.pending, (state) => {
        state.status = Status.PENDING;
        state.items = [];
      })
      .addCase(fetchPizzaList.fulfilled, (state, action) => {
        state.status = Status.FULFILLED;
        state.items = action.payload;
      })
      .addCase(fetchPizzaList.rejected, (state) => {
        state.status = Status.REJECTED;
        state.items = [];
      });
  },
});

export default pizzaListSlice.reducer;
