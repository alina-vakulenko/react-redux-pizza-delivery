export type FetchPizzaListArgs = {
  page: number;
  sortBy: string;
  category?: string;
  search?: string;
  limit: number;
};

export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
  ingridients?: string[];
};

export enum Status {
  IDLE = "idle",
  PENDING = "loading",
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
}

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}
