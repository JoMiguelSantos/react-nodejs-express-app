import * as actionTypes from "../actions/actionTypes";

export const initialState = {
  repos: []
};

const newRepos = (state, action) => {
  return { repos: action.payload };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NEW_REPOS:
      return newRepos(state, action);
    default:
      return state;
  }
};

export default reducer;
