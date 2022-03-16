import axios from "axios";
import {
  PRODUCT_LIST_FAILURE,
  PRODUCT_LIST_REQUEEST,
  PRODUCT_LIST_SUCCESS,
} from "../Constants/ProductConstants.js";

export const listProduct = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEEST });

    const { data } = await axios.get("/api/products");

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
