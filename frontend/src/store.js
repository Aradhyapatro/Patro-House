import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productReducer } from "./Reducers/ProductReducer.js";
import { productDetailsReducer } from "./Reducers/ProductDetailsReducer.js";
import { CartReducer } from "./Reducers/CartReducer.js";

const middleWare = [thunk];
const reducers = combineReducers({
  productList: productReducer,
  productDetail: productDetailsReducer,
  cart: CartReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
};

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
