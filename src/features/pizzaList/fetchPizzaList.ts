import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { FetchPizzaListArgs, Pizza } from "./types";

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
