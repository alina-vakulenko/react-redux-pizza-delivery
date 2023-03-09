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

export interface CartSliceState {
  items: CartItem[];
  totalAmount: number;
  totalCount: number;
}
