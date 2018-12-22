import { dispatch } from "rxjs/internal/observable/range";
import history from "../history";

export const actions = {
  LOG_IN: "LOG_IN",
  LOG_OUT: "LOG_OUT"
};

export function tryLog(path, logOptions) {
  return dispatch => {
    return fetch(path + "/users/log", logOptions)
      .then(response => response.json(), err => console.log(err))
      .then(json => dispatch(receiveUserProps(json)));
  };
}
export function receiveUserProps(json) {
  return dispatch => {
    localStorage.setItem("token", json.token);
    dispatch({
      type: actions.LOG_IN,
      payload: json
    });
    return history.push("/home");
  };
}
