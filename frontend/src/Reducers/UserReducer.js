import {
  USER_DETAILS_REQUEST,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_FAILURE,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_FAILURE,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
} from "../Constants/UserConstants.js";

const userloginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { Loading: true };
    case USER_LOGIN_SUCCESS:
      return {
        Loading: false,
        userInfo: action.payload,
      };
    case USER_LOGIN_FAILURE:
      return {
        Loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

const userRegistionReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { Loading: true };
    case USER_REGISTER_SUCCESS:
      return {
        Loading: false,
        userInfo: action.payload,
      };
    case USER_REGISTER_FAILURE:
      return {
        Loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { Loading: true };
    case USER_DETAILS_SUCCESS:
      return {
        Loading: false,
        user: action.payload,
      };
    case USER_DETAILS_FAILURE:
      return {
        Loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const userUpdateProfileReducer = (
  state = { user: {}, success: false },
  action
) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { Loading: true };
    case USER_UPDATE_SUCCESS:
      return {
        Loading: false,
        success: true,
        user: action.payload,
      };
    case USER_UPDATE_FAILURE:
      return {
        Loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export {
  userloginReducer,
  userRegistionReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
};
