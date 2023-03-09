import { RootState } from "../../redux/store";

export const selectCart = (state: RootState) => state.cart;

export const selectCartItemsByPizzaId =
  (pizzaId: string) => (state: RootState) =>
    state.cart.items.filter((item) => item.pizzaId === pizzaId);
