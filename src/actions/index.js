import { dispatch } from "rxjs/internal/observable/range";
import history from "../history";

export const actions = {
  LOG_IN: "LOG_IN",
  LOG_OUT: "LOG_OUT",
  LOG_FAIL: "LOG_FAIL"
};

export function tryLog(path, logOptions) {
  return dispatch => {
    return fetch(path, logOptions)
      .then(response => response.json(), err => console.log(err))
      .then(json => dispatch(receiveUserProps(json)))
      .catch(err => console.error(err));
  };
}
export function receiveUserProps(json) {
  console.log(json);
  return dispatch => {
    if (!json.log) return dispatch({ type: actions.LOG_FAIL });
    localStorage.setItem("token", json.token);
    dispatch({
      type: actions.LOG_IN,
      payload: json
    });
    return history.push("/home");
  };
}
