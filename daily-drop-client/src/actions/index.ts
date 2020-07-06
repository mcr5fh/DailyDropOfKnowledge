import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_READABLE,
  GET_QUESTIONS_FOR_READABLE,
  DESCRIBE_READABLES,
  GET_READABLE,
  EDIT_READABLE,
} from "./types";
import LocalDb from "../api/jsonServer";
import history from "../history";
import { DefaultReadable, Readable } from "../readables/model/ReadableModel";
import { DefaultQuestion, Question } from "../questions/model/QuestionModel";

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

export const getQuestionsForReadable =  (readableId: string) => async (dispatch: any) => {
  // describeQuestions({ readableId })
  console.log("getQuestionsForReadable: readableId: ", readableId);
    const response = await localDb.getRecordsForReadble(readableId);
    
    console.log("getQuestionsForReadable resp: ", response);
    dispatch({
      type: GET_QUESTIONS_FOR_READABLE,
      payload: response.data
    });
};

/*
/ READABLES
*/

//We want to route the user back to the Stream list
export const createReadable = (formValues: object) => {
  return async (dispatch: any, getState: any) => {
    const { userId } = getState().auth;
    const newReadable: Readable = new DefaultReadable({ ...formValues, creatorId: userId })
    const response = await localDb.addRecord("readables", newReadable);
    console.log(response);
    dispatch({
      type: CREATE_READABLE,
      payload: response.data
    });
    history.push("/");
  };
};

export const describeReadables = (filter: object = {}) => async (dispatch: any) => {
  const response = await localDb.describeRecords("readables", filter);
  console.log("describeReadables resp: ", response);
  dispatch({
    type: DESCRIBE_READABLES,
    payload: response
  });
};

export const getReadable = (id: string) => {
  return async (dispatch: any) => {
    console.log("getReadable query: " + id);
    //TODO: Make this a getRecord
    const response = await localDb.getRecordsForReadble(id);
    console.log("getReadable ACtion " + JSON.stringify(response));
    dispatch({
      type: GET_READABLE,
      payload: response.data
    });
  };
};

export const editReadable = (id: string, formValues: any) => {
  return async (dispatch: any) => {
    //Patch will only update SOME properties, not ALL
    const response = await localDb.updateRecord(`readables/${id}`, formValues);
    console.log("editQuestion response: ", response);
    dispatch({
      type: EDIT_READABLE,
      payload: response.data
    });
    history.push("/readables");
  };
};

// export const deleteStream = id => {
//   return async dispatch => {
//     const response = await streams.delete(`/streams/${id}`);
//     console.log(response);
//     dispatch({
//       type: DELETE_STREAM,
//       payload: id
//     });
//   };
// };
