import AuthActionType from "../actions/actionTypes";

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case AuthActionType.SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };
    case AuthActionType.SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
};
