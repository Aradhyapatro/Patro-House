import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
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

export { userloginReducer };
