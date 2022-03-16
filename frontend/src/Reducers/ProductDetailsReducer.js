import {
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEEST,
} from "../Constants/ProductConstants";

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEEST:
      return { Loading: true, ...state };
    case PRODUCT_DETAILS_SUCCESS:
      return { Loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAILURE:
      return { Loading: false, error: action.payload };
    default:
      return state;
  }
};
