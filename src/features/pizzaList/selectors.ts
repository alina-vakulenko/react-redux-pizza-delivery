import { RootState } from "../../redux/store";

export const selectPizzaList = (state: RootState) => state.pizzaList;
