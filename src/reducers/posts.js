import { actions } from "../actions";

const logState = {
  posts: []
};

const posts = (state = logState, action) => {
  switch (action.type) {
    case actions.GET_POSTS:
      return {
        ...state,
        posts: action.payload
      };
    case actions.DELETE_POST:
      const newState = state;
      const postIndex = newState.posts.findIndex(
        x => x._id === action.payload.deletedPost
      );
      newState.posts.splice(postIndex, 1);
      return newState;
    default:
      return state;
  }
};

export default posts;
