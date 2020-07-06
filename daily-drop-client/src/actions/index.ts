import {
  SIGN_IN,
  SIGN_OUT,
  GET_QUESTIONS_FOR_READABLE
} from "./types";
import LocalDb from "../api/jsonServer";
import history from "../history";


const localDb = new LocalDb();

export const signIn = (userId: string) => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};
