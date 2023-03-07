import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLSCartData } from "../../utils/getLSCartData";
import { RootState } from "../store";

export type CartItem = {
  pizzaId: string;
  cartItemId: string;
  title: string;
  imageUrl: string;
  size: number;
  type: string;
  calculatedPrice: number;
  count: number;
};

interface CartSliceState {
  items: CartItem[];
  totalAmount: number;
  totalCount: number;
}

const { cartItems, totalAmount, totalCount } = getLSCartData();

const initialState: CartSliceState = {
  items: cartItems,
  totalAmount: totalAmount,
  totalCount: totalCount,
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
      state.totalCount = totalCount;
      state.totalAmount = totalAmount;
    },
    minusItem(state, action: PayloadAction<string>) {
      const itemInCart = state.items.find(
        (item) => item.cartItemId === action.payload
      );
      if (itemInCart) {
        itemInCart.count--;
      }
      state.totalAmount = totalAmount;
      state.totalCount = totalCount;
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.cartItemId !== action.payload
      );
      state.totalAmount = totalAmount;
      state.totalCount = totalCount;
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
      state.totalCount = 0;
    },
  },
});

export const { addItem, removeItem, minusItem, clearCart } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;
// export const selectCartItemById = (cartItemId: string) => (state: RootState) =>
//   state.cart.items.find((item) => item.cartItemId === cartItemId);
export const selectCartItemsByPizzaId =
  (pizzaId: string) => (state: RootState) =>
    state.cart.items.filter((item) => item.pizzaId === pizzaId);

export default cartSlice.reducer;
