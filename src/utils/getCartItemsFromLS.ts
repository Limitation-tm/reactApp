import { ICartItem } from "../redux/slices/cartSlice";
import { calcTotalPrice } from "./calcTotalPrice";

interface CartData {
  items: ICartItem[];
  totalPrice: number;
}

export const getCartItemsFromLS = (): CartData => {
  const data: string | null = localStorage.getItem("cart");
  const items: ICartItem[] = data ? JSON.parse(data) : [];
  const totalPrice: number = calcTotalPrice(items);

  return {
    items,
    totalPrice,
  };
};
