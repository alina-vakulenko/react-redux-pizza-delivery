import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
  totalCount: 0,
};

export const createCartItemId = (pizzaId, selectedTypeId, selectedSizeId) => {
  return `${pizzaId}t${selectedTypeId}s${selectedSizeId}`;
};

const getCartTotalAmount = (cartItems) => {
  return cartItems.reduce(
    (sum, item) => sum + item.count * item.calculatedPrice,
    0
  );
};

const getCartTotalCount = (cartItems) => {
  return cartItems.reduce((sum, item) => sum + item.count, 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      console.log("add", state, action.payload);
      const itemInCart = state.items.find(
        (item) => item.cartItemId === action.payload.cartItemId
      );
      if (itemInCart) {
        itemInCart.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalCount++;
      state.totalAmount = getCartTotalAmount(state.items);
    },
    minusItem(state, action) {
      console.log("minus", action.payload);
      const itemInCart = state.items.find(
        (item) => item.cartItemId === action.payload
      );
      itemInCart.count--;
      state.totalAmount = getCartTotalAmount(state.items);
      state.totalCount--;
    },
    removeItem(state, action) {
      console.log("remove", action.payload);
      state.items = state.items.filter(
        (item) => item.cartItemId !== action.payload
      );
      state.totalAmount = getCartTotalAmount(state.items);
      state.totalCount = getCartTotalCount(state.items);
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
      state.totalCount = 0;
    },
  },
});

export const { addItem, removeItem, minusItem, clearCart } = cartSlice.actions;

export const selectCart = (state) => state.cart;
export const selectCartItemById = (cartItemId) => (state) =>
  state.cart.items.find((item) => item.cartItemId === cartItemId);
export const selectCartItemsByPizzaId = (pizzaId) => (state) =>
  state.cart.items.filter((item) => item.pizzaId === pizzaId);

export default cartSlice.reducer;
