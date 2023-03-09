import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Pizza, Status } from "../../features/pizzaList/types";
import { fetchPizzaById } from "./fetchPizzaItem";
import { PizzaDataState } from "./types";

const initialState: PizzaDataState = {
  pizzaData: null,
  status: Status.IDLE,
};

const pizzaItemSlice = createSlice({
  name: "pizzaItem",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzaById.pending, (state) => {
        state.status = Status.PENDING;
        state.pizzaData = null;
      })
      .addCase(
        fetchPizzaById.fulfilled,
        (state, action: PayloadAction<Pizza>) => {
          state.status = Status.FULFILLED;
          state.pizzaData = action.payload;
        }
      )
      .addCase(fetchPizzaById.rejected, (state) => {
        state.status = Status.REJECTED;
        state.pizzaData = null;
      });
  },
});

export default pizzaItemSlice.reducer;
