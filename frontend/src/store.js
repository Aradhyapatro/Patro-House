import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productReducer, productDeleteReducer } from "./Reducers/ProductReducer.js";
import { productDetailsReducer } from "./Reducers/ProductDetailsReducer.js";
import { CartReducer } from "./Reducers/CartReducer.js";
import {
  userloginReducer,
  userRegistionReducer,
  userDetailsReducer, ProductCreateReducer,
  userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateByAdminReducer
} from "./Reducers/UserReducer.js";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer, orderListMyReducer
} from "./Reducers/orderReducers";

const middleWare = [thunk];
const reducers = combineReducers({
  productList: productReducer,
  productDetail: productDetailsReducer,
  cart: CartReducer,
  userLogin: userloginReducer,
  userRegister: userRegistionReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreated: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  myOrderList: orderListMyReducer,
  usersList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateByAdminReducer,
  ProductDeleteReducer: productDeleteReducer,
  ProductCreateReducer: ProductCreateReducer
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
