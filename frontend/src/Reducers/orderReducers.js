import {
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
} from "../Constants/OrderConstants";

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        Loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return { Loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAILURE:
      return { Loading: false, order: action.payload };
    default:
      return state;
  }
};
