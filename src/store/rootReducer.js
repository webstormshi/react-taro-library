import { combineReducers } from "redux";
import home from "./home/reducer";
import app from "./app/reducer";
import book from "./book/reducer";
import search from "./search/reducer";
import counter from "./counter/reducer";

export default combineReducers({
  home,
  app,
  book,
  search,
  counter
});
