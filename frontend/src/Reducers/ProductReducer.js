import {
  PRODUCT_CREATE_FAILURE,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAILURE,
  PRODUCT_DELETE_REQUEEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_LIST_REQUEEST,
  PRODUCT_LIST_SUCCESS, PRODUCT_UPDATE_FAILURE,
  PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_RESET, PRODUCT_UPDATE_SUCCESS
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

export const productDeleteReducer = (state = { Loading: false }, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEEST:
      return { Loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { Loading: false, success: true };
    case PRODUCT_DELETE_FAILURE:
      return { Loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { Loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { Loading: false, product: action.payload, success: true };
    case PRODUCT_CREATE_FAILURE:
      return { Loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {}
    default:
      return state;
  }
};
export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { Loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { Loading: false, product: action.payload, success: true };
    case PRODUCT_UPDATE_FAILURE:
      return { Loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return { product: {} }
    default:
      return state;
  }
};

