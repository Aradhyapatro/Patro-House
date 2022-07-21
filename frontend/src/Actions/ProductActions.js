import axios from "axios";
import {
  PRODUCT_LIST_FAILURE, PRODUCT_CREATE_FAILURE, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_RESET, PRODUCT_CREATE_SUCCESS,
  PRODUCT_LIST_REQUEEST,
  PRODUCT_LIST_SUCCESS, PRODUCT_DELETE_FAILURE, PRODUCT_DELETE_REQUEEST, PRODUCT_DELETE_SUCCESS
} from "../Constants/ProductConstants.js";
import { USER_DELETE_REQUEST } from "../Constants/UserConstants.js";

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

export const productDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.Token}`,
      },
    };

    await axios.delete(
      `http://localhost:5000/api/products/${id}`,
      config
    );

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const productCreateAction = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.Token}`,
      },
    };

    const { data } = await axios.post(
      `http://localhost:5000/api/products/`, {},
      config
    );

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}