import {
  CART_ADD_ITEMS,
  CART_REMOVE_ITEMS,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../Constants/CartConstants.js";

export const CartReducer = (
  state = { cartItems: [], shippingAddress: {}, paymentMethod: null },
  action
) => {
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
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    default:
      return state;
  }
};
