export enum sortValues {
  RATING = "rating",
  TITLE = "title",
  PRICE = "price",
}

export enum categoriesValues {
  ALL = "All",
  MEAT = "More meat",
  CHEESE = "More cheese",
  SPICY = "Spicy 🔥",
  GRILL = "Grill",
  VEGGIE = "Veggie",
}

export type OptionObj = {
  name: string;
  value: sortValues | categoriesValues;
};

export type FilterProps = {
  activeValue: OptionObj;
  handleClick: (value: OptionObj) => void;
  valuesList: OptionObj[];
};

export type PopupProps = Omit<FilterProps, "isPopup"> & {
  title: string;
};

export type PopupEvent = MouseEvent & {
  composedPath: Node[];
};

export interface FilterSliceState {
  category: OptionObj;
  sortBy: OptionObj;
  search: string;
  page: number;
}
