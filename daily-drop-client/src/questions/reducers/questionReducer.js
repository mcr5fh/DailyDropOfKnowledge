import _ from "lodash";
import {
  CREATE_QUESTION,
  DESCRIBE_QUESTIONS,
  EDIT_QUESTION,
  GET_QUESTIONS_FOR_READABLE,
} from "../actions/questionActionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_QUESTION:
    case EDIT_QUESTION:
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case GET_QUESTIONS_FOR_READABLE:
      const curData = {
        curReadable: action.payload.readable,
        curQuestions: action.payload.questions,
      };
      return { ...state, ...curData };
    case DESCRIBE_QUESTIONS:
      //payload will be an array of streams, but we want to save it as a hash
      const questionMap = _.mapKeys(action.payload, "readableId");
      return { ...state, ...questionMap };
    default:
      return state;
  }
};
