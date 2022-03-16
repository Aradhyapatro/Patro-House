import {
  PRODUCT_LIST_FAILURE,
  PRODUCT_LIST_REQUEEST,
  PRODUCT_LIST_SUCCESS,
} from "../Constants/ProductConstants.js";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEEST:
      return { Loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { Loading: false, products: action.payload };
    case PRODUCT_LIST_FAILURE:
      return { Loading: false, error: action.payload };
    default:
      return state;
  }
};
