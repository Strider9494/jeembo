import { actions } from "../actions";

const logState = {
  log: false,
  user: ""
};

const sign = (state = logState, action) => {
  switch (action.type) {
    case actions.LOG_IN:
      return { ...state, log: true, user: action.payload.user };
    case actions.LOG_OUT:
      return { ...state, log: false, user: "" };
    default:
      return state;
  }
};

export default sign;
