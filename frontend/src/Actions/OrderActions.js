import axios from "axios";
import {
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAILURE,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_FAILURE,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from "../Constants/OrderConstants";

export const orderCreateAction = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

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
      `http://localhost:5000/api/orders`,
      order,
      config
    );

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const orderDetailsAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.Token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:5000/api/orders/${id}`,
      config
    );

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: { ...data },
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const orderPayAction =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_PAY_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log("Paying to backend", config);
      const { data } = await axios.get(
        `http://localhost:5000/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );
      console.log("Payment Action done");
      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: { ...data },
      });
    } catch (error) {
      dispatch({
        type: ORDER_PAY_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
