import history from "../history";

export const actions = {
  LOG_IN: "LOG_IN",
  LOG_OUT: "LOG_OUT",
  LOG_FAIL: "LOG_FAIL",
  GET_POSTS: "GET_POSTS",
  DELETE_POST: "DELETE_POSTS",
  SEARCH_USER: "SEARCH_USER"
};

export function getPosts(path, options) {
  return dispatch => {
    fetch(path, options)
      .then(response => response.json(), err => console.error(err))
      .then(json => dispatch({ type: actions.GET_POSTS, payload: json }))
      .catch(err => console.error(err));
    return;
  };
}

export function deletePost(path, options) {
  return dispatch => {
    fetch(path, options)
      .then(response => response.json(), err => console.error(err))
      .then(json => dispatch({ type: actions.DELETE_POST, payload: json }))
      .catch(err => console.error(err));
    return;
  };
}

export function tryLog(path, logOptions) {
  return dispatch => {
    return fetch(path, logOptions)
      .then(response => response.json(), err => console.error(err))
      .then(json => dispatch(receiveUserProps(json)))
      .catch(err => console.error(err));
  };
}

export function receiveUserProps(json) {
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

export function searchUser(path, options) {
  return async dispatch => {
    await fetch(path, options)
      .then(response => response.json(), err => console.error(err))
      .then(json => dispatch({ type: actions.SEARCH_USER, payload: json }))
      .catch(err => console.error(err));
    return;
  };
}
