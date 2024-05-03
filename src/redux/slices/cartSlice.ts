import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { getCartItemsFromLS } from "../../utils/getCartItemsFromLS";

const { items, totalPrice } = getCartItemsFromLS();

export interface ICartItem {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: string;
  quantity: number;
}

interface ICartSliceState {
  cart: {
    totalPrice: number;
    items: ICartItem[];
  };
}

const initialState: ICartSliceState = {
  cart: { totalPrice, items },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addingProductsToCart(state, action: PayloadAction<ICartItem>) {
      const findItem = state.cart.items.find((obj) => {
        return (
          obj._id === action.payload._id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
        );
      });
      if (findItem) {
        findItem.quantity++;
      } else {
        state.cart.items.push({ ...action.payload, quantity: 1 });
      }
      state.cart.totalPrice = calcTotalPrice(state.cart.items);
    },
    removeProductsFromCart(state, action: PayloadAction<ICartItem>) {
      const findItem = state.cart.items.find((obj) => {
        return (
          obj._id === action.payload._id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
        );
      });
      if (findItem) {
        findItem.quantity--;
      }
      state.cart.totalPrice = calcTotalPrice(state.cart.items);
    },
    deleteWholeProduct(state, action: PayloadAction<ICartItem>) {
      state.cart.items = state.cart.items.filter((obj) => {
        return (
          obj._id !== action.payload._id ||
          obj.size !== action.payload.size ||
          obj.type !== action.payload.type
        );
      });
      state.cart.totalPrice = calcTotalPrice(state.cart.items);
    },
    clearAllProductsFromCart(state) {
      state.cart.items = [];
      state.cart.totalPrice = 0;
    },
  },
});

export const {
  addingProductsToCart,
  removeProductsFromCart,
  clearAllProductsFromCart,
  deleteWholeProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
