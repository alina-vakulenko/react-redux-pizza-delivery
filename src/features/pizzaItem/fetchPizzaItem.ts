import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { Pizza } from "../pizzaList/types";

export const fetchPizzaById = createAsyncThunk(
  "pizzaItem/fetchPizzaById",
  async (id: string) => {
    const { data } = await axios.get(
      `https://63f517193f99f5855dbd4193.mockapi.io/items/${id}`
    );
    return data as Pizza;
  }
);
