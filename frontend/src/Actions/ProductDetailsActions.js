import axios from "axios";
import {
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_DETAILS_REQUEEST,
  PRODUCT_DETAILS_SUCCESS,
} from "../Constants/ProductConstants.js";

export const productDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEEST });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: PRODUCT_DETAILS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
