import _ from "lodash";
import QuestionActionType from "../actions/actionTypes";
import { DefaultReadable } from "../../readables/model/ReadableModel";
import { DefaultQuestion } from "../model/QuestionModel";

export default (state = {}, action) => {
  switch (action.type) {
    case QuestionActionType.CREATE_QUESTION:
    case QuestionActionType.EDIT_QUESTION:
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case QuestionActionType.GET_QUESTIONS_FOR_READABLE:
      console.log("QuestionReducer: action: ", action);
      const curData = {
        curReadable: new DefaultReadable(action.payload.readable),
        curQuestions: action.payload.questions.map(
          (q) => new DefaultQuestion(q)
        ),
      };
      return { ...state, ...curData };
    case QuestionActionType.DESCRIBE_QUESTIONS:
      //payload will be an array of streams, but we want to save it as a hash
      const questionMap = _.mapKeys(action.payload, "readableId");
      return { ...state, ...questionMap };
    default:
      return state;
  }
};
