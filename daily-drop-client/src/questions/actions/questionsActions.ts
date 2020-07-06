import {
  CREATE_QUESTION,
  DESCRIBE_QUESTIONS,
  GET_QUESTIONS_FOR_READABLE,
  EDIT_QUESTION,
} from "./questionActionTypes";
import LocalDb from "../../api/jsonServer";
import history from "../../history";
import { DefaultQuestion, Question } from "../model/QuestionModel";

const localDb = new LocalDb();

//We want to route the user back to the Stream list
export const createQuestion = (formValues: any) => {
  return async (dispatch: any, getState: any) => {
    const { userId } = getState().auth;
    const readableId = formValues.readableId;
    const newQuestion: Question = new DefaultQuestion({
      ...formValues,
      creatorId: userId,
    });
    console.log("createQuestion req", newQuestion);
    const response = await localDb.addRecord("questions", newQuestion);
    console.log("createQuestion resp", response);
    dispatch({
      type: CREATE_QUESTION,
      payload: response.data,
    });
    history.push(`/readables/${readableId}`);
  };
};

export const describeQuestions = (filter: object) => async (dispatch: any) => {
  console.log("describeQuestions: filter: ", filter);
  const response = await localDb.describeRecords("questions", filter);
  console.log("describeQuestions resp: ", response);
  dispatch({
    type: DESCRIBE_QUESTIONS,
    payload: response,
  });
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

export const editQuestion = (id: string, formValues: any) => {
  return async (dispatch: any) => {
    //Patch will only update SOME properties, not ALL
    const response = await localDb.updateRecord(`questions/${id}`, formValues);
    console.log("editQuestion response: ", response);
    dispatch({
      type: EDIT_QUESTION,
      payload: response.data,
    });
    history.push(`/readables/${formValues.readableId}`);
  };
};
