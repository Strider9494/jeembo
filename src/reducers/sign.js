import { actions } from "../actions";

const logState = {
  log: false,
  user: ""
};

const sign = (state = logState, action) => {
  switch (action.type) {
    case actions.LOG_IN:
      return Object.assign({}, state, { log: true, user: action.payload });
    case actions.LOG_OUT:
      return Object.assign({}, state, { log: false, user: "" });
    default:
      Object.assign({}, state, { log: false, user: "" });
      return state;
  }
};

export default sign;
