import AuthActionType from "./actionTypes";

export const signIn = (userId: string) => {
  return {
    type: AuthActionType.SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: AuthActionType.SIGN_OUT
  };
};
