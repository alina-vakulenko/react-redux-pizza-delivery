import { CartItem } from "../redux/slices/cartSlice";

export const getCartTotalAmount = (cartItems: CartItem[]) =>
  cartItems.reduce((sum, item) => sum + item.count * item.calculatedPrice, 0);

export const getCartTotalCount = (cartItems: CartItem[]) =>
  cartItems.reduce((sum, item) => sum + item.count, 0);

export const getLSCartData = () => {
  const cartDataJSON = localStorage.getItem("cartData");
  const cartItems = cartDataJSON ? JSON.parse(cartDataJSON) : [];
  const totalAmount = getCartTotalAmount(cartItems);
  const totalCount = getCartTotalCount(cartItems);

  return { cartItems: cartItems as CartItem[], totalAmount, totalCount };
};
