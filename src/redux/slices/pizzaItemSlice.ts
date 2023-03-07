import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Pizza, Status } from "./pizzaListSlice";

import axios from "axios";

export const fetchPizzaById = createAsyncThunk(
  "pizzaItem/fetchPizzaById",
  async (id: string) => {
    const { data } = await axios.get(
      `https://63f517193f99f5855dbd4193.mockapi.io/items/${id}`
    );
    return data as Pizza;
  }
);

type PizzaDataState = {
  pizzaData: Pizza | null;
  status: Status;
};

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

export const selectPizza = (state: RootState) => state.pizzaItem;

export default pizzaItemSlice.reducer;
