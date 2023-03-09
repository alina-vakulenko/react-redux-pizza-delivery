import { RootState } from "../../redux/store";

export const selectPizza = (state: RootState) => state.pizzaItem;
