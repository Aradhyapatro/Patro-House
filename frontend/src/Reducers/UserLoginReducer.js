import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
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

export { userloginReducer, userRegistionReducer };
