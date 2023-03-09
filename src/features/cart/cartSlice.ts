import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartItem, CartSliceState } from "./types";
import { getCartTotalAmount, getCartTotalCount } from "../../utils/calcCartSum";

const initialState: CartSliceState = {
  items: [],
  totalAmount: 0,
  totalCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const itemInCart = state.items.find(
        (item) => item.cartItemId === action.payload.cartItemId
      );
      if (itemInCart) {
        itemInCart.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalCount = getCartTotalCount(state.items);
      state.totalAmount = getCartTotalAmount(state.items);
    },
    minusItem(state, action: PayloadAction<string>) {
      const itemInCart = state.items.find(
        (item) => item.cartItemId === action.payload
      );
      if (itemInCart) {
        itemInCart.count--;
      }
      state.totalCount = getCartTotalCount(state.items);
      state.totalAmount = getCartTotalAmount(state.items);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.cartItemId !== action.payload
      );
      state.totalCount = getCartTotalCount(state.items);
      state.totalAmount = getCartTotalAmount(state.items);
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
      state.totalCount = 0;
    },
  },
});

export const { addItem, removeItem, minusItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
