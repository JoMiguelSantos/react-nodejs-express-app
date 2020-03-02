import * as actionTypes from "../actions/actionTypes";

const initialState = {
  repos: [],
  searching: false
};

const searchingRepos = (state, action) => {
  return { ...state, searching: action.payload };
};

const setRepos = (state, action) => {
  return { ...state, repos: action.payload };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_REPOS:
      return setRepos(state, action);
    case actionTypes.SEARCHING_REPOS:
      return searchingRepos(state, action);
    default:
      return state;
  }
};

export default reducer;
export { initialState };
export const getRepos = state => state.repos.repos;
