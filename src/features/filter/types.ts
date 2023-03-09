export enum SortValues {
  RATING = "rating",
  TITLE = "title",
  PRICE = "price",
}

export type SortObj = {
  name: string;
  value: SortValues;
};

export type SortProps = {
  sortBy: SortObj;
  handleSortChange: (SortObj: SortObj) => void;
};

export type PopupEvent = MouseEvent & {
  composedPath: Node[];
};

export interface FilterSliceState {
  category: number;
  sortBy: SortObj;
  search: string;
  page: number;
}

export type CategoryObj = {
  id: number;
  name: string;
};

export type CategoriesProps = {
  activeCategory: number;
  handleCategoryChange: (id: number) => void;
};
