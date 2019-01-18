import { combineReducers } from "redux";

import sign from "./sign";
import posts from "./posts";
import search from "./search";

export default combineReducers({
  sign,
  posts,
  search
});
