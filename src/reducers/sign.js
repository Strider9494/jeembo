import { actions } from "../actions";

const logState = {
  log: false,
  user: "",
  invalidLog: false
};

const sign = (state = logState, action) => {
  switch (action.type) {
    case actions.LOG_IN:
      return {
        ...state,
        log: true,
        invalidLog: false,
        user: action.payload.user
      };
    case actions.LOG_OUT:
      return { ...state, log: false, user: "" };
    case actions.LOG_FAIL:
      return { ...state, invalidLog: true };
    default:
      return state;
  }
};

export default sign;
