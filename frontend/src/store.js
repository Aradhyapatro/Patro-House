import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productReducer } from "./Reducers/ProductReducer.js";
import { productDetailsReducer } from "./Reducers/ProductDetailsReducer.js";
import { CartReducer } from "./Reducers/CartReducer.js";
import {
  userloginReducer,
  userRegistionReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from "./Reducers/UserReducer.js";
import { orderReducer } from "./Reducers/orderReducers";

const middleWare = [thunk];
const reducers = combineReducers({
  productList: productReducer,
  productDetail: productDetailsReducer,
  cart: CartReducer,
  userLogin: userloginReducer,
  userRegister: userRegistionReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreated: orderReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAdd = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymeth = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAdd,
    paymentMethod: paymeth,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
