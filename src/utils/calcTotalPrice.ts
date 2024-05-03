import { ICartItem } from "../redux/slices/cartSlice";

export const calcTotalPrice = (items: ICartItem[]) => {
  return items.reduce((sum, obj) => obj.price * obj.quantity + sum, 0);
};
