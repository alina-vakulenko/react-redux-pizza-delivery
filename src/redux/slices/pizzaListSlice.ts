import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

import axios from "axios";

export type FetchPizzaListArgs = {
  page: number;
  sortBy: string;
  category?: number;
  search?: string;
  limit: number;
};

export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export const fetchPizzaList = createAsyncThunk<Pizza[], FetchPizzaListArgs>(
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

export enum Status {
  IDLE = "idle",
  PENDING = "loading",
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
}

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

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

export const selectPizzaList = (state: RootState) => state.pizzaList;

export default pizzaListSlice.reducer;
