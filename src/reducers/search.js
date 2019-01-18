import { actions } from "../actions";

const logState = {
  search: false,
  searchUser: ""
};

const search = (state = logState, action) => {
  switch (action.type) {
    case actions.SEARCH_USER:
      return {
        ...state,
        search: action.payload.search,
        searchUser: action.payload.searchUser
      };
    default:
      return state;
  }
};

export default search;
