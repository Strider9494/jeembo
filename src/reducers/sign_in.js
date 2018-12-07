import { actions } from "../actions";

const logState = {
  log: false
};

export default function sign_in(state = logState, action) {
  switch (action.type) {
    case actions.LOG_IN:
      return Object.assign({}, state, { log: true });
    default:
      return state;
  }
}
