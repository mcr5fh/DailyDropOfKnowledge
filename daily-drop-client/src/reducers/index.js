import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import authReducer from "./authReducer";
import questionReducer from "./questionReducer";
import readablesReducer from "./readablesReducer";

export default combineReducers({
  auth: authReducer,
  form: reduxFormReducer,
  questionsData: questionReducer,
  readablesData: readablesReducer,
});
