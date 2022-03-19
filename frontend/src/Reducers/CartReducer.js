import {
  CART_ADD_ITEMS,
  CART_REMOVE_ITEMS,
} from "../Constants/CartConstants.js";

export const CartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEMS:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) => {
            return x.product === existItem.product ? item : x;
          }),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEMS:
      const newCartItems = state.cartItems.filter(
        (item) => action.payload !== item.product
      );
      return { ...state, cartItems: newCartItems };
    default:
      return state;
  }
};
