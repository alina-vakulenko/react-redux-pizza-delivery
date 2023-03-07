import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import cartReducer from "./slices/cartSlice";
import pizzaListReducer from "./slices/pizzaListSlice";
import pizzaItemReducer from "./slices/pizzaItemSlice";

export const store = configureStore({
  reducer: {
    pizzaList: pizzaListReducer,
    pizzaItem: pizzaItemReducer,
    filter: filterReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
