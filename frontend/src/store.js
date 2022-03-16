import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productReducer } from "./Reducers/ProductReducer.js";
import { productDetailsReducer } from "./Reducers/ProductDetailsReducer.js";

const middleWare = [thunk];
const reducers = combineReducers({
  productList: productReducer,
  productDetail: productDetailsReducer,
});
const initialState = {};

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
