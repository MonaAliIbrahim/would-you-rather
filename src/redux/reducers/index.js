import { combineReducers } from "redux";
import UserReducer from './userReducer';
import QuestionReducer from "./questionReducer";

export default combineReducers({
  user: UserReducer,
  question: QuestionReducer,
});