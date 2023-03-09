import { Pizza, Status } from "../pizzaList/types";

export type PizzaDataState = {
  pizzaData: Pizza | null;
  status: Status;
};
