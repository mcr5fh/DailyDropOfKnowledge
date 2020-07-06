import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import authReducer from "./authReducer";
import questionReducer from "../questions/reducers/questionReducer";
import readablesReducer from "../readables/reducers/readablesReducer";

export default combineReducers({
  auth: authReducer,
  form: reduxFormReducer,
  questionsData: questionReducer,
  readablesData: readablesReducer,
});
