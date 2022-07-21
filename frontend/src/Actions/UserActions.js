import axios from "axios";
import { ORDER_LIST_MY_RESET } from "../Constants/OrderConstants.js";
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAILURE,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_FAILURE,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_DETAILS_RESET,
  USER_LIST_REQUEST,
  USER_LIST_FAILURE,
  USER_LIST_SUCCESS,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILURE,
  USER_UPDATE_ADMIN_FAILURE,
  USER_UPDATE_ADMIN_REQUEST,
  USER_UPDATE_ADMIN_RESET,
  USER_UPDATE_ADMIN_SUCCESS
} from "../Constants/UserConstants.js";

const userloginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:5000/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const userRegisterAction = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:5000/api/users",
      {
        name,
        email,
        password,
      },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_REGISTER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const userLogoutAction = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: USER_LOGOUT,
  });
  dispatch({
    type: USER_DETAILS_RESET,
  });
  dispatch({
    type: ORDER_LIST_MY_RESET,
  });
  dispatch({
    type: USER_LIST_RESET,
  });
};

const userDetailsAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

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
      `http://localhost:5000/api/users/${id}`,
      config
    );

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_DETAILS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const userUpdateAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    console.log(user);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.Token}`,
      },
    };

    console.log(userInfo.Token);

    const { data } = await axios.put(
      `http://localhost:5000/api/users/profile`,
      user,
      config
    );
    console.log(data);
    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_UPDATE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const userListAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.Token}`,
      },
    };
    console.log("Start");
    const { data } = await axios.get(
      `http://localhost:5000/api/users/getUsers`,
      config
    );
    console.log("data", data);
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_LIST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const userDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.Token}`,
      },
    };

    const { data } = await axios.delete(
      `http://localhost:5000/api/users/${id}`,
      config
    );

    dispatch({
      type: USER_DELETE_SUCCESS,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_DELETE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const userUpdateAdminAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_ADMIN_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.Token}`,
      },
    };

    const { data } = await axios.put(
      `http://localhost:5000/api/users/${user._id}`, user,
      config
    );

    dispatch({
      type: USER_UPDATE_ADMIN_SUCCESS,
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export {
  userloginAction,
  userLogoutAction,
  userRegisterAction,
  userDetailsAction,
  userUpdateAction,
  userListAction,
  userDeleteAction, userUpdateAdminAction
};
